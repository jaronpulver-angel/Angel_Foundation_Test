# Consumption Guide

## Overview

This guide explains how developers on each platform consume Angel design tokens. Find your platform below and follow the instructions to integrate tokens into your codebase.

---

## Quick Reference

| Platform | Package | Import |
|----------|---------|--------|
| React Native | `@angel/tokens-react-native` | `import { tokens } from '@angel/tokens-react-native'` |
| React Web | `@angel/tokens-web` | `@import '@angel/tokens-web/tokens.css'` |
| Roku | `packages/roku` | `m.tokens = AngelTokens()` |
| tvOS | `AngelTokens (SPM)` | `import AngelTokens` |
| Android TV | `angel-tokens` (Maven) | `R.color.color_accent_600` |
| Xbox | `AngelTokens` (NuGet) | `{StaticResource ColorAccent600}` |
| Vizio/Xumo | `@angel/tokens-web-tv` | `import tokens from '@angel/tokens-web-tv'` |

---

## React Native

### Installation

```bash
npm install @angel/tokens-react-native
# or
yarn add @angel/tokens-react-native
```

### Basic Usage

```typescript
import { tokens } from '@angel/tokens-react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: tokens.surface.default,
    padding: tokens.spacing.md,  // 10
  },
  title: {
    color: tokens.text.primary,
    fontSize: tokens.font.size.heading.h1,  // 40
    fontWeight: tokens.font.weight.bold,
  },
  button: {
    backgroundColor: tokens.component.button.emphasis.primary.background,
    borderRadius: tokens.button.size.md.border_radius,  // 12
    paddingVertical: tokens.button.size.md.padding_vertical,  // 13
    paddingHorizontal: tokens.button.size.md.padding_horizontal,  // 12
    height: tokens.button.size.md.height,  // 40
  },
  buttonText: {
    color: tokens.component.button.emphasis.primary.text,
    fontSize: tokens.button.size.md.font_size,  // 14
  },
});
```

### Accessing Color Scales

```typescript
import { tokens } from '@angel/tokens-react-native';

// Base colors (50-1000 scale)
tokens.color.neutral[500]      // '#9d9c9b'
tokens.color.accent[600]       // '#16b087'
tokens.color.danger[500]       // '#f45a3b'
tokens.color.guild[500]        // '#c85a23'

// Semantic colors (themed)
tokens.surface.default         // white in light mode
tokens.text.primary            // black in light mode
tokens.divider.normal          // subtle black

// Component colors
tokens.component.button.emphasis.primary.background
tokens.component.button.emphasis.primary.background_hover
tokens.component.button.emphasis.brand.background
```

### Spacing Scale

```typescript
// Small values (mobile/web)
tokens.spacing.xs    // 6
tokens.spacing.sm    // 8
tokens.spacing.md    // 10
tokens.spacing.lg    // 12
tokens.spacing.xl    // 14
tokens.spacing['2xl'] // 16
tokens.spacing['4xl'] // 24

// Large values (TV)
tokens.spacing['9xl']  // 44
tokens.spacing['12xl'] // 64
tokens.spacing['27xl'] // 384
```

### Button Sizes

```typescript
// Button size tokens include everything needed
const buttonMd = {
  height: tokens.button.size.md.height,                    // 40
  paddingH: tokens.button.size.md.padding_horizontal,      // 12
  paddingV: tokens.button.size.md.padding_vertical,        // 13
  borderRadius: tokens.button.size.md.border_radius,       // 12
  fontSize: tokens.button.size.md.font_size,               // 14
  lineHeight: tokens.button.size.md.font_line_height,      // 14
  iconSize: tokens.button.size.md.icon_height,             // 14
};

// Available sizes: xs, sm, md, lg, xl
```

### Font Setup

```typescript
// App.tsx - Load Angel Sans fonts
import { useFonts } from 'expo-font';

export default function App() {
  const [fontsLoaded] = useFonts({
    'AngelSans-Medium': require('@angel/fonts/AngelSans-Medium.ttf'),
    'AngelSans-Semibold': require('@angel/fonts/AngelSans-Semibold.ttf'),
    'AngelSans-Bold': require('@angel/fonts/AngelSans-Bold.ttf'),
  });

  if (!fontsLoaded) return null;
  return <AppContent />;
}
```

---

## React Web

### Installation

```bash
npm install @angel/tokens-web
```

### CSS Variables

```css
/* Import tokens */
@import '@angel/tokens-web/tokens.css';

/* Use CSS variables */
.button-primary {
  background-color: var(--component-button-emphasis-primary-background);
  color: var(--component-button-emphasis-primary-text);
  height: var(--button-size-md-height);
  padding: var(--button-size-md-padding-vertical) var(--button-size-md-padding-horizontal);
  border-radius: var(--button-size-md-border-radius);
  font-size: var(--button-size-md-font-size);
}

.button-primary:hover {
  background-color: var(--component-button-emphasis-primary-background-hover);
}

.button-primary:disabled {
  background-color: var(--component-button-emphasis-primary-background-disabled);
  color: var(--component-button-emphasis-primary-text-disabled);
}
```

### Spacing

```css
.card {
  padding: var(--spacing-lg);        /* 12px */
  margin-bottom: var(--spacing-4xl); /* 24px */
  border-radius: var(--border-radius-rounded-lg);  /* 12px */
}

.card-title {
  color: var(--text-primary);
  font-size: var(--font-size-heading-h3);
  margin-bottom: var(--spacing-sm);  /* 8px */
}

.card-body {
  color: var(--text-secondary);
  font-size: var(--font-size-body-md);
}
```

### SCSS Variables

```scss
@import '@angel/tokens-web/tokens.scss';

.card {
  background: $surface-default;
  border: 1px solid $divider-normal;
  border-radius: $border-radius-rounded-lg;
  padding: $spacing-lg;
}
```

### Tailwind CSS Integration

```javascript
// tailwind.config.js
const tokens = require('@angel/tokens-web/tokens.js');

module.exports = {
  theme: {
    extend: {
      colors: {
        neutral: {
          50: tokens.colorNeutral50,
          500: tokens.colorNeutral500,
          1000: tokens.colorNeutral1000,
        },
        accent: {
          600: tokens.colorAccent600,
        },
        surface: {
          DEFAULT: tokens.surfaceDefault,
        },
        'text-primary': tokens.textPrimary,
      },
      spacing: {
        'token-sm': `${tokens.spacingSm}px`,
        'token-md': `${tokens.spacingMd}px`,
        'token-lg': `${tokens.spacingLg}px`,
      },
    },
  },
};
```

### Font Setup

```css
@font-face {
  font-family: 'Angel Sans';
  src: url('@angel/fonts/AngelSans-Medium.woff2') format('woff2');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Angel Sans';
  src: url('@angel/fonts/AngelSans-Bold.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

body {
  font-family: var(--font-family-body);
}
```

---

## Roku (BrightScript)

### Setup

Copy `AngelTokens.brs` to your `source/` directory.

### Basic Usage

```brightscript
sub init()
    m.tokens = AngelTokens()
end sub

function createPrimaryButton() as object
    button = m.top.createChild("Rectangle")

    ' Use component colors
    button.color = m.tokens.ComponentButtonEmphasisPrimaryBackground

    ' Use button sizing
    button.height = m.tokens.ButtonSizeLgHeight  ' 48
    button.width = 200

    ' Create text label
    label = button.createChild("Label")
    label.color = m.tokens.ComponentButtonEmphasisPrimaryText
    label.font.size = m.tokens.ButtonSizeLgFontSize  ' 16

    return button
end function
```

### Spacing for TV

```brightscript
function createContentRow() as object
    row = m.top.createChild("RowList")

    ' Use larger spacing for TV (10-foot UI)
    row.itemSpacing = [m.tokens.Spacing4xl, 0]  ' 24px gap
    row.translation = [m.tokens.Spacing10xl, m.tokens.Spacing6xl]  ' Safe margins

    return row
end function
```

### Focus States

```brightscript
function onFocusChange()
    if m.top.hasFocus()
        ' Apply focus styling
        m.background.color = m.tokens.ColorAccent600
    else
        m.background.color = m.tokens.SurfaceDefault
    end if
end function
```

---

## tvOS (Swift)

### Installation (Swift Package Manager)

```swift
// Package.swift
dependencies: [
    .package(url: "https://github.com/angel-studios/angel-design-tokens", from: "1.0.0")
]
```

### Basic Usage

```swift
import SwiftUI
import AngelTokens

struct PrimaryButton: View {
    let title: String
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            Text(title)
                .font(.system(size: AngelTokens.Button.Size.lg.fontSize))  // 16
                .foregroundColor(AngelTokens.Component.Button.Emphasis.primary.text)
        }
        .frame(height: AngelTokens.Button.Size.lg.height)  // 48
        .padding(.horizontal, AngelTokens.Button.Size.lg.paddingHorizontal)  // 14
        .background(AngelTokens.Component.Button.Emphasis.primary.background)
        .cornerRadius(AngelTokens.Button.Size.lg.borderRadius)  // 14
    }
}
```

### Colors

```swift
// Base colors
AngelTokens.Color.neutral500    // #9d9c9b
AngelTokens.Color.accent600     // #16b087
AngelTokens.Color.danger500     // #f45a3b

// Semantic colors
AngelTokens.Surface.default     // themed
AngelTokens.Text.primary        // themed
AngelTokens.Text.secondary      // themed
```

### Spacing

```swift
// Standard spacing
AngelTokens.Spacing.sm    // 8
AngelTokens.Spacing.md    // 10
AngelTokens.Spacing.lg    // 12

// TV spacing (larger)
AngelTokens.Spacing.xl9   // 44
AngelTokens.Spacing.xl12  // 64
```

### Focus States

```swift
struct FocusableCard: View {
    @FocusState private var isFocused: Bool

    var body: some View {
        VStack { /* content */ }
            .focusable()
            .focused($isFocused)
            .overlay(
                RoundedRectangle(cornerRadius: AngelTokens.BorderRadius.roundedLg)
                    .stroke(
                        isFocused ? AngelTokens.Color.accent600 : .clear,
                        lineWidth: 4
                    )
            )
            .scaleEffect(isFocused ? 1.05 : 1.0)
            .animation(.easeOut(duration: 0.15), value: isFocused)
    }
}
```

---

## Android TV (Kotlin)

### Installation (Gradle)

```groovy
dependencies {
    implementation 'com.angelstudios:angel-tokens:1.0.0'
}
```

### Colors

```kotlin
// In code
val primaryBg = ContextCompat.getColor(context, R.color.component_button_emphasis_primary_background)
val accentColor = ContextCompat.getColor(context, R.color.color_accent_600)

// In XML
<Button
    android:background="@color/component_button_emphasis_primary_background"
    android:textColor="@color/component_button_emphasis_primary_text" />
```

### Dimensions

```kotlin
// In code
val buttonHeight = resources.getDimensionPixelSize(R.dimen.button_size_lg_height)  // 48dp
val paddingMd = resources.getDimensionPixelSize(R.dimen.spacing_md)  // 10dp

// In XML
<Button
    android:layout_height="@dimen/button_size_lg_height"
    android:paddingHorizontal="@dimen/button_size_lg_padding_horizontal"
    android:textSize="@dimen/button_size_lg_font_size" />
```

### Complete Button Example

```xml
<Button
    android:layout_width="wrap_content"
    android:layout_height="@dimen/button_size_lg_height"
    android:paddingStart="@dimen/button_size_lg_padding_horizontal"
    android:paddingEnd="@dimen/button_size_lg_padding_horizontal"
    android:background="@drawable/button_primary_background"
    android:textColor="@color/component_button_emphasis_primary_text"
    android:textSize="@dimen/font_size_body_md"
    android:text="Get Started" />
```

---

## Xbox (C#/XAML)

### Installation (NuGet)

```xml
<PackageReference Include="AngelStudios.DesignTokens" Version="1.0.0" />
```

### Resource Dictionary

```xml
<!-- App.xaml -->
<Application.Resources>
    <ResourceDictionary>
        <ResourceDictionary.MergedDictionaries>
            <ResourceDictionary Source="ms-appx:///AngelTokens/Tokens.xaml" />
        </ResourceDictionary.MergedDictionaries>
    </ResourceDictionary>
</Application.Resources>
```

### Using Tokens

```xml
<Button
    Background="{StaticResource ComponentButtonEmphasisPrimaryBackground}"
    Foreground="{StaticResource ComponentButtonEmphasisPrimaryText}"
    Height="{StaticResource ButtonSizeLgHeight}"
    Padding="{StaticResource ButtonSizeLgPaddingHorizontal}"
    CornerRadius="{StaticResource ButtonSizeLgBorderRadius}">
    <TextBlock
        Text="Get Started"
        FontSize="{StaticResource ButtonSizeLgFontSize}" />
</Button>
```

---

## Samsung/LG Smart TV (JavaScript)

Samsung (Tizen) and LG (webOS) Smart TVs use web technologies, sharing the same token package as other web-based TV platforms.

### Installation

```bash
npm install @angel/tokens-web-tv
```

### Usage (Tizen/webOS)

```javascript
import tokens from '@angel/tokens-web-tv';

// Samsung Tizen or LG webOS app
const styles = {
  button: {
    backgroundColor: tokens.componentButtonEmphasisPrimaryBackground,
    color: tokens.componentButtonEmphasisPrimaryText,
    height: tokens.buttonSizeLgHeight,  // 48
    paddingLeft: tokens.buttonSizeLgPaddingHorizontal,  // 14
    paddingRight: tokens.buttonSizeLgPaddingHorizontal,
    borderRadius: tokens.buttonSizeLgBorderRadius,  // 14
    fontSize: tokens.fontSizeBodyMd,  // 20 (TV size)
  },
};
```

### CSS Variables (Alternative)

```css
@import '@angel/tokens-web-tv/tokens.css';

.card {
  background-color: var(--surface-default);
  border-radius: var(--border-radius-rounded-xl);
  padding: var(--spacing-4xl);  /* 24px */
}

.card-title {
  color: var(--text-primary);
  font-size: var(--font-size-heading-h3);  /* 36px for TV */
}
```

### Platform Detection

```javascript
import tokens from '@angel/tokens-web-tv';

// Detect platform for any platform-specific adjustments
const isTizen = typeof tizen !== 'undefined';
const isWebOS = typeof webOS !== 'undefined';

// Tokens work the same on both platforms
const buttonHeight = tokens.buttonSizeLgHeight;
```

---

## Vizio SmartCast / XumoTV (JavaScript)

### Installation

```bash
npm install @angel/tokens-web-tv
```

### Usage

```javascript
import tokens from '@angel/tokens-web-tv';

const styles = {
  button: {
    backgroundColor: tokens.componentButtonEmphasisPrimaryBackground,
    color: tokens.componentButtonEmphasisPrimaryText,
    height: tokens.buttonSizeLgHeight,  // 48
    paddingLeft: tokens.buttonSizeLgPaddingHorizontal,  // 14
    paddingRight: tokens.buttonSizeLgPaddingHorizontal,
    borderRadius: tokens.buttonSizeLgBorderRadius,  // 14
    fontSize: tokens.fontSizeBodyMd,  // 20 (TV size)
  },
};
```

### TV-Specific Spacing

```javascript
// Use larger spacing values for TV
const tvStyles = {
  container: {
    paddingLeft: tokens.spacing10xl,   // 48 - safe area
    paddingRight: tokens.spacing10xl,
    paddingTop: tokens.spacing6xl,     // 32
  },
  row: {
    marginBottom: tokens.spacing4xl,   // 24
    gap: tokens.spacing3xl,            // 20
  },
};
```

---

## Typography by Platform

Each platform loads the appropriate typography file based on viewport:

| Platform | Typography File | Body MD Size |
|----------|-----------------|--------------|
| Mobile | `typography/mobile.json` | 16 |
| Tablet | `typography/tablet.json` | 16 |
| Desktop | `typography/desktop.json` | 16 |
| TV (all) | `typography/tv.json` | 20 |

TV platforms automatically use ~1.25x larger font sizes for 10-foot viewing.

---

## Related Documents

- [Token Structure and Naming](./token_structure_and_naming.md)
- [Transformation Logic](./transformation_logic.md)
- [mapping.md](../mapping.md)
