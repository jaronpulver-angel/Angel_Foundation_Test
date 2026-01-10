# Transformation Logic

## Overview

This document explains how design tokens are transformed from their source format (W3C DTCG JSON) into platform-specific outputs. Since Angel Studios supports Web, React Native, and multiple TV platforms, tokens must be transformed differently for each.

---

## Transformation Pipeline

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      STYLE DICTIONARY PIPELINE                               │
└─────────────────────────────────────────────────────────────────────────────┘

     SOURCE TOKEN                    TRANSFORMS                    OUTPUT
┌─────────────────┐      ┌───────────────────────────┐      ┌─────────────────┐
│                 │      │                           │      │                 │
│  spacing: {     │      │  1. Parse W3C format      │      │  WEB (CSS):     │
│    md: {        │ ───▶ │  2. Resolve references    │ ───▶ │  --spacing-md:  │
│      $value:    │      │  3. Apply transforms      │      │    1rem;        │
│        "16px"   │      │  4. Format for platform   │      │                 │
│    }            │      │                           │      │                 │
│  }              │      │                           │      │                 │
│                 │      └───────────────────────────┘      └─────────────────┘
│                 │                    │
│                 │                    │                    ┌─────────────────┐
│                 │                    │                    │                 │
│                 │                    └──────────────────▶ │  REACT NATIVE:  │
│                 │                    │                    │  spacingMd: 16  │
│                 │                    │                    │  (unitless)     │
│                 │                    │                    │                 │
│                 │                    │                    └─────────────────┘
│                 │                    │
│                 │                    │                    ┌─────────────────┐
│                 │                    │                    │                 │
│                 │                    └──────────────────▶ │  ROKU:          │
│                 │                    │                    │  spacingMd: 16  │
│                 │                    │                    │  (integer)      │
│                 │                    │                    │                 │
└─────────────────┘                    │                    └─────────────────┘
                                       │
                                       │                    ┌─────────────────┐
                                       │                    │                 │
                                       └──────────────────▶ │  ANDROID:       │
                                                            │  <dimen name=   │
                                                            │   "spacing_md"> │
                                                            │    16dp</dimen> │
                                                            │                 │
                                                            └─────────────────┘
```

---

## Platform Transformation Rules

### Spacing Tokens

| Platform | Input | Output | Unit | Example |
|----------|-------|--------|------|---------|
| **Web CSS** | `16px` | `1rem` | rem | `--spacing-md: 1rem;` |
| **Web SCSS** | `16px` | `1rem` | rem | `$spacing-md: 1rem;` |
| **React Native** | `16px` | `16` | unitless | `spacingMd: 16` |
| **Roku** | `16px` | `16` | integer | `spacingMd: 16` |
| **tvOS** | `16px` | `16.0` | CGFloat | `static let spacingMd: CGFloat = 16.0` |
| **Android** | `16px` | `16dp` | dp | `<dimen name="spacing_md">16dp</dimen>` |
| **Xbox** | `16px` | `16` | double | `<sys:Double x:Key="SpacingMd">16</sys:Double>` |

### Color Tokens

| Platform | Input | Output | Format | Example |
|----------|-------|--------|--------|---------|
| **Web CSS** | `#3B82F6` | `#3B82F6` | hex | `--color-blue-500: #3B82F6;` |
| **React Native** | `#3B82F6` | `'#3B82F6'` | hex string | `colorBlue500: '#3B82F6'` |
| **Roku** | `#3B82F6` | `0x3B82F6FF` | ARGB hex | `colorBlue500: "0x3B82F6FF"` |
| **tvOS** | `#3B82F6` | `Color(hex:)` | UIColor | `static let blue500 = Color(hex: 0x3B82F6)` |
| **Android** | `#3B82F6` | `#FF3B82F6` | ARGB hex | `<color name="blue_500">#FF3B82F6</color>` |
| **Xbox** | `#3B82F6` | `#FF3B82F6` | ARGB hex | `<Color x:Key="Blue500">#FF3B82F6</Color>` |

### Typography Tokens

| Platform | Input | Output | Unit | Example |
|----------|-------|--------|------|---------|
| **Web CSS** | `16px` | `1rem` | rem | `--font-size-base: 1rem;` |
| **React Native** | `16px` | `16` | number | `fontSizeBase: 16` |
| **Roku** | `16px` | `32` | scaled | `fontSizeBase: 32` (2x for TV) |
| **tvOS** | `16px` | `32.0` | CGFloat | `fontSizeBase: CGFloat = 32.0` (scaled) |
| **Android** | `16px` | `16sp` | sp | `<dimen name="font_size_base">16sp</dimen>` |
| **Xbox** | `16px` | `32` | double | `<sys:Double>32</sys:Double>` (scaled) |

---

## Style Dictionary Configuration

### Base Configuration

```javascript
// style-dictionary.config.mjs
import StyleDictionary from 'style-dictionary';

// Custom transform: px to rem (base 16px)
StyleDictionary.registerTransform({
  name: 'size/pxToRem',
  type: 'value',
  transitive: true,
  filter: (token) => token.$type === 'dimension',
  transform: (token) => {
    const value = parseFloat(token.$value);
    return `${value / 16}rem`;
  }
});

// Custom transform: px to unitless number
StyleDictionary.registerTransform({
  name: 'size/pxToNumber',
  type: 'value',
  transitive: true,
  filter: (token) => token.$type === 'dimension',
  transform: (token) => {
    return parseFloat(token.$value);
  }
});

// Custom transform: hex to Roku ARGB
StyleDictionary.registerTransform({
  name: 'color/rokuARGB',
  type: 'value',
  filter: (token) => token.$type === 'color',
  transform: (token) => {
    const hex = token.$value.replace('#', '');
    return `"0x${hex}FF"`;  // Add FF for alpha
  }
});

// Custom transform: hex to Android ARGB
StyleDictionary.registerTransform({
  name: 'color/androidARGB',
  type: 'value',
  filter: (token) => token.$type === 'color',
  transform: (token) => {
    const hex = token.$value.replace('#', '');
    return `#FF${hex}`;  // Add FF prefix for alpha
  }
});

// Scale transform for TV (2x base sizes)
StyleDictionary.registerTransform({
  name: 'size/tvScale',
  type: 'value',
  transitive: true,
  filter: (token) => token.$type === 'dimension',
  transform: (token) => {
    const value = parseFloat(token.$value);
    return value * 2;  // 2x scale for 10-foot UI
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
  transforms: ['attribute/cti', 'name/kebab', 'size/pxToRem', 'color/css'],
  buildPath: 'packages/web/dist/',
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
  /* Primitives */
  --color-blue-500: #3B82F6;
  --color-gray-900: #111827;
  --spacing-4: 1rem;

  /* Semantic */
  --color-action-primary-background: var(--color-blue-500);
  --color-text-primary: var(--color-gray-900);
  --spacing-padding-md: var(--spacing-4);

  /* Typography */
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --line-height-normal: 1.5;
}
```

---

### React Native (TypeScript)

```javascript
'react-native': {
  transformGroup: 'react-native',
  transforms: ['attribute/cti', 'name/camel', 'size/pxToNumber', 'color/hex'],
  buildPath: 'packages/react-native/dist/',
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
export const colorBlue500 = '#3B82F6';
export const colorGray900 = '#111827';
export const spacing4 = 16;

export const colorActionPrimaryBackground = '#3B82F6';
export const colorTextPrimary = '#111827';
export const spacingPaddingMd = 16;

export const fontSizeBase = 16;
export const fontSizeLg = 18;
export const lineHeightNormal = 1.5;

// Theme object for convenience
export const theme = {
  colors: {
    blue500: colorBlue500,
    gray900: colorGray900,
    action: {
      primary: {
        background: colorActionPrimaryBackground,
      },
    },
    text: {
      primary: colorTextPrimary,
    },
  },
  spacing: {
    4: spacing4,
    padding: {
      md: spacingPaddingMd,
    },
  },
  typography: {
    fontSize: {
      base: fontSizeBase,
      lg: fontSizeLg,
    },
    lineHeight: {
      normal: lineHeightNormal,
    },
  },
};
```

---

### Roku (BrightScript)

```javascript
'roku': {
  transformGroup: 'js',
  transforms: ['attribute/cti', 'name/camel', 'size/pxToNumber', 'color/rokuARGB'],
  buildPath: 'packages/roku/dist/',
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
    const tokens = dictionary.allTokens.reduce((acc, token) => {
      acc[token.name] = token.value;
      return acc;
    }, {});

    return `' Auto-generated - DO NOT EDIT
function AngelTokens() as object
    return ${JSON.stringify(tokens, null, 4)
      .replace(/"/g, '"')
      .replace(/: "/g, ': "')
      .replace(/",/g, '",')}
end function`;
  }
});
```

**Output Example:**
```brightscript
' Auto-generated - DO NOT EDIT
function AngelTokens() as object
    return {
        colorBlue500: "0x3B82F6FF"
        colorGray900: "0x111827FF"
        spacing4: 16

        ' TV-specific
        layoutRowHeightSm: 180
        layoutRowHeightMd: 240
        layoutRowHeightLg: 320
        componentCardPosterWidth: 150
        componentCardPosterHeight: 225
        focusRingWidth: 4
        focusRingColor: "0x3B82F6FF"
        focusScale: 1.05
        safeAreaHorizontal: 48
        safeAreaVertical: 27
    }
end function
```

---

### tvOS (Swift)

```javascript
'tvos': {
  transformGroup: 'ios-swift',
  transforms: ['attribute/cti', 'name/camel', 'size/tvScale', 'color/UIColorSwift'],
  buildPath: 'packages/tvos/Sources/AngelTokens/',
  files: [
    {
      destination: 'Tokens.swift',
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

    // MARK: - Colors
    public struct Colors {
        public static let blue500 = Color(hex: 0x3B82F6)
        public static let gray900 = Color(hex: 0x111827)

        public struct Action {
            public static let primaryBackground = Colors.blue500
        }

        public struct Text {
            public static let primary = Colors.gray900
        }
    }

    // MARK: - Spacing (scaled for TV)
    public struct Spacing {
        public static let base: CGFloat = 32  // 16px * 2
        public static let md: CGFloat = 32
        public static let lg: CGFloat = 48
    }

    // MARK: - TV Layout
    public struct Layout {
        public static let rowHeightSm: CGFloat = 180
        public static let rowHeightMd: CGFloat = 240
        public static let rowHeightLg: CGFloat = 320
        public static let rowHeightHero: CGFloat = 480
    }

    // MARK: - Focus
    public struct Focus {
        public static let ringWidth: CGFloat = 4
        public static let ringColor = Colors.blue500
        public static let scale: CGFloat = 1.05
    }

    // MARK: - Safe Area
    public struct SafeArea {
        public static let horizontal: CGFloat = 48
        public static let vertical: CGFloat = 27
    }
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
}
```

---

### Android TV (XML Resources)

```javascript
'android-tv': {
  transformGroup: 'android',
  transforms: ['attribute/cti', 'name/snake', 'size/pxToDp', 'color/androidARGB'],
  buildPath: 'packages/android-tv/src/main/res/values/',
  files: [
    {
      destination: 'colors.xml',
      format: 'android/colors',
      filter: (token) => token.$type === 'color'
    },
    {
      destination: 'dimens.xml',
      format: 'android/dimens',
      filter: (token) => token.$type === 'dimension' || token.$type === 'number'
    }
  ]
}
```

**Output Example (colors.xml):**
```xml
<?xml version="1.0" encoding="utf-8"?>
<!-- Auto-generated - DO NOT EDIT -->
<resources>
    <!-- Primitives -->
    <color name="color_blue_500">#FF3B82F6</color>
    <color name="color_gray_900">#FF111827</color>

    <!-- Semantic -->
    <color name="color_action_primary_background">@color/color_blue_500</color>
    <color name="color_text_primary">@color/color_gray_900</color>

    <!-- Focus -->
    <color name="focus_ring_color">#FF3B82F6</color>
</resources>
```

**Output Example (dimens.xml):**
```xml
<?xml version="1.0" encoding="utf-8"?>
<!-- Auto-generated - DO NOT EDIT -->
<resources>
    <!-- Spacing -->
    <dimen name="spacing_4">16dp</dimen>
    <dimen name="spacing_padding_md">16dp</dimen>

    <!-- Typography -->
    <dimen name="font_size_base">16sp</dimen>
    <dimen name="font_size_lg">18sp</dimen>

    <!-- TV Layout -->
    <dimen name="layout_row_height_sm">180dp</dimen>
    <dimen name="layout_row_height_md">240dp</dimen>
    <dimen name="layout_row_height_lg">320dp</dimen>

    <!-- Focus -->
    <dimen name="focus_ring_width">4dp</dimen>

    <!-- Safe Area -->
    <dimen name="safe_area_horizontal">48dp</dimen>
    <dimen name="safe_area_vertical">27dp</dimen>
</resources>
```

---

### Xbox (XAML ResourceDictionary)

```javascript
'xbox': {
  transformGroup: 'js',
  transforms: ['attribute/cti', 'name/pascal', 'size/pxToNumber', 'color/androidARGB'],
  buildPath: 'packages/xbox/Resources/',
  files: [
    {
      destination: 'AngelTokens.xaml',
      format: 'xaml/resourceDictionary'  // Custom format
    }
  ]
}
```

**Custom XAML Format:**
```javascript
StyleDictionary.registerFormat({
  name: 'xaml/resourceDictionary',
  format: ({ dictionary }) => {
    const colorTokens = dictionary.allTokens.filter(t => t.$type === 'color');
    const sizeTokens = dictionary.allTokens.filter(t =>
      t.$type === 'dimension' || t.$type === 'number'
    );

    let output = `<!-- Auto-generated - DO NOT EDIT -->
<ResourceDictionary
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:sys="clr-namespace:System;assembly=mscorlib">

    <!-- Colors -->
`;

    colorTokens.forEach(token => {
      output += `    <Color x:Key="${token.name}">${token.value}</Color>\n`;
    });

    output += `\n    <!-- Dimensions -->\n`;

    sizeTokens.forEach(token => {
      output += `    <sys:Double x:Key="${token.name}">${token.value}</sys:Double>\n`;
    });

    output += `\n</ResourceDictionary>`;
    return output;
  }
});
```

**Output Example:**
```xml
<!-- Auto-generated - DO NOT EDIT -->
<ResourceDictionary
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:sys="clr-namespace:System;assembly=mscorlib">

    <!-- Colors -->
    <Color x:Key="ColorBlue500">#FF3B82F6</Color>
    <Color x:Key="ColorGray900">#FF111827</Color>
    <Color x:Key="ColorActionPrimaryBackground">#FF3B82F6</Color>
    <Color x:Key="FocusRingColor">#FF3B82F6</Color>

    <!-- Dimensions -->
    <sys:Double x:Key="Spacing4">16</sys:Double>
    <sys:Double x:Key="SpacingPaddingMd">16</sys:Double>
    <sys:Double x:Key="LayoutRowHeightSm">180</sys:Double>
    <sys:Double x:Key="LayoutRowHeightMd">240</sys:Double>
    <sys:Double x:Key="LayoutRowHeightLg">320</sys:Double>
    <sys:Double x:Key="FocusRingWidth">4</sys:Double>
    <sys:Double x:Key="FocusScale">1.05</sys:Double>

</ResourceDictionary>
```

---

### Web TV (Vizio, Xumo)

```javascript
'web-tv': {
  transformGroup: 'css',
  transforms: ['attribute/cti', 'name/kebab', 'size/pxToNumber', 'color/css'],
  buildPath: 'packages/web-tv/dist/',
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

---

## Special Transformations

### Reference Resolution

Tokens can reference other tokens. Style Dictionary resolves these automatically:

```json
// Input
{
  "color": {
    "blue": { "500": { "$value": "#3B82F6" } },
    "action": {
      "primary": {
        "background": { "$value": "{color.blue.500}" }  // Reference
      }
    }
  }
}
```

```css
/* Output (CSS with outputReferences: true) */
:root {
  --color-blue-500: #3B82F6;
  --color-action-primary-background: var(--color-blue-500);  /* Reference preserved */
}
```

```typescript
// Output (TypeScript with outputReferences: false)
export const colorBlue500 = '#3B82F6';
export const colorActionPrimaryBackground = '#3B82F6';  // Value resolved
```

---

### TV Scaling Logic

TV apps use larger values for 10-foot UI. The scaling logic:

| Token Type | Base Value | TV Scaled Value | Multiplier |
|------------|------------|-----------------|------------|
| Font sizes | 16px | 32px | 2x |
| Spacing | 16px | 16px | 1x (no change) |
| Border radius | 8px | 12px | 1.5x |
| Focus ring | 2px | 4px | 2x |

**Implementation:**
```javascript
StyleDictionary.registerTransform({
  name: 'size/tvScale',
  type: 'value',
  filter: (token) => {
    // Only scale typography
    return token.path.includes('typography') || token.path.includes('fontSize');
  },
  transform: (token) => {
    const value = parseFloat(token.$value);
    return value * 2;
  }
});
```

---

## Validation

Before transformation, tokens are validated:

1. **Schema Validation** - JSON structure matches W3C DTCG spec
2. **Reference Validation** - All `{token.references}` resolve
3. **Type Validation** - Values match declared `$type`
4. **Naming Validation** - Names follow conventions

```javascript
// Validation script
import Ajv from 'ajv';
import schema from './dtcg-schema.json';

const validate = new Ajv().compile(schema);

if (!validate(tokens)) {
  console.error('Token validation failed:', validate.errors);
  process.exit(1);
}
```

---

## Related Documents

- [Token Structure and Naming](./token_structure_and_naming.md)
- [CI/CD Workflow](./ci_cd_workflow.md)
- [Consumption Guide](./consumption_guide.md)
