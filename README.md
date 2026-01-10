# Angel Design Tokens

[![Build Status](https://github.com/angel-studios/angel-design-tokens/workflows/Build%20and%20Publish/badge.svg)](https://github.com/angel-studios/angel-design-tokens/actions)
[![npm version](https://badge.fury.io/js/@angel%2Ftokens-web.svg)](https://www.npmjs.com/package/@angel/tokens-web)

The single source of truth for design tokens across all Angel Studios platforms.

---

## Quick Start

### React Native
```bash
npm install @angel/tokens-react-native
```
```typescript
import { theme } from '@angel/tokens-react-native';

<View style={{ backgroundColor: theme.colors.action.primary.background }} />
```

### React Web
```bash
npm install @angel/tokens-web
```
```css
@import '@angel/tokens-web/tokens.css';

.button { background-color: var(--color-action-primary-background); }
```

### All Platforms

| Platform | Package | Documentation |
|----------|---------|---------------|
| React Native | `@angel/tokens-react-native` | [Guide](./docs/consumption_guide.md#react-native) |
| React Web | `@angel/tokens-web` | [Guide](./docs/consumption_guide.md#react-web) |
| Roku | `packages/roku` | [Guide](./docs/consumption_guide.md#roku-brightscript) |
| tvOS | `AngelTokens (SPM)` | [Guide](./docs/consumption_guide.md#tvos-swift) |
| Android TV | `angel-tokens (Maven)` | [Guide](./docs/consumption_guide.md#android-tv-kotlinjava) |
| Xbox | `AngelTokens (NuGet)` | [Guide](./docs/consumption_guide.md#xbox-cxaml) |
| Vizio/Xumo | `@angel/tokens-web-tv` | [Guide](./docs/consumption_guide.md#vizio-smartcast--xumotv-javascript) |

---

## How It Works

```
Figma → Export JSON → GitHub → Style Dictionary → Platform Packages → Your App
```

1. **Design** - Designers update variables in Figma
2. **Export** - Export tokens as JSON using free Figma plugin
3. **Upload** - Create PR with new token files
4. **Transform** - Style Dictionary generates platform-specific outputs
5. **Deploy** - Packages published, apps auto-rebuild

[See full architecture →](./docs/architecture_overview.md)

---

## Repository Structure

```
angel-design-tokens/
├── tokens/                    # Source token JSON files
│   ├── colors.json
│   ├── typography.json
│   ├── spacing.json
│   └── tv-specific.json
├── fonts/                     # Font files
│   ├── AngelSans-Regular.ttf
│   └── AngelSans-Regular.woff2
├── packages/                  # Generated platform packages
│   ├── react-native/
│   ├── web/
│   ├── roku/
│   ├── tvos/
│   ├── android-tv/
│   ├── xbox/
│   └── web-tv/
├── docs/                      # Documentation
│   ├── vision_and_scope.md
│   ├── architecture_overview.md
│   ├── token_structure_and_naming.md
│   ├── transformation_logic.md
│   ├── ci_cd_workflow.md
│   ├── consumption_guide.md
│   └── versioning_and_releases.md
├── style-dictionary.config.mjs
└── package.json
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
| [Contributing](./CONTRIBUTING.md) | How to propose new tokens |
| [Mapping](./MAPPING.md) | Figma names → Code names |
| [Troubleshooting](./TROUBLESHOOTING.md) | Common issues and fixes |

---

## For Designers

### Updating Tokens

1. Make changes in Figma Variables panel
2. Run "Design Tokens (W3C) Export" plugin
3. Download the JSON file
4. Create a PR in this repo with the new JSON

[See detailed workflow →](./docs/architecture_overview.md#step-2-export-manual-process)

### Naming Conventions

```
[Category]-[Type]-[Item]-[Subitem]-[State]

Examples:
color-blue-500
color-action-primary-background-hover
spacing-padding-md
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
- Slack notification in #design-system
- Auto-generated PR in your repo with updated tokens

[See CI/CD details →](./docs/ci_cd_workflow.md)

---

## Contributing

We welcome contributions! See [CONTRIBUTING.md](./CONTRIBUTING.md) for:
- How to propose new tokens
- PR requirements
- Review process

---

## Support

- **Questions**: #design-system on Slack
- **Bugs**: [Create an issue](https://github.com/angel-studios/angel-design-tokens/issues)
- **Sync problems**: See [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)

---

## License

Proprietary - Angel Studios. Internal use only.
