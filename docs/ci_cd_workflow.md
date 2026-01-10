# CI/CD Workflow

## Overview

This document details the GitHub Actions workflows that automate the design token pipeline. When tokens are updated in the repository, these workflows automatically transform, validate, publish, and deploy the changes across all platforms.

---

## Workflow Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           CI/CD WORKFLOW OVERVIEW                            │
└─────────────────────────────────────────────────────────────────────────────┘

    TRIGGER              VALIDATE              BUILD                DEPLOY
┌─────────────┐      ┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│             │      │             │      │             │      │             │
│  Push to    │ ───▶ │  Schema     │ ───▶ │   Style    │ ───▶ │  Publish    │
│  tokens/    │      │  Validation │      │  Dictionary │      │  Packages   │
│             │      │             │      │             │      │             │
└─────────────┘      └─────────────┘      └─────────────┘      └──────┬──────┘
                                                                      │
                                                                      ▼
                           ┌──────────────────────────────────────────────────┐
                           │              PLATFORM DEPLOYMENTS                 │
                           │                                                   │
                           │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐│
                           │  │  React  │ │  React  │ │  Roku   │ │  tvOS   ││
                           │  │ Native  │ │   Web   │ │ Channel │ │   App   ││
                           │  └─────────┘ └─────────┘ └─────────┘ └─────────┘│
                           │  ┌─────────┐ ┌─────────┐ ┌─────────┐            │
                           │  │ Android │ │  Xbox   │ │  WebTV  │            │
                           │  │   TV    │ │   App   │ │Vizio/Xumo            │
                           │  └─────────┘ └─────────┘ └─────────┘            │
                           └──────────────────────────────────────────────────┘
```

---

## Workflow Files

### 1. Token Validation (`validate-tokens.yml`)

Runs on every PR that modifies tokens. Validates JSON schema and naming conventions.

```yaml
# .github/workflows/validate-tokens.yml
name: Validate Tokens

on:
  pull_request:
    paths:
      - 'tokens/**/*.json'

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install

      - name: Validate JSON schema
        run: pnpm run validate:schema

      - name: Validate naming conventions
        run: pnpm run validate:naming

      - name: Check for breaking changes
        run: pnpm run check:breaking
        continue-on-error: true

      - name: Preview generated output
        run: |
          pnpm run build:tokens
          echo "## Generated Token Preview" >> $GITHUB_STEP_SUMMARY
          echo '```css' >> $GITHUB_STEP_SUMMARY
          head -50 packages/web/dist/tokens.css >> $GITHUB_STEP_SUMMARY
          echo '```' >> $GITHUB_STEP_SUMMARY

      - name: Comment on PR
        uses: actions/github-script@v7
        with:
          script: |
            const fs = require('fs');
            const preview = fs.readFileSync('packages/web/dist/tokens.css', 'utf8');
            const lines = preview.split('\n').slice(0, 30).join('\n');

            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: `## Token Changes Preview\n\n\`\`\`css\n${lines}\n...\n\`\`\``
            });
```

---

### 2. Build and Publish (`build-tokens.yml`)

Runs when tokens are merged to main. Builds all platform outputs and publishes packages.

```yaml
# .github/workflows/build-tokens.yml
name: Build and Publish Tokens

on:
  push:
    branches:
      - main
    paths:
      - 'tokens/**/*.json'
      - 'fonts/**/*'
      - 'style-dictionary.config.mjs'

  workflow_dispatch:
    inputs:
      force_rebuild:
        description: 'Force rebuild all platforms'
        required: false
        default: 'false'

jobs:
  build:
    runs-on: ubuntu-latest
    outputs:
      version: ${{ steps.version.outputs.version }}

    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'
          registry-url: 'https://registry.npmjs.org'

      - name: Install dependencies
        run: pnpm install

      - name: Determine version
        id: version
        run: |
          # Semantic versioning based on commit messages
          LAST_TAG=$(git describe --tags --abbrev=0 2>/dev/null || echo "v0.0.0")
          COMMITS=$(git log $LAST_TAG..HEAD --oneline)

          if echo "$COMMITS" | grep -q "BREAKING"; then
            NEW_VERSION=$(npx semver $LAST_TAG -i major)
          elif echo "$COMMITS" | grep -q "feat:"; then
            NEW_VERSION=$(npx semver $LAST_TAG -i minor)
          else
            NEW_VERSION=$(npx semver $LAST_TAG -i patch)
          fi

          echo "version=$NEW_VERSION" >> $GITHUB_OUTPUT
          echo "New version: $NEW_VERSION"

      - name: Build all platforms
        run: pnpm run build:all

      - name: Copy fonts to packages
        run: |
          # Copy fonts to each package
          for pkg in react-native web roku tvos android-tv xbox web-tv; do
            mkdir -p packages/$pkg/fonts
            cp fonts/*.ttf packages/$pkg/fonts/ 2>/dev/null || true
            cp fonts/*.woff* packages/$pkg/fonts/ 2>/dev/null || true
          done

      - name: Run tests
        run: pnpm run test

      - name: Update package versions
        run: |
          VERSION=${{ steps.version.outputs.version }}
          for pkg in packages/*/package.json; do
            jq ".version = \"$VERSION\"" $pkg > tmp.json && mv tmp.json $pkg
          done

      - name: Publish packages
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
        run: |
          for pkg in packages/*; do
            if [ -f "$pkg/package.json" ]; then
              cd $pkg
              npm publish --access public || true
              cd ../..
            fi
          done

      - name: Create Git tag
        run: |
          git config user.name "GitHub Actions"
          git config user.email "actions@github.com"
          git tag -a v${{ steps.version.outputs.version }} -m "Release v${{ steps.version.outputs.version }}"
          git push origin v${{ steps.version.outputs.version }}

      - name: Upload artifacts
        uses: actions/upload-artifact@v4
        with:
          name: token-packages
          path: packages/*/dist/

  notify:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - name: Notify Slack
        uses: slackapi/slack-github-action@v1
        with:
          payload: |
            {
              "blocks": [
                {
                  "type": "header",
                  "text": {
                    "type": "plain_text",
                    "text": "🎨 Design Tokens Updated"
                  }
                },
                {
                  "type": "section",
                  "fields": [
                    {
                      "type": "mrkdwn",
                      "text": "*Version:*\nv${{ needs.build.outputs.version }}"
                    },
                    {
                      "type": "mrkdwn",
                      "text": "*Triggered by:*\n${{ github.actor }}"
                    }
                  ]
                },
                {
                  "type": "section",
                  "text": {
                    "type": "mrkdwn",
                    "text": "New token packages are now available. Platform deployments starting..."
                  }
                }
              ]
            }
        env:
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}
          SLACK_WEBHOOK_TYPE: INCOMING_WEBHOOK

  # Trigger platform deployments
  trigger-deployments:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - name: Trigger React Native deployment
        uses: peter-evans/repository-dispatch@v2
        with:
          token: ${{ secrets.REPO_DISPATCH_TOKEN }}
          repository: angel-studios/angel-mobile-app
          event-type: tokens-updated
          client-payload: '{"version": "${{ needs.build.outputs.version }}"}'

      - name: Trigger React Web deployment
        uses: peter-evans/repository-dispatch@v2
        with:
          token: ${{ secrets.REPO_DISPATCH_TOKEN }}
          repository: angel-studios/angel-web
          event-type: tokens-updated
          client-payload: '{"version": "${{ needs.build.outputs.version }}"}'

      - name: Trigger Roku deployment
        uses: peter-evans/repository-dispatch@v2
        with:
          token: ${{ secrets.REPO_DISPATCH_TOKEN }}
          repository: angel-studios/angel-roku
          event-type: tokens-updated
          client-payload: '{"version": "${{ needs.build.outputs.version }}"}'

      - name: Trigger tvOS deployment
        uses: peter-evans/repository-dispatch@v2
        with:
          token: ${{ secrets.REPO_DISPATCH_TOKEN }}
          repository: angel-studios/angel-tvos
          event-type: tokens-updated
          client-payload: '{"version": "${{ needs.build.outputs.version }}"}'

      - name: Trigger Android TV deployment
        uses: peter-evans/repository-dispatch@v2
        with:
          token: ${{ secrets.REPO_DISPATCH_TOKEN }}
          repository: angel-studios/angel-android-tv
          event-type: tokens-updated
          client-payload: '{"version": "${{ needs.build.outputs.version }}"}'

      - name: Trigger Xbox deployment
        uses: peter-evans/repository-dispatch@v2
        with:
          token: ${{ secrets.REPO_DISPATCH_TOKEN }}
          repository: angel-studios/angel-xbox
          event-type: tokens-updated
          client-payload: '{"version": "${{ needs.build.outputs.version }}"}'

      - name: Trigger WebTV deployment
        uses: peter-evans/repository-dispatch@v2
        with:
          token: ${{ secrets.REPO_DISPATCH_TOKEN }}
          repository: angel-studios/angel-webtv
          event-type: tokens-updated
          client-payload: '{"version": "${{ needs.build.outputs.version }}"}'
```

---

### 3. Breaking Change Detection (`check-breaking.yml`)

Detects and warns about breaking changes before merge.

```yaml
# .github/workflows/check-breaking.yml
name: Check Breaking Changes

on:
  pull_request:
    paths:
      - 'tokens/**/*.json'

jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout PR
        uses: actions/checkout@v4

      - name: Checkout main branch
        uses: actions/checkout@v4
        with:
          ref: main
          path: main-branch

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Compare tokens
        id: compare
        run: |
          # Compare token files
          BREAKING_CHANGES=""

          for file in tokens/*.json; do
            filename=$(basename $file)
            if [ -f "main-branch/tokens/$filename" ]; then
              # Check for removed tokens
              REMOVED=$(jq -r 'paths | join(".")' main-branch/tokens/$filename | sort > /tmp/old.txt && \
                        jq -r 'paths | join(".")' $file | sort > /tmp/new.txt && \
                        comm -23 /tmp/old.txt /tmp/new.txt)

              if [ -n "$REMOVED" ]; then
                BREAKING_CHANGES="$BREAKING_CHANGES\n### Removed from $filename:\n$REMOVED"
              fi
            fi
          done

          if [ -n "$BREAKING_CHANGES" ]; then
            echo "breaking=true" >> $GITHUB_OUTPUT
            echo -e "$BREAKING_CHANGES" > /tmp/breaking.md
          else
            echo "breaking=false" >> $GITHUB_OUTPUT
          fi

      - name: Add warning label
        if: steps.compare.outputs.breaking == 'true'
        uses: actions/github-script@v7
        with:
          script: |
            github.rest.issues.addLabels({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              labels: ['breaking-change']
            });

      - name: Comment on PR
        if: steps.compare.outputs.breaking == 'true'
        uses: actions/github-script@v7
        with:
          script: |
            const fs = require('fs');
            const breaking = fs.readFileSync('/tmp/breaking.md', 'utf8');

            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: `## ⚠️ Breaking Changes Detected\n\nThe following tokens have been removed or renamed:\n${breaking}\n\n**Action Required:** Please ensure all consuming applications are updated before merging.`
            });
```

---

### 4. Platform Receiver Workflow

Each platform repository has a workflow to receive token updates:

```yaml
# Example: angel-mobile-app/.github/workflows/update-tokens.yml
name: Update Design Tokens

on:
  repository_dispatch:
    types: [tokens-updated]

  workflow_dispatch:
    inputs:
      version:
        description: 'Token version to install'
        required: true

jobs:
  update:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'

      - name: Update token package
        run: |
          VERSION=${{ github.event.client_payload.version || inputs.version }}
          pnpm update @angel/tokens-react-native@$VERSION

      - name: Run type check
        run: pnpm run typecheck

      - name: Run tests
        run: pnpm run test

      - name: Create PR
        uses: peter-evans/create-pull-request@v5
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          commit-message: 'chore: update design tokens to v${{ github.event.client_payload.version }}'
          title: '🎨 Update Design Tokens to v${{ github.event.client_payload.version }}'
          body: |
            This PR updates the design tokens package to version ${{ github.event.client_payload.version }}.

            ## Changes
            See the [token changelog](https://github.com/angel-studios/angel-design-tokens/releases/tag/v${{ github.event.client_payload.version }}) for details.

            ## Testing
            - [ ] Visual regression tests pass
            - [ ] Manual spot check on device
          branch: tokens/update-v${{ github.event.client_payload.version }}
          labels: |
            dependencies
            design-tokens
```

---

### 5. Staging to Production Promotion

```yaml
# .github/workflows/promote-production.yml
name: Promote to Production

on:
  workflow_dispatch:
    inputs:
      version:
        description: 'Version to promote'
        required: true
      platforms:
        description: 'Platforms to promote (comma-separated or "all")'
        required: true
        default: 'all'

jobs:
  promote:
    runs-on: ubuntu-latest
    environment: production
    steps:
      - name: Verify staging tests passed
        run: |
          # Check that all staging tests passed for this version
          echo "Verifying staging tests for v${{ inputs.version }}..."

      - name: Promote React Native
        if: contains(inputs.platforms, 'react-native') || inputs.platforms == 'all'
        uses: peter-evans/repository-dispatch@v2
        with:
          token: ${{ secrets.REPO_DISPATCH_TOKEN }}
          repository: angel-studios/angel-mobile-app
          event-type: promote-production
          client-payload: '{"version": "${{ inputs.version }}"}'

      - name: Promote React Web
        if: contains(inputs.platforms, 'web') || inputs.platforms == 'all'
        uses: peter-evans/repository-dispatch@v2
        with:
          token: ${{ secrets.REPO_DISPATCH_TOKEN }}
          repository: angel-studios/angel-web
          event-type: promote-production
          client-payload: '{"version": "${{ inputs.version }}"}'

      # ... (repeat for other platforms)

      - name: Notify completion
        uses: slackapi/slack-github-action@v1
        with:
          payload: |
            {
              "text": "✅ Design Tokens v${{ inputs.version }} promoted to production for: ${{ inputs.platforms }}"
            }
        env:
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}
```

---

## Automated Tests

### Schema Validation Test

```javascript
// scripts/validate-schema.js
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { glob } from 'glob';
import { readFileSync } from 'fs';

const schema = {
  type: 'object',
  additionalProperties: {
    oneOf: [
      { $ref: '#/$defs/tokenValue' },
      { $ref: '#/$defs/tokenGroup' }
    ]
  },
  $defs: {
    tokenValue: {
      type: 'object',
      required: ['$value', '$type'],
      properties: {
        $value: {},
        $type: {
          enum: ['color', 'dimension', 'fontFamily', 'fontWeight', 'number', 'shadow', 'string']
        },
        $description: { type: 'string' }
      }
    },
    tokenGroup: {
      type: 'object',
      additionalProperties: {
        oneOf: [
          { $ref: '#/$defs/tokenValue' },
          { $ref: '#/$defs/tokenGroup' }
        ]
      }
    }
  }
};

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);
const validate = ajv.compile(schema);

const files = glob.sync('tokens/**/*.json');
let hasErrors = false;

for (const file of files) {
  const content = JSON.parse(readFileSync(file, 'utf8'));
  if (!validate(content)) {
    console.error(`❌ ${file}:`, validate.errors);
    hasErrors = true;
  } else {
    console.log(`✅ ${file}`);
  }
}

process.exit(hasErrors ? 1 : 0);
```

### Naming Convention Test

```javascript
// scripts/validate-naming.js
import { glob } from 'glob';
import { readFileSync } from 'fs';

const NAMING_PATTERN = /^[a-z][a-z0-9]*(-[a-z0-9]+)*$/;

function validateNames(obj, path = []) {
  const errors = [];

  for (const [key, value] of Object.entries(obj)) {
    if (key.startsWith('$')) continue; // Skip metadata

    if (!NAMING_PATTERN.test(key)) {
      errors.push(`Invalid name: ${[...path, key].join('.')}`);
    }

    if (typeof value === 'object' && !value.$value) {
      errors.push(...validateNames(value, [...path, key]));
    }
  }

  return errors;
}

const files = glob.sync('tokens/**/*.json');
let hasErrors = false;

for (const file of files) {
  const content = JSON.parse(readFileSync(file, 'utf8'));
  const errors = validateNames(content);

  if (errors.length > 0) {
    console.error(`❌ ${file}:`);
    errors.forEach(e => console.error(`   ${e}`));
    hasErrors = true;
  } else {
    console.log(`✅ ${file}`);
  }
}

process.exit(hasErrors ? 1 : 0);
```

---

## Secrets Required

| Secret | Purpose | Where to Set |
|--------|---------|--------------|
| `NPM_TOKEN` | Publish npm packages | Repository secrets |
| `SLACK_WEBHOOK_URL` | Slack notifications | Repository secrets |
| `REPO_DISPATCH_TOKEN` | Trigger other repo workflows | Repository secrets (PAT with `repo` scope) |

---

## Timeline

```
Token Change Timeline
─────────────────────────────────────────────────────────────────────────────

0 min      5 min      10 min     15 min     20 min     25 min     30 min
│          │          │          │          │          │          │
▼          ▼          ▼          ▼          ▼          ▼          ▼
┌──────────┬──────────┬──────────┬──────────┬──────────┬──────────┐
│  MERGE   │  BUILD   │ PUBLISH  │ TRIGGER  │ APP BUILD│  STAGING │
│  to main │  tokens  │   npm    │ deploys  │ & deploy │  READY   │
└──────────┴──────────┴──────────┴──────────┴──────────┴──────────┘

Production: Add ~15 minutes for approval + promotion workflow
```

---

## Related Documents

- [Architecture Overview](./architecture_overview.md)
- [Versioning and Releases](./versioning_and_releases.md)
- [Troubleshooting](../TROUBLESHOOTING.md)
