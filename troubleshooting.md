# Troubleshooting Guide

Common issues and solutions for the Angel Design Token system.

---

## Table of Contents

1. [Figma Export Issues](#figma-export-issues)
2. [GitHub/PR Issues](#githubpr-issues)
3. [Build Failures](#build-failures)
4. [Platform-Specific Issues](#platform-specific-issues)
5. [Token Not Updating](#token-not-updating)
6. [Type Errors](#type-errors)

---

## Figma Export Issues

### Plugin Won't Run

**Symptoms:**
- Plugin fails to load
- "Plugin crashed" error
- Nothing happens when running plugin

**Solutions:**

1. **Refresh Figma**
   - Close and reopen the Figma file
   - Or use `Cmd/Ctrl + Shift + R` to reload

2. **Update the plugin**
   - Go to Plugins → Manage plugins
   - Check for updates to "Design Tokens (W3C) Export"

3. **Check for conflicting plugins**
   - Disable other token-related plugins
   - Try running in a new Figma file

4. **Clear plugin cache**
   - Figma Menu → Help → Troubleshooting → Clear cache

---

### Exported JSON is Empty or Malformed

**Symptoms:**
- Downloaded JSON has `{}` or `null`
- JSON parsing errors
- Missing tokens

**Solutions:**

1. **Verify variables exist**
   - Open Local Variables panel in Figma
   - Ensure variables are created (not just styles)

2. **Check variable modes**
   - Export all modes or select the correct mode
   - Default mode is usually "Mode 1"

3. **Check collection selection**
   - Ensure the correct variable collection is selected
   - Some plugins require explicit selection

4. **Try alternative plugin**
   - "Variables Export" by another author
   - "Design Tokens" by Lukas Oppermann

---

### Missing Variables in Export

**Symptoms:**
- Some tokens exported, others missing
- Specific categories not appearing

**Solutions:**

1. **Check variable publishing**
   - In Figma, some variables may not be "published"
   - Ensure all variables are marked as publishable

2. **Check variable types**
   - Plugin may only export certain types (color, number)
   - String variables might need different export

3. **Check naming**
   - Variables starting with `_` may be treated as private
   - Rename to remove underscore prefix

---

## GitHub/PR Issues

### PR Validation Failed

**Symptoms:**
- Red X on PR checks
- "Schema validation failed"
- "Naming convention error"

**Solutions:**

1. **Schema validation errors**
   ```
   Error: Invalid token structure at 'color.blue.500'
   Expected: { "$value": ..., "$type": ... }
   ```

   **Fix:** Ensure all tokens have required `$value` and `$type` fields:
   ```json
   {
     "color": {
       "blue": {
         "500": {
           "$value": "#3B82F6",
           "$type": "color"
         }
       }
     }
   }
   ```

2. **Naming convention errors**
   ```
   Error: Invalid token name 'Blue500' - must be lowercase with hyphens
   ```

   **Fix:** Use lowercase and hyphens:
   ```json
   // ❌ Wrong
   "Blue500": { ... }
   "blue_500": { ... }

   // ✅ Correct
   "blue-500": { ... }
   // Or in nested structure:
   "blue": { "500": { ... } }
   ```

3. **Reference errors**
   ```
   Error: Unresolved reference '{color.blue.600}'
   ```

   **Fix:** Ensure referenced token exists:
   ```json
   {
     "color": {
       "blue": {
         "600": { "$value": "#2563EB", "$type": "color" }
       },
       "action": {
         "primary": {
           "background-hover": { "$value": "{color.blue.600}", "$type": "color" }
         }
       }
     }
   }
   ```

---

### Can't Create PR / Permission Denied

**Symptoms:**
- 403 error when pushing
- "Permission denied" message
- Can't create branch

**Solutions:**

1. **Check repo access**
   - Ensure you have write access to the repo
   - Contact Design System Manager for access

2. **Use GitHub web UI**
   - Go to repo in browser
   - Upload files directly via "Add file" → "Upload files"

3. **Check branch protection**
   - You may not be able to push directly to `main`
   - Create a feature branch first: `tokens/update-colors`

---

## Build Failures

### Style Dictionary Build Failed

**Symptoms:**
- GitHub Action failed at "Build tokens" step
- "Style Dictionary error" in logs

**Solutions:**

1. **Check JSON syntax**
   ```bash
   # Validate JSON locally
   cat tokens/colors.json | jq .
   ```

   Common issues:
   - Trailing commas
   - Missing quotes
   - Unescaped characters

2. **Check token references**
   ```
   Error: Could not resolve reference {color.primary.500}
   ```

   Ensure the referenced token path matches exactly.

3. **Check for circular references**
   ```
   Error: Circular reference detected
   ```

   Token A references Token B which references Token A.

---

### npm Publish Failed

**Symptoms:**
- Build succeeded but publish failed
- "403 Forbidden" on npm publish
- "Package already exists"

**Solutions:**

1. **Version conflict**
   - Version may already exist on npm
   - Check if version was bumped correctly

2. **npm token expired**
   - Contact repo admin to refresh NPM_TOKEN secret

3. **Package name conflict**
   - Ensure package name is correct in package.json
   - Check npm registry for conflicts

---

## Platform-Specific Issues

### React Native: Module Not Found

**Symptoms:**
```
Error: Cannot find module '@angel/tokens-react-native'
```

**Solutions:**

1. **Install the package**
   ```bash
   npm install @angel/tokens-react-native
   # or
   yarn add @angel/tokens-react-native
   ```

2. **Clear cache and reinstall**
   ```bash
   rm -rf node_modules
   npm install
   ```

3. **Check package.json**
   Ensure package is listed in dependencies.

---

### Web: CSS Variables Not Working

**Symptoms:**
- `var(--color-action-primary)` shows as invalid
- Colors not applying

**Solutions:**

1. **Check CSS import**
   ```css
   /* Must import the tokens CSS file */
   @import '@angel/tokens-web/tokens.css';
   ```

2. **Check cascade order**
   - Tokens CSS must load before your styles
   - Or import at top of your main CSS file

3. **Check :root scope**
   - Tokens are defined on `:root`
   - Ensure no conflicting `:root` declarations

---

### Roku: Tokens Object is Invalid

**Symptoms:**
```
Error: 'AngelTokens' is not a function
```

**Solutions:**

1. **Check file location**
   - `AngelTokens.brs` must be in `source/` directory

2. **Check function call**
   ```brightscript
   ' Correct usage
   m.tokens = AngelTokens()

   ' Not
   m.tokens = AngelTokens
   ```

3. **Check for syntax errors in .brs file**
   - Open file and look for malformed strings
   - Hex colors should be `"0xFFFFFFFF"` format

---

### Android: Resource Not Found

**Symptoms:**
```
error: resource color/color_action_primary_background not found
```

**Solutions:**

1. **Sync Gradle**
   - Android Studio: File → Sync Project with Gradle Files

2. **Check res/values location**
   - Files should be in `src/main/res/values/`
   - Not in a flavor-specific directory

3. **Clean and rebuild**
   ```bash
   ./gradlew clean
   ./gradlew assembleDebug
   ```

---

## Token Not Updating

### Local Package Not Updating

**Symptoms:**
- Updated tokens in repo but app shows old values
- `npm update` doesn't change anything

**Solutions:**

1. **Check installed version**
   ```bash
   npm list @angel/tokens-web
   ```

2. **Force update**
   ```bash
   npm update @angel/tokens-web --force
   # or
   npm install @angel/tokens-web@latest
   ```

3. **Clear npm cache**
   ```bash
   npm cache clean --force
   rm -rf node_modules
   npm install
   ```

4. **Check for lock file**
   - `package-lock.json` may pin old version
   - Delete lock file and reinstall

---

### CI/CD Not Triggering

**Symptoms:**
- Merged PR but no build triggered
- Packages not published

**Solutions:**

1. **Check workflow trigger**
   - Workflow only triggers on changes to `tokens/` directory
   - If you changed other files, workflow won't run

2. **Check branch**
   - Workflow only runs on `main` branch
   - Ensure PR was merged, not just closed

3. **Manual trigger**
   - Go to Actions tab in GitHub
   - Select "Build and Publish Tokens"
   - Click "Run workflow"

---

## Type Errors

### TypeScript: Property Does Not Exist

**Symptoms:**
```typescript
Property 'colors' does not exist on type 'typeof import("@angel/tokens-react-native")'
```

**Solutions:**

1. **Update package**
   ```bash
   npm update @angel/tokens-react-native
   ```

2. **Check import**
   ```typescript
   // Correct
   import { theme } from '@angel/tokens-react-native';

   // Not
   import theme from '@angel/tokens-react-native';
   ```

3. **Restart TypeScript server**
   - VS Code: Cmd/Ctrl + Shift + P → "TypeScript: Restart TS Server"

---

### Type Mismatch After Update

**Symptoms:**
```typescript
Type 'number' is not assignable to type 'string'
```

**Solutions:**

1. **Check release notes**
   - A major version may have changed types
   - See [versioning docs](./docs/versioning_and_releases.md)

2. **Update your code**
   ```typescript
   // If token changed from string to number
   // Before
   transform: `scale(${tokens.focusScale})`

   // After (same code works, type is just more accurate)
   transform: `scale(${tokens.focusScale})`
   ```

3. **Pin to previous version**
   ```json
   "@angel/tokens-react-native": "1.4.0"
   ```

---

## Still Having Issues?

1. **Search existing issues**
   - [GitHub Issues](https://github.com/angel-studios/angel-design-tokens/issues)

2. **Ask in Slack**
   - #design-system channel

3. **Create a new issue**
   - Include:
     - Platform (Web, RN, Roku, etc.)
     - Package version
     - Error message (full text)
     - Steps to reproduce

4. **Contact Design System Manager**
   - For urgent issues affecting production
