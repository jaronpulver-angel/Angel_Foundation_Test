# Angel Design Tokens

[![Build Status](https://github.com/angel-studios/angel-design-tokens/workflows/Build%20and%20Publish/badge.svg)](https://github.com/angel-studios/angel-design-tokens/actions)
[![npm version](https://badge.fury.io/js/@angel%2Ftokens-web.svg)](https://www.npmjs.com/package/@angel/tokens-web)

The single source of truth for design tokens across all Angel platforms.

---

## Quick Start

### React Native
```bash
npm install @angel/tokens-react-native
```
```typescript
import { tokens } from '@angel/tokens-react-native';

<View style={{
  backgroundColor: tokens.surface.default,
  padding: tokens.spacing.md  // 10
}} />

<Button
  backgroundColor={tokens.component.button.emphasis.primary.background}
  height={tokens.button.size.md.height}  // 40
/>
```

### React Web
```bash
npm install @angel/tokens-web
```
```css
@import '@angel/tokens-web/tokens.css';

.button-primary {
  background-color: var(--component-button-emphasis-primary-background);
  height: var(--button-size-md-height);  /* 40px */
  padding: var(--button-size-md-padding-vertical) var(--button-size-md-padding-horizontal);
  border-radius: var(--button-size-md-border-radius);  /* 12px */
}
```

### All Platforms

| Platform | Package | Documentation |
|----------|---------|---------------|
| React Native | `@angel/tokens-react-native` | [Guide](./docs/consumption_guide.md#react-native) |
| React Web | `@angel/tokens-web` | [Guide](./docs/consumption_guide.md#react-web) |
| Roku | `packages/roku` | [Guide](./docs/consumption_guide.md#roku-brightscript) |
| tvOS | `AngelTokens (SPM)` | [Guide](./docs/consumption_guide.md#tvos-swift) |
| Android TV | `angel-tokens (Maven)` | [Guide](./docs/consumption_guide.md#android-tv-kotlin) |
| Xbox | `AngelTokens (NuGet)` | [Guide](./docs/consumption_guide.md#xbox-cxaml) |
| Vizio/Xumo | `@angel/tokens-web-tv` | [Guide](./docs/consumption_guide.md#vizio-smartcast--xumotv-javascript) |

---

## How It Works

```
Figma → Export JSON → GitHub → Style Dictionary → Platform Packages → Your App
```

1. **Design** - Designers update variables in Figma
2. **Export** - Export tokens as JSON using "Tokens Studio" plugin (free)
3. **Upload** - Create PR with new token files
4. **Transform** - Style Dictionary generates platform-specific outputs
5. **Deploy** - Packages published, apps auto-rebuild

[See full architecture →](./docs/architecture_overview.md)

---

## Token Categories

| Category | Description | Example |
|----------|-------------|---------|
| **color** | Base color palette | `color.accent.600` → `#16b087` |
| **surface** | Background colors (themed) | `surface.default`, `surface.overlay` |
| **text** | Text colors (themed) | `text.primary`, `text.secondary` |
| **spacing** | Spacing scale | `spacing.md` → `10`, `spacing.4xl` → `24` |
| **button.size** | Button sizing | `button.size.md.height` → `40` |
| **component.button** | Button colors (themed) | `component.button.emphasis.primary.background` |
| **border_radius** | Corner rounding | `border_radius.rounded_lg` → `12` |
| **font** | Typography | `font.size.body.md` → `16` (desktop) / `20` (TV) |

---

## Repository Structure

```
angel-design-tokens/
├── tokens/                        # Figma exports go here
│   ├── $metadata.json
│   ├── $themes.json
│   ├── color_base/
│   │   └── tokens.json            # neutral, accent, guild, danger, etc.
│   ├── color_theme/
│   │   ├── light.json             # surface, text, component colors
│   │   └── dark.json
│   ├── dimensions/
│   │   └── variables.json         # spacing, border_radius, viewports
│   ├── component/
│   │   └── variables.json         # button.size.xs/sm/md/lg/xl
│   └── typography/
│       ├── mobile.json
│       ├── tablet.json
│       ├── desktop.json
│       └── tv.json                # ~1.25x larger for 10-foot UI
├── fonts/                         # Font source files
│   ├── WhitneySSm-Medium.ttf
│   ├── WhitneySSm-Semibold.ttf
│   ├── WhitneySSm-Bold.ttf
│   └── web/
│       └── WhitneySSm-Medium.woff2
├── packages/                      # Generated platform packages
│   ├── react-native/
│   ├── web/
│   ├── roku/
│   ├── tvos/
│   ├── android/
│   ├── xbox/
│   └── web-tv/
├── docs/                          # Documentation
└── style-dictionary.config.mjs
```

---

## Documentation

| Document | Description |
|----------|-------------|
| [Vision & Scope](./docs/vision_and_scope.md) | Goals, supported platforms, what is/isn't a token |
| [Architecture](./docs/architecture_overview.md) | Pipeline flow, data flow diagrams |
| [Token Naming](./docs/token_structure_and_naming.md) | Naming conventions, token hierarchy |
| [Transformation](./docs/transformation_logic.md) | How tokens transform per platform |
| [CI/CD Workflow](./docs/ci_cd_workflow.md) | GitHub Actions, automation |
| [Consumption Guide](./docs/consumption_guide.md) | How to use tokens in your app |
| [Versioning](./docs/versioning_and_releases.md) | Breaking changes, releases |
| [Contributing](./contributing.md) | How to propose new tokens |
| [Mapping](./mapping.md) | Figma names → Code names |
| [Troubleshooting](./troubleshooting.md) | Common issues and fixes |

---

## For Designers

### Updating Tokens

1. Make changes in Figma Variables panel
2. Run "Tokens Studio" plugin (free)
3. Download the JSON file
4. Create a PR in this repo with the new JSON

[See detailed workflow →](./docs/architecture_overview.md#export-process-manual)

### Naming Conventions

Tokens use nested structure with underscores for states:

```
category.type.item.subitem_state

Examples:
color.accent.600
component.button.emphasis.primary.background_hover
button.size.md.height
```

[See full naming guide →](./docs/token_structure_and_naming.md)

---

## For Developers

### Updating Tokens in Your App

```bash
# Check current version
npm list @angel/tokens-web

# Update to latest
npm update @angel/tokens-web

# Or specific version
npm install @angel/tokens-web@1.5.0
```

### Automatic Updates

Token changes trigger automatic rebuilds. You'll receive:
- Slack notification in #angel_design_system
- Auto-generated PR in your repo with updated tokens

[See CI/CD details →](./docs/ci_cd_workflow.md)

---

## Contributing

We welcome contributions! See [contributing.md](./contributing.md) for:
- How to propose new tokens
- PR requirements
- Review process

---

## Support

- **Questions**: #angel_design_system on Slack
- **Bugs**: [Create an issue](https://github.com/angel-studios/angel-design-tokens/issues)
- **Sync problems**: See [troubleshooting.md](./troubleshooting.md)

---

## License

Proprietary - Angel. Internal use only.
