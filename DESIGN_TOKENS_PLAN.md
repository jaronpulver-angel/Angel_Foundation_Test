# Design Tokens Pipeline: Figma → GitHub → Multi-Platform

## Executive Summary

This plan establishes a **single source of truth** for design tokens in Figma that syncs to GitHub via manual export and generates platform-specific outputs for React Native, TV apps, and React web applications.

**Cost: $0** - Uses free Figma plugins and open-source tools.

---

## Architecture Overview

```
┌─────────────────┐                              ┌──────────────────┐
│                 │     1. Export JSON           │                  │
│     FIGMA       │     (Free Plugin)            │     GITHUB       │
│  Design Tokens  │  ─────────────────────────►  │   tokens/*.json  │
│   & Variables   │     2. Manual Upload (PR)    │                  │
└─────────────────┘                              └────────┬─────────┘
                                                          │
                                                 3. GitHub Actions
                                                 (Style Dictionary)
                                                          │
                   ┌──────────────────────────────────────┼──────────────────────────────────────┐
                   │                                      │                                      │
                   ▼                                      ▼                                      ▼
        ┌──────────────────┐                   ┌──────────────────┐                   ┌──────────────────┐
        │   REACT NATIVE   │                   │    WEB (REACT)   │                   │     TV APPS      │
        │                  │                   │                  │                   │                  │
        │ • TypeScript     │                   │ • CSS Variables  │                   │ • TypeScript     │
        │ • React Native   │                   │ • SCSS Variables │                   │ • Platform CSS   │
        │   StyleSheet     │                   │ • JS/TS Objects  │                   │ • TV-specific    │
        └──────────────────┘                   └──────────────────┘                   └──────────────────┘
```

---

## Tool Stack (100% Free)

| Component | Tool | Cost |
|-----------|------|------|
| **Figma Plugin** | [Design Tokens (W3C) Export](https://www.figma.com/community/plugin/1377982390646186215/design-tokens-w3c-export) | Free |
| **Token Format** | [W3C Design Tokens](https://design-tokens.github.io/community-group/format/) | N/A |
| **Transformation** | [Style Dictionary](https://styledictionary.com/) | Free (OSS) |
| **Automation** | GitHub Actions | Free |
| **Figma Plan** | Organization (Angel Studios) | Already have |

**Total additional cost: $0**

---

## Phase 1: Repository Structure Setup

### Recommended Monorepo Structure

```
angel-design-system/
├── .github/
│   └── workflows/
│       └── build-tokens.yml              # Transform tokens on push
│
├── packages/
│   ├── tokens/                           # Source of truth (uploaded from Figma)
│   │   ├── tokens/
│   │   │   ├── colors.json
│   │   │   ├── typography.json
│   │   │   ├── spacing.json
│   │   │   ├── shadows.json
│   │   │   └── themes/
│   │   │       ├── light.json
│   │   │       └── dark.json
│   │   ├── style-dictionary.config.mjs
│   │   └── package.json
│   │
│   ├── tokens-react-native/              # Generated RN tokens
│   │   ├── src/
│   │   │   ├── colors.ts
│   │   │   ├── typography.ts
│   │   │   ├── spacing.ts
│   │   │   └── index.ts
│   │   └── package.json
│   │
│   ├── tokens-web/                       # Generated Web tokens
│   │   ├── src/
│   │   │   ├── variables.css
│   │   │   ├── variables.scss
│   │   │   ├── tokens.ts
│   │   │   └── index.ts
│   │   └── package.json
│   │
│   └── tokens-tv/                        # Generated TV app tokens
│       ├── src/
│       │   ├── tokens.ts
│       │   └── index.ts
│       └── package.json
│
├── package.json                          # Workspace root
└── pnpm-workspace.yaml                   # pnpm workspaces
```

---

## Phase 2: Figma Setup (Free Plugin)

### Recommended Plugin: Design Tokens (W3C) Export

**Install:** [Design Tokens (W3C) Export](https://www.figma.com/community/plugin/1377982390646186215/design-tokens-w3c-export)

This free plugin exports Figma Variables to W3C Design Tokens format JSON.

### Alternative Free Plugins

| Plugin | Output Format | Notes |
|--------|---------------|-------|
| [Design Tokens (W3C) Export](https://www.figma.com/community/plugin/1377982390646186215) | W3C JSON | Recommended - standard format |
| [Figma Variables to JSON](https://www.figma.com/community/plugin/1345399750040406570) | JSON | All variable types |
| [Design Tokens Manager](https://www.figma.com/community/plugin/1263743870981744253) | W3C JSON | Manifest support |
| [Token Export](https://www.figma.com/community/plugin/1318612019979212772) | W3C JSON | Selective export |

### How to Export Tokens from Figma

1. Open your Figma design file with Variables defined
2. Run the plugin: **Plugins → Design Tokens (W3C) Export**
3. Select the Variable Collections to export
4. Click **Export** - downloads a `.zip` file with JSON files
5. Extract the JSON files

### Organizing Variables in Figma

Structure your Figma Variables in Collections:

```
📁 Variable Collections in Figma:

├── 🎨 Colors
│   ├── primitive/blue-500: #3B82F6
│   ├── primitive/gray-100: #F3F4F6
│   ├── semantic/background-primary: {primitive/white}
│   └── semantic/text-primary: {primitive/gray-900}
│
├── 📏 Spacing
│   ├── xs: 4
│   ├── sm: 8
│   ├── md: 16
│   ├── lg: 24
│   └── xl: 32
│
├── 📝 Typography
│   ├── font-size/sm: 14
│   ├── font-size/base: 16
│   ├── font-size/lg: 18
│   └── line-height/normal: 1.5
│
└── 🌑 Shadows
    ├── sm: 0 1px 2px rgba(0,0,0,0.05)
    └── md: 0 4px 6px rgba(0,0,0,0.1)
```

---

## Phase 3: Manual Upload Workflow

### Designer Workflow (Step-by-Step)

```
┌─────────────────────────────────────────────────────────────────┐
│  DESIGNER WORKFLOW                                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. Make changes to Variables in Figma                          │
│                    │                                            │
│                    ▼                                            │
│  2. Run "Design Tokens (W3C) Export" plugin                     │
│                    │                                            │
│                    ▼                                            │
│  3. Download .zip file with JSON tokens                         │
│                    │                                            │
│                    ▼                                            │
│  4. Go to GitHub repo → packages/tokens/tokens/                 │
│                    │                                            │
│                    ▼                                            │
│  5. Click "Add file" → "Upload files"                           │
│     OR create a branch and PR via GitHub Desktop                │
│                    │                                            │
│                    ▼                                            │
│  6. Replace existing JSON files with new exports                │
│                    │                                            │
│                    ▼                                            │
│  7. Create Pull Request with description of changes             │
│                    │                                            │
│                    ▼                                            │
│  8. GitHub Actions automatically builds platform tokens         │
│                    │                                            │
│                    ▼                                            │
│  9. Developer reviews and merges PR                             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Quick Upload via GitHub Web UI

1. Navigate to `packages/tokens/tokens/` in the GitHub repo
2. Click **Add file → Upload files**
3. Drag and drop the exported JSON files
4. Add commit message: "Update design tokens from Figma"
5. Select **Create a new branch and start a pull request**
6. Submit the PR

---

## Phase 4: Style Dictionary Configuration

### Token Transformation Config

`packages/tokens/style-dictionary.config.mjs`:

```javascript
export default {
  source: ['tokens/**/*.json'],
  platforms: {
    // React Native output
    'react-native': {
      transformGroup: 'js',
      buildPath: '../tokens-react-native/src/',
      files: [
        {
          destination: 'colors.ts',
          format: 'javascript/es6',
          filter: (token) => token.type === 'color'
        },
        {
          destination: 'typography.ts',
          format: 'javascript/es6',
          filter: (token) => token.type === 'typography' || token.type === 'fontSizes' || token.type === 'fontWeights'
        },
        {
          destination: 'spacing.ts',
          format: 'javascript/es6',
          filter: (token) => token.type === 'spacing' || token.type === 'dimension'
        },
        {
          destination: 'index.ts',
          format: 'javascript/es6'
        }
      ]
    },

    // Web CSS Variables
    'web-css': {
      transformGroup: 'css',
      buildPath: '../tokens-web/src/',
      files: [
        {
          destination: 'variables.css',
          format: 'css/variables',
          options: {
            outputReferences: true
          }
        }
      ]
    },

    // Web SCSS Variables
    'web-scss': {
      transformGroup: 'scss',
      buildPath: '../tokens-web/src/',
      files: [
        {
          destination: '_variables.scss',
          format: 'scss/variables'
        }
      ]
    },

    // Web TypeScript
    'web-ts': {
      transformGroup: 'js',
      buildPath: '../tokens-web/src/',
      files: [
        {
          destination: 'tokens.ts',
          format: 'javascript/es6'
        }
      ]
    },

    // TV Apps
    'tv': {
      transformGroup: 'js',
      buildPath: '../tokens-tv/src/',
      files: [
        {
          destination: 'tokens.ts',
          format: 'javascript/es6'
        }
      ]
    }
  }
};
```

### Package Configuration

`packages/tokens/package.json`:

```json
{
  "name": "@angel/tokens",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "build": "style-dictionary build --config style-dictionary.config.mjs",
    "build:watch": "style-dictionary build --config style-dictionary.config.mjs --watch"
  },
  "devDependencies": {
    "style-dictionary": "^4.2.0"
  }
}
```

---

## Phase 5: GitHub Actions (Automated Build)

`.github/workflows/build-tokens.yml`:

```yaml
name: Build Design Tokens

on:
  push:
    paths:
      - 'packages/tokens/tokens/**'
    branches:
      - main
  pull_request:
    paths:
      - 'packages/tokens/tokens/**'

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 9

      - name: Install dependencies
        run: pnpm install

      - name: Build tokens
        run: pnpm --filter @angel/tokens build

      - name: Upload build artifacts
        uses: actions/upload-artifact@v4
        with:
          name: generated-tokens
          path: |
            packages/tokens-react-native/src/
            packages/tokens-web/src/
            packages/tokens-tv/src/

      # Only commit on main branch pushes (not PRs)
      - name: Commit generated files
        if: github.event_name == 'push' && github.ref == 'refs/heads/main'
        run: |
          git config --local user.email "github-actions[bot]@users.noreply.github.com"
          git config --local user.name "github-actions[bot]"
          git add packages/tokens-*/src/
          git diff --staged --quiet || git commit -m "chore: regenerate platform tokens from Figma export"
          git push
```

---

## Phase 6: Platform Integration

### React Native

`apps/mobile/src/theme/index.ts`:

```typescript
import * as colors from '@angel/tokens-react-native/colors';
import * as typography from '@angel/tokens-react-native/typography';
import * as spacing from '@angel/tokens-react-native/spacing';

export const theme = {
  colors,
  typography,
  spacing,
} as const;

export type Theme = typeof theme;
```

### React Web

`apps/web/src/styles/global.css`:

```css
@import '@angel/tokens-web/variables.css';

/* Tokens now available as CSS custom properties */
/* var(--color-primary), var(--spacing-md), etc. */
```

Or with TypeScript:

```typescript
import { tokens } from '@angel/tokens-web';

const styles = {
  color: tokens.colorPrimary,
  padding: tokens.spacingMd,
};
```

### TV Apps

```typescript
import { tokens } from '@angel/tokens-tv';

// TV-specific adjustments for 10-foot experience
export const tvTheme = {
  ...tokens,
  focusRingWidth: 4,
  minimumFocusTarget: 48,
};
```

---

## Implementation Checklist

### Phase 1: Initial Setup
- [ ] Create repository structure
- [ ] Initialize pnpm workspace
- [ ] Set up `packages/tokens` directory
- [ ] Add Style Dictionary dependency

### Phase 2: Figma Setup
- [ ] Install "Design Tokens (W3C) Export" plugin in Figma
- [ ] Organize Variables in Collections
- [ ] Test export to JSON

### Phase 3: Build Pipeline
- [ ] Create Style Dictionary config
- [ ] Add build scripts
- [ ] Set up GitHub Actions workflow
- [ ] Test token generation locally

### Phase 4: Platform Packages
- [ ] Create `tokens-react-native` package
- [ ] Create `tokens-web` package
- [ ] Create `tokens-tv` package
- [ ] Test imports in each platform

### Phase 5: First Manual Sync
- [ ] Export tokens from Figma
- [ ] Upload to GitHub via PR
- [ ] Verify GitHub Action runs
- [ ] Check generated outputs

---

## Future Enhancements (Phase 2)

Once this manual workflow is proven, we can add:

| Enhancement | Approach | Effort |
|-------------|----------|--------|
| **Auto-sync from Figma** | Custom Figma plugin + webhook | Medium |
| **Slack notifications** | GitHub Action on token changes | Low |
| **Visual diff preview** | Generate before/after screenshots | Medium |
| **Token documentation** | Auto-generate docs site | Medium |
| **Version tagging** | Semantic versioning for tokens | Low |

### Custom Plugin Option (Future)

If manual upload becomes painful, I can help build a custom Figma plugin that:
1. Exports Variables using Plugin API (free, works on Organization plan)
2. Sends JSON directly to a webhook endpoint
3. Webhook triggers GitHub Actions to create a PR

This would give you automation without Enterprise pricing.

---

## Workflow Summary

### Current (Manual) Flow

```
Designer edits Variables in Figma
              │
              ▼
Run free export plugin
              │
              ▼
Download JSON zip file
              │
              ▼
Upload to GitHub via PR
              │
              ▼
GitHub Action builds platform tokens
              │
              ▼
Developer reviews & merges PR
              │
              ▼
All platforms get updated tokens
```

### Time Estimate Per Update

| Step | Time |
|------|------|
| Export from Figma | ~30 seconds |
| Upload to GitHub | ~1-2 minutes |
| GitHub Action build | ~1 minute |
| PR review & merge | ~5 minutes |
| **Total** | **~8 minutes per update** |

---

## Sources

- [Design Tokens (W3C) Export Plugin](https://www.figma.com/community/plugin/1377982390646186215/design-tokens-w3c-export)
- [W3C Design Tokens Specification](https://design-tokens.github.io/community-group/format/)
- [Style Dictionary Documentation](https://styledictionary.com/)
- [Figma Variables to JSON Plugin](https://www.figma.com/community/plugin/1345399750040406570/figma-variables-to-json)
- [Figma Plugin API - Working with Variables](https://developers.figma.com/docs/plugins/working-with-variables/)
