# Vision and Scope

## Overview

The Angel Design Token System is the single source of truth for all visual design decisions across Angel Studios' digital products. This system bridges the gap between design (Figma) and development (all platforms), ensuring consistency, reducing errors, and accelerating development.

---

## Vision Statement

> **One design change in Figma automatically propagates to all 8 platforms, ensuring pixel-perfect consistency across every Angel Studios experience.**

---

## Supported Platforms

| Platform | Technology | Output Format | Primary Use Case |
|----------|------------|---------------|------------------|
| **React Native** | TypeScript | `.ts` theme objects | Mobile apps (iOS/Android) |
| **React Web** | CSS/SCSS | CSS Variables, SCSS | angel.com, marketing sites |
| **Roku** | BrightScript | `.brs` files | Roku Channel |
| **Apple tvOS** | Swift | `.swift` extensions | Apple TV app |
| **Android TV** | Kotlin/Java | `colors.xml`, `dimens.xml` | Fire TV, Fire Stick |
| **Xbox** | C#/XAML | `ResourceDictionary.xaml` | Xbox app |
| **Vizio SmartCast** | JavaScript | CSS Variables, JS | Vizio TV app |
| **XumoTV** | JavaScript | CSS Variables, JS | Xumo TV app |

---

## Long-Term Goals

### Year 1: Foundation
- [ ] Establish token pipeline (Figma → GitHub → All Platforms)
- [ ] Define core token categories (colors, typography, spacing, component sizing)
- [ ] Create developer consumption guides for all 8 platforms
- [ ] Implement CI/CD automation for token distribution

### Year 2: Expansion
- [ ] Add more component tokens (cards, inputs, navigation)
- [ ] Implement dark mode / light mode theming
- [ ] Create visual regression testing for token changes
- [ ] Build custom Figma plugin for enhanced workflow

### Year 3: Maturity
- [ ] Real-time sync (no manual export)
- [ ] Token analytics (usage tracking across platforms)
- [ ] Design system health dashboard
- [ ] Self-service token creation for designers

---

## Token Categories

The Angel Design Token System includes these categories:

| Category | Location | Description |
|----------|----------|-------------|
| **Base Colors** | `color_base/` | Primitive colors: neutral, white, black, guild, accent, danger, warning, success, information (50-1000 scale) |
| **Theme Colors** | `color_theme/` | Semantic colors: surface, text, divider, component colors (light/dark modes) |
| **Spacing** | `dimensions/` | Spacing scale from 4xs (1) to 27xl (384) |
| **Border Radius** | `dimensions/` | Rounded corners: none, xs, sm, md, lg, xl, 2xl, 3xl, 4xl, full |
| **Viewports** | `dimensions/` | Breakpoints: phone_sm, phone, tablet_sm, tablet, desktop, desktop_lg |
| **Button Sizing** | `component/` | Button sizes xs-xl with height, padding, radius, font size |
| **Typography** | `typography/` | Font families, weights, sizes per viewport (mobile, tablet, desktop, tv) |

---

## Scope Definition

### What IS a Token

Tokens are **design decisions** that:

| Category | Examples | Token? |
|----------|----------|--------|
| **Brand Colors** | Accent teal `#16b087`, Guild orange `#c85a23` | Yes |
| **Semantic Colors** | `surface.default`, `text.primary`, `component.button.emphasis.primary.background` | Yes |
| **Color Scale** | neutral.50 → neutral.1000, accent.50 → accent.1000 | Yes |
| **Typography Scale** | Font sizes: 10, 12, 14, 16, 20, 24, 40px (per viewport) | Yes |
| **Font Families** | `Whitney SSm` (changing to `Angel Sans`) | Yes |
| **Spacing Scale** | 4xs (1) through 27xl (384) | Yes |
| **Border Radius** | rounded_none (0) through rounded_full (999) | Yes |
| **Button Sizing** | height, padding, font_size, border_radius per size (xs-xl) | Yes |
| **Focus States** | Ring width, ring color, focus outline | Yes |
| **TV Typography** | ~1.25x larger sizes for 10-foot UI | Yes |

### What is NOT a Token

These are **implementation details** that remain hardcoded:

| Category | Examples | Token? |
|----------|----------|--------|
| **Layout Structure** | Flexbox direction, grid columns | No |
| **Breakpoints** | Media query logic | No* |
| **Z-Index** | Stacking order values | No |
| **One-off Values** | A specific margin for one component | No |
| **Platform-Specific Hacks** | iOS safe area insets | No |
| **Animation Curves** | Bezier curves (unless standardized) | No |

*Viewport dimensions are tokens, but media query logic is not.

---

## Scope Boundaries

### In Scope

1. **Design Tokens**
   - Colors (primitive base + semantic theme)
   - Typography (families, sizes, weights, line heights per viewport)
   - Spacing (4xs through 27xl scale)
   - Border radius
   - Component sizing (button sizes with all properties)

2. **Font Files**
   - TTF files for native platforms
   - WOFF/WOFF2 for web platforms
   - Centralized font management

3. **Transformation Pipeline**
   - Style Dictionary configuration
   - Custom formatters per platform
   - GitHub Actions automation

4. **Documentation**
   - Developer guides per platform
   - Token naming conventions
   - Contribution guidelines

### Out of Scope

1. **Component Library Code**
   - React components
   - Native UI components
   - This repo provides tokens, not components

2. **Design Files**
   - Figma files live in Figma
   - Only exported token JSON lives here

3. **App-Specific Overrides**
   - Apps can extend tokens locally
   - But base tokens come from this repo

4. **A/B Test Variations**
   - Handled at app level
   - Not in token system

---

## Decision Authority

| Decision Type | Authority | Example |
|---------------|-----------|---------|
| **New Token Category** | Design System Manager | Adding "animation" tokens |
| **Token Value Change** | Designer + Approval | Changing accent.600 value |
| **Breaking Change** | Design System Manager + Tech Lead | Renaming token |
| **New Platform Support** | Engineering Lead | Adding PlayStation |
| **Naming Convention** | Design System Manager | Changing structure format |

---

## Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| **Token Coverage** | 100% of design decisions | Audit quarterly |
| **Sync Time** | < 30 minutes to staging | CI/CD logs |
| **Developer Adoption** | 100% of new features | Code review checks |
| **Design-Dev Parity** | < 5 visual bugs/quarter | Bug tracking |
| **Breaking Changes** | < 2 per quarter | Release notes |

---

## Stakeholders

| Role | Responsibility |
|------|----------------|
| **Design System Manager** | Token strategy, Figma management, naming conventions |
| **Platform Engineers** | Consuming tokens, reporting issues, platform-specific needs |
| **Product Designers** | Using tokens in designs, proposing new tokens |
| **Engineering Leads** | Approving breaking changes, integration support |
| **QA** | Validating token changes across platforms |

---

## Related Documents

- [Architecture Overview](./architecture_overview.md)
- [Token Structure and Naming](./token_structure_and_naming.md)
- [Consumption Guide](./consumption_guide.md)
- [Contributing Guidelines](../contributing.md)
