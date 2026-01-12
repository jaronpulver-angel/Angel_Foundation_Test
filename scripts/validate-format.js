#!/usr/bin/env node

/**
 * Validate Token Format
 *
 * Ensures all tokens follow the Tokens Studio format:
 * - Each token has both "value" and "type" properties
 * - Types are valid (color, number, dimension, fontFamily, etc.)
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, relative } from 'path';

const VALID_TYPES = [
  'color',
  'number',
  'dimension',
  'fontFamily',
  'fontWeight',
  'duration',
  'cubicBezier',
  'shadow',
  'border',
  'gradient',
  'typography',
  'spacing',
  'borderRadius',
  'borderWidth',
  'opacity',
  'sizing',
  'fontFamilies',
  'fontSizes',
  'fontWeights',
  'lineHeights',
  'letterSpacing',
  'paragraphSpacing',
  'textCase',
  'textDecoration'
];

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
 * Validate a single token
 */
function validateToken(token, path, file) {
  const value = token.value ?? token.$value;
  const type = token.type ?? token.$type;

  // Check for value
  if (value === undefined) {
    errors.push(`${file}: Token "${path}" is missing "value" property`);
    return;
  }

  // Check for type
  if (type === undefined) {
    errors.push(`${file}: Token "${path}" is missing "type" property`);
    return;
  }

  // Validate type
  if (!VALID_TYPES.includes(type)) {
    warnings.push(`${file}: Token "${path}" has unknown type "${type}"`);
  }

  // Type-specific validation
  if (type === 'color') {
    const colorValue = String(value);
    // Allow hex colors, references, and transparent
    if (!colorValue.startsWith('#') &&
        !colorValue.startsWith('{') &&
        colorValue !== 'transparent') {
      errors.push(`${file}: Token "${path}" has invalid color value "${value}"`);
    }
  }

  if (type === 'number' || type === 'dimension') {
    if (typeof value !== 'number' && !String(value).startsWith('{')) {
      warnings.push(`${file}: Token "${path}" has non-numeric value "${value}" with type "${type}"`);
    }
  }
}

/**
 * Recursively validate all tokens in an object
 */
function validateObject(obj, path, file) {
  for (const [key, value] of Object.entries(obj)) {
    const currentPath = path ? `${path}.${key}` : key;

    if (isToken(value)) {
      validateToken(value, currentPath, file);
    } else if (value && typeof value === 'object') {
      validateObject(value, currentPath, file);
    }
  }
}

/**
 * Main validation function
 */
function validate() {
  console.log('🔍 Validating token format...\n');

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
    process.exit(1);
  }

  console.log('✅ All tokens are valid!\n');
}

validate();
