# Consumption Guide

## Overview

This guide explains how developers on each platform consume design tokens. Find your platform below and follow the instructions to integrate tokens into your codebase.

---

## Quick Reference

| Platform | Package | Import |
|----------|---------|--------|
| React Native | `@angel/tokens-react-native` | `import { theme } from '@angel/tokens-react-native'` |
| React Web | `@angel/tokens-web` | `@import '@angel/tokens-web/tokens.css'` |
| Roku | `packages/roku` | `AngelTokens = AngelTokens()` |
| tvOS | `AngelTokens (SPM)` | `import AngelTokens` |
| Android TV | `angel-tokens` (Maven) | `R.color.color_action_primary_background` |
| Xbox | `AngelTokens` (NuGet) | `{StaticResource ColorBlue500}` |
| Vizio/Xumo | `@angel/tokens-web-tv` | `import tokens from '@angel/tokens-web-tv'` |

---

## React Native

### Installation

```bash
# Using npm
npm install @angel/tokens-react-native

# Using yarn
yarn add @angel/tokens-react-native

# Using pnpm
pnpm add @angel/tokens-react-native
```

### Basic Usage

```typescript
// Import the theme object
import { theme } from '@angel/tokens-react-native';

// Use in styles
const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background.primary,
    padding: theme.spacing.padding.md,
  },
  title: {
    color: theme.colors.text.primary,
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.bold,
  },
  button: {
    backgroundColor: theme.colors.action.primary.background,
    borderRadius: theme.radius.md,
    paddingVertical: theme.spacing.padding.sm,
    paddingHorizontal: theme.spacing.padding.lg,
  },
});
```

### Individual Token Imports

```typescript
// Import specific tokens
import {
  colorActionPrimaryBackground,
  spacingPaddingMd,
  fontSizeXl,
  radiusMd,
} from '@angel/tokens-react-native';

const styles = StyleSheet.create({
  button: {
    backgroundColor: colorActionPrimaryBackground,
    padding: spacingPaddingMd,
    borderRadius: radiusMd,
  },
});
```

### With Styled Components

```typescript
import styled from 'styled-components/native';
import { theme } from '@angel/tokens-react-native';

const PrimaryButton = styled.TouchableOpacity`
  background-color: ${theme.colors.action.primary.background};
  padding: ${theme.spacing.padding.md}px;
  border-radius: ${theme.radius.md}px;
`;

const ButtonText = styled.Text`
  color: ${theme.colors.action.primary.text};
  font-size: ${theme.typography.fontSize.base}px;
  font-weight: ${theme.typography.fontWeight.semibold};
`;
```

### Font Setup

```typescript
// App.tsx - Load fonts with expo-font
import { useFonts } from 'expo-font';

export default function App() {
  const [fontsLoaded] = useFonts({
    'AngelSans-Regular': require('@angel/tokens-react-native/fonts/AngelSans-Regular.ttf'),
    'AngelSans-Medium': require('@angel/tokens-react-native/fonts/AngelSans-Medium.ttf'),
    'AngelSans-Bold': require('@angel/tokens-react-native/fonts/AngelSans-Bold.ttf'),
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
  background-color: var(--color-action-primary-background);
  color: var(--color-action-primary-text);
  padding: var(--spacing-padding-sm) var(--spacing-padding-lg);
  border-radius: var(--radius-md);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
}

.button-primary:hover {
  background-color: var(--color-action-primary-background-hover);
}

.button-primary:active {
  background-color: var(--color-action-primary-background-active);
}
```

### SCSS Variables

```scss
// Import SCSS tokens
@import '@angel/tokens-web/tokens.scss';

// Use SCSS variables
.card {
  background: $color-background-primary;
  border: 1px solid $color-border-default;
  border-radius: $radius-lg;
  padding: $spacing-padding-lg;
  box-shadow: $shadow-md;

  &__title {
    color: $color-text-primary;
    font-size: $font-size-xl;
    font-weight: $font-weight-bold;
    margin-bottom: $spacing-margin-sm;
  }

  &__body {
    color: $color-text-secondary;
    font-size: $font-size-base;
    line-height: $line-height-normal;
  }
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
        action: {
          primary: {
            DEFAULT: tokens.colorActionPrimaryBackground,
            hover: tokens.colorActionPrimaryBackgroundHover,
            text: tokens.colorActionPrimaryText,
          },
        },
        text: {
          primary: tokens.colorTextPrimary,
          secondary: tokens.colorTextSecondary,
        },
      },
      spacing: {
        'token-xs': tokens.spacingPaddingXs,
        'token-sm': tokens.spacingPaddingSm,
        'token-md': tokens.spacingPaddingMd,
        'token-lg': tokens.spacingPaddingLg,
      },
      borderRadius: {
        'token-sm': tokens.radiusSm,
        'token-md': tokens.radiusMd,
        'token-lg': tokens.radiusLg,
      },
    },
  },
};
```

```html
<!-- Use in HTML -->
<button class="bg-action-primary hover:bg-action-primary-hover text-action-primary-text
               px-token-lg py-token-sm rounded-token-md">
  Primary Button
</button>
```

### Font Setup

```css
/* Load fonts */
@font-face {
  font-family: 'AngelSans';
  src: url('@angel/tokens-web/fonts/AngelSans-Regular.woff2') format('woff2'),
       url('@angel/tokens-web/fonts/AngelSans-Regular.woff') format('woff');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'AngelSans';
  src: url('@angel/tokens-web/fonts/AngelSans-Bold.woff2') format('woff2'),
       url('@angel/tokens-web/fonts/AngelSans-Bold.woff') format('woff');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

body {
  font-family: var(--font-family-sans);
}
```

---

## Roku (BrightScript)

### Setup

1. Copy `AngelTokens.brs` to your `source/` directory
2. Copy fonts to `fonts/` directory

### Basic Usage

```brightscript
' Initialize tokens
sub init()
    m.tokens = AngelTokens()
end sub

' Use in components
function createButton() as object
    button = m.top.createChild("Rectangle")
    button.color = m.tokens.colorActionPrimaryBackground
    button.width = m.tokens.componentButtonMinWidth
    button.height = m.tokens.componentButtonHeight
    return button
end function

' Row layout with token heights
function createContentRow(size as string) as object
    row = m.top.createChild("RowList")

    if size = "sm"
        row.itemSize = [m.tokens.componentCardPosterWidth, m.tokens.layoutRowHeightSm]
    else if size = "md"
        row.itemSize = [m.tokens.componentCardPosterWidth, m.tokens.layoutRowHeightMd]
    else if size = "lg"
        row.itemSize = [m.tokens.componentCardLandscapeWidth, m.tokens.layoutRowHeightLg]
    else if size = "hero"
        row.itemSize = [m.tokens.componentCardHeroWidth, m.tokens.layoutRowHeightHero]
    end if

    return row
end function
```

### Focus States

```brightscript
' Apply focus styling
function onFocusChange()
    if m.top.hasFocus()
        m.background.color = m.tokens.focusRingColor
        m.background.scale = [m.tokens.focusScale, m.tokens.focusScale]
    else
        m.background.color = m.tokens.colorBackgroundPrimary
        m.background.scale = [1.0, 1.0]
    end if
end function

' Safe area margins
function applySafeArea(node as object)
    node.translation = [m.tokens.safeAreaHorizontal, m.tokens.safeAreaVertical]
end function
```

### Card Component

```brightscript
function createPosterCard() as object
    card = m.top.createChild("Poster")
    card.width = m.tokens.componentCardPosterWidth   ' 150
    card.height = m.tokens.componentCardPosterHeight ' 225
    card.loadWidth = card.width
    card.loadHeight = card.height
    return card
end function

function createLandscapeCard() as object
    card = m.top.createChild("Poster")
    card.width = m.tokens.componentCardLandscapeWidth   ' 320
    card.height = m.tokens.componentCardLandscapeHeight ' 180
    return card
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

struct ContentView: View {
    var body: some View {
        VStack(spacing: AngelTokens.Spacing.md) {
            Text("Welcome")
                .font(.system(size: AngelTokens.Typography.fontSize.xl))
                .foregroundColor(AngelTokens.Colors.Text.primary)

            Button(action: {}) {
                Text("Get Started")
                    .font(.system(size: AngelTokens.Typography.fontSize.base,
                                  weight: .semibold))
                    .foregroundColor(AngelTokens.Colors.Action.primaryText)
                    .frame(minWidth: AngelTokens.Components.Button.minWidth,
                           minHeight: AngelTokens.Components.Button.height)
            }
            .background(AngelTokens.Colors.Action.primaryBackground)
            .cornerRadius(AngelTokens.Radius.md)
        }
        .padding(.horizontal, AngelTokens.SafeArea.horizontal)
        .padding(.vertical, AngelTokens.SafeArea.vertical)
    }
}
```

### Row Layout

```swift
import SwiftUI
import AngelTokens

struct ContentRow: View {
    let size: RowSize
    let items: [ContentItem]

    enum RowSize {
        case small, medium, large, hero

        var height: CGFloat {
            switch self {
            case .small: return AngelTokens.Layout.rowHeightSm   // 180
            case .medium: return AngelTokens.Layout.rowHeightMd  // 240
            case .large: return AngelTokens.Layout.rowHeightLg   // 320
            case .hero: return AngelTokens.Layout.rowHeightHero  // 480
            }
        }
    }

    var body: some View {
        ScrollView(.horizontal) {
            LazyHStack(spacing: AngelTokens.Spacing.gap.md) {
                ForEach(items) { item in
                    ContentCard(item: item)
                        .frame(height: size.height)
                }
            }
            .padding(.horizontal, AngelTokens.Layout.containerPaddingHorizontal)
        }
    }
}
```

### Focus States

```swift
struct FocusableCard: View {
    let item: ContentItem
    @FocusState private var isFocused: Bool

    var body: some View {
        VStack {
            AsyncImage(url: item.imageURL)
            Text(item.title)
        }
        .focusable()
        .focused($isFocused)
        .scaleEffect(isFocused ? AngelTokens.Focus.scale : 1.0)  // 1.05
        .overlay(
            RoundedRectangle(cornerRadius: AngelTokens.Radius.md)
                .stroke(
                    isFocused ? AngelTokens.Focus.ringColor : .clear,
                    lineWidth: AngelTokens.Focus.ringWidth  // 4
                )
        )
        .shadow(
            color: isFocused ? AngelTokens.Colors.blue500.opacity(0.5) : .clear,
            radius: 10
        )
        .animation(.easeOut(duration: 0.15), value: isFocused)
    }
}
```

---

## Android TV (Kotlin/Java)

### Installation (Gradle)

```groovy
// build.gradle
dependencies {
    implementation 'com.angelstudios:angel-tokens:1.0.0'
}
```

### Colors

```kotlin
// Access colors via resources
val primaryBackground = ContextCompat.getColor(context, R.color.color_action_primary_background)
val textPrimary = ContextCompat.getColor(context, R.color.color_text_primary)

// In XML
<Button
    android:background="@color/color_action_primary_background"
    android:textColor="@color/color_action_primary_text" />
```

### Dimensions

```kotlin
// Access dimensions
val paddingMd = resources.getDimensionPixelSize(R.dimen.spacing_padding_md)
val rowHeight = resources.getDimensionPixelSize(R.dimen.layout_row_height_md)

// In XML
<LinearLayout
    android:padding="@dimen/spacing_padding_md"
    android:layout_height="@dimen/layout_row_height_md" />
```

### Focus Handling

```kotlin
class FocusableCardView @JvmOverloads constructor(
    context: Context,
    attrs: AttributeSet? = null
) : CardView(context, attrs) {

    private val focusScale = 1.05f  // From tokens
    private val focusRingWidth = resources.getDimensionPixelSize(R.dimen.focus_ring_width)
    private val focusRingColor = ContextCompat.getColor(context, R.color.focus_ring_color)

    init {
        isFocusable = true
        isFocusableInTouchMode = true

        onFocusChangeListener = OnFocusChangeListener { _, hasFocus ->
            animate()
                .scaleX(if (hasFocus) focusScale else 1f)
                .scaleY(if (hasFocus) focusScale else 1f)
                .setDuration(150)
                .start()

            strokeWidth = if (hasFocus) focusRingWidth else 0
            strokeColor = focusRingColor
        }
    }
}
```

### RecyclerView with Token Heights

```kotlin
class ContentRowAdapter(
    private val rowSize: RowSize
) : RecyclerView.Adapter<ContentViewHolder>() {

    enum class RowSize {
        SMALL, MEDIUM, LARGE, HERO;

        fun getHeight(resources: Resources): Int = when (this) {
            SMALL -> resources.getDimensionPixelSize(R.dimen.layout_row_height_sm)
            MEDIUM -> resources.getDimensionPixelSize(R.dimen.layout_row_height_md)
            LARGE -> resources.getDimensionPixelSize(R.dimen.layout_row_height_lg)
            HERO -> resources.getDimensionPixelSize(R.dimen.layout_row_height_hero)
        }
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ContentViewHolder {
        val height = rowSize.getHeight(parent.resources)
        // Create view holder with token height
    }
}
```

---

## Xbox (C#/XAML)

### Installation (NuGet)

```xml
<PackageReference Include="AngelStudios.DesignTokens" Version="1.0.0" />
```

### Resource Dictionary Setup

```xml
<!-- App.xaml -->
<Application.Resources>
    <ResourceDictionary>
        <ResourceDictionary.MergedDictionaries>
            <ResourceDictionary Source="ms-appx:///AngelTokens/AngelTokens.xaml" />
        </ResourceDictionary.MergedDictionaries>
    </ResourceDictionary>
</Application.Resources>
```

### Using Tokens in XAML

```xml
<Page xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
      xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml">

    <Grid Background="{StaticResource ColorBackgroundPrimary}"
          Padding="{StaticResource SafeAreaHorizontal}">

        <StackPanel Spacing="{StaticResource SpacingGapMd}">

            <TextBlock Text="Welcome"
                       Foreground="{StaticResource ColorTextPrimary}"
                       FontSize="{StaticResource FontSizeXl}"
                       FontWeight="Bold" />

            <Button Content="Get Started"
                    Background="{StaticResource ColorActionPrimaryBackground}"
                    Foreground="{StaticResource ColorActionPrimaryText}"
                    MinWidth="{StaticResource ComponentButtonMinWidth}"
                    Height="{StaticResource ComponentButtonHeight}"
                    CornerRadius="{StaticResource RadiusMd}" />

        </StackPanel>
    </Grid>
</Page>
```

### Focus Visual States

```xml
<Style x:Key="FocusableCardStyle" TargetType="ContentControl">
    <Setter Property="Template">
        <Setter.Value>
            <ControlTemplate TargetType="ContentControl">
                <Grid>
                    <Border x:Name="FocusBorder"
                            BorderThickness="{StaticResource FocusRingWidth}"
                            BorderBrush="Transparent"
                            CornerRadius="{StaticResource RadiusMd}">
                        <ContentPresenter />
                    </Border>

                    <VisualStateManager.VisualStateGroups>
                        <VisualStateGroup x:Name="FocusStates">
                            <VisualState x:Name="Focused">
                                <Storyboard>
                                    <ColorAnimation
                                        Storyboard.TargetName="FocusBorder"
                                        Storyboard.TargetProperty="(Border.BorderBrush).(SolidColorBrush.Color)"
                                        To="{StaticResource FocusRingColor}"
                                        Duration="0:0:0.15" />
                                    <DoubleAnimation
                                        Storyboard.TargetName="FocusBorder"
                                        Storyboard.TargetProperty="(UIElement.RenderTransform).(ScaleTransform.ScaleX)"
                                        To="{StaticResource FocusScale}"
                                        Duration="0:0:0.15" />
                                    <DoubleAnimation
                                        Storyboard.TargetName="FocusBorder"
                                        Storyboard.TargetProperty="(UIElement.RenderTransform).(ScaleTransform.ScaleY)"
                                        To="{StaticResource FocusScale}"
                                        Duration="0:0:0.15" />
                                </Storyboard>
                            </VisualState>
                        </VisualStateGroup>
                    </VisualStateManager.VisualStateGroups>
                </Grid>
            </ControlTemplate>
        </Setter.Value>
    </Setter>
</Style>
```

---

## Vizio SmartCast / XumoTV (JavaScript)

### Installation

```bash
npm install @angel/tokens-web-tv
```

### CSS Variables

```javascript
// Import CSS
import '@angel/tokens-web-tv/tokens.css';

// Use in components
const Card = () => (
  <div style={{
    width: 'var(--component-card-landscape-width)',
    height: 'var(--component-card-landscape-height)',
    backgroundColor: 'var(--color-background-primary)',
    borderRadius: 'var(--radius-md)',
  }}>
    {/* content */}
  </div>
);
```

### JavaScript Object

```javascript
import tokens from '@angel/tokens-web-tv';

// Use in styles
const styles = {
  row: {
    height: tokens.layoutRowHeightMd,  // 240
    paddingLeft: tokens.safeAreaHorizontal,  // 48
    paddingRight: tokens.safeAreaHorizontal,
  },
  card: {
    width: tokens.componentCardLandscapeWidth,  // 320
    height: tokens.componentCardLandscapeHeight,  // 180
    borderRadius: tokens.radiusMd,
  },
  focusRing: {
    borderWidth: tokens.focusRingWidth,  // 4
    borderColor: tokens.focusRingColor,  // #3B82F6
    transform: `scale(${tokens.focusScale})`,  // 1.05
  },
};
```

### Safe Area Implementation

```javascript
import tokens from '@angel/tokens-web-tv';

const TVLayout = ({ children }) => (
  <div style={{
    paddingLeft: tokens.safeAreaHorizontal,
    paddingRight: tokens.safeAreaHorizontal,
    paddingTop: tokens.safeAreaVertical,
    paddingBottom: tokens.safeAreaVertical,
    minHeight: '100vh',
    boxSizing: 'border-box',
  }}>
    {children}
  </div>
);
```

---

## Common Patterns

### Checking Token Version

```javascript
// All packages expose version
import { version } from '@angel/tokens-web';
console.log(`Using tokens v${version}`);
```

### TypeScript Types

```typescript
// Types are included
import type { Theme, Colors, Spacing } from '@angel/tokens-react-native';

const useTheme = (): Theme => {
  // Type-safe theme access
};
```

### Updating Tokens

When tokens are updated, run:

```bash
# Update to latest version
npm update @angel/tokens-<platform>

# Or specific version
npm install @angel/tokens-<platform>@1.2.0
```

---

## Related Documents

- [Token Structure and Naming](./token_structure_and_naming.md)
- [Transformation Logic](./transformation_logic.md)
- [Troubleshooting](../TROUBLESHOOTING.md)
