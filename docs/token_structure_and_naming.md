# Token Structure and Naming

## Overview

This document defines the naming conventions and hierarchical structure for Angel Studios design tokens. These conventions ensure consistency across all 8 platforms: React Native, React Web, Roku, tvOS, Android TV, Xbox, Vizio SmartCast, and XumoTV.

---

## Token Format

All tokens use the Tokens Studio format:

```json
{
  "token_name": {
    "value": "<value>",
    "type": "<type>"
  }
}
```

**Note:** We use `value` and `type`, NOT `$value` and `$type` (W3C format).

### Supported Types

| Type | Description | Example |
|------|-------------|---------|
| `color` | Hex color values | `#3B82F6`, `#ffffff80` |
| `number` | Unitless numbers | `16`, `1.5`, `-0.2` |
| `text` | String values | `"Whitney SSm"`, `"medium"` |

---

## Token Hierarchy

Design tokens follow a three-tier hierarchy:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  TIER 1: BASE / PRIMITIVE TOKENS                                            │
│                                                                             │
│  Raw values with no semantic meaning. Building blocks only.                 │
│                                                                             │
│  Location: color_base/tokens.json                                           │
│  Examples:                                                                  │
│  • color.neutral.500    → #9d9c9b                                          │
│  • color.accent.600     → #16b087                                          │
│  • color.danger.500     → #f45a3b                                          │
│                                                                             │
│  Usage: Reference from semantic tokens. Avoid direct use in components.     │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  TIER 2: SEMANTIC / THEME TOKENS                                            │
│                                                                             │
│  Intent-based tokens that reference primitives. Themed (light/dark).        │
│                                                                             │
│  Location: color_theme/light.json, color_theme/dark.json                    │
│  Examples:                                                                  │
│  • surface.default           → {color.white.1000}                          │
│  • text.primary              → {color.black.1000}                          │
│  • divider.normal            → {color.black.100}                           │
│                                                                             │
│  Usage: Use for general styling. Preferred for most use cases.              │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  TIER 3: COMPONENT TOKENS                                                   │
│                                                                             │
│  Specific to UI components. Include all states and sizes.                   │
│                                                                             │
│  Locations:                                                                 │
│  • color_theme/*.json  → component.button.emphasis.primary.background      │
│  • component/*.json    → button.size.md.height                             │
│                                                                             │
│  Examples:                                                                  │
│  • component.button.emphasis.primary.background       → {color.black.1000} │
│  • component.button.emphasis.primary.background_hover → {color.neutral.800}│
│  • button.size.md.height                              → 40                 │
│  • button.size.md.padding_horizontal                  → 12                 │
│                                                                             │
│  Usage: Use when building specific components for maximum specificity.      │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## File Organization

```
tokens/
├── $metadata.json
├── $themes.json
│
├── color_base/
│   └── tokens.json              # Primitive colors (neutral, accent, etc.)
│
├── color_base_brands/           # Brand-specific theme colors (future)
│
├── color_theme/
│   ├── light.json               # Light mode semantic colors
│   └── dark.json                # Dark mode semantic colors
│
├── dimensions/
│   └── variables.json           # Spacing, border radius, viewports
│
├── component/
│   └── variables.json           # Component sizing (button, etc.)
│
├── typography/
│   ├── mobile.json              # Mobile typography scale
│   ├── tablet.json              # Tablet typography scale
│   ├── desktop.json             # Desktop typography scale
│   └── tv.json                  # TV typography scale (larger)
│
└── strings/                     # Reusable string values (future)
```

---

## Token Categories

### 1. Base Colors (`color_base/tokens.json`)

Primitive color palette with 50-1000 scale (11 steps).

```json
{
  "color": {
    "neutral": {
      "50":   { "value": "#fcfcfc", "type": "color" },
      "100":  { "value": "#f5f5f4", "type": "color" },
      "200":  { "value": "#e6e6e6", "type": "color" },
      "300":  { "value": "#dfdedd", "type": "color" },
      "400":  { "value": "#c3c1c0", "type": "color" },
      "500":  { "value": "#9d9c9b", "type": "color" },
      "600":  { "value": "#7b7979", "type": "color" },
      "700":  { "value": "#595a5b", "type": "color" },
      "800":  { "value": "#3b3c3c", "type": "color" },
      "900":  { "value": "#262626", "type": "color" },
      "1000": { "value": "#141414", "type": "color" }
    },
    "accent": {
      "50":   { "value": "#f9fefd", "type": "color" },
      "100":  { "value": "#e8fffa", "type": "color" },
      "500":  { "value": "#21cea0", "type": "color" },
      "600":  { "value": "#16b087", "type": "color" },
      "1000": { "value": "#02120e", "type": "color" }
    }
  }
}
```

**Color Categories:**

| Category | Purpose | Example Value |
|----------|---------|---------------|
| `neutral` | Grayscale for text, backgrounds, borders | `#9d9c9b` |
| `white` | White with alpha transparency | `#ffffff80` (50% white) |
| `black` | Black with alpha transparency | `#00000080` (50% black) |
| `guild` | Brand orange (Angel Guild) | `#c85a23` |
| `accent` | Primary action color (teal) | `#16b087` |
| `danger` | Error states | `#f45a3b` |
| `warning` | Warning states | `#f29f3d` |
| `success` | Success states | `#a3e635` |
| `information` | Info states | `#00a4bf` |

**Scale Explanation (50-1000):**
- `50-200`: Lightest shades (backgrounds, subtle borders)
- `300-400`: Light mid-tones
- `500-600`: Base/primary shades (main usage)
- `700-800`: Dark shades
- `900-1000`: Darkest shades (text, solid fills)

---

### 2. Theme Colors (`color_theme/light.json`, `dark.json`)

Semantic colors that reference base colors. These change between light and dark modes.

```json
{
  "surface": {
    "default": { "value": "{color.white.1000}", "type": "color" },
    "overlay": { "value": "{color.neutral.100}", "type": "color" },
    "raised":  { "value": "{color.neutral.100}", "type": "color" }
  },
  "text": {
    "primary":   { "value": "{color.black.1000}", "type": "color" },
    "secondary": { "value": "{color.neutral.900}", "type": "color" },
    "tertiary":  { "value": "{color.neutral.700}", "type": "color" }
  },
  "divider": {
    "normal":  { "value": "{color.black.100}", "type": "color" },
    "lighter": { "value": "{color.black.50}", "type": "color" },
    "darker":  { "value": "{color.black.200}", "type": "color" }
  },
  "component": {
    "button": {
      "emphasis": {
        "primary": {
          "background":          { "value": "{color.black.1000}", "type": "color" },
          "background_hover":    { "value": "{color.neutral.800}", "type": "color" },
          "background_pressed":  { "value": "{color.neutral.900}", "type": "color" },
          "background_focused":  { "value": "{color.neutral.800}", "type": "color" },
          "background_disabled": { "value": "{color.neutral.600}", "type": "color" },
          "text":                { "value": "{color.white.1000}", "type": "color" },
          "text_hover":          { "value": "{color.white.1000}", "type": "color" },
          "text_pressed":        { "value": "{color.white.1000}", "type": "color" },
          "text_focused":        { "value": "{color.white.1000}", "type": "color" },
          "text_disabled":       { "value": "{color.neutral.400}", "type": "color" }
        }
      },
      "default_tokens": {
        "button_focus_outline": { "value": "{color.accent.600}", "type": "color" }
      }
    }
  }
}
```

**Button Variants:**
- `primary` - Main CTA (black background)
- `brand` - Brand accent color (teal)
- `secondary` - Secondary actions (gray)
- `transparent` - Overlay buttons
- `ghost` - Text-only buttons

---

### 3. Dimensions (`dimensions/variables.json`)

#### Spacing Scale

Comprehensive spacing scale from `4xs` (1) to `27xl` (384).

```json
{
  "spacing": {
    "none": { "value": 0, "type": "number" },
    "4xs":  { "value": 1, "type": "number" },
    "3xs":  { "value": 2, "type": "number" },
    "2xs":  { "value": 4, "type": "number" },
    "xs":   { "value": 6, "type": "number" },
    "sm":   { "value": 8, "type": "number" },
    "md":   { "value": 10, "type": "number" },
    "lg":   { "value": 12, "type": "number" },
    "xl":   { "value": 14, "type": "number" },
    "2xl":  { "value": 16, "type": "number" },
    "3xl":  { "value": 20, "type": "number" },
    "4xl":  { "value": 24, "type": "number" },
    "5xl":  { "value": 28, "type": "number" },
    "6xl":  { "value": 32, "type": "number" },
    "7xl":  { "value": 36, "type": "number" },
    "8xl":  { "value": 40, "type": "number" },
    "9xl":  { "value": 44, "type": "number" },
    "10xl": { "value": 48, "type": "number" },
    "11xl": { "value": 56, "type": "number" },
    "12xl": { "value": 64, "type": "number" },
    "13xl": { "value": 80, "type": "number" },
    "14xl": { "value": 96, "type": "number" },
    "15xl": { "value": 112, "type": "number" },
    "16xl": { "value": 128, "type": "number" },
    "17xl": { "value": 144, "type": "number" },
    "18xl": { "value": 160, "type": "number" },
    "19xl": { "value": 176, "type": "number" },
    "20xl": { "value": 192, "type": "number" },
    "21xl": { "value": 208, "type": "number" },
    "22xl": { "value": 224, "type": "number" },
    "23xl": { "value": 240, "type": "number" },
    "24xl": { "value": 256, "type": "number" },
    "25xl": { "value": 288, "type": "number" },
    "26xl": { "value": 320, "type": "number" },
    "27xl": { "value": 384, "type": "number" }
  }
}
```

**Platform Usage:**
- Mobile/Web: Typically use `xs` through `6xl`
- TV: Use larger values (`9xl` through `27xl`) for 10-foot UI

#### Border Radius

```json
{
  "border_radius": {
    "rounded_none": { "value": 0, "type": "number" },
    "rounded_xs":   { "value": 4, "type": "number" },
    "rounded_sm":   { "value": 6, "type": "number" },
    "rounded":      { "value": 8, "type": "number" },
    "rounded_md":   { "value": 10, "type": "number" },
    "rounded_lg":   { "value": 12, "type": "number" },
    "rounded_xl":   { "value": 14, "type": "number" },
    "rounded_2xl":  { "value": 16, "type": "number" },
    "rounded_3xl":  { "value": 24, "type": "number" },
    "rounded_4xl":  { "value": 32, "type": "number" },
    "rounded_full": { "value": 999, "type": "number" }
  }
}
```

#### Viewports

```json
{
  "viewports": {
    "phone_sm":   { "value": 375, "type": "number" },
    "phone":      { "value": 393, "type": "number" },
    "tablet_sm":  { "value": 810, "type": "number" },
    "tablet":     { "value": 1024, "type": "number" },
    "desktop":    { "value": 1440, "type": "number" },
    "desktop_lg": { "value": 1600, "type": "number" }
  }
}
```

---

### 4. Component Tokens (`component/variables.json`)

Component-specific sizing tokens. Currently includes button; more to be added.

```json
{
  "button": {
    "size": {
      "xs": {
        "height":             { "value": 24, "type": "number" },
        "padding_horizontal": { "value": 8, "type": "number" },
        "padding_vertical":   { "value": 7, "type": "number" },
        "border_radius":      { "value": 8, "type": "number" },
        "border_focus_radius": { "value": 9, "type": "number" },
        "font_size":          { "value": 10, "type": "number" },
        "font_line_height":   { "value": 10, "type": "number" },
        "font_letter_spacing": { "value": -0.2, "type": "number" },
        "icon_height":        { "value": 10, "type": "number" },
        "icon_font_size":     { "value": 10, "type": "number" }
      },
      "sm": {
        "height":             { "value": 32, "type": "number" },
        "padding_horizontal": { "value": 10, "type": "number" },
        "padding_vertical":   { "value": 10, "type": "number" },
        "border_radius":      { "value": 10, "type": "number" },
        "border_focus_radius": { "value": 11, "type": "number" },
        "font_size":          { "value": 12, "type": "number" },
        "font_line_height":   { "value": 12, "type": "number" },
        "font_letter_spacing": { "value": -0.2, "type": "number" },
        "icon_height":        { "value": 12, "type": "number" },
        "icon_font_size":     { "value": 12, "type": "number" }
      },
      "md": {
        "height":             { "value": 40, "type": "number" },
        "padding_horizontal": { "value": 12, "type": "number" },
        "padding_vertical":   { "value": 13, "type": "number" },
        "border_radius":      { "value": 12, "type": "number" },
        "border_focus_radius": { "value": 14, "type": "number" },
        "font_size":          { "value": 14, "type": "number" },
        "font_line_height":   { "value": 14, "type": "number" },
        "font_letter_spacing": { "value": -0.2, "type": "number" },
        "icon_height":        { "value": 14, "type": "number" },
        "icon_font_size":     { "value": 14, "type": "number" }
      },
      "lg": {
        "height":             { "value": 48, "type": "number" },
        "padding_horizontal": { "value": 14, "type": "number" },
        "padding_vertical":   { "value": 16, "type": "number" },
        "border_radius":      { "value": 14, "type": "number" },
        "border_focus_radius": { "value": 16, "type": "number" },
        "font_size":          { "value": 16, "type": "number" },
        "font_line_height":   { "value": 16, "type": "number" },
        "font_letter_spacing": { "value": -0.2, "type": "number" },
        "icon_height":        { "value": 16, "type": "number" },
        "icon_font_size":     { "value": 16, "type": "number" }
      },
      "xl": {
        "height":             { "value": 56, "type": "number" },
        "padding_horizontal": { "value": 16, "type": "number" },
        "padding_vertical":   { "value": 18, "type": "number" },
        "border_radius":      { "value": 16, "type": "number" },
        "border_focus_radius": { "value": 19, "type": "number" },
        "font_size":          { "value": 20, "type": "number" },
        "font_line_height":   { "value": 20, "type": "number" },
        "font_letter_spacing": { "value": -0.2, "type": "number" },
        "icon_height":        { "value": 20, "type": "number" },
        "icon_font_size":     { "value": 20, "type": "number" }
      }
    }
  }
}
```

**Button Size Reference:**

| Size | Height | Padding H | Padding V | Font Size | Border Radius |
|------|--------|-----------|-----------|-----------|---------------|
| `xs` | 24 | 8 | 7 | 10 | 8 |
| `sm` | 32 | 10 | 10 | 12 | 10 |
| `md` | 40 | 12 | 13 | 14 | 12 |
| `lg` | 48 | 14 | 16 | 16 | 14 |
| `xl` | 56 | 16 | 18 | 20 | 16 |

---

### 5. Typography (`typography/*.json`)

Typography tokens are split by viewport: `mobile.json`, `tablet.json`, `desktop.json`, `tv.json`.

```json
{
  "font": {
    "family": {
      "heading":  { "value": "Whitney SSm", "type": "text" },
      "display":  { "value": "Whitney SSm", "type": "text" },
      "overline": { "value": "Whitney SSm", "type": "text" },
      "body":     { "value": "Whitney SSm", "type": "text" },
      "label":    { "value": "Whitney SSm", "type": "text" }
    },
    "weight": {
      "medium":   { "value": "medium", "type": "text" },
      "semibold": { "value": "semibold", "type": "text" },
      "bold":     { "value": "bold", "type": "text" }
    },
    "size": {
      "display": {
        "sm": { "value": 44, "type": "number" },
        "md": { "value": 56, "type": "number" },
        "lg": { "value": 64, "type": "number" }
      },
      "heading": {
        "h1": { "value": 40, "type": "number" },
        "h2": { "value": 36, "type": "number" },
        "h3": { "value": 28, "type": "number" },
        "h4": { "value": 24, "type": "number" },
        "h5": { "value": 22, "type": "number" },
        "h6": { "value": 20, "type": "number" }
      },
      "body": {
        "xxs": { "value": 10, "type": "number" },
        "xs":  { "value": 12, "type": "number" },
        "sm":  { "value": 14, "type": "number" },
        "md (Default)": { "value": 16, "type": "number" },
        "lg":  { "value": 18, "type": "number" },
        "xl":  { "value": 20, "type": "number" }
      },
      "overline": {
        "xs": { "value": 12, "type": "number" },
        "sm": { "value": 13, "type": "number" },
        "md": { "value": 15, "type": "number" },
        "lg": { "value": 17, "type": "number" }
      },
      "label": {
        "xs": { "value": 10, "type": "number" },
        "sm": { "value": 12, "type": "number" },
        "md": { "value": 14, "type": "number" },
        "lg": { "value": 16, "type": "number" },
        "xl": { "value": 20, "type": "number" }
      }
    },
    "line_height": {
      "display": { "sm": { "value": 48 }, "md": { "value": 62 }, "lg": { "value": 70 } },
      "heading": { "h1": { "value": 48 }, "h2": { "value": 43 }, "h3": { "value": 34 } },
      "body":    { "sm": { "value": 21 }, "md": { "value": 24 }, "lg": { "value": 27 } }
    },
    "letter_spacing": {
      "display": {
        "medium":   { "sm": { "value": -2.5 }, "md": { "value": -2.5 }, "lg": { "value": -2.5 } },
        "semibold": { "sm": { "value": -1.5 }, "md": { "value": -1.5 }, "lg": { "value": -1.5 } }
      },
      "heading": {
        "medium":   { "h1": { "value": -1 }, "h2": { "value": -1 } },
        "semibold": { "h1": { "value": -0.8 }, "h2": { "value": -0.8 } }
      }
    }
  }
}
```

**Typography Scale by Viewport (Body MD example):**

| Viewport | body.md | heading.h1 | display.lg |
|----------|---------|------------|------------|
| Mobile | 16 | 40 | 64 |
| Tablet | 16 | 40 | 64 |
| Desktop | 16 | 40 | 64 |
| **TV** | **20** | **48** | **76** |

TV uses ~1.2-1.4x larger sizes for 10-foot viewing distance.

---

## Naming Conventions

### Structure

Tokens use nested object notation with underscores for multi-word keys:

```
category.subcategory.item.property
```

### State Suffixes

States use **underscores** (not hyphens):

| State | Suffix | Example |
|-------|--------|---------|
| Default | (none) | `background` |
| Hover | `_hover` | `background_hover` |
| Pressed | `_pressed` | `background_pressed` |
| Focused | `_focused` | `background_focused` |
| Disabled | `_disabled` | `background_disabled` |

### Examples

```
color.neutral.500                              # Base color
color.accent.600                               # Brand accent
surface.default                                # Semantic surface
text.primary                                   # Semantic text
component.button.emphasis.primary.background   # Component color
component.button.emphasis.primary.background_hover  # Component state
button.size.md.height                          # Component dimension
button.size.md.padding_horizontal              # Component dimension
spacing.md                                     # Spacing value
border_radius.rounded_lg                       # Border radius
font.size.body.md                              # Typography
font.weight.semibold                           # Font weight
```

### Do's and Don'ts

| Do | Don't |
|----|-------|
| `background_hover` | `background-hover` |
| `padding_horizontal` | `paddingHorizontal` |
| `border_radius` | `borderRadius` |
| `font_size` | `fontSize` |
| Use nested objects | Use flat hyphenated keys |
| Reference with `{color.accent.600}` | Hardcode values |

---

## Related Documents

- [Transformation Logic](./transformation_logic.md) - How tokens transform per platform
- [Consumption Guide](./consumption_guide.md) - Platform-specific usage
- [mapping.md](../mapping.md) - Figma to code name mapping
