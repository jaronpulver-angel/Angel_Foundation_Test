#!/usr/bin/env node

/**
 * Validate Token Naming Conventions
 *
 * Ensures all token names follow Angel Design System conventions:
 * - Lowercase with underscores for multi-word names
 * - Numeric keys allowed for scales (50, 100, 500, etc.)
 * - State suffixes use underscores: _hover, _pressed, _disabled, _focused
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, relative } from 'path';

// Valid naming patterns
// Allows: lowercase words, numeric scales (50, 100), size scales (4xs, 2xl, 27xl)
const VALID_KEY_PATTERN = /^[a-z][a-z0-9_]*$|^[0-9]+$|^[0-9]+[a-z]+$/;
const STATE_SUFFIXES = ['_hover', '_pressed', '_disabled', '_focused', '_active', '_selected'];

const errors = [];
const warnings = [];

/**
 * Recursively find all JSON files in a directory
 */
function findJsonFiles(dir) {
  const files = [];

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
 * Check if a value is a token (has value and type properties)
 */
function isToken(obj) {
  return obj && typeof obj === 'object' && ('value' in obj || '$value' in obj);
}

/**
 * Validate a single key name
 */
function validateKeyName(key, path, file) {
  // Allow special keys like $type, $value
  if (key.startsWith('$')) {
    return;
  }

  // Check basic pattern
  if (!VALID_KEY_PATTERN.test(key)) {
    // Check if it's camelCase (common mistake)
    if (/[A-Z]/.test(key)) {
      errors.push(
        `${file}: Key "${key}" at "${path}" uses camelCase. ` +
        `Use snake_case instead (e.g., "${key.replace(/([A-Z])/g, '_$1').toLowerCase()}")`
      );
    }
    // Check if it uses hyphens
    else if (key.includes('-')) {
      errors.push(
        `${file}: Key "${key}" at "${path}" uses hyphens. ` +
        `Use underscores instead (e.g., "${key.replace(/-/g, '_')}")`
      );
    }
    else {
      errors.push(`${file}: Key "${key}" at "${path}" has invalid format. Use lowercase with underscores.`);
    }
  }
}

/**
 * Recursively validate all keys in an object
 */
function validateObject(obj, path, file) {
  for (const [key, value] of Object.entries(obj)) {
    const currentPath = path ? `${path}.${key}` : key;

    // Validate this key
    validateKeyName(key, path || 'root', file);

    // If not a token, recurse into nested objects
    if (!isToken(value) && value && typeof value === 'object') {
      validateObject(value, currentPath, file);
    }
  }
}

/**
 * Main validation function
 */
function validate() {
  console.log('🔍 Validating token naming conventions...\n');

  const tokensDir = join(process.cwd(), 'tokens');
  const files = findJsonFiles(tokensDir);

  if (files.length === 0) {
    console.log('⚠️  No token files found in tokens/ directory');
    process.exit(0);
  }

  console.log(`Found ${files.length} token file(s):\n`);

  for (const file of files) {
    const relativePath = relative(process.cwd(), file);
    console.log(`  📄 ${relativePath}`);

    try {
      const content = readFileSync(file, 'utf-8');
      const tokens = JSON.parse(content);
      validateObject(tokens, '', relativePath);
    } catch (e) {
      errors.push(`${relativePath}: Failed to parse JSON - ${e.message}`);
    }
  }

  console.log('');

  // Report warnings
  if (warnings.length > 0) {
    console.log(`⚠️  ${warnings.length} warning(s):\n`);
    warnings.forEach(w => console.log(`   ${w}`));
    console.log('');
  }

  // Report errors
  if (errors.length > 0) {
    console.log(`❌ ${errors.length} error(s):\n`);
    errors.forEach(e => console.log(`   ${e}`));
    console.log('');
    console.log('Naming conventions:');
    console.log('  • Use lowercase letters and underscores: "primary_background"');
    console.log('  • Numeric keys allowed for scales: "50", "100", "500"');
    console.log('  • State suffixes: "_hover", "_pressed", "_disabled", "_focused"');
    console.log('');
    process.exit(1);
  }

  console.log('✅ All token names follow conventions!\n');
}

validate();
