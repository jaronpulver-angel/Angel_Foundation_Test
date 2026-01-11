# Transformation Logic

## Overview

This document explains how design tokens are transformed from their source format (Token Studio JSON exported from Figma) into platform-specific outputs. Angel supports 8 platforms, each requiring different output formats.

---

## Transformation Pipeline

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      STYLE DICTIONARY PIPELINE                               │
└─────────────────────────────────────────────────────────────────────────────┘

     SOURCE TOKEN                    TRANSFORMS                    OUTPUT
┌─────────────────┐      ┌───────────────────────────┐      ┌─────────────────┐
│                 │      │                           │      │                 │
│  spacing: {     │      │  1. Parse Token Studio   │      │  WEB (CSS):     │
│    md: {        │ ───▶ │  2. Resolve references    │ ───▶ │  --spacing-md:  │
│      value: 10  │      │  3. Apply transforms      │      │    10px;        │
│      type:      │      │  4. Format for platform   │      │                 │
│        "number" │      │                           │      │                 │
│    }            │      │                           │      │                 │
│  }              │      └───────────────────────────┘      └─────────────────┘
│                 │                    │
│                 │                    │                    ┌─────────────────┐
│                 │                    │                    │                 │
│                 │                    └──────────────────▶ │  REACT NATIVE:  │
│                 │                    │                    │  spacingMd: 10  │
│                 │                    │                    │  (unitless)     │
│                 │                    │                    │                 │
│                 │                    │                    └─────────────────┘
│                 │                    │
│                 │                    │                    ┌─────────────────┐
│                 │                    │                    │                 │
│                 │                    └──────────────────▶ │  ROKU:          │
│                 │                    │                    │  SpacingMd: 10  │
│                 │                    │                    │  (integer)      │
│                 │                    │                    │                 │
└─────────────────┘                    │                    └─────────────────┘
                                       │
                                       │                    ┌─────────────────┐
                                       │                    │                 │
                                       └──────────────────▶ │  ANDROID:       │
                                                            │  <dimen name=   │
                                                            │   "spacing_md"> │
                                                            │    10dp</dimen> │
                                                            │                 │
                                                            └─────────────────┘
```

---

## Source Token Format

Angel uses the **Token Studio** export format from Figma:

```json
{
  "color": {
    "accent": {
      "600": {
        "value": "#16b087",
        "type": "color"
      }
    }
  },
  "spacing": {
    "md": {
      "value": 10,
      "type": "number"
    }
  }
}
```

**Key points:**
- Uses `value` and `type` (NOT W3C `$value` / `$type`)
- References use curly braces: `{color.accent.600}`
- Values are raw numbers (no units in source)
- Style Dictionary adds platform-appropriate units during transformation

---

## Platform Transformation Rules

### Spacing Tokens

| Platform | Input | Output | Unit | Example |
|----------|-------|--------|------|---------|
| **Web CSS** | `10` | `10px` | px | `--spacing-md: 10px;` |
| **Web SCSS** | `10` | `10px` | px | `$spacing-md: 10px;` |
| **React Native** | `10` | `10` | unitless | `spacingMd: 10` |
| **Roku** | `10` | `10` | integer | `SpacingMd: 10` |
| **tvOS** | `10` | `10.0` | CGFloat | `static let md: CGFloat = 10.0` |
| **Android** | `10` | `10dp` | dp | `<dimen name="spacing_md">10dp</dimen>` |
| **Xbox** | `10` | `10` | double | `<sys:Double x:Key="SpacingMd">10</sys:Double>` |

### Color Tokens

| Platform | Input | Output | Format | Example |
|----------|-------|--------|--------|---------|
| **Web CSS** | `#16b087` | `#16b087` | hex | `--color-accent-600: #16b087;` |
| **React Native** | `#16b087` | `'#16b087'` | hex string | `colorAccent600: '#16b087'` |
| **Roku** | `#16b087` | `0x16b087FF` | ARGB hex | `ColorAccent600: "0x16b087FF"` |
| **tvOS** | `#16b087` | `Color(hex:)` | SwiftUI Color | `static let accent600 = Color(hex: 0x16b087)` |
| **Android** | `#16b087` | `#FF16b087` | ARGB hex | `<color name="color_accent_600">#FF16b087</color>` |
| **Xbox** | `#16b087` | `#FF16b087` | ARGB hex | `<Color x:Key="ColorAccent600">#FF16b087</Color>` |

### Typography Tokens

Angel uses 4 viewport-specific typography files. TV uses ~1.25x larger font sizes:

| Platform | Viewport File | Body MD Size | Unit |
|----------|--------------|--------------|------|
| **Mobile/RN** | `typography/mobile.json` | `16` | unitless |
| **Tablet** | `typography/tablet.json` | `16` | unitless |
| **Desktop/Web** | `typography/desktop.json` | `16` | px/rem |
| **TV (all)** | `typography/tv.json` | `20` | integer |

---

## Style Dictionary Configuration

### Base Configuration

```javascript
// style-dictionary.config.mjs
import StyleDictionary from 'style-dictionary';

// Custom parser for Token Studio format
StyleDictionary.registerParser({
  name: 'tokens-studio-parser',
  pattern: /\.json$/,
  parser: ({ contents }) => {
    const tokens = JSON.parse(contents);
    // Convert Token Studio format to Style Dictionary format
    return convertTokensStudioFormat(tokens);
  }
});

// Custom transform: add px units (for web)
StyleDictionary.registerTransform({
  name: 'size/addPx',
  type: 'value',
  transitive: true,
  filter: (token) => token.type === 'number' || token.type === 'dimension',
  transform: (token) => {
    const value = parseFloat(token.value);
    return `${value}px`;
  }
});

// Custom transform: keep as number (for RN, Roku)
StyleDictionary.registerTransform({
  name: 'size/number',
  type: 'value',
  transitive: true,
  filter: (token) => token.type === 'number' || token.type === 'dimension',
  transform: (token) => {
    return parseFloat(token.value);
  }
});

// Custom transform: hex to Roku ARGB
StyleDictionary.registerTransform({
  name: 'color/rokuARGB',
  type: 'value',
  filter: (token) => token.type === 'color',
  transform: (token) => {
    const hex = token.value.replace('#', '');
    return `"0x${hex}FF"`;  // Add FF for alpha
  }
});

// Custom transform: hex to Android ARGB
StyleDictionary.registerTransform({
  name: 'color/androidARGB',
  type: 'value',
  filter: (token) => token.type === 'color',
  transform: (token) => {
    const hex = token.value.replace('#', '');
    return `#FF${hex}`;  // Add FF prefix for alpha
  }
});

export default {
  source: ['tokens/**/*.json'],
  platforms: {
    // Configuration per platform (see below)
  }
};
```

---

## Platform Configurations

### Web (CSS Variables)

```javascript
'web-css': {
  transformGroup: 'css',
  transforms: ['attribute/cti', 'name/kebab', 'size/addPx', 'color/css'],
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
}
```

**Output Example:**
```css
:root {
  /* Base Colors */
  --color-neutral-500: #9d9c9b;
  --color-accent-600: #16b087;
  --color-guild-500: #c85a23;
  --color-danger-500: #f45a3b;

  /* Semantic Colors */
  --surface-default: #ffffff;
  --text-primary: #141414;
  --component-button-emphasis-primary-background: #16b087;
  --component-button-emphasis-primary-background-hover: #139973;

  /* Spacing */
  --spacing-sm: 8px;
  --spacing-md: 10px;
  --spacing-lg: 12px;
  --spacing-4xl: 24px;

  /* Button Sizes */
  --button-size-md-height: 40px;
  --button-size-md-padding-horizontal: 12px;
  --button-size-md-border-radius: 12px;
  --button-size-md-font-size: 14px;

  /* Typography */
  --font-size-body-md: 16px;
  --font-size-heading-h1: 40px;
}
```

---

### React Native (TypeScript)

```javascript
'react-native': {
  transformGroup: 'react-native',
  transforms: ['attribute/cti', 'name/camel', 'size/number', 'color/hex'],
  buildPath: 'packages/react-native/src/',
  files: [
    {
      destination: 'tokens.ts',
      format: 'javascript/es6',
      options: {
        outputReferences: false
      }
    }
  ]
}
```

**Output Example:**
```typescript
// Base Colors
export const colorNeutral500 = '#9d9c9b';
export const colorAccent600 = '#16b087';
export const colorGuild500 = '#c85a23';

// Semantic Colors
export const surfaceDefault = '#ffffff';
export const textPrimary = '#141414';
export const componentButtonEmphasisPrimaryBackground = '#16b087';

// Spacing
export const spacingSm = 8;
export const spacingMd = 10;
export const spacingLg = 12;
export const spacing4xl = 24;

// Button Sizes
export const buttonSizeMdHeight = 40;
export const buttonSizeMdPaddingHorizontal = 12;
export const buttonSizeMdBorderRadius = 12;
export const buttonSizeMdFontSize = 14;

// Nested theme object
export const tokens = {
  color: {
    neutral: { 500: colorNeutral500 },
    accent: { 600: colorAccent600 },
    guild: { 500: colorGuild500 },
  },
  surface: {
    default: surfaceDefault,
  },
  text: {
    primary: textPrimary,
  },
  spacing: {
    sm: spacingSm,
    md: spacingMd,
    lg: spacingLg,
    '4xl': spacing4xl,
  },
  button: {
    size: {
      md: {
        height: buttonSizeMdHeight,
        padding_horizontal: buttonSizeMdPaddingHorizontal,
        border_radius: buttonSizeMdBorderRadius,
        font_size: buttonSizeMdFontSize,
      }
    }
  },
  component: {
    button: {
      emphasis: {
        primary: {
          background: componentButtonEmphasisPrimaryBackground,
        }
      }
    }
  }
};
```

---

### Roku (BrightScript)

```javascript
'roku': {
  transformGroup: 'js',
  transforms: ['attribute/cti', 'name/pascal', 'size/number', 'color/rokuARGB'],
  buildPath: 'packages/roku/',
  files: [
    {
      destination: 'AngelTokens.brs',
      format: 'brightscript/object'  // Custom format
    }
  ]
}
```

**Custom BrightScript Format:**
```javascript
StyleDictionary.registerFormat({
  name: 'brightscript/object',
  format: ({ dictionary }) => {
    let output = `' Auto-generated - DO NOT EDIT
function AngelTokens() as object
    return {
`;
    dictionary.allTokens.forEach(token => {
      const value = typeof token.value === 'string'
        ? `"${token.value}"`
        : token.value;
      output += `        ${token.name}: ${value}\n`;
    });

    output += `    }
end function`;
    return output;
  }
});
```

**Output Example:**
```brightscript
' Auto-generated - DO NOT EDIT
function AngelTokens() as object
    return {
        ColorNeutral500: "0x9d9c9bFF"
        ColorAccent600: "0x16b087FF"
        ColorGuild500: "0xc85a23FF"

        SurfaceDefault: "0xFFFFFFFF"
        TextPrimary: "0x141414FF"

        ComponentButtonEmphasisPrimaryBackground: "0x16b087FF"
        ComponentButtonEmphasisPrimaryBackgroundHover: "0x139973FF"

        SpacingSm: 8
        SpacingMd: 10
        SpacingLg: 12
        Spacing4xl: 24

        ButtonSizeLgHeight: 48
        ButtonSizeLgPaddingHorizontal: 14
        ButtonSizeLgBorderRadius: 14
        ButtonSizeLgFontSize: 16
    }
end function
```

---

### tvOS (Swift)

```javascript
'tvos': {
  transformGroup: 'ios-swift',
  transforms: ['attribute/cti', 'name/camel', 'size/number', 'color/UIColorSwift'],
  buildPath: 'packages/tvos/',
  files: [
    {
      destination: 'AngelTokens.swift',
      format: 'ios-swift/class.swift',
      className: 'AngelTokens',
      options: {
        accessControl: 'public'
      }
    }
  ]
}
```

**Output Example:**
```swift
// Auto-generated - DO NOT EDIT
import SwiftUI

public struct AngelTokens {

    // MARK: - Base Colors
    public struct Color {
        public static let neutral500 = SwiftUI.Color(hex: 0x9d9c9b)
        public static let accent600 = SwiftUI.Color(hex: 0x16b087)
        public static let guild500 = SwiftUI.Color(hex: 0xc85a23)
        public static let danger500 = SwiftUI.Color(hex: 0xf45a3b)
    }

    // MARK: - Semantic Colors
    public struct Surface {
        public static let `default` = SwiftUI.Color.white
    }

    public struct Text {
        public static let primary = SwiftUI.Color(hex: 0x141414)
        public static let secondary = SwiftUI.Color(hex: 0x5f5e5c)
    }

    // MARK: - Component Colors
    public struct Component {
        public struct Button {
            public struct Emphasis {
                public struct Primary {
                    public static let background = Color.accent600
                    public static let backgroundHover = SwiftUI.Color(hex: 0x139973)
                    public static let text = SwiftUI.Color.white
                }
            }
        }
    }

    // MARK: - Spacing
    public struct Spacing {
        public static let sm: CGFloat = 8
        public static let md: CGFloat = 10
        public static let lg: CGFloat = 12
        public static let xl4: CGFloat = 24
        public static let xl9: CGFloat = 44   // TV layout
        public static let xl12: CGFloat = 64  // TV layout
    }

    // MARK: - Button Sizes (lg recommended for TV)
    public struct Button {
        public struct Size {
            public struct Lg {
                public static let height: CGFloat = 48
                public static let paddingHorizontal: CGFloat = 14
                public static let paddingVertical: CGFloat = 16
                public static let borderRadius: CGFloat = 14
                public static let fontSize: CGFloat = 16
            }
        }
    }

    // MARK: - Typography (TV sizes)
    public struct Font {
        public struct Size {
            public static let bodyMd: CGFloat = 20
            public static let bodyLg: CGFloat = 24
            public static let headingH1: CGFloat = 48
            public static let headingH2: CGFloat = 40
        }
    }
}

// MARK: - Color Extension
extension SwiftUI.Color {
    init(hex: UInt, alpha: Double = 1) {
        self.init(
            .sRGB,
            red: Double((hex >> 16) & 0xff) / 255,
            green: Double((hex >> 08) & 0xff) / 255,
            blue: Double((hex >> 00) & 0xff) / 255,
            opacity: alpha
        )
    }
}
```

---

### Android TV (XML Resources)

```javascript
'android-tv': {
  transformGroup: 'android',
  transforms: ['attribute/cti', 'name/snake', 'size/pxToDp', 'color/androidARGB'],
  buildPath: 'packages/android/',
  files: [
    {
      destination: 'colors.xml',
      format: 'android/colors',
      filter: (token) => token.type === 'color'
    },
    {
      destination: 'dimens.xml',
      format: 'android/dimens',
      filter: (token) => token.type === 'number' || token.type === 'dimension'
    }
  ]
}
```

**Output Example (colors.xml):**
```xml
<?xml version="1.0" encoding="utf-8"?>
<!-- Auto-generated - DO NOT EDIT -->
<resources>
    <!-- Base Colors -->
    <color name="color_neutral_500">#FF9d9c9b</color>
    <color name="color_accent_600">#FF16b087</color>
    <color name="color_guild_500">#FFc85a23</color>
    <color name="color_danger_500">#FFf45a3b</color>

    <!-- Semantic Colors -->
    <color name="surface_default">#FFFFFFFF</color>
    <color name="text_primary">#FF141414</color>

    <!-- Component Colors -->
    <color name="component_button_emphasis_primary_background">#FF16b087</color>
    <color name="component_button_emphasis_primary_background_hover">#FF139973</color>
    <color name="component_button_emphasis_primary_text">#FFFFFFFF</color>
</resources>
```

**Output Example (dimens.xml):**
```xml
<?xml version="1.0" encoding="utf-8"?>
<!-- Auto-generated - DO NOT EDIT -->
<resources>
    <!-- Spacing -->
    <dimen name="spacing_sm">8dp</dimen>
    <dimen name="spacing_md">10dp</dimen>
    <dimen name="spacing_lg">12dp</dimen>
    <dimen name="spacing_4xl">24dp</dimen>

    <!-- Button Sizes (lg for TV) -->
    <dimen name="button_size_lg_height">48dp</dimen>
    <dimen name="button_size_lg_padding_horizontal">14dp</dimen>
    <dimen name="button_size_lg_border_radius">14dp</dimen>
    <dimen name="button_size_lg_font_size">16sp</dimen>

    <!-- Typography (TV sizes) -->
    <dimen name="font_size_body_md">20sp</dimen>
    <dimen name="font_size_heading_h1">48sp</dimen>
</resources>
```

---

### Xbox (XAML ResourceDictionary)

```javascript
'xbox': {
  transformGroup: 'js',
  transforms: ['attribute/cti', 'name/pascal', 'size/number', 'color/androidARGB'],
  buildPath: 'packages/xbox/',
  files: [
    {
      destination: 'Tokens.xaml',
      format: 'xaml/resourceDictionary'  // Custom format
    }
  ]
}
```

**Output Example:**
```xml
<!-- Auto-generated - DO NOT EDIT -->
<ResourceDictionary
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:sys="clr-namespace:System;assembly=mscorlib">

    <!-- Base Colors -->
    <Color x:Key="ColorNeutral500">#FF9d9c9b</Color>
    <Color x:Key="ColorAccent600">#FF16b087</Color>
    <Color x:Key="ColorGuild500">#FFc85a23</Color>

    <!-- Semantic Colors -->
    <Color x:Key="SurfaceDefault">#FFFFFFFF</Color>
    <Color x:Key="TextPrimary">#FF141414</Color>

    <!-- Component Colors -->
    <Color x:Key="ComponentButtonEmphasisPrimaryBackground">#FF16b087</Color>
    <Color x:Key="ComponentButtonEmphasisPrimaryText">#FFFFFFFF</Color>

    <!-- Spacing -->
    <sys:Double x:Key="SpacingSm">8</sys:Double>
    <sys:Double x:Key="SpacingMd">10</sys:Double>
    <sys:Double x:Key="SpacingLg">12</sys:Double>
    <sys:Double x:Key="Spacing4xl">24</sys:Double>

    <!-- Button Sizes -->
    <sys:Double x:Key="ButtonSizeLgHeight">48</sys:Double>
    <sys:Double x:Key="ButtonSizeLgPaddingHorizontal">14</sys:Double>
    <sys:Double x:Key="ButtonSizeLgBorderRadius">14</sys:Double>

</ResourceDictionary>
```

---

### Web TV (Vizio, Xumo)

```javascript
'web-tv': {
  transformGroup: 'css',
  transforms: ['attribute/cti', 'name/camel', 'size/number', 'color/css'],
  buildPath: 'packages/web-tv/',
  files: [
    {
      destination: 'tokens.css',
      format: 'css/variables'
    },
    {
      destination: 'tokens.js',
      format: 'javascript/es6'
    }
  ]
}
```

**Output Example (tokens.js):**
```javascript
// Auto-generated - DO NOT EDIT

// Base Colors
export const colorAccent600 = '#16b087';
export const colorGuild500 = '#c85a23';

// Semantic Colors
export const surfaceDefault = '#ffffff';
export const textPrimary = '#141414';
export const componentButtonEmphasisPrimaryBackground = '#16b087';

// Spacing
export const spacingSm = 8;
export const spacingMd = 10;
export const spacing4xl = 24;
export const spacing9xl = 44;  // TV layout
export const spacing12xl = 64; // TV layout

// Button Sizes (lg for TV)
export const buttonSizeLgHeight = 48;
export const buttonSizeLgPaddingHorizontal = 14;
export const buttonSizeLgFontSize = 16;

// Typography (TV sizes from typography/tv.json)
export const fontSizeBodyMd = 20;
export const fontSizeBodyLg = 24;
export const fontSizeHeadingH1 = 48;
```

---

## Reference Resolution

Tokens can reference other tokens. Style Dictionary resolves these automatically:

```json
// Input (color_theme/light.json)
{
  "surface": {
    "default": {
      "value": "{color.white.50}",
      "type": "color"
    }
  },
  "component": {
    "button": {
      "emphasis": {
        "primary": {
          "background": {
            "value": "{color.accent.600}",
            "type": "color"
          }
        }
      }
    }
  }
}
```

```css
/* Output (CSS with outputReferences: true) */
:root {
  --color-accent-600: #16b087;
  --component-button-emphasis-primary-background: var(--color-accent-600);
}
```

```typescript
// Output (TypeScript with outputReferences: false)
export const colorAccent600 = '#16b087';
export const componentButtonEmphasisPrimaryBackground = '#16b087';  // Resolved
```

---

## Typography Viewport Selection

The build process selects the appropriate typography file based on platform:

```javascript
// Build configuration selects typography source
const getTypographySource = (platform) => {
  switch (platform) {
    case 'react-native':
      return 'tokens/typography/mobile.json';  // or detect device
    case 'web':
      return 'tokens/typography/desktop.json';
    case 'roku':
    case 'tvos':
    case 'android-tv':
    case 'xbox':
    case 'web-tv':
      return 'tokens/typography/tv.json';
    default:
      return 'tokens/typography/desktop.json';
  }
};
```

**Typography Scale (Desktop vs TV):**

| Token | Desktop | TV | Scale |
|-------|---------|-----|-------|
| body.xxs | 10 | 14 | 1.4x |
| body.xs | 12 | 16 | 1.33x |
| body.sm | 14 | 18 | 1.29x |
| body.md | 16 | 20 | 1.25x |
| body.lg | 18 | 24 | 1.33x |
| heading.h1 | 40 | 48 | 1.2x |
| display.lg | 64 | 76 | 1.19x |

---

## Validation

Before transformation, tokens are validated:

1. **Format Validation** - JSON structure matches Token Studio format
2. **Reference Validation** - All `{token.references}` resolve
3. **Type Validation** - Values match declared `type`
4. **Naming Validation** - Names follow conventions (underscores for states)

```javascript
// Validation script
function validateTokens(tokens) {
  const errors = [];

  // Check for valid structure
  Object.entries(tokens).forEach(([key, value]) => {
    if (value.value !== undefined && value.type === undefined) {
      errors.push(`Token "${key}" missing type`);
    }
    if (value.type === 'color' && !isValidHex(value.value)) {
      errors.push(`Token "${key}" has invalid color value`);
    }
  });

  // Check references resolve
  const allRefs = findReferences(tokens);
  allRefs.forEach(ref => {
    if (!resolveReference(ref, tokens)) {
      errors.push(`Unresolved reference: ${ref}`);
    }
  });

  return errors;
}
```

---

## Related Documents

- [Token Structure and Naming](./token_structure_and_naming.md)
- [CI/CD Workflow](./ci_cd_workflow.md)
- [Consumption Guide](./consumption_guide.md)
