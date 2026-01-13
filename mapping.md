# Token Mapping Reference

Quick reference for mapping Figma token names to platform-specific output names.

---

## Color Base Tokens

### Primitive Colors (50-1000 Scale)

| Figma Token | CSS Variable | React Native | Roku | Swift | Android |
|-------------|--------------|--------------|------|-------|---------|
| `color.neutral.50` | `--color-neutral-50` | `color.neutral[50]` | `ColorNeutral50` | `Color.neutral50` | `@color/color_neutral_50` |
| `color.neutral.500` | `--color-neutral-500` | `color.neutral[500]` | `ColorNeutral500` | `Color.neutral500` | `@color/color_neutral_500` |
| `color.neutral.1000` | `--color-neutral-1000` | `color.neutral[1000]` | `ColorNeutral1000` | `Color.neutral1000` | `@color/color_neutral_1000` |
| `color.accent.600` | `--color-accent-600` | `color.accent[600]` | `ColorAccent600` | `Color.accent600` | `@color/color_accent_600` |
| `color.danger.500` | `--color-danger-500` | `color.danger[500]` | `ColorDanger500` | `Color.danger500` | `@color/color_danger_500` |
| `color.warning.500` | `--color-warning-500` | `color.warning[500]` | `ColorWarning500` | `Color.warning500` | `@color/color_warning_500` |
| `color.success.500` | `--color-success-500` | `color.success[500]` | `ColorSuccess500` | `Color.success500` | `@color/color_success_500` |
| `color.information.500` | `--color-information-500` | `color.information[500]` | `ColorInformation500` | `Color.information500` | `@color/color_information_500` |
| `color.guild.500` | `--color-guild-500` | `color.guild[500]` | `ColorGuild500` | `Color.guild500` | `@color/color_guild_500` |
| `color.white.1000` | `--color-white-1000` | `color.white[1000]` | `ColorWhite1000` | `Color.white1000` | `@color/color_white_1000` |
| `color.black.1000` | `--color-black-1000` | `color.black[1000]` | `ColorBlack1000` | `Color.black1000` | `@color/color_black_1000` |

### Color Categories

| Category | Purpose | Values |
|----------|---------|--------|
| `neutral` | Grayscale for UI | `#fcfcfc` → `#141414` |
| `white` | White + alpha | `#ffffff0d` → `#ffffff` |
| `black` | Black + alpha | `#0000000d` → `#000000` |
| `guild` | Angel Guild elements | `#fff8f4` → `#200d05` |
| `accent` | Primary action (teal) | `#f9fefd` → `#02120e` |
| `danger` | Error states | `#fffbfa` → `#2a0801` |
| `warning` | Warning states | `#fffcfa` → `#250f00` |
| `success` | Success states | `#fdfff8` → `#0f1b01` |
| `information` | Info states | `#fbfffe` → `#050f15` |

---

## Semantic/Theme Tokens

### Surface Colors

| Figma Token | CSS Variable | React Native | Light Value |
|-------------|--------------|--------------|-------------|
| `surface.default` | `--surface-default` | `surface.default` | `{color.white.1000}` |
| `surface.overlay` | `--surface-overlay` | `surface.overlay` | `{color.neutral.100}` |
| `surface.raised` | `--surface-raised` | `surface.raised` | `{color.neutral.100}` |

### Text Colors

| Figma Token | CSS Variable | React Native | Light Value |
|-------------|--------------|--------------|-------------|
| `text.primary` | `--text-primary` | `text.primary` | `{color.black.1000}` |
| `text.secondary` | `--text-secondary` | `text.secondary` | `{color.neutral.900}` |
| `text.tertiary` | `--text-tertiary` | `text.tertiary` | `{color.neutral.700}` |

### Divider Colors

| Figma Token | CSS Variable | React Native | Light Value |
|-------------|--------------|--------------|-------------|
| `divider.normal` | `--divider-normal` | `divider.normal` | `{color.black.100}` |
| `divider.lighter` | `--divider-lighter` | `divider.lighter` | `{color.black.50}` |
| `divider.darker` | `--divider-darker` | `divider.darker` | `{color.black.200}` |

---

## Component Tokens

### Button Colors (Primary Variant)

| Figma Token | CSS Variable | React Native |
|-------------|--------------|--------------|
| `component.button.emphasis.primary.background` | `--component-button-emphasis-primary-background` | `component.button.emphasis.primary.background` |
| `component.button.emphasis.primary.background_hover` | `--component-button-emphasis-primary-background-hover` | `component.button.emphasis.primary.background_hover` |
| `component.button.emphasis.primary.background_pressed` | `--component-button-emphasis-primary-background-pressed` | `component.button.emphasis.primary.background_pressed` |
| `component.button.emphasis.primary.background_focused` | `--component-button-emphasis-primary-background-focused` | `component.button.emphasis.primary.background_focused` |
| `component.button.emphasis.primary.background_disabled` | `--component-button-emphasis-primary-background-disabled` | `component.button.emphasis.primary.background_disabled` |
| `component.button.emphasis.primary.text` | `--component-button-emphasis-primary-text` | `component.button.emphasis.primary.text` |
| `component.button.emphasis.primary.text_hover` | `--component-button-emphasis-primary-text-hover` | `component.button.emphasis.primary.text_hover` |
| `component.button.emphasis.primary.text_disabled` | `--component-button-emphasis-primary-text-disabled` | `component.button.emphasis.primary.text_disabled` |

**Other Variants:** Replace `primary` with: `brand`, `secondary`, `transparent`, `ghost`

### Button Sizes

| Figma Token | CSS Variable | Value |
|-------------|--------------|-------|
| `button.size.xs.height` | `--button-size-xs-height` | 24 |
| `button.size.xs.padding_horizontal` | `--button-size-xs-padding-horizontal` | 8 |
| `button.size.xs.padding_vertical` | `--button-size-xs-padding-vertical` | 7 |
| `button.size.xs.border_radius` | `--button-size-xs-border-radius` | 8 |
| `button.size.xs.font_size` | `--button-size-xs-font-size` | 10 |
| `button.size.sm.height` | `--button-size-sm-height` | 32 |
| `button.size.md.height` | `--button-size-md-height` | 40 |
| `button.size.lg.height` | `--button-size-lg-height` | 48 |
| `button.size.xl.height` | `--button-size-xl-height` | 56 |

**Full property list per size:** `height`, `padding_horizontal`, `padding_vertical`, `border_radius`, `border_focus_radius`, `font_size`, `font_line_height`, `font_letter_spacing`, `icon_height`, `icon_font_size`

---

## Spacing Tokens

| Figma Token | CSS Variable | Value |
|-------------|--------------|-------|
| `spacing.none` | `--spacing-none` | 0 |
| `spacing.4xs` | `--spacing-4xs` | 1 |
| `spacing.3xs` | `--spacing-3xs` | 2 |
| `spacing.2xs` | `--spacing-2xs` | 4 |
| `spacing.xs` | `--spacing-xs` | 6 |
| `spacing.sm` | `--spacing-sm` | 8 |
| `spacing.md` | `--spacing-md` | 10 |
| `spacing.lg` | `--spacing-lg` | 12 |
| `spacing.xl` | `--spacing-xl` | 14 |
| `spacing.2xl` | `--spacing-2xl` | 16 |
| `spacing.3xl` | `--spacing-3xl` | 20 |
| `spacing.4xl` | `--spacing-4xl` | 24 |
| `spacing.5xl` | `--spacing-5xl` | 28 |
| `spacing.6xl` | `--spacing-6xl` | 32 |
| `spacing.7xl` | `--spacing-7xl` | 36 |
| `spacing.8xl` | `--spacing-8xl` | 40 |
| `spacing.9xl` | `--spacing-9xl` | 44 |
| `spacing.10xl` | `--spacing-10xl` | 48 |
| `spacing.11xl` | `--spacing-11xl` | 56 |
| `spacing.12xl` | `--spacing-12xl` | 64 |
| `spacing.13xl` | `--spacing-13xl` | 80 |
| `spacing.14xl` | `--spacing-14xl` | 96 |
| `spacing.15xl` | `--spacing-15xl` | 112 |
| `spacing.16xl` | `--spacing-16xl` | 128 |
| `spacing.17xl` | `--spacing-17xl` | 144 |
| `spacing.18xl` | `--spacing-18xl` | 160 |
| `spacing.19xl` | `--spacing-19xl` | 176 |
| `spacing.20xl` | `--spacing-20xl` | 192 |
| `spacing.21xl` | `--spacing-21xl` | 208 |
| `spacing.22xl` | `--spacing-22xl` | 224 |
| `spacing.23xl` | `--spacing-23xl` | 240 |
| `spacing.24xl` | `--spacing-24xl` | 256 |
| `spacing.25xl` | `--spacing-25xl` | 288 |
| `spacing.26xl` | `--spacing-26xl` | 320 |
| `spacing.27xl` | `--spacing-27xl` | 384 |

**Platform Usage:**
- Mobile/Web: `xs` through `6xl`
- TV: `9xl` through `27xl`

---

## Border Radius Tokens

| Figma Token | CSS Variable | Value |
|-------------|--------------|-------|
| `border_radius.rounded_none` | `--border-radius-rounded-none` | 0 |
| `border_radius.rounded_xs` | `--border-radius-rounded-xs` | 4 |
| `border_radius.rounded_sm` | `--border-radius-rounded-sm` | 6 |
| `border_radius.rounded` | `--border-radius-rounded` | 8 |
| `border_radius.rounded_md` | `--border-radius-rounded-md` | 10 |
| `border_radius.rounded_lg` | `--border-radius-rounded-lg` | 12 |
| `border_radius.rounded_xl` | `--border-radius-rounded-xl` | 14 |
| `border_radius.rounded_2xl` | `--border-radius-rounded-2xl` | 16 |
| `border_radius.rounded_3xl` | `--border-radius-rounded-3xl` | 24 |
| `border_radius.rounded_4xl` | `--border-radius-rounded-4xl` | 32 |
| `border_radius.rounded_full` | `--border-radius-rounded-full` | 999 |

---

## Typography Tokens

### Font Family

| Figma Token | CSS Variable | Value |
|-------------|--------------|-------|
| `font.family.heading` | `--font-family-heading` | "Angel Sans" |
| `font.family.display` | `--font-family-display` | "Angel Sans" |
| `font.family.body` | `--font-family-body` | "Angel Sans" |
| `font.family.overline` | `--font-family-overline` | "Angel Sans" |
| `font.family.label` | `--font-family-label` | "Angel Sans" |

### Font Weight

| Figma Token | CSS Variable | Value |
|-------------|--------------|-------|
| `font.weight.medium` | `--font-weight-medium` | "medium" |
| `font.weight.semibold` | `--font-weight-semibold` | "semibold" |
| `font.weight.bold` | `--font-weight-bold` | "bold" |

### Font Size by Viewport

| Figma Token | CSS Variable | Desktop | TV |
|-------------|--------------|---------|-----|
| `font.size.display.sm` | `--font-size-display-sm` | 44 | 52 |
| `font.size.display.md` | `--font-size-display-md` | 56 | 64 |
| `font.size.display.lg` | `--font-size-display-lg` | 64 | 76 |
| `font.size.heading.h1` | `--font-size-heading-h1` | 40 | 48 |
| `font.size.heading.h2` | `--font-size-heading-h2` | 36 | 40 |
| `font.size.heading.h3` | `--font-size-heading-h3` | 28 | 36 |
| `font.size.heading.h4` | `--font-size-heading-h4` | 24 | 32 |
| `font.size.heading.h5` | `--font-size-heading-h5` | 22 | 28 |
| `font.size.heading.h6` | `--font-size-heading-h6` | 20 | 24 |
| `font.size.body.xxs` | `--font-size-body-xxs` | 10 | 14 |
| `font.size.body.xs` | `--font-size-body-xs` | 12 | 16 |
| `font.size.body.sm` | `--font-size-body-sm` | 14 | 18 |
| `font.size.body.md` | `--font-size-body-md` | 16 | 20 |
| `font.size.body.lg` | `--font-size-body-lg` | 18 | 24 |
| `font.size.body.xl` | `--font-size-body-xl` | 20 | 28 |
| `font.size.overline.xs` | `--font-size-overline-xs` | 12 | 14 |
| `font.size.overline.sm` | `--font-size-overline-sm` | 13 | 15 |
| `font.size.overline.md` | `--font-size-overline-md` | 15 | 17 |
| `font.size.overline.lg` | `--font-size-overline-lg` | 17 | 19 |
| `font.size.label.xs` | `--font-size-label-xs` | 10 | 14 |
| `font.size.label.sm` | `--font-size-label-sm` | 12 | 16 |
| `font.size.label.md` | `--font-size-label-md` | 14 | 18 |
| `font.size.label.lg` | `--font-size-label-lg` | 16 | 20 |
| `font.size.label.xl` | `--font-size-label-xl` | 20 | 28 |

---

## Viewport Tokens

| Figma Token | CSS Variable | Value | Use Case |
|-------------|--------------|-------|----------|
| `viewports.phone_sm` | `--viewports-phone-sm` | 375 | iPhone SE |
| `viewports.phone` | `--viewports-phone` | 393 | Standard phone |
| `viewports.tablet_sm` | `--viewports-tablet-sm` | 810 | iPad Mini |
| `viewports.tablet` | `--viewports-tablet` | 1024 | iPad, tablets |
| `viewports.desktop` | `--viewports-desktop` | 1440 | Standard desktop |
| `viewports.desktop_lg` | `--viewports-desktop-lg` | 1600 | Large desktop |

---

## Platform Output Examples

### React Native (TypeScript)
```typescript
import { tokens } from '@angel/tokens-react-native';

// Colors
tokens.color.neutral[500]      // '#9d9c9b'
tokens.color.accent[600]       // '#16b087'

// Semantic
tokens.surface.default         // resolved color
tokens.text.primary            // resolved color

// Spacing
tokens.spacing.sm              // 8
tokens.spacing.md              // 10
tokens.spacing['4xl']          // 24

// Button
tokens.button.size.md.height   // 40
tokens.button.size.md.padding_horizontal  // 12

// Typography
tokens.font.size.body.md       // 16 (desktop) or 20 (TV)
```

### Web CSS Variables
```css
:root {
  /* Colors */
  --color-neutral-500: #9d9c9b;
  --color-accent-600: #16b087;

  /* Semantic */
  --surface-default: #ffffff;
  --text-primary: #000000;

  /* Spacing */
  --spacing-sm: 8px;
  --spacing-md: 10px;
  --spacing-4xl: 24px;

  /* Button */
  --button-size-md-height: 40px;
  --button-size-md-padding-horizontal: 12px;

  /* Typography */
  --font-size-body-md: 16px;
}
```

### Roku (BrightScript)
```brightscript
function AngelTokens() as object
    return {
        ColorNeutral500: "#9d9c9b"
        ColorAccent600: "#16b087"
        SpacingSm: 8
        SpacingMd: 10
        ButtonSizeMdHeight: 40
        FontSizeBodyMd: 20  ' TV size
    }
end function
```

### Swift (tvOS)
```swift
extension AngelTokens {
    struct Color {
        static let neutral500 = UIColor(hex: "#9d9c9b")
        static let accent600 = UIColor(hex: "#16b087")
    }
    struct Spacing {
        static let sm: CGFloat = 8
        static let md: CGFloat = 10
    }
    struct Button {
        struct Size {
            struct Md {
                static let height: CGFloat = 40
                static let paddingHorizontal: CGFloat = 12
            }
        }
    }
}
```

### Android (XML Resources)
```xml
<!-- colors.xml -->
<color name="color_neutral_500">#9d9c9b</color>
<color name="color_accent_600">#16b087</color>

<!-- dimens.xml -->
<dimen name="spacing_sm">8dp</dimen>
<dimen name="spacing_md">10dp</dimen>
<dimen name="button_size_md_height">40dp</dimen>
<dimen name="font_size_body_md">20sp</dimen>  <!-- TV size -->
```

### Web TV (Samsung/LG, Vizio, Xumo)
```javascript
// JavaScript (tokens.js)
export const colorNeutral500 = '#9d9c9b';
export const colorAccent600 = '#16b087';
export const spacingSm = 8;
export const spacingMd = 10;
export const buttonSizeLgHeight = 48;  // lg recommended for TV
export const fontSizeBodyMd = 20;  // TV size
```

```css
/* CSS Variables (tokens.css) */
:root {
  --color-neutral-500: #9d9c9b;
  --color-accent-600: #16b087;
  --spacing-sm: 8px;
  --spacing-md: 10px;
  --button-size-lg-height: 48px;
  --font-size-body-md: 20px;  /* TV size */
}
```

---

## Related Documents

- [Token Structure and Naming](./docs/token_structure_and_naming.md)
- [Consumption Guide](./docs/consumption_guide.md)
- [Transformation Logic](./docs/transformation_logic.md)
