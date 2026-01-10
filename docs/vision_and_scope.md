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
| **Vizio SmartCast** | JavaScript | CSS Variables | Vizio TV app |
| **XumoTV** | JavaScript | CSS Variables | Xumo TV app |

---

## Long-Term Goals

### Year 1: Foundation
- [ ] Establish token pipeline (Figma → GitHub → All Platforms)
- [ ] Define core token categories (colors, typography, spacing)
- [ ] Create developer consumption guides for all 8 platforms
- [ ] Implement CI/CD automation for token distribution

### Year 2: Expansion
- [ ] Add component tokens (buttons, cards, inputs)
- [ ] Implement dark mode / theme switching
- [ ] Create visual regression testing for token changes
- [ ] Build Figma plugin for enhanced workflow

### Year 3: Maturity
- [ ] Real-time sync (no manual export)
- [ ] Token analytics (usage tracking across platforms)
- [ ] Design system health dashboard
- [ ] Self-service token creation for designers

---

## Scope Definition

### What IS a Token

Tokens are **design decisions** that:

| Category | Examples | Token? |
|----------|----------|--------|
| **Brand Colors** | Primary blue `#1E40AF`, Error red `#DC2626` | Yes |
| **Semantic Colors** | `action-primary-background`, `text-error` | Yes |
| **Typography Scale** | Font sizes: 12, 14, 16, 20, 24, 32px | Yes |
| **Font Families** | `AngelSans-Regular`, `AngelSans-Bold` | Yes |
| **Spacing Scale** | 4, 8, 12, 16, 24, 32, 48px | Yes |
| **Border Radius** | 4, 8, 12, 16px | Yes |
| **Shadows** | Elevation levels 1-5 | Yes |
| **Focus States** | Ring width, ring color, scale factor | Yes |
| **TV Layout** | Row heights, card dimensions, safe areas | Yes |
| **Animation Timing** | Duration: 150ms, 300ms, 500ms | Yes |

### What is NOT a Token

These are **implementation details** that remain hardcoded:

| Category | Examples | Token? |
|----------|----------|--------|
| **Layout Structure** | Flexbox direction, grid columns | No |
| **Breakpoints** | Media query values | No* |
| **Z-Index** | Stacking order values | No |
| **One-off Values** | A specific margin for one component | No |
| **Platform-Specific Hacks** | iOS safe area insets | No |
| **Animation Curves** | Bezier curves (unless standardized) | No |

*Breakpoints may become tokens in Year 2 if needed across platforms.

---

## Scope Boundaries

### In Scope

1. **Design Tokens**
   - Colors (primitive and semantic)
   - Typography (families, sizes, weights, line heights)
   - Spacing (padding, margin, gap scales)
   - Border radius
   - Shadows/Elevation
   - TV-specific (focus states, row heights, safe areas)

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
| **New Token Category** | Design System Manager | Adding "motion" tokens |
| **Token Value Change** | Designer + Approval | Changing brand blue |
| **Breaking Change** | Design System Manager + Tech Lead | Renaming token |
| **New Platform Support** | Engineering Lead | Adding PlayStation |
| **Naming Convention** | Design System Manager | Changing prefix format |

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
- [Contributing Guidelines](../CONTRIBUTING.md)
