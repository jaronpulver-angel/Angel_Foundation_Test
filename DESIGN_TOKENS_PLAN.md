# Design Tokens Pipeline: Figma → GitHub → Multi-Platform

## Executive Summary

This plan establishes a **single source of truth** for design tokens in Figma that automatically syncs to GitHub and generates platform-specific outputs for React Native, TV apps, and React web applications.

---

## Architecture Overview

```
┌─────────────────┐     Tokens Studio Plugin      ┌──────────────────┐
│                 │  ──────────────────────────►  │                  │
│     FIGMA       │     (Push on Publish)         │     GITHUB       │
│  Design Tokens  │  ◄──────────────────────────  │   tokens/*.json  │
│   & Variables   │     (Pull on PR Merge)        │                  │
└─────────────────┘                               └────────┬─────────┘
                                                           │
                                                  GitHub Actions
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

## Recommended Approach: Tokens Studio + Style Dictionary

After researching the available options, I recommend this stack:

| Component | Tool | Why |
|-----------|------|-----|
| **Figma Plugin** | [Tokens Studio](https://tokens.studio/) | Industry standard, 264k+ users, native GitHub sync, bi-directional support |
| **Token Format** | [W3C Design Tokens](https://design-tokens.github.io/community-group/format/) | Future-proof, standardized, broad tool support |
| **Transformation** | [Style Dictionary](https://styledictionary.com/) | Multi-platform output, highly extensible, well-documented |
| **Automation** | GitHub Actions | Native integration, Figma webhooks support, free for public repos |

### Why NOT Figma's Native Variables API Alone?

- Requires **Enterprise plan** for full sync capabilities
- No built-in change management or PR workflow
- Tokens Studio provides better developer experience and branching support

---

## Phase 1: Repository Structure Setup

### Recommended Monorepo Structure

```
angel-foundation/
├── .github/
│   └── workflows/
│       ├── sync-tokens-from-figma.yml    # Triggered by Figma webhook
│       ├── sync-tokens-to-figma.yml      # Triggered on PR merge
│       └── build-tokens.yml              # Transform tokens for all platforms
│
├── packages/
│   ├── tokens/                           # Source of truth (synced from Figma)
│   │   ├── tokens/
│   │   │   ├── core/
│   │   │   │   ├── colors.json
│   │   │   │   ├── typography.json
│   │   │   │   ├── spacing.json
│   │   │   │   └── shadows.json
│   │   │   ├── semantic/
│   │   │   │   ├── colors.json           # References core tokens
│   │   │   │   └── components.json
│   │   │   └── themes/
│   │   │       ├── light.json
│   │   │       └── dark.json
│   │   ├── $themes.json                  # Tokens Studio themes config
│   │   ├── $metadata.json                # Tokens Studio metadata
│   │   ├── style-dictionary.config.js
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
│       │   ├── focus-states.ts           # TV-specific focus styling
│       │   └── index.ts
│       └── package.json
│
├── apps/
│   ├── mobile/                           # React Native app
│   ├── web/                              # React web app
│   └── tv/                               # TV app (Roku, Apple TV, etc.)
│
├── package.json                          # Workspace root
├── turbo.json                            # Turborepo config (optional)
└── pnpm-workspace.yaml                   # pnpm workspaces
```

---

## Phase 2: Figma Setup with Tokens Studio

### Step 2.1: Install Tokens Studio Plugin

1. Open your Figma design file
2. Go to **Plugins → Browse plugins**
3. Search for **"Tokens Studio for Figma"**
4. Install and run the plugin

### Step 2.2: Configure GitHub Sync

In Tokens Studio plugin:

1. Click **Settings** (gear icon)
2. Select **Add new sync provider → GitHub**
3. Configure:
   - **Personal Access Token**: Generate at github.com/settings/tokens with `repo` scope
   - **Repository**: `your-org/angel-foundation`
   - **Branch**: `main` (or create a `design-tokens` branch)
   - **Token folder**: `packages/tokens/tokens`
   - **File format**: `Multiple files` (recommended for better diffs)

### Step 2.3: Structure Your Tokens in Figma

Organize token sets in Tokens Studio:

```
📁 core/
   ├── 🎨 colors          # Primitive colors (blue-500, gray-100, etc.)
   ├── 📝 typography      # Font families, sizes, weights
   ├── 📏 spacing         # 4, 8, 12, 16, 24, 32, 48, 64
   └── 🌑 shadows         # Elevation levels

📁 semantic/
   ├── 🎨 colors          # background.primary, text.primary, etc.
   └── 🧩 components      # button.padding, card.radius, etc.

📁 themes/
   ├── ☀️ light           # Light theme overrides
   └── 🌙 dark            # Dark theme overrides
```

---

## Phase 3: Style Dictionary Configuration

### Step 3.1: Token Transformation Config

Create `packages/tokens/style-dictionary.config.js`:

```javascript
const StyleDictionary = require('style-dictionary');
const { registerTransforms } = require('@tokens-studio/sd-transforms');

// Register Tokens Studio transforms
registerTransforms(StyleDictionary);

module.exports = {
  source: ['tokens/**/*.json'],
  platforms: {
    // React Native output
    'react-native': {
      transformGroup: 'tokens-studio',
      buildPath: '../tokens-react-native/src/',
      files: [
        {
          destination: 'colors.ts',
          format: 'javascript/es6',
          filter: { type: 'color' }
        },
        {
          destination: 'typography.ts',
          format: 'javascript/es6',
          filter: { type: 'typography' }
        },
        {
          destination: 'spacing.ts',
          format: 'javascript/es6',
          filter: { type: 'spacing' }
        }
      ]
    },

    // Web CSS Variables
    'web-css': {
      transformGroup: 'tokens-studio',
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
      transformGroup: 'tokens-studio',
      buildPath: '../tokens-web/src/',
      files: [
        {
          destination: 'variables.scss',
          format: 'scss/variables'
        }
      ]
    },

    // Web TypeScript
    'web-ts': {
      transformGroup: 'tokens-studio',
      buildPath: '../tokens-web/src/',
      files: [
        {
          destination: 'tokens.ts',
          format: 'javascript/es6'
        }
      ]
    },

    // TV Apps (larger touch targets, focus states)
    'tv': {
      transformGroup: 'tokens-studio',
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

### Step 3.2: Package Dependencies

`packages/tokens/package.json`:

```json
{
  "name": "@angel-foundation/tokens",
  "version": "1.0.0",
  "scripts": {
    "build": "style-dictionary build",
    "build:watch": "style-dictionary build --watch"
  },
  "devDependencies": {
    "style-dictionary": "^4.0.0",
    "@tokens-studio/sd-transforms": "^1.0.0"
  }
}
```

---

## Phase 4: GitHub Actions Automation

### Step 4.1: Build Tokens on Push

`.github/workflows/build-tokens.yml`:

```yaml
name: Build Design Tokens

on:
  push:
    paths:
      - 'packages/tokens/tokens/**'
  pull_request:
    paths:
      - 'packages/tokens/tokens/**'

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install

      - name: Build tokens
        run: pnpm --filter @angel-foundation/tokens build

      - name: Commit generated files
        if: github.event_name == 'push' && github.ref == 'refs/heads/main'
        run: |
          git config --local user.email "github-actions[bot]@users.noreply.github.com"
          git config --local user.name "github-actions[bot]"
          git add packages/tokens-*/src/
          git diff --staged --quiet || git commit -m "chore: regenerate platform tokens"
          git push
```

### Step 4.2: Figma Webhook Integration (Advanced)

For automatic sync when designers publish in Figma:

`.github/workflows/sync-tokens-from-figma.yml`:

```yaml
name: Sync Tokens from Figma

on:
  repository_dispatch:
    types: [figma-tokens-updated]

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      # Tokens Studio handles the sync via plugin
      # This workflow just builds after sync
      - name: Install dependencies
        run: pnpm install

      - name: Build tokens
        run: pnpm --filter @angel-foundation/tokens build

      - name: Create Pull Request
        uses: peter-evans/create-pull-request@v6
        with:
          title: '🎨 Design token updates from Figma'
          commit-message: 'chore: sync design tokens from Figma'
          branch: design-tokens/auto-sync
          body: |
            ## Design Token Updates

            This PR contains automated design token updates from Figma.

            ### Changes
            - Updated token values from Figma Variables
            - Regenerated platform-specific outputs

            ### Review Checklist
            - [ ] Verify color changes render correctly
            - [ ] Check typography changes across platforms
            - [ ] Test spacing/layout changes
```

---

## Phase 5: Platform Integration

### React Native Integration

`apps/mobile/src/theme/index.ts`:

```typescript
import * as colors from '@angel-foundation/tokens-react-native/colors';
import * as typography from '@angel-foundation/tokens-react-native/typography';
import * as spacing from '@angel-foundation/tokens-react-native/spacing';

export const theme = {
  colors,
  typography,
  spacing,
} as const;

export type Theme = typeof theme;
```

### React Web Integration

`apps/web/src/styles/global.css`:

```css
@import '@angel-foundation/tokens-web/variables.css';

:root {
  /* Tokens are now available as CSS custom properties */
  /* --color-primary, --spacing-md, etc. */
}
```

### TV App Integration

`apps/tv/src/theme/index.ts`:

```typescript
import * as tokens from '@angel-foundation/tokens-tv';

// TV-specific adjustments for 10-foot experience
export const tvTheme = {
  ...tokens,
  // Override for larger screens
  focusRing: {
    width: 4,
    color: tokens.colorPrimary,
  },
  // Larger touch/focus targets
  minimumTouchTarget: 48,
};
```

---

## Phase 6: Workflow Summary

### Designer Workflow

1. **Edit tokens** in Figma using Tokens Studio plugin
2. **Push changes** to GitHub directly from the plugin
3. **Create PR** for review (or auto-create via webhook)
4. **Merge PR** after developer review

### Developer Workflow

1. **Pull latest** from main branch
2. **Install dependencies** - token packages auto-update
3. **Import tokens** in platform-specific format
4. **Build app** - tokens are type-safe and consistent

### Sync Flow Diagram

```
Designer updates in Figma
         │
         ▼
Tokens Studio "Push" to GitHub
         │
         ▼
GitHub receives token JSON files
         │
         ▼
GitHub Action triggers on push
         │
         ▼
Style Dictionary transforms tokens
         │
         ▼
Generated files committed to repo
         │
         ▼
Apps pull latest / CI builds
         │
         ▼
All platforms updated consistently
```

---

## Implementation Checklist

### Phase 1: Initial Setup
- [ ] Create monorepo structure
- [ ] Initialize pnpm workspace
- [ ] Set up packages/tokens directory
- [ ] Add Style Dictionary dependencies

### Phase 2: Figma Integration
- [ ] Install Tokens Studio in Figma
- [ ] Configure GitHub sync provider
- [ ] Create initial token structure
- [ ] Push first token set

### Phase 3: Build Pipeline
- [ ] Create Style Dictionary config
- [ ] Add build scripts
- [ ] Set up GitHub Actions
- [ ] Test token generation

### Phase 4: Platform Packages
- [ ] Create tokens-react-native package
- [ ] Create tokens-web package
- [ ] Create tokens-tv package
- [ ] Add TypeScript types

### Phase 5: App Integration
- [ ] Integrate tokens in React Native app
- [ ] Integrate tokens in web app
- [ ] Integrate tokens in TV app
- [ ] Test all platforms

### Phase 6: Advanced Features
- [ ] Set up Figma webhooks for auto-sync
- [ ] Add token documentation generation
- [ ] Create visual regression tests
- [ ] Add token change notifications

---

## Cost Considerations

| Tool | Cost | Notes |
|------|------|-------|
| Tokens Studio | Free (basic) / $8/mo (Pro) | Pro needed for multi-file sync |
| Style Dictionary | Free | Open source |
| GitHub Actions | Free | For public repos |
| Figma | Team/Enterprise | You likely already have this |

**Recommendation**: Start with Tokens Studio Pro ($8/month) for multi-file sync capability.

---

## Alternatives Considered

| Approach | Pros | Cons |
|----------|------|------|
| **Figma Variables API Only** | Native Figma | Enterprise only, no branching |
| **Supernova** | Full-featured | Expensive, vendor lock-in |
| **Specify** | Modern, good DX | Additional SaaS dependency |
| **Zeroheight** | Good docs integration | Less flexible transforms |
| **Custom Scripts** | Full control | Maintenance burden |

---

## Next Steps

Once you approve this plan, I can help you:

1. **Set up the repository structure** with all the necessary files
2. **Create the Style Dictionary configuration** with platform-specific transforms
3. **Configure GitHub Actions** for automated builds
4. **Generate starter token files** matching the W3C Design Tokens spec

Would you like me to proceed with implementation?

---

## Sources

- [Figma Variables GitHub Action Example](https://github.com/figma/variables-github-action-example)
- [Tokens Studio - GitHub Sync Documentation](https://docs.tokens.studio/token-storage/remote/sync-git-github)
- [Tokens Studio Official Site](https://tokens.studio/)
- [Style Dictionary Examples](https://styledictionary.com/getting-started/examples/)
- [W3C Design Tokens Specification](https://design-tokens.github.io/community-group/format/)
- [Synchronizing Figma Variables with Design Tokens](https://medium.com/@NateBaldwin/synchronizing-figma-variables-with-design-tokens-3a6c6adbf7da)
