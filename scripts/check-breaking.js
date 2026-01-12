#!/usr/bin/env node

/**
 * Check for Breaking Changes
 *
 * Compares current tokens against a baseline to detect:
 * - Removed tokens
 * - Renamed tokens (guessed via similarity)
 * - Type changes
 *
 * Usage:
 *   node scripts/check-breaking.js [baseline-dir]
 *
 * If no baseline directory is provided, uses 'tokens-baseline/' if it exists.
 */

import { readFileSync, readdirSync, statSync, existsSync } from 'fs';
import { join, relative } from 'path';

const breakingChanges = [];
const nonBreakingChanges = [];

/**
 * Recursively find all JSON files in a directory
 */
function findJsonFiles(dir) {
  const files = [];

  if (!existsSync(dir)) {
    return files;
  }

  function walk(currentDir) {
    const entries = readdirSync(currentDir);
    for (const entry of entries) {
      const fullPath = join(currentDir, entry);
      const stat = statSync(fullPath);

      if (stat.isDirectory()) {
        walk(fullPath);
      } else if (entry.endsWith('.json') && !entry.startsWith('$')) {
        files.push(fullPath);
      }
    }
  }

  walk(dir);
  return files;
}

/**
 * Check if a value is a token
 */
function isToken(obj) {
  return obj && typeof obj === 'object' && ('value' in obj || '$value' in obj);
}

/**
 * Extract all token paths from a tokens object
 */
function extractTokenPaths(obj, prefix = '') {
  const tokens = new Map();

  function walk(current, path) {
    for (const [key, value] of Object.entries(current)) {
      const currentPath = path ? `${path}.${key}` : key;

      if (isToken(value)) {
        tokens.set(currentPath, {
          value: value.value ?? value.$value,
          type: value.type ?? value.$type
        });
      } else if (value && typeof value === 'object') {
        walk(value, currentPath);
      }
    }
  }

  walk(obj, prefix);
  return tokens;
}

/**
 * Load all tokens from a directory
 */
function loadTokens(dir) {
  const allTokens = new Map();
  const files = findJsonFiles(dir);

  for (const file of files) {
    try {
      const content = readFileSync(file, 'utf-8');
      const tokens = JSON.parse(content);
      const extracted = extractTokenPaths(tokens);

      for (const [path, token] of extracted) {
        allTokens.set(path, token);
      }
    } catch (e) {
      console.error(`Error reading ${file}: ${e.message}`);
    }
  }

  return allTokens;
}

/**
 * Calculate similarity between two strings (for detecting renames)
 */
function similarity(s1, s2) {
  const longer = s1.length > s2.length ? s1 : s2;
  const shorter = s1.length > s2.length ? s2 : s1;

  if (longer.length === 0) return 1.0;

  const editDistance = ((a, b) => {
    const matrix = [];
    for (let i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }
    for (let j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
    }
    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }
    return matrix[b.length][a.length];
  })(longer, shorter);

  return (longer.length - editDistance) / longer.length;
}

/**
 * Main comparison function
 */
function checkBreaking(baselineDir, currentDir) {
  console.log('🔍 Checking for breaking changes...\n');

  if (!existsSync(baselineDir)) {
    console.log(`⚠️  No baseline directory found at "${baselineDir}"`);
    console.log('   Run with a baseline to detect breaking changes.\n');
    console.log('   To create a baseline, copy your current tokens:');
    console.log('   cp -r tokens tokens-baseline\n');
    process.exit(0);
  }

  const baseline = loadTokens(baselineDir);
  const current = loadTokens(currentDir);

  console.log(`  Baseline: ${baseline.size} tokens`);
  console.log(`  Current:  ${current.size} tokens\n`);

  // Find removed tokens
  const removed = [];
  for (const [path, token] of baseline) {
    if (!current.has(path)) {
      removed.push({ path, token });
    }
  }

  // Find added tokens
  const added = [];
  for (const [path, token] of current) {
    if (!baseline.has(path)) {
      added.push({ path, token });
    }
  }

  // Try to detect renames (removed + added with similar names and same type)
  const possibleRenames = [];
  for (const removedToken of removed) {
    for (const addedToken of added) {
      if (removedToken.token.type === addedToken.token.type) {
        const sim = similarity(removedToken.path, addedToken.path);
        if (sim > 0.7) {
          possibleRenames.push({
            from: removedToken.path,
            to: addedToken.path,
            similarity: sim
          });
        }
      }
    }
  }

  // Find type changes
  const typeChanges = [];
  for (const [path, token] of baseline) {
    if (current.has(path)) {
      const currentToken = current.get(path);
      if (token.type !== currentToken.type) {
        typeChanges.push({
          path,
          oldType: token.type,
          newType: currentToken.type
        });
      }
    }
  }

  // Report results
  if (removed.length > 0) {
    console.log(`❌ BREAKING: ${removed.length} token(s) removed:\n`);
    removed.forEach(r => {
      console.log(`   - ${r.path}`);
      // Check if this might be a rename
      const rename = possibleRenames.find(pr => pr.from === r.path);
      if (rename) {
        console.log(`     (possibly renamed to "${rename.to}")`);
      }
    });
    console.log('');
    breakingChanges.push(...removed.map(r => `Removed: ${r.path}`));
  }

  if (typeChanges.length > 0) {
    console.log(`❌ BREAKING: ${typeChanges.length} token type(s) changed:\n`);
    typeChanges.forEach(tc => {
      console.log(`   - ${tc.path}: ${tc.oldType} → ${tc.newType}`);
    });
    console.log('');
    breakingChanges.push(...typeChanges.map(tc => `Type changed: ${tc.path}`));
  }

  if (added.length > 0) {
    console.log(`✅ ${added.length} new token(s) added (non-breaking):\n`);
    added.slice(0, 10).forEach(a => console.log(`   + ${a.path}`));
    if (added.length > 10) {
      console.log(`   ... and ${added.length - 10} more`);
    }
    console.log('');
    nonBreakingChanges.push(...added.map(a => `Added: ${a.path}`));
  }

  // Summary
  if (breakingChanges.length > 0) {
    console.log('⚠️  BREAKING CHANGES DETECTED!\n');
    console.log('   This will require a MAJOR version bump.');
    console.log('   Please update the migration guide before merging.\n');
    process.exit(1);
  } else if (nonBreakingChanges.length > 0) {
    console.log('✅ No breaking changes detected.\n');
    console.log('   New tokens added - this will be a MINOR version bump.\n');
  } else {
    console.log('✅ No changes detected.\n');
  }
}

// Main
const baselineDir = process.argv[2] || join(process.cwd(), 'tokens-baseline');
const currentDir = join(process.cwd(), 'tokens');

checkBreaking(baselineDir, currentDir);
