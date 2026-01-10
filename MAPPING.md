# Token Mapping Reference

This document shows how Figma variable names map to code output names across all platforms.

---

## Color Tokens

### Primitive Colors

| Figma Variable | CSS Variable | React Native | Roku | Swift | Android | XAML |
|----------------|--------------|--------------|------|-------|---------|------|
| `color/blue/50` | `--color-blue-50` | `colorBlue50` | `colorBlue50` | `Colors.blue50` | `@color/color_blue_50` | `ColorBlue50` |
| `color/blue/100` | `--color-blue-100` | `colorBlue100` | `colorBlue100` | `Colors.blue100` | `@color/color_blue_100` | `ColorBlue100` |
| `color/blue/200` | `--color-blue-200` | `colorBlue200` | `colorBlue200` | `Colors.blue200` | `@color/color_blue_200` | `ColorBlue200` |
| `color/blue/300` | `--color-blue-300` | `colorBlue300` | `colorBlue300` | `Colors.blue300` | `@color/color_blue_300` | `ColorBlue300` |
| `color/blue/400` | `--color-blue-400` | `colorBlue400` | `colorBlue400` | `Colors.blue400` | `@color/color_blue_400` | `ColorBlue400` |
| `color/blue/500` | `--color-blue-500` | `colorBlue500` | `colorBlue500` | `Colors.blue500` | `@color/color_blue_500` | `ColorBlue500` |
| `color/blue/600` | `--color-blue-600` | `colorBlue600` | `colorBlue600` | `Colors.blue600` | `@color/color_blue_600` | `ColorBlue600` |
| `color/blue/700` | `--color-blue-700` | `colorBlue700` | `colorBlue700` | `Colors.blue700` | `@color/color_blue_700` | `ColorBlue700` |
| `color/blue/800` | `--color-blue-800` | `colorBlue800` | `colorBlue800` | `Colors.blue800` | `@color/color_blue_800` | `ColorBlue800` |
| `color/blue/900` | `--color-blue-900` | `colorBlue900` | `colorBlue900` | `Colors.blue900` | `@color/color_blue_900` | `ColorBlue900` |

| Figma Variable | CSS Variable | React Native | Roku | Swift | Android | XAML |
|----------------|--------------|--------------|------|-------|---------|------|
| `color/gray/50` | `--color-gray-50` | `colorGray50` | `colorGray50` | `Colors.gray50` | `@color/color_gray_50` | `ColorGray50` |
| `color/gray/100` | `--color-gray-100` | `colorGray100` | `colorGray100` | `Colors.gray100` | `@color/color_gray_100` | `ColorGray100` |
| `color/gray/200` | `--color-gray-200` | `colorGray200` | `colorGray200` | `Colors.gray200` | `@color/color_gray_200` | `ColorGray200` |
| `color/gray/300` | `--color-gray-300` | `colorGray300` | `colorGray300` | `Colors.gray300` | `@color/color_gray_300` | `ColorGray300` |
| `color/gray/400` | `--color-gray-400` | `colorGray400` | `colorGray400` | `Colors.gray400` | `@color/color_gray_400` | `ColorGray400` |
| `color/gray/500` | `--color-gray-500` | `colorGray500` | `colorGray500` | `Colors.gray500` | `@color/color_gray_500` | `ColorGray500` |
| `color/gray/600` | `--color-gray-600` | `colorGray600` | `colorGray600` | `Colors.gray600` | `@color/color_gray_600` | `ColorGray600` |
| `color/gray/700` | `--color-gray-700` | `colorGray700` | `colorGray700` | `Colors.gray700` | `@color/color_gray_700` | `ColorGray700` |
| `color/gray/800` | `--color-gray-800` | `colorGray800` | `colorGray800` | `Colors.gray800` | `@color/color_gray_800` | `ColorGray800` |
| `color/gray/900` | `--color-gray-900` | `colorGray900` | `colorGray900` | `Colors.gray900` | `@color/color_gray_900` | `ColorGray900` |

### Semantic Colors

| Figma Variable | CSS Variable | React Native | Roku | Swift | Android | XAML |
|----------------|--------------|--------------|------|-------|---------|------|
| `color/action/primary/background` | `--color-action-primary-background` | `colorActionPrimaryBackground` | `colorActionPrimaryBackground` | `Colors.Action.primaryBackground` | `@color/color_action_primary_background` | `ColorActionPrimaryBackground` |
| `color/action/primary/background-hover` | `--color-action-primary-background-hover` | `colorActionPrimaryBackgroundHover` | `colorActionPrimaryBackgroundHover` | `Colors.Action.primaryBackgroundHover` | `@color/color_action_primary_background_hover` | `ColorActionPrimaryBackgroundHover` |
| `color/action/primary/background-active` | `--color-action-primary-background-active` | `colorActionPrimaryBackgroundActive` | `colorActionPrimaryBackgroundActive` | `Colors.Action.primaryBackgroundActive` | `@color/color_action_primary_background_active` | `ColorActionPrimaryBackgroundActive` |
| `color/action/primary/text` | `--color-action-primary-text` | `colorActionPrimaryText` | `colorActionPrimaryText` | `Colors.Action.primaryText` | `@color/color_action_primary_text` | `ColorActionPrimaryText` |
| `color/action/secondary/background` | `--color-action-secondary-background` | `colorActionSecondaryBackground` | `colorActionSecondaryBackground` | `Colors.Action.secondaryBackground` | `@color/color_action_secondary_background` | `ColorActionSecondaryBackground` |
| `color/action/secondary/text` | `--color-action-secondary-text` | `colorActionSecondaryText` | `colorActionSecondaryText` | `Colors.Action.secondaryText` | `@color/color_action_secondary_text` | `ColorActionSecondaryText` |

| Figma Variable | CSS Variable | React Native | Roku | Swift | Android | XAML |
|----------------|--------------|--------------|------|-------|---------|------|
| `color/text/primary` | `--color-text-primary` | `colorTextPrimary` | `colorTextPrimary` | `Colors.Text.primary` | `@color/color_text_primary` | `ColorTextPrimary` |
| `color/text/secondary` | `--color-text-secondary` | `colorTextSecondary` | `colorTextSecondary` | `Colors.Text.secondary` | `@color/color_text_secondary` | `ColorTextSecondary` |
| `color/text/tertiary` | `--color-text-tertiary` | `colorTextTertiary` | `colorTextTertiary` | `Colors.Text.tertiary` | `@color/color_text_tertiary` | `ColorTextTertiary` |
| `color/text/inverse` | `--color-text-inverse` | `colorTextInverse` | `colorTextInverse` | `Colors.Text.inverse` | `@color/color_text_inverse` | `ColorTextInverse` |
| `color/text/error` | `--color-text-error` | `colorTextError` | `colorTextError` | `Colors.Text.error` | `@color/color_text_error` | `ColorTextError` |
| `color/text/success` | `--color-text-success` | `colorTextSuccess` | `colorTextSuccess` | `Colors.Text.success` | `@color/color_text_success` | `ColorTextSuccess` |

| Figma Variable | CSS Variable | React Native | Roku | Swift | Android | XAML |
|----------------|--------------|--------------|------|-------|---------|------|
| `color/background/primary` | `--color-background-primary` | `colorBackgroundPrimary` | `colorBackgroundPrimary` | `Colors.Background.primary` | `@color/color_background_primary` | `ColorBackgroundPrimary` |
| `color/background/secondary` | `--color-background-secondary` | `colorBackgroundSecondary` | `colorBackgroundSecondary` | `Colors.Background.secondary` | `@color/color_background_secondary` | `ColorBackgroundSecondary` |
| `color/background/tertiary` | `--color-background-tertiary` | `colorBackgroundTertiary` | `colorBackgroundTertiary` | `Colors.Background.tertiary` | `@color/color_background_tertiary` | `ColorBackgroundTertiary` |
| `color/background/inverse` | `--color-background-inverse` | `colorBackgroundInverse` | `colorBackgroundInverse` | `Colors.Background.inverse` | `@color/color_background_inverse` | `ColorBackgroundInverse` |

| Figma Variable | CSS Variable | React Native | Roku | Swift | Android | XAML |
|----------------|--------------|--------------|------|-------|---------|------|
| `color/border/default` | `--color-border-default` | `colorBorderDefault` | `colorBorderDefault` | `Colors.Border.default` | `@color/color_border_default` | `ColorBorderDefault` |
| `color/border/strong` | `--color-border-strong` | `colorBorderStrong` | `colorBorderStrong` | `Colors.Border.strong` | `@color/color_border_strong` | `ColorBorderStrong` |
| `color/border/focus` | `--color-border-focus` | `colorBorderFocus` | `colorBorderFocus` | `Colors.Border.focus` | `@color/color_border_focus` | `ColorBorderFocus` |

---

## Typography Tokens

### Font Sizes

| Figma Variable | CSS Variable | React Native | Roku | Swift | Android | XAML |
|----------------|--------------|--------------|------|-------|---------|------|
| `typography/fontSize/xs` | `--font-size-xs` | `fontSizeXs` | `fontSizeXs` | `Typography.fontSize.xs` | `@dimen/font_size_xs` | `FontSizeXs` |
| `typography/fontSize/sm` | `--font-size-sm` | `fontSizeSm` | `fontSizeSm` | `Typography.fontSize.sm` | `@dimen/font_size_sm` | `FontSizeSm` |
| `typography/fontSize/base` | `--font-size-base` | `fontSizeBase` | `fontSizeBase` | `Typography.fontSize.base` | `@dimen/font_size_base` | `FontSizeBase` |
| `typography/fontSize/lg` | `--font-size-lg` | `fontSizeLg` | `fontSizeLg` | `Typography.fontSize.lg` | `@dimen/font_size_lg` | `FontSizeLg` |
| `typography/fontSize/xl` | `--font-size-xl` | `fontSizeXl` | `fontSizeXl` | `Typography.fontSize.xl` | `@dimen/font_size_xl` | `FontSizeXl` |
| `typography/fontSize/2xl` | `--font-size-2xl` | `fontSize2xl` | `fontSize2xl` | `Typography.fontSize.xxl` | `@dimen/font_size_2xl` | `FontSize2xl` |
| `typography/fontSize/3xl` | `--font-size-3xl` | `fontSize3xl` | `fontSize3xl` | `Typography.fontSize.xxxl` | `@dimen/font_size_3xl` | `FontSize3xl` |
| `typography/fontSize/4xl` | `--font-size-4xl` | `fontSize4xl` | `fontSize4xl` | `Typography.fontSize.xxxxl` | `@dimen/font_size_4xl` | `FontSize4xl` |

### Font Weights

| Figma Variable | CSS Variable | React Native | Roku | Swift | Android | XAML |
|----------------|--------------|--------------|------|-------|---------|------|
| `typography/fontWeight/regular` | `--font-weight-regular` | `fontWeightRegular` | `fontWeightRegular` | `Typography.fontWeight.regular` | `400` | `FontWeightRegular` |
| `typography/fontWeight/medium` | `--font-weight-medium` | `fontWeightMedium` | `fontWeightMedium` | `Typography.fontWeight.medium` | `500` | `FontWeightMedium` |
| `typography/fontWeight/semibold` | `--font-weight-semibold` | `fontWeightSemibold` | `fontWeightSemibold` | `Typography.fontWeight.semibold` | `600` | `FontWeightSemibold` |
| `typography/fontWeight/bold` | `--font-weight-bold` | `fontWeightBold` | `fontWeightBold` | `Typography.fontWeight.bold` | `700` | `FontWeightBold` |

### Font Families

| Figma Variable | CSS Variable | React Native | Roku | Swift | Android | XAML |
|----------------|--------------|--------------|------|-------|---------|------|
| `typography/fontFamily/sans` | `--font-family-sans` | `fontFamilySans` | `fontFamilySans` | `Typography.fontFamily.sans` | `@font/angel_sans` | `FontFamilySans` |
| `typography/fontFamily/mono` | `--font-family-mono` | `fontFamilyMono` | `fontFamilyMono` | `Typography.fontFamily.mono` | `@font/angel_mono` | `FontFamilyMono` |
| `typography/fontFamily/display` | `--font-family-display` | `fontFamilyDisplay` | `fontFamilyDisplay` | `Typography.fontFamily.display` | `@font/angel_display` | `FontFamilyDisplay` |

---

## Spacing Tokens

| Figma Variable | CSS Variable | React Native | Roku | Swift | Android | XAML |
|----------------|--------------|--------------|------|-------|---------|------|
| `spacing/0` | `--spacing-0` | `spacing0` | `spacing0` | `Spacing.zero` | `@dimen/spacing_0` | `Spacing0` |
| `spacing/1` | `--spacing-1` | `spacing1` | `spacing1` | `Spacing.xs` | `@dimen/spacing_1` | `Spacing1` |
| `spacing/2` | `--spacing-2` | `spacing2` | `spacing2` | `Spacing.sm` | `@dimen/spacing_2` | `Spacing2` |
| `spacing/3` | `--spacing-3` | `spacing3` | `spacing3` | `Spacing.md` | `@dimen/spacing_3` | `Spacing3` |
| `spacing/4` | `--spacing-4` | `spacing4` | `spacing4` | `Spacing.lg` | `@dimen/spacing_4` | `Spacing4` |
| `spacing/6` | `--spacing-6` | `spacing6` | `spacing6` | `Spacing.xl` | `@dimen/spacing_6` | `Spacing6` |
| `spacing/8` | `--spacing-8` | `spacing8` | `spacing8` | `Spacing.xxl` | `@dimen/spacing_8` | `Spacing8` |
| `spacing/12` | `--spacing-12` | `spacing12` | `spacing12` | `Spacing.xxxl` | `@dimen/spacing_12` | `Spacing12` |

### Semantic Spacing

| Figma Variable | CSS Variable | React Native | Roku | Swift | Android | XAML |
|----------------|--------------|--------------|------|-------|---------|------|
| `spacing/padding/xs` | `--spacing-padding-xs` | `spacingPaddingXs` | `spacingPaddingXs` | `Spacing.padding.xs` | `@dimen/spacing_padding_xs` | `SpacingPaddingXs` |
| `spacing/padding/sm` | `--spacing-padding-sm` | `spacingPaddingSm` | `spacingPaddingSm` | `Spacing.padding.sm` | `@dimen/spacing_padding_sm` | `SpacingPaddingSm` |
| `spacing/padding/md` | `--spacing-padding-md` | `spacingPaddingMd` | `spacingPaddingMd` | `Spacing.padding.md` | `@dimen/spacing_padding_md` | `SpacingPaddingMd` |
| `spacing/padding/lg` | `--spacing-padding-lg` | `spacingPaddingLg` | `spacingPaddingLg` | `Spacing.padding.lg` | `@dimen/spacing_padding_lg` | `SpacingPaddingLg` |
| `spacing/padding/xl` | `--spacing-padding-xl` | `spacingPaddingXl` | `spacingPaddingXl` | `Spacing.padding.xl` | `@dimen/spacing_padding_xl` | `SpacingPaddingXl` |

---

## Border Radius Tokens

| Figma Variable | CSS Variable | React Native | Roku | Swift | Android | XAML |
|----------------|--------------|--------------|------|-------|---------|------|
| `radius/none` | `--radius-none` | `radiusNone` | `radiusNone` | `Radius.none` | `@dimen/radius_none` | `RadiusNone` |
| `radius/sm` | `--radius-sm` | `radiusSm` | `radiusSm` | `Radius.sm` | `@dimen/radius_sm` | `RadiusSm` |
| `radius/md` | `--radius-md` | `radiusMd` | `radiusMd` | `Radius.md` | `@dimen/radius_md` | `RadiusMd` |
| `radius/lg` | `--radius-lg` | `radiusLg` | `radiusLg` | `Radius.lg` | `@dimen/radius_lg` | `RadiusLg` |
| `radius/xl` | `--radius-xl` | `radiusXl` | `radiusXl` | `Radius.xl` | `@dimen/radius_xl` | `RadiusXl` |
| `radius/full` | `--radius-full` | `radiusFull` | `radiusFull` | `Radius.full` | `@dimen/radius_full` | `RadiusFull` |

---

## TV-Specific Tokens

### Layout

| Figma Variable | CSS Variable | React Native | Roku | Swift | Android | XAML |
|----------------|--------------|--------------|------|-------|---------|------|
| `tv/layout/rowHeight/sm` | `--tv-layout-row-height-sm` | `tvLayoutRowHeightSm` | `layoutRowHeightSm` | `Layout.rowHeightSm` | `@dimen/layout_row_height_sm` | `LayoutRowHeightSm` |
| `tv/layout/rowHeight/md` | `--tv-layout-row-height-md` | `tvLayoutRowHeightMd` | `layoutRowHeightMd` | `Layout.rowHeightMd` | `@dimen/layout_row_height_md` | `LayoutRowHeightMd` |
| `tv/layout/rowHeight/lg` | `--tv-layout-row-height-lg` | `tvLayoutRowHeightLg` | `layoutRowHeightLg` | `Layout.rowHeightLg` | `@dimen/layout_row_height_lg` | `LayoutRowHeightLg` |
| `tv/layout/rowHeight/hero` | `--tv-layout-row-height-hero` | `tvLayoutRowHeightHero` | `layoutRowHeightHero` | `Layout.rowHeightHero` | `@dimen/layout_row_height_hero` | `LayoutRowHeightHero` |

### Components

| Figma Variable | CSS Variable | React Native | Roku | Swift | Android | XAML |
|----------------|--------------|--------------|------|-------|---------|------|
| `tv/components/card/poster/width` | `--tv-component-card-poster-width` | `tvComponentCardPosterWidth` | `componentCardPosterWidth` | `Components.Card.posterWidth` | `@dimen/component_card_poster_width` | `ComponentCardPosterWidth` |
| `tv/components/card/poster/height` | `--tv-component-card-poster-height` | `tvComponentCardPosterHeight` | `componentCardPosterHeight` | `Components.Card.posterHeight` | `@dimen/component_card_poster_height` | `ComponentCardPosterHeight` |
| `tv/components/card/landscape/width` | `--tv-component-card-landscape-width` | `tvComponentCardLandscapeWidth` | `componentCardLandscapeWidth` | `Components.Card.landscapeWidth` | `@dimen/component_card_landscape_width` | `ComponentCardLandscapeWidth` |
| `tv/components/card/landscape/height` | `--tv-component-card-landscape-height` | `tvComponentCardLandscapeHeight` | `componentCardLandscapeHeight` | `Components.Card.landscapeHeight` | `@dimen/component_card_landscape_height` | `ComponentCardLandscapeHeight` |

### Focus

| Figma Variable | CSS Variable | React Native | Roku | Swift | Android | XAML |
|----------------|--------------|--------------|------|-------|---------|------|
| `tv/focus/ring/width` | `--tv-focus-ring-width` | `tvFocusRingWidth` | `focusRingWidth` | `Focus.ringWidth` | `@dimen/focus_ring_width` | `FocusRingWidth` |
| `tv/focus/ring/color` | `--tv-focus-ring-color` | `tvFocusRingColor` | `focusRingColor` | `Focus.ringColor` | `@color/focus_ring_color` | `FocusRingColor` |
| `tv/focus/scale` | `--tv-focus-scale` | `tvFocusScale` | `focusScale` | `Focus.scale` | N/A (code) | `FocusScale` |

### Safe Area

| Figma Variable | CSS Variable | React Native | Roku | Swift | Android | XAML |
|----------------|--------------|--------------|------|-------|---------|------|
| `tv/safeArea/horizontal` | `--tv-safe-area-horizontal` | `tvSafeAreaHorizontal` | `safeAreaHorizontal` | `SafeArea.horizontal` | `@dimen/safe_area_horizontal` | `SafeAreaHorizontal` |
| `tv/safeArea/vertical` | `--tv-safe-area-vertical` | `tvSafeAreaVertical` | `safeAreaVertical` | `SafeArea.vertical` | `@dimen/safe_area_vertical` | `SafeAreaVertical` |

---

## Value Transformations

| Figma Value | CSS | React Native | Roku | Swift | Android | XAML |
|-------------|-----|--------------|------|-------|---------|------|
| `#3B82F6` | `#3B82F6` | `'#3B82F6'` | `"0x3B82F6FF"` | `Color(hex: 0x3B82F6)` | `#FF3B82F6` | `#FF3B82F6` |
| `16px` | `1rem` | `16` | `16` | `16.0` | `16dp` | `16` |
| `16sp` (font) | `1rem` | `16` | `32` (2x) | `32.0` (2x) | `16sp` | `32` (2x) |
| `1.5` (ratio) | `1.5` | `1.5` | `1.5` | `1.5` | `1.5` | `1.5` |

---

## Quick Lookup by Platform

### CSS (Web)
```css
/* Pattern: --[category]-[type]-[item]-[subitem]-[state] */
var(--color-action-primary-background)
var(--spacing-padding-md)
var(--font-size-lg)
```

### React Native (TypeScript)
```typescript
// Pattern: [category][Type][Item][Subitem][State]
theme.colors.action.primary.background
spacingPaddingMd
fontSizeLg
```

### Roku (BrightScript)
```brightscript
' Pattern: [category][Type][Item][Subitem][State]
m.tokens.colorActionPrimaryBackground
m.tokens.spacingPaddingMd
m.tokens.layoutRowHeightMd
```

### Swift (tvOS)
```swift
// Pattern: [Category].[Type].[item]
AngelTokens.Colors.Action.primaryBackground
AngelTokens.Spacing.padding.md
AngelTokens.Layout.rowHeightMd
```

### Android (XML)
```xml
<!-- Pattern: @[type]/[category]_[type]_[item]_[subitem]_[state] -->
@color/color_action_primary_background
@dimen/spacing_padding_md
@dimen/layout_row_height_md
```

### Xbox (XAML)
```xml
<!-- Pattern: {StaticResource [Category][Type][Item][Subitem][State]} -->
{StaticResource ColorActionPrimaryBackground}
{StaticResource SpacingPaddingMd}
{StaticResource LayoutRowHeightMd}
```
