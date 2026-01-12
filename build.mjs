/**
 * Angel Design Token Build System
 *
 * Transforms Tokens Studio exports from Figma into platform-specific outputs
 * for 8 platforms: React Native, React Web, Roku, tvOS, Android TV, Xbox, Vizio, XumoTV
 */

import StyleDictionary from 'style-dictionary';
import { register } from '@tokens-studio/sd-transforms';

// Register Tokens Studio transforms (handles value/type format, references, etc.)
register(StyleDictionary);

// ============================================================================
// CUSTOM TRANSFORMS
// ============================================================================

/**
 * Transform: Convert hex color to Roku ARGB format
 * Input: #16b087 or #16b087FF
 * Output: "0x16b087FF"
 */
StyleDictionary.registerTransform({
  name: 'color/rokuHex',
  type: 'value',
  transitive: true,
  filter: (token) => token.type === 'color' || token.$type === 'color',
  transform: (token) => {
    let hex = String(token.value || token.$value).replace('#', '');
    // Ensure 8 characters (add FF alpha if 6 char hex)
    if (hex.length === 6) {
      hex = hex + 'FF';
    }
    return `"0x${hex.toUpperCase()}"`;
  }
});

/**
 * Transform: Convert hex color to Android/Xbox ARGB format
 * Input: #16b087
 * Output: #FF16b087
 */
StyleDictionary.registerTransform({
  name: 'color/argb',
  type: 'value',
  transitive: true,
  filter: (token) => token.type === 'color' || token.$type === 'color',
  transform: (token) => {
    let hex = String(token.value || token.$value).replace('#', '');
    // If already 8 chars (has alpha), move alpha to front
    if (hex.length === 8) {
      const alpha = hex.slice(6, 8);
      hex = alpha + hex.slice(0, 6);
    } else {
      // Add FF alpha prefix
      hex = 'FF' + hex;
    }
    return `#${hex.toUpperCase()}`;
  }
});

/**
 * Transform: Add px suffix for web
 * Input: 10
 * Output: 10px
 */
StyleDictionary.registerTransform({
  name: 'size/px',
  type: 'value',
  transitive: true,
  filter: (token) => {
    const type = token.type || token.$type;
    return type === 'number' || type === 'dimension';
  },
  transform: (token) => {
    const value = token.value ?? token.$value;
    if (typeof value === 'number') {
      return `${value}px`;
    }
    return value;
  }
});

/**
 * Transform: Add dp suffix for Android
 * Input: 10
 * Output: 10dp
 */
StyleDictionary.registerTransform({
  name: 'size/dp',
  type: 'value',
  transitive: true,
  filter: (token) => {
    const type = token.type || token.$type;
    return type === 'number' || type === 'dimension';
  },
  transform: (token) => {
    const value = token.value ?? token.$value;
    if (typeof value === 'number') {
      return `${value}dp`;
    }
    return value;
  }
});

/**
 * Transform: Add sp suffix for Android typography
 * Input: 16
 * Output: 16sp
 */
StyleDictionary.registerTransform({
  name: 'size/sp',
  type: 'value',
  transitive: true,
  filter: (token) => {
    const path = token.path?.join('.') || '';
    return path.includes('font') && (path.includes('size') || path.includes('line_height'));
  },
  transform: (token) => {
    const value = token.value ?? token.$value;
    if (typeof value === 'number') {
      return `${value}sp`;
    }
    return value;
  }
});

/**
 * Transform: Keep as raw number (for RN, Roku, etc.)
 */
StyleDictionary.registerTransform({
  name: 'size/number',
  type: 'value',
  transitive: true,
  filter: (token) => {
    const type = token.type || token.$type;
    return type === 'number' || type === 'dimension';
  },
  transform: (token) => {
    const value = token.value ?? token.$value;
    return typeof value === 'string' ? parseFloat(value) : value;
  }
});

// ============================================================================
// CUSTOM FORMATS
// ============================================================================

/**
 * Format: BrightScript object for Roku
 */
StyleDictionary.registerFormat({
  name: 'brightscript/tokens',
  format: ({ dictionary, file }) => {
    const header = `' Angel Design Tokens - BrightScript
' Auto-generated - DO NOT EDIT
' Generated: ${new Date().toISOString()}

function AngelTokens() as object
    return {`;

    const tokens = dictionary.allTokens.map(token => {
      const name = token.name;
      const value = token.value;
      // Strings need quotes, numbers don't
      const formattedValue = typeof value === 'string' && !value.startsWith('"')
        ? `"${value}"`
        : value;
      return `        ${name}: ${formattedValue}`;
    }).join('\n');

    const footer = `    }
end function`;

    return `${header}\n${tokens}\n${footer}`;
  }
});

/**
 * Format: Swift struct for tvOS
 */
StyleDictionary.registerFormat({
  name: 'swift/tokens',
  format: ({ dictionary, file, options }) => {
    const header = `// Angel Design Tokens - Swift
// Auto-generated - DO NOT EDIT
// Generated: ${new Date().toISOString()}

import SwiftUI

public enum AngelTokens {`;

    // Group tokens by category
    const grouped = {};
    dictionary.allTokens.forEach(token => {
      const category = token.path[0] || 'misc';
      if (!grouped[category]) {
        grouped[category] = [];
      }
      grouped[category].push(token);
    });

    let body = '';
    for (const [category, tokens] of Object.entries(grouped)) {
      const enumName = category.charAt(0).toUpperCase() + category.slice(1);
      body += `\n    public enum ${enumName} {\n`;

      tokens.forEach(token => {
        const name = token.path.slice(1).join('_').replace(/[^a-zA-Z0-9_]/g, '_');
        const value = token.value;
        const type = token.type || token.$type;

        if (type === 'color') {
          // Convert hex to SwiftUI Color
          const hex = String(value).replace('#', '').replace(/"/g, '');
          body += `        public static let ${name} = Color(hex: 0x${hex.slice(0, 6)})\n`;
        } else if (typeof value === 'number') {
          body += `        public static let ${name}: CGFloat = ${value}\n`;
        } else {
          body += `        public static let ${name} = "${value}"\n`;
        }
      });

      body += `    }\n`;
    }

    const colorExtension = `
}

// MARK: - Color Extension
extension Color {
    init(hex: UInt, alpha: Double = 1) {
        self.init(
            .sRGB,
            red: Double((hex >> 16) & 0xff) / 255,
            green: Double((hex >> 08) & 0xff) / 255,
            blue: Double((hex >> 00) & 0xff) / 255,
            opacity: alpha
        )
    }
}`;

    return `${header}${body}${colorExtension}`;
  }
});

/**
 * Format: XAML ResourceDictionary for Xbox
 */
StyleDictionary.registerFormat({
  name: 'xaml/resourceDictionary',
  format: ({ dictionary, file }) => {
    const header = `<!-- Angel Design Tokens - XAML -->
<!-- Auto-generated - DO NOT EDIT -->
<!-- Generated: ${new Date().toISOString()} -->
<ResourceDictionary
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:sys="clr-namespace:System;assembly=mscorlib">
`;

    const tokens = dictionary.allTokens.map(token => {
      const name = token.name;
      const value = token.value;
      const type = token.type || token.$type;

      if (type === 'color') {
        return `    <Color x:Key="${name}">${value}</Color>`;
      } else if (typeof value === 'number') {
        return `    <sys:Double x:Key="${name}">${value}</sys:Double>`;
      } else {
        return `    <sys:String x:Key="${name}">${value}</sys:String>`;
      }
    }).join('\n');

    const footer = `
</ResourceDictionary>`;

    return `${header}${tokens}${footer}`;
  }
});

/**
 * Format: TypeScript with nested object export
 */
StyleDictionary.registerFormat({
  name: 'typescript/nested',
  format: ({ dictionary, file }) => {
    const header = `/**
 * Angel Design Tokens - TypeScript
 * Auto-generated - DO NOT EDIT
 * Generated: ${new Date().toISOString()}
 */

`;

    // Generate flat exports
    const flatExports = dictionary.allTokens.map(token => {
      const value = token.value;
      const formattedValue = typeof value === 'string' ? `'${value}'` : value;
      return `export const ${token.name} = ${formattedValue};`;
    }).join('\n');

    // Build nested object
    const buildNestedObject = (tokens) => {
      const result = {};
      tokens.forEach(token => {
        let current = result;
        token.path.forEach((key, index) => {
          if (index === token.path.length - 1) {
            current[key] = token.name; // Reference the flat export
          } else {
            current[key] = current[key] || {};
            current = current[key];
          }
        });
      });
      return result;
    };

    const nestedObj = buildNestedObject(dictionary.allTokens);

    const formatNestedExport = (obj, indent = '') => {
      const entries = Object.entries(obj);
      if (entries.length === 0) return '{}';

      const items = entries.map(([key, value]) => {
        const safeKey = /^[0-9]/.test(key) || key.includes('-') ? `'${key}'` : key;
        if (typeof value === 'string') {
          return `${indent}  ${safeKey}: ${value}`;
        } else {
          return `${indent}  ${safeKey}: ${formatNestedExport(value, indent + '  ')}`;
        }
      });

      return `{\n${items.join(',\n')}\n${indent}}`;
    };

    const nestedExport = `\nexport const tokens = ${formatNestedExport(nestedObj)} as const;\n`;

    return `${header}${flatExports}\n${nestedExport}`;
  }
});

// ============================================================================
// PLATFORM CONFIGURATIONS
// ============================================================================

const config = {
  // Tokens Studio format parsing
  preprocessors: ['tokens-studio'],

  source: [
    'tokens/color_base/tokens.json',
    'tokens/color_theme/light.json',
    'tokens/dimensions/variables.json',
    'tokens/component/variables.json',
    'tokens/typography/desktop.json'
  ],

  platforms: {
    // -------------------------------------------------------------------------
    // React Native (TypeScript)
    // -------------------------------------------------------------------------
    'react-native': {
      transformGroup: 'tokens-studio',
      transforms: ['name/camel', 'size/number'],
      buildPath: 'packages/react-native/src/',
      files: [
        {
          destination: 'tokens.ts',
          format: 'typescript/nested'
        }
      ]
    },

    // -------------------------------------------------------------------------
    // React Web (CSS Variables)
    // -------------------------------------------------------------------------
    'web-css': {
      transformGroup: 'tokens-studio',
      transforms: ['name/kebab', 'size/px'],
      buildPath: 'packages/web/',
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables',
          options: {
            outputReferences: true
          }
        }
      ]
    },

    // -------------------------------------------------------------------------
    // React Web (SCSS Variables)
    // -------------------------------------------------------------------------
    'web-scss': {
      transformGroup: 'tokens-studio',
      transforms: ['name/kebab', 'size/px'],
      buildPath: 'packages/web/',
      files: [
        {
          destination: 'tokens.scss',
          format: 'scss/variables'
        }
      ]
    },

    // -------------------------------------------------------------------------
    // Roku (BrightScript)
    // -------------------------------------------------------------------------
    'roku': {
      transformGroup: 'tokens-studio',
      transforms: ['name/pascal', 'size/number', 'color/rokuHex'],
      buildPath: 'packages/roku/',
      files: [
        {
          destination: 'AngelTokens.brs',
          format: 'brightscript/tokens'
        }
      ]
    },

    // -------------------------------------------------------------------------
    // tvOS (Swift)
    // -------------------------------------------------------------------------
    'tvos': {
      transformGroup: 'tokens-studio',
      transforms: ['name/camel', 'size/number'],
      buildPath: 'packages/tvos/',
      files: [
        {
          destination: 'AngelTokens.swift',
          format: 'swift/tokens'
        }
      ]
    },

    // -------------------------------------------------------------------------
    // Android TV (XML Colors)
    // -------------------------------------------------------------------------
    'android-colors': {
      transformGroup: 'tokens-studio',
      transforms: ['name/snake', 'color/argb'],
      buildPath: 'packages/android/',
      files: [
        {
          destination: 'colors.xml',
          format: 'android/colors',
          filter: (token) => {
            const type = token.type || token.$type;
            return type === 'color';
          }
        }
      ]
    },

    // -------------------------------------------------------------------------
    // Android TV (XML Dimensions)
    // -------------------------------------------------------------------------
    'android-dimens': {
      transformGroup: 'tokens-studio',
      transforms: ['name/snake', 'size/dp', 'size/sp'],
      buildPath: 'packages/android/',
      files: [
        {
          destination: 'dimens.xml',
          format: 'android/resources',
          resourceType: 'dimen',
          filter: (token) => {
            const type = token.type || token.$type;
            return type === 'number' || type === 'dimension';
          }
        }
      ]
    },

    // -------------------------------------------------------------------------
    // Xbox (XAML ResourceDictionary)
    // -------------------------------------------------------------------------
    'xbox': {
      transformGroup: 'tokens-studio',
      transforms: ['name/pascal', 'size/number', 'color/argb'],
      buildPath: 'packages/xbox/',
      files: [
        {
          destination: 'Tokens.xaml',
          format: 'xaml/resourceDictionary'
        }
      ]
    },

    // -------------------------------------------------------------------------
    // Web TV (Vizio, XumoTV) - CSS
    // -------------------------------------------------------------------------
    'web-tv-css': {
      transformGroup: 'tokens-studio',
      transforms: ['name/kebab', 'size/px'],
      buildPath: 'packages/web-tv/',
      // Override source to use TV typography
      source: [
        'tokens/color_base/tokens.json',
        'tokens/color_theme/light.json',
        'tokens/dimensions/variables.json',
        'tokens/component/variables.json',
        'tokens/typography/tv.json'
      ],
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables',
          options: {
            outputReferences: true
          }
        }
      ]
    },

    // -------------------------------------------------------------------------
    // Web TV (Vizio, XumoTV) - JavaScript
    // -------------------------------------------------------------------------
    'web-tv-js': {
      transformGroup: 'tokens-studio',
      transforms: ['name/camel', 'size/number'],
      buildPath: 'packages/web-tv/',
      source: [
        'tokens/color_base/tokens.json',
        'tokens/color_theme/light.json',
        'tokens/dimensions/variables.json',
        'tokens/component/variables.json',
        'tokens/typography/tv.json'
      ],
      files: [
        {
          destination: 'tokens.js',
          format: 'javascript/es6'
        }
      ]
    }
  }
};

// ============================================================================
// BUILD
// ============================================================================

async function build() {
  console.log('🎨 Angel Design Tokens - Building for all platforms...\n');

  try {
    const sd = new StyleDictionary(config);

    await sd.buildAllPlatforms();

    console.log('\n✅ Build complete! Generated outputs:');
    console.log('   • packages/react-native/src/tokens.ts');
    console.log('   • packages/web/tokens.css');
    console.log('   • packages/web/tokens.scss');
    console.log('   • packages/roku/AngelTokens.brs');
    console.log('   • packages/tvos/AngelTokens.swift');
    console.log('   • packages/android/colors.xml');
    console.log('   • packages/android/dimens.xml');
    console.log('   • packages/xbox/Tokens.xaml');
    console.log('   • packages/web-tv/tokens.css');
    console.log('   • packages/web-tv/tokens.js');

  } catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
  }
}

// Run build
build();
