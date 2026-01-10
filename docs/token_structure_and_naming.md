# Token Structure and Naming

## Overview

This document defines the naming conventions and hierarchical structure for all design tokens. Consistent naming is critical for discoverability, maintainability, and cross-platform compatibility.

---

## Naming Convention

### Format

```
[Category]-[Type]-[Item]-[Subitem]-[State]
```

### Examples

| Token Name | Category | Type | Item | Subitem | State |
|------------|----------|------|------|---------|-------|
| `color-blue-500` | color | blue | 500 | - | - |
| `color-action-primary-background` | color | action | primary | background | - |
| `color-action-primary-background-hover` | color | action | primary | background | hover |
| `spacing-padding-md` | spacing | padding | md | - | - |
| `typography-heading-xl-fontSize` | typography | heading | xl | fontSize | - |
| `component-button-primary-background` | component | button | primary | background | - |

---

## Token Hierarchy

Design tokens follow a three-tier hierarchy:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           TOKEN HIERARCHY                                    │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│  TIER 1: GLOBAL / PRIMITIVE TOKENS                                          │
│                                                                             │
│  Raw values with no semantic meaning. These are the building blocks.        │
│                                                                             │
│  Examples:                                                                  │
│  • color-blue-500: #3B82F6                                                  │
│  • color-gray-900: #111827                                                  │
│  • spacing-4: 4px                                                           │
│  • font-size-16: 16px                                                       │
│                                                                             │
│  Usage: NEVER use directly in code. Only reference from semantic tokens.    │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  TIER 2: ALIAS / SEMANTIC TOKENS                                            │
│                                                                             │
│  Intent-based tokens that reference primitives. These describe purpose.     │
│                                                                             │
│  Examples:                                                                  │
│  • color-action-primary-background: {color-blue-500}                        │
│  • color-text-primary: {color-gray-900}                                     │
│  • spacing-component-padding: {spacing-4}                                   │
│  • typography-body-fontSize: {font-size-16}                                 │
│                                                                             │
│  Usage: Use for general styling. Preferred for most use cases.              │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  TIER 3: COMPONENT TOKENS                                                    │
│                                                                             │
│  Specific to a UI component. Reference semantic tokens.                     │
│                                                                             │
│  Examples:                                                                  │
│  • component-button-primary-background: {color-action-primary-background}   │
│  • component-button-primary-padding: {spacing-component-padding}            │
│  • component-card-borderRadius: {radius-md}                                 │
│  • component-input-borderColor: {color-border-default}                      │
│                                                                             │
│  Usage: Use when building specific components for maximum specificity.      │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Token Categories

### 1. Colors

```json
{
  "color": {
    "$description": "All color tokens",

    "primitives": {
      "$description": "Raw color values - DO NOT USE DIRECTLY",
      "blue": {
        "50":  { "$value": "#EFF6FF", "$type": "color" },
        "100": { "$value": "#DBEAFE", "$type": "color" },
        "200": { "$value": "#BFDBFE", "$type": "color" },
        "300": { "$value": "#93C5FD", "$type": "color" },
        "400": { "$value": "#60A5FA", "$type": "color" },
        "500": { "$value": "#3B82F6", "$type": "color" },
        "600": { "$value": "#2563EB", "$type": "color" },
        "700": { "$value": "#1D4ED8", "$type": "color" },
        "800": { "$value": "#1E40AF", "$type": "color" },
        "900": { "$value": "#1E3A8A", "$type": "color" }
      },
      "gray": {
        "50":  { "$value": "#F9FAFB", "$type": "color" },
        "100": { "$value": "#F3F4F6", "$type": "color" },
        "200": { "$value": "#E5E7EB", "$type": "color" },
        "300": { "$value": "#D1D5DB", "$type": "color" },
        "400": { "$value": "#9CA3AF", "$type": "color" },
        "500": { "$value": "#6B7280", "$type": "color" },
        "600": { "$value": "#4B5563", "$type": "color" },
        "700": { "$value": "#374151", "$type": "color" },
        "800": { "$value": "#1F2937", "$type": "color" },
        "900": { "$value": "#111827", "$type": "color" }
      }
    },

    "semantic": {
      "$description": "Intent-based colors - USE THESE",
      "action": {
        "primary": {
          "background":       { "$value": "{color.primitives.blue.500}", "$type": "color" },
          "background-hover": { "$value": "{color.primitives.blue.600}", "$type": "color" },
          "background-active": { "$value": "{color.primitives.blue.700}", "$type": "color" },
          "text":             { "$value": "#FFFFFF", "$type": "color" }
        },
        "secondary": {
          "background":       { "$value": "{color.primitives.gray.100}", "$type": "color" },
          "background-hover": { "$value": "{color.primitives.gray.200}", "$type": "color" },
          "text":             { "$value": "{color.primitives.gray.900}", "$type": "color" }
        }
      },
      "text": {
        "primary":   { "$value": "{color.primitives.gray.900}", "$type": "color" },
        "secondary": { "$value": "{color.primitives.gray.600}", "$type": "color" },
        "tertiary":  { "$value": "{color.primitives.gray.400}", "$type": "color" },
        "inverse":   { "$value": "#FFFFFF", "$type": "color" },
        "error":     { "$value": "#DC2626", "$type": "color" },
        "success":   { "$value": "#16A34A", "$type": "color" }
      },
      "background": {
        "primary":   { "$value": "#FFFFFF", "$type": "color" },
        "secondary": { "$value": "{color.primitives.gray.50}", "$type": "color" },
        "tertiary":  { "$value": "{color.primitives.gray.100}", "$type": "color" },
        "inverse":   { "$value": "{color.primitives.gray.900}", "$type": "color" }
      },
      "border": {
        "default": { "$value": "{color.primitives.gray.200}", "$type": "color" },
        "strong":  { "$value": "{color.primitives.gray.300}", "$type": "color" },
        "focus":   { "$value": "{color.primitives.blue.500}", "$type": "color" }
      }
    }
  }
}
```

---

### 2. Typography

```json
{
  "typography": {
    "$description": "Typography tokens",

    "fontFamily": {
      "sans":    { "$value": "AngelSans, -apple-system, BlinkMacSystemFont, sans-serif", "$type": "fontFamily" },
      "mono":    { "$value": "AngelMono, Menlo, Monaco, monospace", "$type": "fontFamily" },
      "display": { "$value": "AngelDisplay, Georgia, serif", "$type": "fontFamily" }
    },

    "fontSize": {
      "xs":   { "$value": "12px", "$type": "dimension" },
      "sm":   { "$value": "14px", "$type": "dimension" },
      "base": { "$value": "16px", "$type": "dimension" },
      "lg":   { "$value": "18px", "$type": "dimension" },
      "xl":   { "$value": "20px", "$type": "dimension" },
      "2xl":  { "$value": "24px", "$type": "dimension" },
      "3xl":  { "$value": "30px", "$type": "dimension" },
      "4xl":  { "$value": "36px", "$type": "dimension" },
      "5xl":  { "$value": "48px", "$type": "dimension" }
    },

    "fontWeight": {
      "regular":  { "$value": "400", "$type": "fontWeight" },
      "medium":   { "$value": "500", "$type": "fontWeight" },
      "semibold": { "$value": "600", "$type": "fontWeight" },
      "bold":     { "$value": "700", "$type": "fontWeight" }
    },

    "lineHeight": {
      "tight":  { "$value": "1.25", "$type": "number" },
      "normal": { "$value": "1.5", "$type": "number" },
      "loose":  { "$value": "1.75", "$type": "number" }
    },

    "styles": {
      "$description": "Composite typography styles",
      "heading": {
        "xl": {
          "fontSize":   { "$value": "{typography.fontSize.4xl}", "$type": "dimension" },
          "fontWeight": { "$value": "{typography.fontWeight.bold}", "$type": "fontWeight" },
          "lineHeight": { "$value": "{typography.lineHeight.tight}", "$type": "number" },
          "fontFamily": { "$value": "{typography.fontFamily.display}", "$type": "fontFamily" }
        },
        "lg": {
          "fontSize":   { "$value": "{typography.fontSize.3xl}", "$type": "dimension" },
          "fontWeight": { "$value": "{typography.fontWeight.bold}", "$type": "fontWeight" },
          "lineHeight": { "$value": "{typography.lineHeight.tight}", "$type": "number" },
          "fontFamily": { "$value": "{typography.fontFamily.display}", "$type": "fontFamily" }
        },
        "md": {
          "fontSize":   { "$value": "{typography.fontSize.2xl}", "$type": "dimension" },
          "fontWeight": { "$value": "{typography.fontWeight.semibold}", "$type": "fontWeight" },
          "lineHeight": { "$value": "{typography.lineHeight.tight}", "$type": "number" },
          "fontFamily": { "$value": "{typography.fontFamily.sans}", "$type": "fontFamily" }
        }
      },
      "body": {
        "lg": {
          "fontSize":   { "$value": "{typography.fontSize.lg}", "$type": "dimension" },
          "fontWeight": { "$value": "{typography.fontWeight.regular}", "$type": "fontWeight" },
          "lineHeight": { "$value": "{typography.lineHeight.normal}", "$type": "number" }
        },
        "base": {
          "fontSize":   { "$value": "{typography.fontSize.base}", "$type": "dimension" },
          "fontWeight": { "$value": "{typography.fontWeight.regular}", "$type": "fontWeight" },
          "lineHeight": { "$value": "{typography.lineHeight.normal}", "$type": "number" }
        },
        "sm": {
          "fontSize":   { "$value": "{typography.fontSize.sm}", "$type": "dimension" },
          "fontWeight": { "$value": "{typography.fontWeight.regular}", "$type": "fontWeight" },
          "lineHeight": { "$value": "{typography.lineHeight.normal}", "$type": "number" }
        }
      }
    }
  }
}
```

---

### 3. Spacing

```json
{
  "spacing": {
    "$description": "Spacing scale (4px base unit)",

    "primitives": {
      "0":  { "$value": "0px", "$type": "dimension" },
      "1":  { "$value": "4px", "$type": "dimension" },
      "2":  { "$value": "8px", "$type": "dimension" },
      "3":  { "$value": "12px", "$type": "dimension" },
      "4":  { "$value": "16px", "$type": "dimension" },
      "5":  { "$value": "20px", "$type": "dimension" },
      "6":  { "$value": "24px", "$type": "dimension" },
      "8":  { "$value": "32px", "$type": "dimension" },
      "10": { "$value": "40px", "$type": "dimension" },
      "12": { "$value": "48px", "$type": "dimension" },
      "16": { "$value": "64px", "$type": "dimension" },
      "20": { "$value": "80px", "$type": "dimension" },
      "24": { "$value": "96px", "$type": "dimension" }
    },

    "semantic": {
      "padding": {
        "xs": { "$value": "{spacing.primitives.1}", "$type": "dimension" },
        "sm": { "$value": "{spacing.primitives.2}", "$type": "dimension" },
        "md": { "$value": "{spacing.primitives.4}", "$type": "dimension" },
        "lg": { "$value": "{spacing.primitives.6}", "$type": "dimension" },
        "xl": { "$value": "{spacing.primitives.8}", "$type": "dimension" }
      },
      "gap": {
        "xs": { "$value": "{spacing.primitives.1}", "$type": "dimension" },
        "sm": { "$value": "{spacing.primitives.2}", "$type": "dimension" },
        "md": { "$value": "{spacing.primitives.4}", "$type": "dimension" },
        "lg": { "$value": "{spacing.primitives.6}", "$type": "dimension" },
        "xl": { "$value": "{spacing.primitives.8}", "$type": "dimension" }
      },
      "margin": {
        "xs": { "$value": "{spacing.primitives.1}", "$type": "dimension" },
        "sm": { "$value": "{spacing.primitives.2}", "$type": "dimension" },
        "md": { "$value": "{spacing.primitives.4}", "$type": "dimension" },
        "lg": { "$value": "{spacing.primitives.6}", "$type": "dimension" },
        "xl": { "$value": "{spacing.primitives.8}", "$type": "dimension" }
      }
    }
  }
}
```

---

### 4. Border Radius

```json
{
  "radius": {
    "none": { "$value": "0px", "$type": "dimension" },
    "sm":   { "$value": "4px", "$type": "dimension" },
    "md":   { "$value": "8px", "$type": "dimension" },
    "lg":   { "$value": "12px", "$type": "dimension" },
    "xl":   { "$value": "16px", "$type": "dimension" },
    "2xl":  { "$value": "24px", "$type": "dimension" },
    "full": { "$value": "9999px", "$type": "dimension" }
  }
}
```

---

### 5. Shadows / Elevation

```json
{
  "shadow": {
    "none": {
      "$value": "none",
      "$type": "shadow"
    },
    "sm": {
      "$value": "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
      "$type": "shadow"
    },
    "md": {
      "$value": "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
      "$type": "shadow"
    },
    "lg": {
      "$value": "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)",
      "$type": "shadow"
    },
    "xl": {
      "$value": "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
      "$type": "shadow"
    }
  }
}
```

---

### 6. TV-Specific Tokens

```json
{
  "tv": {
    "$description": "TV-specific tokens for 10-foot UI",

    "layout": {
      "$description": "Row and container heights for TV layouts",
      "rowHeight": {
        "sm":   { "$value": "180", "$type": "number", "$description": "Small content row" },
        "md":   { "$value": "240", "$type": "number", "$description": "Standard content row" },
        "lg":   { "$value": "320", "$type": "number", "$description": "Featured content row" },
        "hero": { "$value": "480", "$type": "number", "$description": "Hero/billboard row" }
      },
      "containerPadding": {
        "horizontal": { "$value": "48", "$type": "number" },
        "vertical":   { "$value": "24", "$type": "number" }
      }
    },

    "components": {
      "$description": "TV component dimensions",
      "card": {
        "poster": {
          "width":  { "$value": "150", "$type": "number" },
          "height": { "$value": "225", "$type": "number" }
        },
        "landscape": {
          "width":  { "$value": "320", "$type": "number" },
          "height": { "$value": "180", "$type": "number" }
        },
        "hero": {
          "width":  { "$value": "640", "$type": "number" },
          "height": { "$value": "360", "$type": "number" }
        }
      },
      "button": {
        "height": { "$value": "56", "$type": "number" },
        "minWidth": { "$value": "200", "$type": "number" }
      }
    },

    "focus": {
      "$description": "Focus state styling for D-pad navigation",
      "ring": {
        "width": { "$value": "4", "$type": "number" },
        "color": { "$value": "#3B82F6", "$type": "color" },
        "offset": { "$value": "2", "$type": "number" }
      },
      "scale": { "$value": "1.05", "$type": "number" },
      "shadow": {
        "$value": "0 0 20px rgba(59, 130, 246, 0.5)",
        "$type": "shadow"
      }
    },

    "safeArea": {
      "$description": "TV safe area margins",
      "horizontal": { "$value": "48", "$type": "number", "$description": "5% of 1920px" },
      "vertical":   { "$value": "27", "$type": "number", "$description": "5% of 1080px" }
    },

    "animation": {
      "$description": "TV animation timings",
      "focus": {
        "duration": { "$value": "150", "$type": "number", "$description": "ms" },
        "easing":   { "$value": "ease-out", "$type": "string" }
      },
      "scroll": {
        "duration": { "$value": "300", "$type": "number", "$description": "ms" },
        "easing":   { "$value": "ease-in-out", "$type": "string" }
      }
    }
  }
}
```

---

## Naming Rules

### Do's

| Rule | Good Example | Bad Example |
|------|--------------|-------------|
| Use lowercase | `color-blue-500` | `Color-Blue-500` |
| Use hyphens | `font-size-lg` | `fontSize_lg` |
| Be specific | `button-primary-background` | `btn-bg` |
| Use semantic names | `color-text-primary` | `color-dark-gray` |
| Include state | `button-hover-background` | `button-background-2` |

### Don'ts

| Don't | Why |
|-------|-----|
| Use abbreviations | Hard to understand (`bg` vs `background`) |
| Use numbers for semantics | `color-1` doesn't convey meaning |
| Mix conventions | `colorBlue` and `color-blue` in same system |
| Use platform-specific terms | `ios-blue` limits reusability |
| Use magic numbers | `spacing-13px` - use scale instead |

---

## State Naming

For interactive elements, append state to the token name:

| State | Suffix | Example |
|-------|--------|---------|
| Default | (none) | `button-primary-background` |
| Hover | `-hover` | `button-primary-background-hover` |
| Active/Pressed | `-active` | `button-primary-background-active` |
| Focus | `-focus` | `button-primary-border-focus` |
| Disabled | `-disabled` | `button-primary-background-disabled` |
| Selected | `-selected` | `checkbox-background-selected` |

---

## File Organization

```
tokens/
├── colors.json           # All color tokens
├── typography.json       # Font families, sizes, weights
├── spacing.json          # Padding, margin, gap scales
├── radius.json           # Border radius values
├── shadows.json          # Elevation/shadow values
├── tv-specific.json      # TV-only tokens (layout, focus, safe area)
└── components/           # Component-specific tokens (optional)
    ├── button.json
    ├── card.json
    └── input.json
```

---

## Related Documents

- [Transformation Logic](./transformation_logic.md)
- [Consumption Guide](./consumption_guide.md)
- [MAPPING.md](../MAPPING.md)
