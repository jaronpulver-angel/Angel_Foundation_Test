# Angel Studios Design System
## Figma → GitHub → Multi-Platform Design Tokens Pipeline

---

## Executive Summary

This plan establishes a **single source of truth** for design tokens in Figma that syncs to GitHub and generates platform-specific outputs for **all Angel Studios platforms**:

| Platform | Technology | Output Format |
|----------|------------|---------------|
| React Native | JavaScript/TypeScript | `.ts` modules |
| React Web | HTML/CSS/JS | CSS Variables, SCSS, TypeScript |
| Roku | BrightScript/SceneGraph | `.brs` files, JSON |
| Apple tvOS | Swift/SwiftUI | `.swift` files |
| Android Fire TV | Kotlin/Java | XML resources (`colors.xml`, `dimens.xml`) |
| Xbox | UWP/XAML | XAML ResourceDictionary |
| Vizio SmartCast | HTML5/CSS/JS | CSS Variables, JavaScript |
| XumoTV | Web Technologies | CSS Variables, JavaScript |

**Cost: $0** - Uses free Figma plugins and open-source tools.

---

## 🚀 Developer Quick Start: Which Package Do I Use?

### Find Your Package in 10 Seconds

| If you're building for... | Install this package | Import like this |
|---------------------------|---------------------|------------------|
| **React Native** (iOS/Android mobile) | `@angel/tokens-react-native` | `import { colors, typography, spacing } from '@angel/tokens-react-native'` |
| **React Web** | `@angel/tokens-web` | `import '@angel/tokens-web/variables.css'` or `import { tokens } from '@angel/tokens-web'` |
| **Roku** | Copy `tokens-roku/src/` to project | `tokens = AngelTokens()` in BrightScript |
| **Apple tvOS** | Swift Package `AngelTokens` | `import AngelTokens` then use `Color.Angel.primary` |
| **Android Fire TV** | Gradle dependency | `@color/angel_primary` in XML or `AngelTokens.Colors.Primary` in Compose |
| **Xbox** | NuGet package `AngelTokens` | `{StaticResource AngelPrimaryBrush}` in XAML |
| **Vizio SmartCast** | `@angel/tokens-web-tv` | `import '@angel/tokens-web-tv/variables.css'` |
| **XumoTV** | `@angel/tokens-web-tv` | `import '@angel/tokens-web-tv/variables.css'` |

### What's in Each Package?

Every platform package contains these token categories:

| Category | What it includes | Mobile/Web | TV Platforms |
|----------|------------------|------------|--------------|
| **Colors** | Brand, semantic, component colors | ✅ | ✅ |
| **Typography** | Font families, sizes, weights, line heights | ✅ | ✅ (scaled 1.5x for 10-foot) |
| **Spacing** | Padding, margins, gaps | ✅ | ✅ (scaled for TV) |
| **Sizing** | Component heights, widths | ✅ | ✅ |
| **Layout** | Grid, containers | ✅ | ✅ + TV-specific |
| **Focus** | Focus rings, states | Basic | ✅ **Critical for D-pad** |
| **Safe Areas** | Screen edge insets | - | ✅ **TV overscan** |
| **Component Dimensions** | Cards, rows, buttons | ✅ | ✅ **Row heights, card sizes** |

---

## 📺 TV Developer Guide: Heights, Rows & Components

### Why TV is Different

TV apps use **heights** and **fixed dimensions** more than padding because:
- D-pad navigation requires predictable focus targets
- 10-foot viewing distance needs larger, consistent UI elements
- Row-based layouts (like Netflix) need exact row heights
- Focus states must be visually prominent

### TV-Specific Token Categories

```
TV TOKENS STRUCTURE
├── colors/              # Same as mobile but optimized for TV contrast
├── typography/          # 1.5x scaled for 10-foot viewing
├── spacing/             # Larger values for TV layouts
│
├── 📺 layout/           # TV-SPECIFIC
│   ├── rowHeight        # Standard content row height
│   ├── rowHeightLarge   # Featured/hero row height
│   ├── rowHeightSmall   # Compact row height
│   ├── rowGap           # Space between rows
│   ├── gridColumns      # Number of items per row
│   └── sideNavWidth     # Left navigation width
│
├── 📺 components/       # TV-SPECIFIC COMPONENT SIZES
│   ├── card/
│   │   ├── width        # Standard card width
│   │   ├── height       # Standard card height (16:9, poster, etc.)
│   │   ├── widthLarge   # Featured card width
│   │   ├── heightLarge  # Featured card height
│   │   └── borderRadius # Card corner radius
│   ├── button/
│   │   ├── height       # Minimum button height (48px+ for focus)
│   │   ├── minWidth     # Minimum button width
│   │   └── paddingX     # Horizontal padding
│   ├── thumbnail/
│   │   ├── width        # Video thumbnail width
│   │   └── height       # Video thumbnail height
│   └── hero/
│       ├── height       # Hero banner height
│       └── minHeight    # Minimum hero height
│
├── 📺 focus/            # TV-SPECIFIC FOCUS STATES
│   ├── ringWidth        # Focus outline thickness (4px recommended)
│   ├── ringColor        # Focus outline color
│   ├── ringOffset       # Space between element and focus ring
│   ├── scale            # Scale factor when focused (1.05 typical)
│   └── shadowFocused    # Shadow when element is focused
│
└── 📺 safeArea/         # TV-SPECIFIC SAFE AREAS
    ├── horizontal       # Left/right safe margin (48px typical)
    ├── vertical         # Top/bottom safe margin (27px typical)
    └── action           # Extra margin for interactive elements
```

### TV Row Heights (Example Values)

| Token | Value | Use Case |
|-------|-------|----------|
| `layout.rowHeight.sm` | 180px | Compact rows (episodes, continue watching) |
| `layout.rowHeight.md` | 240px | Standard content rows |
| `layout.rowHeight.lg` | 320px | Featured rows |
| `layout.rowHeight.hero` | 480px | Hero/billboard sections |
| `layout.rowGap` | 32px | Vertical space between rows |

### TV Card Dimensions (Example Values)

| Token | Value | Aspect Ratio | Use Case |
|-------|-------|--------------|----------|
| `components.card.poster.width` | 150px | 2:3 | Movie posters |
| `components.card.poster.height` | 225px | 2:3 | Movie posters |
| `components.card.landscape.width` | 320px | 16:9 | Episode thumbnails |
| `components.card.landscape.height` | 180px | 16:9 | Episode thumbnails |
| `components.card.square.width` | 200px | 1:1 | Categories, profiles |
| `components.card.square.height` | 200px | 1:1 | Categories, profiles |
| `components.card.featured.width` | 480px | 16:9 | Featured content |
| `components.card.featured.height` | 270px | 16:9 | Featured content |

### TV Focus States (Critical!)

| Token | Value | Description |
|-------|-------|-------------|
| `focus.ringWidth` | 4px | Visible from 10 feet away |
| `focus.ringColor` | Brand blue | Matches brand, high contrast |
| `focus.ringOffset` | 4px | Space so ring doesn't overlap content |
| `focus.scale` | 1.05 | Subtle zoom on focus (5%) |
| `focus.transitionDuration` | 150ms | Snappy but smooth |

### TV Safe Areas (Overscan Protection)

| Token | Value | Description |
|-------|-------|-------------|
| `safeArea.horizontal` | 48px | Left/right edge padding |
| `safeArea.vertical` | 27px | Top/bottom edge padding |
| `safeArea.title` | 64px | Extra margin for title text |
| `safeArea.action` | 90px | Extra margin for buttons near edges |

---

## Architecture Overview

```
                                    ┌─────────────────────────────────┐
                                    │           FIGMA                 │
                                    │    Single Source of Truth       │
                                    │                                 │
                                    │  • Design Tokens (Variables)    │
                                    │  • Typography Definitions       │
                                    │  • Color Palettes               │
                                    │  • Spacing & Sizing             │
                                    └───────────────┬─────────────────┘
                                                    │
                                         1. Export JSON (Free Plugin)
                                         2. Manual Upload via PR
                                                    │
                                                    ▼
                                    ┌─────────────────────────────────┐
                                    │           GITHUB                │
                                    │                                 │
                                    │  📁 packages/tokens/            │
                                    │     ├── tokens/*.json           │
                                    │     └── fonts/                  │
                                    │         ├── *.ttf               │
                                    │         ├── *.otf               │
                                    │         └── *.woff2             │
                                    └───────────────┬─────────────────┘
                                                    │
                                         3. GitHub Actions triggers
                                            Style Dictionary build
                                                    │
                    ┌───────────────────────────────┼───────────────────────────────┐
                    │                               │                               │
        ┌───────────┴───────────┐       ┌──────────┴──────────┐       ┌────────────┴───────────┐
        │     MOBILE/WEB        │       │     NATIVE TV       │       │      WEB-BASED TV      │
        └───────────┬───────────┘       └──────────┬──────────┘       └────────────┬───────────┘
                    │                              │                               │
    ┌───────────────┼───────────────┐              │               ┌───────────────┼───────────────┐
    │               │               │              │               │               │               │
    ▼               ▼               ▼              ▼               ▼               ▼               ▼
┌────────┐    ┌────────┐    ┌────────┐    ┌────────────┐    ┌────────┐    ┌────────┐    ┌────────┐
│ React  │    │ React  │    │ Roku   │    │ Apple tvOS │    │Android │    │ Xbox   │    │ Vizio  │
│ Native │    │  Web   │    │        │    │            │    │Fire TV │    │        │    │ Xumo   │
├────────┤    ├────────┤    ├────────┤    ├────────────┤    ├────────┤    ├────────┤    ├────────┤
│  .ts   │    │  .css  │    │  .brs  │    │   .swift   │    │  .xml  │    │ .xaml  │    │  .css  │
│        │    │ .scss  │    │  .json │    │   .json    │    │ .kt    │    │  .cs   │    │  .js   │
│        │    │  .ts   │    │        │    │            │    │        │    │        │    │        │
└────────┘    └────────┘    └────────┘    └────────────┘    └────────┘    └────────┘    └────────┘
```

---

## Platform Technology Reference

### Mobile & Web Platforms

| Platform | Language | Token Format | Font Format |
|----------|----------|--------------|-------------|
| **React Native** | TypeScript | ES6 modules (`.ts`) | Bundled TTF/OTF via `react-native.config.js` |
| **React Web** | TypeScript/CSS | CSS Variables, SCSS, ES6 modules | WOFF2, WOFF, TTF via `@font-face` |

### Native TV Platforms

| Platform | Language | Token Format | Font Format |
|----------|----------|--------------|-------------|
| **Roku** | BrightScript | `.brs` constants, JSON | TTF/OTF (bundled in `pkg:/fonts/`) |
| **Apple tvOS** | Swift/SwiftUI | Swift extensions (`.swift`) | TTF/OTF (via Asset Catalog) |
| **Android Fire TV** | Kotlin | XML resources (`colors.xml`, `dimens.xml`) | TTF/OTF (in `res/font/`) |
| **Xbox** | C#/XAML | XAML ResourceDictionary | TTF/OTF (via Package Resources) |

### Web-Based TV Platforms

| Platform | Language | Token Format | Font Format |
|----------|----------|--------------|-------------|
| **Vizio SmartCast** | HTML5/CSS/JS | CSS Variables, JS modules | WOFF2 via `@font-face` |
| **XumoTV** | HTML5/CSS/JS | CSS Variables, JS modules | WOFF2 via `@font-face` |

---

## Repository Structure

```
angel-design-system/
│
├── 📁 .github/
│   └── workflows/
│       └── build-tokens.yml                    # Automated token generation
│
├── 📁 packages/
│   │
│   ├── 📁 tokens/                              # ═══ SOURCE OF TRUTH ═══
│   │   ├── 📁 tokens/                          # Figma exports go here
│   │   │   ├── colors.json
│   │   │   ├── typography.json
│   │   │   ├── spacing.json
│   │   │   ├── shadows.json
│   │   │   ├── borders.json
│   │   │   └── 📁 themes/
│   │   │       ├── light.json
│   │   │       └── dark.json
│   │   │
│   │   ├── 📁 fonts/                           # ═══ FONT FILES ═══
│   │   │   ├── 📁 ttf/                         # TrueType (Native apps)
│   │   │   │   ├── AngelSans-Regular.ttf
│   │   │   │   ├── AngelSans-Medium.ttf
│   │   │   │   ├── AngelSans-Bold.ttf
│   │   │   │   └── ...
│   │   │   ├── 📁 otf/                         # OpenType (Native apps)
│   │   │   │   └── ...
│   │   │   └── 📁 web/                         # Web fonts
│   │   │       ├── AngelSans-Regular.woff2
│   │   │       ├── AngelSans-Regular.woff
│   │   │       └── ...
│   │   │
│   │   ├── style-dictionary.config.mjs
│   │   └── package.json
│   │
│   │
│   │   # ═══════════════════════════════════════════════════════════════
│   │   # GENERATED PLATFORM PACKAGES (Auto-generated by Style Dictionary)
│   │   # ═══════════════════════════════════════════════════════════════
│   │
│   ├── 📁 tokens-react-native/                 # React Native
│   │   ├── 📁 src/
│   │   │   ├── colors.ts
│   │   │   ├── typography.ts
│   │   │   ├── spacing.ts
│   │   │   ├── shadows.ts
│   │   │   ├── theme.ts                        # Combined theme object
│   │   │   └── index.ts
│   │   ├── 📁 fonts/                           # Copied TTF files
│   │   │   └── *.ttf
│   │   └── package.json
│   │
│   ├── 📁 tokens-web/                          # React Web
│   │   ├── 📁 src/
│   │   │   ├── variables.css                   # CSS custom properties
│   │   │   ├── _variables.scss                 # SCSS variables
│   │   │   ├── tokens.ts                       # TypeScript object
│   │   │   ├── fonts.css                       # @font-face declarations
│   │   │   └── index.ts
│   │   ├── 📁 fonts/                           # Copied WOFF2/WOFF files
│   │   │   └── *.woff2
│   │   └── package.json
│   │
│   ├── 📁 tokens-roku/                         # Roku (BrightScript)
│   │   ├── 📁 src/
│   │   │   ├── AngelTokens.brs                 # BrightScript constants
│   │   │   ├── tokens.json                     # JSON for runtime loading
│   │   │   └── README.md                       # Roku-specific usage guide
│   │   ├── 📁 fonts/                           # TTF for Roku
│   │   │   └── *.ttf
│   │   └── package.json
│   │
│   ├── 📁 tokens-tvos/                         # Apple tvOS (Swift)
│   │   ├── 📁 Sources/AngelTokens/
│   │   │   ├── Colors.swift
│   │   │   ├── Typography.swift
│   │   │   ├── Spacing.swift
│   │   │   ├── Theme.swift
│   │   │   └── AngelTokens.swift               # Main export
│   │   ├── 📁 Resources/Fonts/                 # TTF/OTF for Asset Catalog
│   │   │   └── *.ttf
│   │   ├── Package.swift                       # Swift Package Manager
│   │   └── README.md
│   │
│   ├── 📁 tokens-android-tv/                   # Android Fire TV (Kotlin/XML)
│   │   ├── 📁 src/main/
│   │   │   ├── 📁 res/
│   │   │   │   ├── 📁 values/
│   │   │   │   │   ├── colors.xml
│   │   │   │   │   ├── dimens.xml
│   │   │   │   │   ├── typography.xml
│   │   │   │   │   └── themes.xml
│   │   │   │   ├── 📁 values-night/            # Dark theme
│   │   │   │   │   └── colors.xml
│   │   │   │   └── 📁 font/
│   │   │   │       └── *.ttf
│   │   │   └── 📁 kotlin/
│   │   │       └── AngelTokens.kt              # Kotlin object for Compose
│   │   ├── build.gradle.kts
│   │   └── README.md
│   │
│   ├── 📁 tokens-xbox/                         # Xbox (UWP/XAML)
│   │   ├── 📁 Themes/
│   │   │   ├── AngelColors.xaml
│   │   │   ├── AngelTypography.xaml
│   │   │   ├── AngelSpacing.xaml
│   │   │   └── AngelTheme.xaml                 # Combined ResourceDictionary
│   │   ├── 📁 Fonts/
│   │   │   └── *.ttf
│   │   ├── AngelTokens.csproj
│   │   └── README.md
│   │
│   └── 📁 tokens-web-tv/                       # Vizio, XumoTV (Web-based)
│       ├── 📁 src/
│       │   ├── variables.css                   # CSS custom properties
│       │   ├── tokens.js                       # JavaScript module
│       │   ├── fonts.css                       # @font-face for TV browsers
│       │   ├── tv-overrides.css                # 10-foot UI adjustments
│       │   └── index.js
│       ├── 📁 fonts/
│       │   └── *.woff2
│       └── package.json
│
├── 📁 docs/
│   ├── PLATFORM_GUIDE.md                       # How each platform uses tokens
│   └── DESIGNER_WORKFLOW.md                    # Step-by-step for designers
│
├── package.json
└── pnpm-workspace.yaml
```

---

## Platform Output Examples

### 1. React Native (`tokens-react-native`)

**Files in this package:**
```
tokens-react-native/
├── src/
│   ├── index.ts           ← IMPORT THIS - exports everything
│   ├── colors.ts          ← Color tokens
│   ├── typography.ts      ← Font families, sizes, weights
│   ├── spacing.ts         ← Padding, margins, gaps
│   └── theme.ts           ← Combined theme object
└── fonts/
    └── *.ttf              ← Link in react-native.config.js
```

**Installation & Setup:**
```bash
npm install @angel/tokens-react-native

# Link fonts (React Native 0.69+)
npx react-native-asset
```

**Usage:**
```typescript
// Import everything from index
import { colors, typography, spacing } from '@angel/tokens-react-native';

// Or import the combined theme
import { theme } from '@angel/tokens-react-native';
```

**`src/index.ts`** - Main entry point
```typescript
export * from './colors';
export * from './typography';
export * from './spacing';
export { theme } from './theme';
```

**`src/colors.ts`**
```typescript
export const colors = {
  // Primitives
  white: '#FFFFFF',
  black: '#000000',
  blue500: '#3B82F6',
  gray100: '#F3F4F6',
  gray900: '#111827',

  // Semantic - Use these in components
  backgroundPrimary: '#FFFFFF',
  backgroundSecondary: '#F3F4F6',
  textPrimary: '#111827',
  textSecondary: '#6B7280',
  brandPrimary: '#3B82F6',

  // Component-specific
  buttonPrimaryBackground: '#3B82F6',
  buttonPrimaryText: '#FFFFFF',
} as const;
```

**`src/typography.ts`**
```typescript
export const typography = {
  fontFamily: {
    primary: 'AngelSans-Regular',
    primaryMedium: 'AngelSans-Medium',
    primaryBold: 'AngelSans-Bold',
  },
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
  },
  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
} as const;
```

**`src/spacing.ts`**
```typescript
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
} as const;
```

**Example React Native Usage:**
```typescript
import { colors, typography, spacing } from '@angel/tokens-react-native';
import { StyleSheet, View, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundPrimary,
    padding: spacing.md,
  },
  title: {
    color: colors.textPrimary,
    fontFamily: typography.fontFamily.primaryBold,
    fontSize: typography.fontSize['2xl'],
  },
});

export const Card = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Hello Angel</Text>
  </View>
);
```

---

### 2. React Web (`tokens-web`)

**Files in this package:**
```
tokens-web/
├── src/
│   ├── index.ts           ← TypeScript entry point
│   ├── variables.css      ← IMPORT THIS for CSS custom properties
│   ├── _variables.scss    ← IMPORT THIS for SCSS
│   ├── tokens.ts          ← IMPORT THIS for TypeScript/JS objects
│   └── fonts.css          ← IMPORT THIS to load fonts
└── fonts/
    ├── *.woff2            ← Web fonts (primary)
    └── *.woff             ← Web fonts (fallback)
```

**Installation & Setup:**
```bash
npm install @angel/tokens-web
```

**Usage Options:**
```tsx
// Option 1: CSS Variables (recommended for most cases)
import '@angel/tokens-web/variables.css';
import '@angel/tokens-web/fonts.css';

// Then use in CSS/styled-components:
// background: var(--color-background-primary);

// Option 2: SCSS
@import '@angel/tokens-web/variables';
// Then use: background: $color-background-primary;

// Option 3: TypeScript/JavaScript objects
import { tokens } from '@angel/tokens-web';
// Then use: tokens.colors.backgroundPrimary
```

**`src/variables.css`** - CSS Custom Properties
```css
:root {
  /* ═══════════════════════════════════════════════════════════════ */
  /* COLORS                                                          */
  /* ═══════════════════════════════════════════════════════════════ */

  /* Primitives */
  --color-white: #FFFFFF;
  --color-black: #000000;
  --color-blue-500: #3B82F6;
  --color-gray-100: #F3F4F6;
  --color-gray-900: #111827;

  /* Semantic - Use these in components */
  --color-background-primary: var(--color-white);
  --color-background-secondary: var(--color-gray-100);
  --color-text-primary: var(--color-gray-900);
  --color-text-secondary: #6B7280;
  --color-brand-primary: var(--color-blue-500);

  /* ═══════════════════════════════════════════════════════════════ */
  /* TYPOGRAPHY                                                      */
  /* ═══════════════════════════════════════════════════════════════ */
  --font-family-primary: 'Angel Sans', sans-serif;
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  --font-size-2xl: 1.5rem;
  --font-size-3xl: 1.875rem;
  --font-size-4xl: 2.25rem;

  /* ═══════════════════════════════════════════════════════════════ */
  /* SPACING                                                         */
  /* ═══════════════════════════════════════════════════════════════ */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  --spacing-2xl: 3rem;

  /* ═══════════════════════════════════════════════════════════════ */
  /* SHADOWS & BORDERS                                               */
  /* ═══════════════════════════════════════════════════════════════ */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);

  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 1rem;
  --radius-full: 9999px;
}

/* Dark Theme */
[data-theme="dark"] {
  --color-background-primary: var(--color-gray-900);
  --color-background-secondary: #1F2937;
  --color-text-primary: var(--color-white);
  --color-text-secondary: #9CA3AF;
}
```

**`src/fonts.css`** - Font Face Declarations
```css
@font-face {
  font-family: 'Angel Sans';
  src: url('./fonts/AngelSans-Regular.woff2') format('woff2'),
       url('./fonts/AngelSans-Regular.woff') format('woff');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Angel Sans';
  src: url('./fonts/AngelSans-Medium.woff2') format('woff2'),
       url('./fonts/AngelSans-Medium.woff') format('woff');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Angel Sans';
  src: url('./fonts/AngelSans-Bold.woff2') format('woff2'),
       url('./fonts/AngelSans-Bold.woff') format('woff');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}
```

**Example React Web Usage:**
```tsx
// In your app entry point
import '@angel/tokens-web/variables.css';
import '@angel/tokens-web/fonts.css';

// In a component
const Card = styled.div`
  background: var(--color-background-primary);
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
`;

const Title = styled.h2`
  color: var(--color-text-primary);
  font-family: var(--font-family-primary);
  font-size: var(--font-size-2xl);
  font-weight: 700;
`;
```

---

### 3. Roku (`tokens-roku`)

**Files in this package:**
```
tokens-roku/
├── src/
│   ├── AngelTokens.brs      ← IMPORT THIS - All tokens as BrightScript
│   ├── tokens.json          ← Alternative: JSON for dynamic loading
│   └── README.md            ← Roku-specific usage guide
└── fonts/
    └── *.ttf                ← Copy to pkg:/fonts/ in your Roku project
```

**`src/AngelTokens.brs`** - Complete TV tokens for Roku
```brightscript
' Angel Studios Design Tokens - BrightScript
' Auto-generated from Figma. Do not edit manually.
'
' USAGE: tokens = AngelTokens()
'        label.color = tokens.colors.textPrimary
'        row.height = tokens.layout.rowHeightMd

function AngelTokens() as object
    return {
        ' ═══════════════════════════════════════════════════════════════
        ' COLORS
        ' ═══════════════════════════════════════════════════════════════
        colors: {
            ' Primitives
            white: "0xFFFFFFFF"
            black: "0x000000FF"
            blue500: "0x3B82F6FF"
            gray100: "0xF3F4F6FF"
            gray900: "0x111827FF"

            ' Semantic
            backgroundPrimary: "0x111827FF"      ' Dark for TV
            backgroundSecondary: "0x1F2937FF"
            textPrimary: "0xFFFFFFFF"
            textSecondary: "0x9CA3AFFF"
            brandPrimary: "0x3B82F6FF"

            ' Focus
            focusRing: "0x3B82F6FF"
            focusBackground: "0x3B82F620"
        }

        ' ═══════════════════════════════════════════════════════════════
        ' TYPOGRAPHY (Scaled for 10-foot viewing)
        ' ═══════════════════════════════════════════════════════════════
        typography: {
            fontFamily: "pkg:/fonts/AngelSans-Regular.ttf"
            fontFamilyMedium: "pkg:/fonts/AngelSans-Medium.ttf"
            fontFamilyBold: "pkg:/fonts/AngelSans-Bold.ttf"

            fontSizeXs: 18
            fontSizeSm: 21
            fontSizeBase: 24
            fontSizeLg: 28
            fontSizeXl: 32
            fontSize2xl: 40
            fontSize3xl: 48
            fontSize4xl: 56
            fontSizeHero: 72
        }

        ' ═══════════════════════════════════════════════════════════════
        ' LAYOUT - Row Heights & Grid (TV-SPECIFIC)
        ' ═══════════════════════════════════════════════════════════════
        layout: {
            ' Row Heights - Use these for RowList itemSize
            rowHeightSm: 180       ' Compact rows (episodes, continue watching)
            rowHeightMd: 240       ' Standard content rows
            rowHeightLg: 320       ' Featured rows
            rowHeightHero: 480     ' Hero/billboard sections

            ' Row Spacing
            rowGap: 32             ' Vertical space between rows
            rowPaddingLeft: 80     ' Left padding for row content

            ' Grid
            gridColumns: 7         ' Items visible per row (1920px)
            itemGap: 16            ' Horizontal space between items

            ' Navigation
            sideNavWidth: 300      ' Left nav width when expanded
            sideNavCollapsed: 80   ' Left nav width when collapsed
        }

        ' ═══════════════════════════════════════════════════════════════
        ' COMPONENT DIMENSIONS - Card Sizes (TV-SPECIFIC)
        ' ═══════════════════════════════════════════════════════════════
        components: {
            ' Poster Cards (2:3 aspect ratio) - Movies
            cardPosterWidth: 150
            cardPosterHeight: 225

            ' Landscape Cards (16:9 aspect ratio) - Episodes, Shows
            cardLandscapeWidth: 320
            cardLandscapeHeight: 180

            ' Square Cards (1:1) - Categories, Profiles
            cardSquareWidth: 200
            cardSquareHeight: 200

            ' Featured Cards (16:9 large) - Hero items
            cardFeaturedWidth: 480
            cardFeaturedHeight: 270

            ' Wide Cards (21:9) - Cinematic
            cardWideWidth: 560
            cardWideHeight: 240

            ' Button dimensions
            buttonHeight: 48
            buttonMinWidth: 120
            buttonPaddingX: 24

            ' Thumbnails
            thumbnailWidth: 280
            thumbnailHeight: 158
        }

        ' ═══════════════════════════════════════════════════════════════
        ' FOCUS STATES (Critical for D-pad navigation)
        ' ═══════════════════════════════════════════════════════════════
        focus: {
            ringWidth: 4           ' Focus outline thickness
            ringColor: "0x3B82F6FF"
            ringOffset: 4          ' Space between element and ring
            scale: 1.05            ' Scale factor when focused (1.05 = 5% larger)
            transitionDuration: 0.15
        }

        ' ═══════════════════════════════════════════════════════════════
        ' SAFE AREAS (TV overscan protection)
        ' ═══════════════════════════════════════════════════════════════
        safeArea: {
            horizontal: 48         ' Left/right safe margin
            vertical: 27           ' Top/bottom safe margin
            title: 64              ' Extra margin for title text
            action: 90             ' Extra margin for buttons near edges
        }

        ' ═══════════════════════════════════════════════════════════════
        ' SPACING (General padding/margins)
        ' ═══════════════════════════════════════════════════════════════
        spacing: {
            xs: 8
            sm: 16
            md: 24
            lg: 32
            xl: 48
            xxl: 64
        }
    }
end function
```

**Example Roku Usage:**
```brightscript
sub init()
    tokens = AngelTokens()

    ' Set up a content row with proper height
    m.contentRow = m.top.findNode("contentRow")
    m.contentRow.itemSize = [tokens.components.cardLandscapeWidth, tokens.layout.rowHeightMd]
    m.contentRow.itemSpacing = [tokens.layout.itemGap, 0]

    ' Style a label
    m.titleLabel = m.top.findNode("titleLabel")
    m.titleLabel.font.uri = tokens.typography.fontFamilyBold
    m.titleLabel.font.size = tokens.typography.fontSize2xl
    m.titleLabel.color = tokens.colors.textPrimary

    ' Apply safe area padding
    m.container = m.top.findNode("container")
    m.container.translation = [tokens.safeArea.horizontal, tokens.safeArea.vertical]
end sub
```

---

### 4. Apple tvOS (`tokens-tvos`)

**`Sources/AngelTokens/Colors.swift`**
```swift
// Angel Studios Design Tokens - Colors
// Auto-generated from Figma. Do not edit manually.

import SwiftUI

public extension Color {
    struct Angel {
        // Primitives
        public static let white = Color(hex: "FFFFFF")
        public static let black = Color(hex: "000000")
        public static let blue500 = Color(hex: "3B82F6")
        public static let gray100 = Color(hex: "F3F4F6")
        public static let gray900 = Color(hex: "111827")

        // Semantic
        public static let backgroundPrimary = Color(hex: "FFFFFF")
        public static let backgroundSecondary = Color(hex: "F3F4F6")
        public static let textPrimary = Color(hex: "111827")
        public static let textSecondary = Color(hex: "6B7280")
        public static let brandPrimary = Color(hex: "3B82F6")

        // Focus States (tvOS specific)
        public static let focusRing = Color(hex: "3B82F6")
    }
}

// Helper extension
extension Color {
    init(hex: String) {
        let hex = hex.trimmingCharacters(in: CharacterSet.alphanumerics.inverted)
        var int: UInt64 = 0
        Scanner(string: hex).scanHexInt64(&int)
        let a, r, g, b: UInt64
        switch hex.count {
        case 6: (a, r, g, b) = (255, (int >> 16) & 0xFF, (int >> 8) & 0xFF, int & 0xFF)
        case 8: (a, r, g, b) = ((int >> 24) & 0xFF, (int >> 16) & 0xFF, (int >> 8) & 0xFF, int & 0xFF)
        default: (a, r, g, b) = (255, 0, 0, 0)
        }
        self.init(.sRGB, red: Double(r) / 255, green: Double(g) / 255, blue: Double(b) / 255, opacity: Double(a) / 255)
    }
}
```

**`Sources/AngelTokens/Typography.swift`**
```swift
import SwiftUI

public extension Font {
    struct Angel {
        // Register fonts in your app's Info.plist
        public static let regular = "AngelSans-Regular"
        public static let medium = "AngelSans-Medium"
        public static let bold = "AngelSans-Bold"

        // TV-optimized sizes (larger for 10-foot viewing)
        public static func body() -> Font { .custom(regular, size: 28) }
        public static func headline() -> Font { .custom(bold, size: 34) }
        public static func title() -> Font { .custom(bold, size: 48) }
        public static func largeTitle() -> Font { .custom(bold, size: 64) }
        public static func caption() -> Font { .custom(regular, size: 22) }
    }
}

public struct AngelTypography {
    public static let fontSizeXs: CGFloat = 22
    public static let fontSizeSm: CGFloat = 25
    public static let fontSizeBase: CGFloat = 28
    public static let fontSizeLg: CGFloat = 32
    public static let fontSizeXl: CGFloat = 38
    public static let fontSize2xl: CGFloat = 48
    public static let fontSize3xl: CGFloat = 60
    public static let fontSize4xl: CGFloat = 72
}
```

**`Package.swift`**
```swift
// swift-tools-version:5.9
import PackageDescription

let package = Package(
    name: "AngelTokens",
    platforms: [.tvOS(.v15)],
    products: [
        .library(name: "AngelTokens", targets: ["AngelTokens"]),
    ],
    targets: [
        .target(
            name: "AngelTokens",
            resources: [.process("Resources/Fonts")]
        ),
    ]
)
```

---

### 5. Android Fire TV (`tokens-android-tv`)

**`src/main/res/values/colors.xml`**
```xml
<?xml version="1.0" encoding="utf-8"?>
<!-- Angel Studios Design Tokens - Colors -->
<!-- Auto-generated from Figma. Do not edit manually. -->
<resources>
    <!-- Primitives -->
    <color name="angel_white">#FFFFFF</color>
    <color name="angel_black">#000000</color>
    <color name="angel_blue_500">#3B82F6</color>
    <color name="angel_gray_100">#F3F4F6</color>
    <color name="angel_gray_900">#111827</color>

    <!-- Semantic -->
    <color name="angel_background_primary">@color/angel_white</color>
    <color name="angel_background_secondary">@color/angel_gray_100</color>
    <color name="angel_text_primary">@color/angel_gray_900</color>
    <color name="angel_text_secondary">#6B7280</color>
    <color name="angel_brand_primary">@color/angel_blue_500</color>

    <!-- Focus States -->
    <color name="angel_focus_ring">@color/angel_blue_500</color>
</resources>
```

**`src/main/res/values/dimens.xml`**
```xml
<?xml version="1.0" encoding="utf-8"?>
<!-- Angel Studios Design Tokens - Dimensions -->
<!-- Auto-generated from Figma. Do not edit manually. -->
<resources>
    <!-- Spacing -->
    <dimen name="angel_spacing_xs">4dp</dimen>
    <dimen name="angel_spacing_sm">8dp</dimen>
    <dimen name="angel_spacing_md">16dp</dimen>
    <dimen name="angel_spacing_lg">24dp</dimen>
    <dimen name="angel_spacing_xl">32dp</dimen>
    <dimen name="angel_spacing_2xl">48dp</dimen>

    <!-- Typography - TV optimized -->
    <dimen name="angel_font_size_xs">18sp</dimen>
    <dimen name="angel_font_size_sm">21sp</dimen>
    <dimen name="angel_font_size_base">24sp</dimen>
    <dimen name="angel_font_size_lg">28sp</dimen>
    <dimen name="angel_font_size_xl">32sp</dimen>
    <dimen name="angel_font_size_2xl">40sp</dimen>
    <dimen name="angel_font_size_3xl">48sp</dimen>
    <dimen name="angel_font_size_4xl">56sp</dimen>

    <!-- Border Radius -->
    <dimen name="angel_radius_sm">4dp</dimen>
    <dimen name="angel_radius_md">8dp</dimen>
    <dimen name="angel_radius_lg">16dp</dimen>

    <!-- Focus -->
    <dimen name="angel_focus_ring_width">4dp</dimen>
    <dimen name="angel_min_touch_target">48dp</dimen>
</resources>
```

**`src/main/kotlin/AngelTokens.kt`** (for Jetpack Compose)
```kotlin
package com.angelstudios.tokens

import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

/**
 * Angel Studios Design Tokens
 * Auto-generated from Figma. Do not edit manually.
 */
object AngelTokens {
    object Colors {
        val White = Color(0xFFFFFFFF)
        val Black = Color(0xFF000000)
        val Blue500 = Color(0xFF3B82F6)
        val Gray100 = Color(0xFFF3F4F6)
        val Gray900 = Color(0xFF111827)

        val BackgroundPrimary = White
        val BackgroundSecondary = Gray100
        val TextPrimary = Gray900
        val TextSecondary = Color(0xFF6B7280)
        val BrandPrimary = Blue500
        val FocusRing = Blue500
    }

    object Typography {
        val FontSizeXs = 18.sp
        val FontSizeSm = 21.sp
        val FontSizeBase = 24.sp
        val FontSizeLg = 28.sp
        val FontSizeXl = 32.sp
        val FontSize2xl = 40.sp
    }

    object Spacing {
        val Xs = 4.dp
        val Sm = 8.dp
        val Md = 16.dp
        val Lg = 24.dp
        val Xl = 32.dp
        val Xxl = 48.dp
    }
}
```

---

### 6. Xbox (`tokens-xbox`)

**`Themes/AngelColors.xaml`**
```xml
<!-- Angel Studios Design Tokens - Colors -->
<!-- Auto-generated from Figma. Do not edit manually. -->
<ResourceDictionary
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml">

    <!-- Primitives -->
    <Color x:Key="AngelWhite">#FFFFFF</Color>
    <Color x:Key="AngelBlack">#000000</Color>
    <Color x:Key="AngelBlue500">#3B82F6</Color>
    <Color x:Key="AngelGray100">#F3F4F6</Color>
    <Color x:Key="AngelGray900">#111827</Color>

    <!-- Semantic Colors -->
    <SolidColorBrush x:Key="AngelBackgroundPrimaryBrush" Color="{StaticResource AngelWhite}"/>
    <SolidColorBrush x:Key="AngelBackgroundSecondaryBrush" Color="{StaticResource AngelGray100}"/>
    <SolidColorBrush x:Key="AngelTextPrimaryBrush" Color="{StaticResource AngelGray900}"/>
    <SolidColorBrush x:Key="AngelTextSecondaryBrush" Color="#6B7280"/>
    <SolidColorBrush x:Key="AngelBrandPrimaryBrush" Color="{StaticResource AngelBlue500}"/>

    <!-- Focus States -->
    <SolidColorBrush x:Key="AngelFocusRingBrush" Color="{StaticResource AngelBlue500}"/>
    <x:Double x:Key="AngelFocusRingWidth">4</x:Double>

</ResourceDictionary>
```

**`Themes/AngelTypography.xaml`**
```xml
<ResourceDictionary
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml">

    <!-- Font Family -->
    <FontFamily x:Key="AngelFontFamily">ms-appx:///Fonts/AngelSans-Regular.ttf#Angel Sans</FontFamily>
    <FontFamily x:Key="AngelFontFamilyMedium">ms-appx:///Fonts/AngelSans-Medium.ttf#Angel Sans</FontFamily>
    <FontFamily x:Key="AngelFontFamilyBold">ms-appx:///Fonts/AngelSans-Bold.ttf#Angel Sans</FontFamily>

    <!-- Font Sizes (TV optimized) -->
    <x:Double x:Key="AngelFontSizeXs">18</x:Double>
    <x:Double x:Key="AngelFontSizeSm">21</x:Double>
    <x:Double x:Key="AngelFontSizeBase">24</x:Double>
    <x:Double x:Key="AngelFontSizeLg">28</x:Double>
    <x:Double x:Key="AngelFontSizeXl">32</x:Double>
    <x:Double x:Key="AngelFontSize2xl">40</x:Double>
    <x:Double x:Key="AngelFontSize3xl">48</x:Double>
    <x:Double x:Key="AngelFontSize4xl">56</x:Double>

    <!-- Text Styles -->
    <Style x:Key="AngelBodyTextStyle" TargetType="TextBlock">
        <Setter Property="FontFamily" Value="{StaticResource AngelFontFamily}"/>
        <Setter Property="FontSize" Value="{StaticResource AngelFontSizeBase}"/>
        <Setter Property="Foreground" Value="{StaticResource AngelTextPrimaryBrush}"/>
    </Style>

    <Style x:Key="AngelHeadlineTextStyle" TargetType="TextBlock">
        <Setter Property="FontFamily" Value="{StaticResource AngelFontFamilyBold}"/>
        <Setter Property="FontSize" Value="{StaticResource AngelFontSize2xl}"/>
        <Setter Property="Foreground" Value="{StaticResource AngelTextPrimaryBrush}"/>
    </Style>

</ResourceDictionary>
```

---

### 7. Vizio & XumoTV (`tokens-web-tv`)

**`src/variables.css`**
```css
/**
 * Angel Studios Design Tokens - Web TV
 * Optimized for Vizio SmartCast, XumoTV, and other Chromium-based TVs
 * Auto-generated from Figma. Do not edit manually.
 */

:root {
  /* Colors */
  --angel-color-white: #FFFFFF;
  --angel-color-black: #000000;
  --angel-color-blue-500: #3B82F6;
  --angel-color-gray-100: #F3F4F6;
  --angel-color-gray-900: #111827;

  --angel-color-bg-primary: var(--angel-color-white);
  --angel-color-bg-secondary: var(--angel-color-gray-100);
  --angel-color-text-primary: var(--angel-color-gray-900);
  --angel-color-text-secondary: #6B7280;
  --angel-color-brand-primary: var(--angel-color-blue-500);

  /* Typography - TV Scale (1.5x base) */
  --angel-font-family: 'Angel Sans', sans-serif;
  --angel-font-size-xs: 18px;
  --angel-font-size-sm: 21px;
  --angel-font-size-base: 24px;
  --angel-font-size-lg: 28px;
  --angel-font-size-xl: 32px;
  --angel-font-size-2xl: 40px;
  --angel-font-size-3xl: 48px;
  --angel-font-size-4xl: 56px;

  /* Spacing - TV Scale */
  --angel-spacing-xs: 8px;
  --angel-spacing-sm: 16px;
  --angel-spacing-md: 24px;
  --angel-spacing-lg: 32px;
  --angel-spacing-xl: 48px;
  --angel-spacing-2xl: 64px;

  /* Focus States (critical for D-pad navigation) */
  --angel-focus-ring-width: 4px;
  --angel-focus-ring-color: var(--angel-color-blue-500);
  --angel-focus-ring-offset: 2px;

  /* Safe Area (TV overscan) */
  --angel-safe-area-horizontal: 48px;
  --angel-safe-area-vertical: 27px;
}

/* Dark Theme for TV */
[data-theme="dark"] {
  --angel-color-bg-primary: var(--angel-color-gray-900);
  --angel-color-bg-secondary: #1F2937;
  --angel-color-text-primary: var(--angel-color-white);
  --angel-color-text-secondary: #9CA3AF;
}
```

**`src/tv-overrides.css`**
```css
/**
 * TV-specific overrides for 10-foot UI experience
 */

/* Ensure minimum focus target size */
button, a, [role="button"], [tabindex] {
  min-width: 48px;
  min-height: 48px;
}

/* Strong focus indicators for D-pad navigation */
:focus {
  outline: var(--angel-focus-ring-width) solid var(--angel-focus-ring-color);
  outline-offset: var(--angel-focus-ring-offset);
}

:focus:not(:focus-visible) {
  outline: none;
}

:focus-visible {
  outline: var(--angel-focus-ring-width) solid var(--angel-focus-ring-color);
  outline-offset: var(--angel-focus-ring-offset);
}

/* Safe area padding */
.tv-safe-area {
  padding-left: var(--angel-safe-area-horizontal);
  padding-right: var(--angel-safe-area-horizontal);
  padding-top: var(--angel-safe-area-vertical);
  padding-bottom: var(--angel-safe-area-vertical);
}
```

**`src/tokens.js`**
```javascript
/**
 * Angel Studios Design Tokens - JavaScript
 * For Vizio SmartCast, XumoTV, and other web-based TV platforms
 * Auto-generated from Figma. Do not edit manually.
 */

export const AngelTokens = {
  colors: {
    white: '#FFFFFF',
    black: '#000000',
    blue500: '#3B82F6',
    gray100: '#F3F4F6',
    gray900: '#111827',

    backgroundPrimary: '#FFFFFF',
    backgroundSecondary: '#F3F4F6',
    textPrimary: '#111827',
    textSecondary: '#6B7280',
    brandPrimary: '#3B82F6',

    focusRing: '#3B82F6',
  },

  typography: {
    fontFamily: "'Angel Sans', sans-serif",
    fontSize: {
      xs: 18,
      sm: 21,
      base: 24,
      lg: 28,
      xl: 32,
      '2xl': 40,
      '3xl': 48,
      '4xl': 56,
    },
  },

  spacing: {
    xs: 8,
    sm: 16,
    md: 24,
    lg: 32,
    xl: 48,
    '2xl': 64,
  },

  focus: {
    ringWidth: 4,
    ringOffset: 2,
  },

  safeArea: {
    horizontal: 48,
    vertical: 27,
  },
};

export default AngelTokens;
```

---

## Font Management Strategy

### Font Files in Single Location

All font files live in `packages/tokens/fonts/` and are **copied** to each platform package during build:

```
packages/tokens/fonts/
├── ttf/                          # Source TTF files
│   ├── AngelSans-Regular.ttf
│   ├── AngelSans-Medium.ttf
│   ├── AngelSans-Bold.ttf
│   ├── AngelSans-Italic.ttf
│   └── ...
│
├── otf/                          # OpenType (if needed)
│   └── ...
│
└── web/                          # Web-optimized fonts
    ├── AngelSans-Regular.woff2   # Primary web format
    ├── AngelSans-Regular.woff    # Fallback
    ├── AngelSans-Medium.woff2
    ├── AngelSans-Medium.woff
    ├── AngelSans-Bold.woff2
    ├── AngelSans-Bold.woff
    └── ...
```

### Font Distribution by Platform

| Platform | Font Format | Location in Package |
|----------|-------------|---------------------|
| React Native | TTF | `tokens-react-native/fonts/*.ttf` |
| React Web | WOFF2, WOFF | `tokens-web/fonts/*.woff2` |
| Roku | TTF | `tokens-roku/fonts/*.ttf` |
| Apple tvOS | TTF | `tokens-tvos/Resources/Fonts/*.ttf` |
| Android Fire TV | TTF | `tokens-android-tv/src/main/res/font/*.ttf` |
| Xbox | TTF | `tokens-xbox/Fonts/*.ttf` |
| Vizio/XumoTV | WOFF2 | `tokens-web-tv/fonts/*.woff2` |

### Updating Fonts

When you update fonts:

1. Replace files in `packages/tokens/fonts/`
2. Commit and push to GitHub
3. GitHub Action copies fonts to all platform packages
4. Each platform pulls the updated package

---

## Style Dictionary Configuration

**`packages/tokens/style-dictionary.config.mjs`**

```javascript
/**
 * Style Dictionary Configuration
 * Generates platform-specific design tokens from Figma exports
 */

import StyleDictionary from 'style-dictionary';

// Custom format for BrightScript (Roku)
StyleDictionary.registerFormat({
  name: 'brightscript/constants',
  format: ({ dictionary }) => {
    const tokens = dictionary.allTokens;
    let output = `' Angel Studios Design Tokens - BrightScript\n`;
    output += `' Auto-generated from Figma. Do not edit manually.\n\n`;
    output += `function AngelTokens() as object\n`;
    output += `    return {\n`;

    // Group by category
    const colors = tokens.filter(t => t.type === 'color');
    const spacing = tokens.filter(t => t.type === 'spacing' || t.type === 'dimension');

    output += `        colors: {\n`;
    colors.forEach(token => {
      const hex = token.value.replace('#', '');
      output += `            ${token.name}: "0x${hex}FF"\n`;
    });
    output += `        }\n`;

    output += `        spacing: {\n`;
    spacing.forEach(token => {
      output += `            ${token.name}: ${parseInt(token.value)}\n`;
    });
    output += `        }\n`;

    output += `    }\n`;
    output += `end function\n`;
    return output;
  }
});

// Custom format for Swift (tvOS)
StyleDictionary.registerFormat({
  name: 'swift/extension',
  format: ({ dictionary, file }) => {
    const tokens = dictionary.allTokens;
    let output = `// Angel Studios Design Tokens\n`;
    output += `// Auto-generated from Figma. Do not edit manually.\n\n`;
    output += `import SwiftUI\n\n`;

    if (file.destination.includes('Colors')) {
      output += `public extension Color {\n`;
      output += `    struct Angel {\n`;
      tokens.filter(t => t.type === 'color').forEach(token => {
        output += `        public static let ${token.name} = Color(hex: "${token.value.replace('#', '')}")\n`;
      });
      output += `    }\n`;
      output += `}\n`;
    }

    return output;
  }
});

// Custom format for Android XML
StyleDictionary.registerFormat({
  name: 'android/colors',
  format: ({ dictionary }) => {
    let output = `<?xml version="1.0" encoding="utf-8"?>\n`;
    output += `<!-- Auto-generated from Figma. Do not edit manually. -->\n`;
    output += `<resources>\n`;

    dictionary.allTokens
      .filter(t => t.type === 'color')
      .forEach(token => {
        output += `    <color name="angel_${token.name}">${token.value}</color>\n`;
      });

    output += `</resources>\n`;
    return output;
  }
});

// Custom format for XAML (Xbox)
StyleDictionary.registerFormat({
  name: 'xaml/resourceDictionary',
  format: ({ dictionary }) => {
    let output = `<!-- Auto-generated from Figma. Do not edit manually. -->\n`;
    output += `<ResourceDictionary\n`;
    output += `    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"\n`;
    output += `    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml">\n\n`;

    dictionary.allTokens
      .filter(t => t.type === 'color')
      .forEach(token => {
        output += `    <Color x:Key="Angel${token.name}">${token.value}</Color>\n`;
      });

    output += `\n</ResourceDictionary>\n`;
    return output;
  }
});

export default {
  source: ['tokens/**/*.json'],
  platforms: {
    // ═══════════════════════════════════════════════════
    // REACT NATIVE
    // ═══════════════════════════════════════════════════
    'react-native': {
      transformGroup: 'js',
      buildPath: '../tokens-react-native/src/',
      files: [
        { destination: 'colors.ts', format: 'javascript/es6', filter: { type: 'color' } },
        { destination: 'spacing.ts', format: 'javascript/es6', filter: { type: 'spacing' } },
        { destination: 'typography.ts', format: 'javascript/es6', filter: { type: 'typography' } },
        { destination: 'index.ts', format: 'javascript/es6' },
      ],
    },

    // ═══════════════════════════════════════════════════
    // REACT WEB
    // ═══════════════════════════════════════════════════
    'web-css': {
      transformGroup: 'css',
      buildPath: '../tokens-web/src/',
      files: [
        { destination: 'variables.css', format: 'css/variables', options: { outputReferences: true } },
      ],
    },
    'web-scss': {
      transformGroup: 'scss',
      buildPath: '../tokens-web/src/',
      files: [
        { destination: '_variables.scss', format: 'scss/variables' },
      ],
    },
    'web-ts': {
      transformGroup: 'js',
      buildPath: '../tokens-web/src/',
      files: [
        { destination: 'tokens.ts', format: 'javascript/es6' },
      ],
    },

    // ═══════════════════════════════════════════════════
    // ROKU (BrightScript)
    // ═══════════════════════════════════════════════════
    'roku': {
      transformGroup: 'js',
      buildPath: '../tokens-roku/src/',
      files: [
        { destination: 'AngelTokens.brs', format: 'brightscript/constants' },
        { destination: 'tokens.json', format: 'json/nested' },
      ],
    },

    // ═══════════════════════════════════════════════════
    // APPLE tvOS (Swift)
    // ═══════════════════════════════════════════════════
    'tvos': {
      transformGroup: 'ios-swift',
      buildPath: '../tokens-tvos/Sources/AngelTokens/',
      files: [
        { destination: 'Colors.swift', format: 'swift/extension', filter: { type: 'color' } },
        { destination: 'Spacing.swift', format: 'ios-swift/class.swift', filter: { type: 'spacing' } },
      ],
    },

    // ═══════════════════════════════════════════════════
    // ANDROID FIRE TV (XML + Kotlin)
    // ═══════════════════════════════════════════════════
    'android-xml': {
      transformGroup: 'android',
      buildPath: '../tokens-android-tv/src/main/res/values/',
      files: [
        { destination: 'colors.xml', format: 'android/colors' },
        { destination: 'dimens.xml', format: 'android/dimens' },
      ],
    },
    'android-compose': {
      transformGroup: 'compose',
      buildPath: '../tokens-android-tv/src/main/kotlin/',
      files: [
        { destination: 'AngelTokens.kt', format: 'compose/object' },
      ],
    },

    // ═══════════════════════════════════════════════════
    // XBOX (XAML)
    // ═══════════════════════════════════════════════════
    'xbox': {
      transformGroup: 'js',
      buildPath: '../tokens-xbox/Themes/',
      files: [
        { destination: 'AngelColors.xaml', format: 'xaml/resourceDictionary', filter: { type: 'color' } },
      ],
    },

    // ═══════════════════════════════════════════════════
    // WEB-BASED TV (Vizio, XumoTV)
    // ═══════════════════════════════════════════════════
    'web-tv': {
      transformGroup: 'css',
      buildPath: '../tokens-web-tv/src/',
      files: [
        { destination: 'variables.css', format: 'css/variables', options: { outputReferences: true } },
        { destination: 'tokens.js', format: 'javascript/es6' },
      ],
    },
  },
};
```

---

## GitHub Actions Workflow

**`.github/workflows/build-tokens.yml`**

```yaml
name: Build Design Tokens

on:
  push:
    paths:
      - 'packages/tokens/tokens/**'
      - 'packages/tokens/fonts/**'
    branches:
      - main
  pull_request:
    paths:
      - 'packages/tokens/tokens/**'
      - 'packages/tokens/fonts/**'

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 9

      - name: Install dependencies
        run: pnpm install

      - name: Build all platform tokens
        run: pnpm --filter @angel/tokens build

      - name: Copy fonts to platform packages
        run: |
          # React Native (TTF)
          cp -r packages/tokens/fonts/ttf/* packages/tokens-react-native/fonts/

          # React Web (WOFF2)
          cp -r packages/tokens/fonts/web/* packages/tokens-web/fonts/

          # Roku (TTF)
          cp -r packages/tokens/fonts/ttf/* packages/tokens-roku/fonts/

          # Apple tvOS (TTF)
          cp -r packages/tokens/fonts/ttf/* packages/tokens-tvos/Resources/Fonts/

          # Android Fire TV (TTF)
          cp -r packages/tokens/fonts/ttf/* packages/tokens-android-tv/src/main/res/font/

          # Xbox (TTF)
          cp -r packages/tokens/fonts/ttf/* packages/tokens-xbox/Fonts/

          # Web TV (WOFF2)
          cp -r packages/tokens/fonts/web/* packages/tokens-web-tv/fonts/

      - name: Upload build artifacts
        uses: actions/upload-artifact@v4
        with:
          name: generated-tokens
          path: |
            packages/tokens-react-native/
            packages/tokens-web/
            packages/tokens-roku/
            packages/tokens-tvos/
            packages/tokens-android-tv/
            packages/tokens-xbox/
            packages/tokens-web-tv/

      - name: Commit generated files
        if: github.event_name == 'push' && github.ref == 'refs/heads/main'
        run: |
          git config --local user.email "github-actions[bot]@users.noreply.github.com"
          git config --local user.name "github-actions[bot]"
          git add packages/tokens-*/
          git diff --staged --quiet || git commit -m "chore: regenerate platform tokens from Figma export"
          git push

      # ═══════════════════════════════════════════════════════════════
      # TRIGGER APP REBUILDS (Maximum Automation)
      # ═══════════════════════════════════════════════════════════════
      - name: Trigger app rebuilds
        if: github.event_name == 'push' && github.ref == 'refs/heads/main'
        run: |
          # Trigger rebuilds for all platform apps
          gh workflow run deploy-react-native.yml
          gh workflow run deploy-react-web.yml
          gh workflow run deploy-roku.yml
          gh workflow run deploy-tvos.yml
          gh workflow run deploy-android-tv.yml
          gh workflow run deploy-xbox.yml
          gh workflow run deploy-web-tv.yml
        env:
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

---

## 🚀 Maximum Automation: Auto-Deploy on Token Changes

### How It Works

When you update tokens in Figma and merge the PR, **all apps automatically rebuild and deploy to staging** - no developer intervention required.

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                        FULLY AUTOMATED FLOW                                     │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  YOU: Change button color in Figma (black → dark gray)                          │
│                           │                                                     │
│                           ▼                                                     │
│  YOU: Export tokens & upload to GitHub PR (2 min)                               │
│                           │                                                     │
│                           ▼                                                     │
│  YOU: Merge PR ─────────────────────────────────────────────────────────────    │
│                           │                                                     │
│                           ▼                                                     │
│  ┌─────────────────────────────────────────────────────────────────────────┐    │
│  │                    AUTOMATIC (No Developer Action)                      │    │
│  ├─────────────────────────────────────────────────────────────────────────┤    │
│  │                                                                         │    │
│  │  1. GitHub Action: Build tokens for all 8 platforms (~2 min)            │    │
│  │                           │                                             │    │
│  │                           ▼                                             │    │
│  │  2. GitHub Action: Trigger app rebuild workflows                        │    │
│  │                           │                                             │    │
│  │           ┌───────────────┼───────────────┬───────────────┐             │    │
│  │           ▼               ▼               ▼               ▼             │    │
│  │     ┌──────────┐   ┌──────────┐   ┌──────────┐   ┌──────────┐          │    │
│  │     │  React   │   │  React   │   │   Roku   │   │  tvOS    │          │    │
│  │     │  Native  │   │   Web    │   │          │   │          │          │    │
│  │     └────┬─────┘   └────┬─────┘   └────┬─────┘   └────┬─────┘          │    │
│  │          │              │              │              │                 │    │
│  │           ▼               ▼               ▼               ▼             │    │
│  │     ┌──────────┐   ┌──────────┐   ┌──────────┐   ┌──────────┐          │    │
│  │     │ Android  │   │   Xbox   │   │  Vizio   │   │  Xumo    │          │    │
│  │     │ Fire TV  │   │          │   │          │   │          │          │    │
│  │     └────┬─────┘   └────┬─────┘   └────┬─────┘   └────┬─────┘          │    │
│  │          │              │              │              │                 │    │
│  │          └──────────────┴──────────────┴──────────────┘                 │    │
│  │                                  │                                      │    │
│  │                                  ▼                                      │    │
│  │  3. All apps deploy to STAGING environment (~10-15 min total)           │    │
│  │                                                                         │    │
│  └─────────────────────────────────────────────────────────────────────────┘    │
│                           │                                                     │
│                           ▼                                                     │
│  YOU: Verify changes in staging (visual QA)                                     │
│                           │                                                     │
│                           ▼                                                     │
│  YOU: Approve production deploy (or auto-promote after 24h)                     │
│                           │                                                     │
│                           ▼                                                     │
│  ALL APPS LIVE WITH NEW BUTTON COLOR 🎉                                         │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### Platform-Specific Deploy Workflows

**`.github/workflows/deploy-react-native.yml`**
```yaml
name: Deploy React Native App

on:
  workflow_dispatch:  # Triggered by token build
  workflow_call:      # Can be called from other workflows

jobs:
  build-ios:
    runs-on: macos-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: |
          cd apps/mobile
          npm ci

      - name: Install CocoaPods
        run: |
          cd apps/mobile/ios
          pod install

      - name: Build iOS (Staging)
        run: |
          cd apps/mobile/ios
          xcodebuild -workspace Angel.xcworkspace \
            -scheme Angel-Staging \
            -configuration Release \
            -archivePath $PWD/build/Angel.xcarchive \
            archive

      - name: Upload to TestFlight
        run: |
          xcrun altool --upload-app \
            -f $PWD/build/Angel.ipa \
            -t ios \
            --apiKey ${{ secrets.APP_STORE_API_KEY }} \
            --apiIssuer ${{ secrets.APP_STORE_API_ISSUER }}

  build-android:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Java
        uses: actions/setup-java@v4
        with:
          java-version: '17'
          distribution: 'temurin'

      - name: Build Android (Staging)
        run: |
          cd apps/mobile/android
          ./gradlew assembleStaging

      - name: Upload to Play Store (Internal Track)
        uses: r0adkll/upload-google-play@v1
        with:
          serviceAccountJsonPlainText: ${{ secrets.GOOGLE_PLAY_SERVICE_ACCOUNT }}
          packageName: com.angelstudios.app
          releaseFiles: apps/mobile/android/app/build/outputs/apk/staging/*.apk
          track: internal
```

**`.github/workflows/deploy-react-web.yml`**
```yaml
name: Deploy React Web

on:
  workflow_dispatch:
  workflow_call:

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install & Build
        run: |
          cd apps/web
          npm ci
          npm run build

      - name: Deploy to Staging (Vercel/Netlify/AWS)
        run: |
          # Example: Vercel
          npx vercel --prod --token=${{ secrets.VERCEL_TOKEN }}

          # Or AWS S3 + CloudFront
          # aws s3 sync ./dist s3://angel-staging-web --delete
          # aws cloudfront create-invalidation --distribution-id ${{ secrets.CF_DIST_ID }} --paths "/*"
```

**`.github/workflows/deploy-roku.yml`**
```yaml
name: Deploy Roku App

on:
  workflow_dispatch:
  workflow_call:

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Package Roku Channel
        run: |
          cd apps/roku
          # Copy latest tokens
          cp -r ../../packages/tokens-roku/src/* source/tokens/
          cp -r ../../packages/tokens-roku/fonts/* fonts/
          # Create signed package
          zip -r angel-staging.zip . -x "*.git*"

      - name: Upload to Roku Developer Dashboard
        run: |
          # Roku uses a web-based submission, but you can automate via API
          curl -X POST "https://apipub.roku.com/developer/v1/channels/$CHANNEL_ID/builds" \
            -H "Authorization: Bearer ${{ secrets.ROKU_API_KEY }}" \
            -F "package=@angel-staging.zip" \
            -F "environment=staging"
```

**`.github/workflows/deploy-tvos.yml`**
```yaml
name: Deploy tvOS App

on:
  workflow_dispatch:
  workflow_call:

jobs:
  deploy:
    runs-on: macos-latest
    steps:
      - uses: actions/checkout@v4

      - name: Build tvOS (Staging)
        run: |
          cd apps/tvos
          xcodebuild -workspace Angel.xcworkspace \
            -scheme Angel-tvOS-Staging \
            -destination 'platform=tvOS Simulator,name=Apple TV' \
            -configuration Release \
            archive -archivePath $PWD/build/Angel-tvOS.xcarchive

      - name: Upload to TestFlight
        run: |
          xcrun altool --upload-app \
            -f $PWD/build/Angel-tvOS.ipa \
            -t appletvos \
            --apiKey ${{ secrets.APP_STORE_API_KEY }} \
            --apiIssuer ${{ secrets.APP_STORE_API_ISSUER }}
```

**`.github/workflows/deploy-android-tv.yml`**
```yaml
name: Deploy Android Fire TV

on:
  workflow_dispatch:
  workflow_call:

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Java
        uses: actions/setup-java@v4
        with:
          java-version: '17'
          distribution: 'temurin'

      - name: Build Fire TV APK
        run: |
          cd apps/fire-tv
          ./gradlew assembleStaging

      - name: Upload to Amazon Appstore
        run: |
          # Amazon has an API for submissions
          curl -X POST "https://developer.amazon.com/api/appstore/v1/applications/$APP_ID/edits" \
            -H "Authorization: Bearer ${{ secrets.AMAZON_API_TOKEN }}" \
            -F "apk=@app/build/outputs/apk/staging/app-staging.apk"
```

**`.github/workflows/deploy-web-tv.yml`** (Vizio, XumoTV)
```yaml
name: Deploy Web TV Apps

on:
  workflow_dispatch:
  workflow_call:

jobs:
  deploy-vizio:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Build Vizio App
        run: |
          cd apps/vizio
          npm ci
          npm run build

      - name: Deploy to Vizio Staging
        run: |
          # Vizio uses hosted web apps - deploy to your staging CDN
          aws s3 sync ./dist s3://angel-vizio-staging --delete

      - name: Notify Vizio (if required)
        run: |
          # Some platforms require notifying them of new builds
          echo "Vizio staging updated - verify at staging URL"

  deploy-xumo:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Build XumoTV App
        run: |
          cd apps/xumo
          npm ci
          npm run build

      - name: Deploy to Xumo Staging
        run: |
          aws s3 sync ./dist s3://angel-xumo-staging --delete
```

### Slack Notifications

**`.github/workflows/notify-token-update.yml`**
```yaml
name: Notify Token Updates

on:
  push:
    paths:
      - 'packages/tokens/tokens/**'
    branches:
      - main

jobs:
  notify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 2

      - name: Get changed files
        id: changes
        run: |
          CHANGED=$(git diff --name-only HEAD~1 HEAD -- packages/tokens/tokens/ | tr '\n' ', ')
          echo "files=$CHANGED" >> $GITHUB_OUTPUT

      - name: Send Slack notification
        uses: slackapi/slack-github-action@v1
        with:
          payload: |
            {
              "channel": "#design-system",
              "username": "Design Tokens Bot",
              "icon_emoji": ":art:",
              "blocks": [
                {
                  "type": "header",
                  "text": {
                    "type": "plain_text",
                    "text": "🎨 Design Tokens Updated"
                  }
                },
                {
                  "type": "section",
                  "text": {
                    "type": "mrkdwn",
                    "text": "*Files changed:*\n${{ steps.changes.outputs.files }}"
                  }
                },
                {
                  "type": "section",
                  "text": {
                    "type": "mrkdwn",
                    "text": "All apps are rebuilding and will deploy to staging automatically.\n\n*Expected completion:* ~15 minutes"
                  }
                },
                {
                  "type": "actions",
                  "elements": [
                    {
                      "type": "button",
                      "text": {
                        "type": "plain_text",
                        "text": "View Build Status"
                      },
                      "url": "${{ github.server_url }}/${{ github.repository }}/actions"
                    }
                  ]
                }
              ]
            }
        env:
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}
```

### Staging → Production Promotion

**`.github/workflows/promote-to-production.yml`**
```yaml
name: Promote to Production

on:
  workflow_dispatch:
    inputs:
      confirm:
        description: 'Type "PROMOTE" to confirm production deployment'
        required: true

jobs:
  promote:
    runs-on: ubuntu-latest
    if: github.event.inputs.confirm == 'PROMOTE'
    steps:
      - name: Promote React Web
        run: |
          # Copy staging to production
          aws s3 sync s3://angel-staging-web s3://angel-production-web
          aws cloudfront create-invalidation --distribution-id ${{ secrets.CF_PROD_DIST_ID }} --paths "/*"

      - name: Promote Vizio
        run: |
          aws s3 sync s3://angel-vizio-staging s3://angel-vizio-production

      - name: Promote XumoTV
        run: |
          aws s3 sync s3://angel-xumo-staging s3://angel-xumo-production

      - name: Notify completion
        uses: slackapi/slack-github-action@v1
        with:
          payload: |
            {
              "channel": "#design-system",
              "text": "✅ All web apps promoted to production!"
            }
        env:
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}

      # Note: Mobile/TV native apps typically go through app store review
      # before production. TestFlight/Play Store internal tracks serve as staging.
```

### Environment Strategy

| Platform | Staging | Production | Notes |
|----------|---------|------------|-------|
| **React Native iOS** | TestFlight (Internal) | App Store | Requires Apple review |
| **React Native Android** | Play Store (Internal) | Play Store | Can promote instantly |
| **React Web** | staging.angel.com | angel.com | Instant promotion |
| **Roku** | Staging Channel | Production Channel | Roku review required |
| **Apple tvOS** | TestFlight | App Store | Apple review required |
| **Android Fire TV** | Amazon Internal | Amazon Appstore | Amazon review required |
| **Xbox** | Partner Center (Test) | Microsoft Store | MS review required |
| **Vizio** | staging-vizio.angel.com | vizio.angel.com | Instant promotion |
| **XumoTV** | staging-xumo.angel.com | xumo.angel.com | Instant promotion |

### Timeline: Token Change → All Platforms Updated

| Step | Time | Who |
|------|------|-----|
| Edit tokens in Figma | ~5 min | You |
| Export & upload to GitHub | ~2 min | You |
| Review & merge PR | ~5 min | You/Team |
| Build tokens for all platforms | ~2 min | Automatic |
| Rebuild all apps | ~10 min | Automatic |
| Deploy to staging | ~3 min | Automatic |
| **Total to staging** | **~25 min** | **Mostly automatic** |
| Verify in staging | ~10 min | You |
| Promote to production | ~5 min | You (one click) |
| **Total to production** | **~40 min** | - |

---

## Designer Workflow

### Step-by-Step Export Process

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  DESIGNER WORKFLOW - Exporting Tokens from Figma                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  1. MAKE CHANGES in Figma                                                   │
│     • Update Variables (colors, spacing, etc.)                              │
│     • Update typography styles                                              │
│     • Test changes in components                                            │
│                                │                                            │
│                                ▼                                            │
│  2. EXPORT TOKENS                                                           │
│     • Open Plugins → "Design Tokens (W3C) Export"                           │
│     • Select all Variable Collections                                       │
│     • Click Export → Download .zip                                          │
│                                │                                            │
│                                ▼                                            │
│  3. UPLOAD TO GITHUB                                                        │
│     • Go to: github.com/angelstudios/design-system                          │
│     • Navigate to: packages/tokens/tokens/                                  │
│     • Click "Add file" → "Upload files"                                     │
│     • Drag exported JSON files                                              │
│     • Select "Create a new branch and start a pull request"                 │
│                                │                                            │
│                                ▼                                            │
│  4. CREATE PULL REQUEST                                                     │
│     • Title: "Update design tokens: [description]"                          │
│     • Describe what changed (e.g., "Updated brand blue color")              │
│     • Submit PR                                                             │
│                                │                                            │
│                                ▼                                            │
│  5. AUTOMATIC BUILD (GitHub Actions)                                        │
│     • Tokens transformed for all 8 platforms                                │
│     • Fonts copied to each package                                          │
│     • Build artifacts available for preview                                 │
│                                │                                            │
│                                ▼                                            │
│  6. REVIEW & MERGE                                                          │
│     • Developer reviews generated files                                     │
│     • Merge to main branch                                                  │
│     • All platform packages updated                                         │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Updating Fonts

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  UPDATING FONTS                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  1. PREPARE FONT FILES                                                      │
│     • TTF files for native apps                                             │
│     • WOFF2/WOFF files for web (use tools like transfonter.org)             │
│                                                                             │
│  2. UPLOAD TO GITHUB                                                        │
│     • Navigate to: packages/tokens/fonts/                                   │
│     • Upload TTF to fonts/ttf/                                              │
│     • Upload WOFF2 to fonts/web/                                            │
│                                                                             │
│  3. CREATE PR                                                               │
│     • GitHub Actions will copy fonts to all platform packages               │
│                                                                             │
│  4. MERGE                                                                   │
│     • All platforms now have updated fonts                                  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Developer Integration Guide

### React Native

```typescript
// Install: npm install @angel/tokens-react-native

import { colors, typography, spacing } from '@angel/tokens-react-native';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundPrimary,
    padding: spacing.md,
  },
  title: {
    color: colors.textPrimary,
    fontFamily: typography.fontFamily.primaryBold,
    fontSize: typography.fontSize['2xl'],
  },
});
```

### React Web

```tsx
// Install: npm install @angel/tokens-web

// Option 1: CSS Variables
import '@angel/tokens-web/variables.css';
import '@angel/tokens-web/fonts.css';

// Option 2: TypeScript
import { tokens } from '@angel/tokens-web';

const Button = styled.button`
  background: var(--angel-color-brand-primary);
  padding: var(--angel-spacing-md);
  font-family: var(--angel-font-family);
`;
```

### Roku

```brightscript
' Copy tokens-roku/src/ to your Roku project

' In your component:
sub init()
    tokens = AngelTokens()
    m.top.backgroundColor = tokens.colors.backgroundPrimary

    label = m.top.findNode("titleLabel")
    label.font.uri = tokens.typography.fontFamily
    label.font.size = tokens.typography.fontSizeLg
    label.color = tokens.colors.textPrimary
end sub
```

### Apple tvOS

```swift
// Add Swift Package: https://github.com/angelstudios/tokens-tvos

import AngelTokens
import SwiftUI

struct ContentView: View {
    var body: some View {
        Text("Hello Angel")
            .foregroundColor(Color.Angel.textPrimary)
            .font(Font.Angel.headline())
            .padding(AngelSpacing.lg)
            .background(Color.Angel.backgroundPrimary)
    }
}
```

### Android Fire TV

```kotlin
// Add dependency in build.gradle

// XML Usage
<TextView
    android:textColor="@color/angel_text_primary"
    android:textSize="@dimen/angel_font_size_lg"
    android:fontFamily="@font/angelsans_regular"
    android:padding="@dimen/angel_spacing_md" />

// Jetpack Compose Usage
Text(
    text = "Hello Angel",
    color = AngelTokens.Colors.TextPrimary,
    fontSize = AngelTokens.Typography.FontSizeLg,
    modifier = Modifier.padding(AngelTokens.Spacing.Md)
)
```

### Xbox

```xml
<!-- Add reference to AngelTokens package -->

<Page.Resources>
    <ResourceDictionary>
        <ResourceDictionary.MergedDictionaries>
            <ResourceDictionary Source="ms-appx:///AngelTokens/Themes/AngelTheme.xaml"/>
        </ResourceDictionary.MergedDictionaries>
    </ResourceDictionary>
</Page.Resources>

<TextBlock
    Style="{StaticResource AngelHeadlineTextStyle}"
    Foreground="{StaticResource AngelTextPrimaryBrush}"/>
```

### Vizio / XumoTV

```javascript
// Import in your web app
import { AngelTokens } from '@angel/tokens-web-tv';
import '@angel/tokens-web-tv/variables.css';
import '@angel/tokens-web-tv/fonts.css';
import '@angel/tokens-web-tv/tv-overrides.css';

// Use CSS Variables
document.body.style.backgroundColor = 'var(--angel-color-bg-primary)';

// Or JavaScript
element.style.color = AngelTokens.colors.textPrimary;
```

---

## Implementation Checklist

### Phase 1: Repository Setup
- [ ] Create monorepo structure
- [ ] Initialize pnpm workspace
- [ ] Create all platform package directories
- [ ] Add Style Dictionary with custom formatters

### Phase 2: Figma Setup
- [ ] Install "Design Tokens (W3C) Export" plugin
- [ ] Organize Variables in Collections
- [ ] Export initial token set
- [ ] Upload to GitHub

### Phase 3: Font Setup
- [ ] Gather TTF source files
- [ ] Generate WOFF2/WOFF web fonts
- [ ] Upload to `packages/tokens/fonts/`
- [ ] Verify font copying in build

### Phase 4: Build Pipeline
- [ ] Configure Style Dictionary for all 8 platforms
- [ ] Create GitHub Actions workflow
- [ ] Test token generation locally
- [ ] Verify all platform outputs

### Phase 5: Platform Integration
- [ ] Test React Native integration
- [ ] Test React Web integration
- [ ] Test Roku integration
- [ ] Test Apple tvOS integration
- [ ] Test Android Fire TV integration
- [ ] Test Xbox integration
- [ ] Test Vizio/XumoTV integration

### Phase 6: Documentation
- [ ] Create platform-specific README files
- [ ] Document designer workflow
- [ ] Create developer integration guides

---

## Future Enhancements

| Enhancement | Description | Effort |
|-------------|-------------|--------|
| **Custom Figma Plugin** | Auto-push to GitHub on publish | Medium |
| **Slack Notifications** | Alert on token changes | Low |
| **Visual Diff Preview** | Show color/type changes in PR | Medium |
| **Token Documentation Site** | Auto-generated Storybook/docs | Medium |
| **Semantic Versioning** | Version token packages | Low |
| **Theme Preview Tool** | Preview themes across platforms | High |

---

## Sources

- [Design Tokens (W3C) Export Plugin](https://www.figma.com/community/plugin/1377982390646186215)
- [Style Dictionary Documentation](https://styledictionary.com/)
- [Roku BrightScript Developer Docs](https://developer.roku.com/docs/developer-program/dev-tools/brightscript-doc.md)
- [Apple tvOS SwiftUI Development](https://developer.apple.com/tvos/)
- [Android Fire TV Development](https://developer.amazon.com/docs/fire-tv/toolkits-for-building-fire-tv-apps.html)
- [Xbox UWP Development](https://learn.microsoft.com/en-us/windows/uwp/apps-for-xbox/)
- [Vizio SmartCast Development](https://developer.vizio.com/)
- [SwiftUI Design Tokens Guide](https://dev.to/sebastienlato/swiftui-design-tokens-theming-system-production-scale-b16)
- [Android Design Tokens with Style Dictionary](https://blogs.halodoc.io/simplifying-android-apps-design-with-design-tokens/)
