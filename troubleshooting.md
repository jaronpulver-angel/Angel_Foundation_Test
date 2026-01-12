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
   - Check for updates to "Tokens Studio"

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
   - Light/dark modes export separately

3. **Check collection selection**
   - Ensure the correct variable collection is selected
   - Some plugins require explicit selection

4. **Try alternative plugin**
   - "Design Tokens" by Lukas Oppermann
   - "Tokens Studio" plugin

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
- "Format validation failed"
- "Naming convention error"

**Solutions:**

1. **Format validation errors**
   ```
   Error: Invalid token structure at 'color.accent.600'
   Expected: { "value": ..., "type": ... }
   ```

   **Fix:** Ensure all tokens have required `value` and `type` fields:
   ```json
   {
     "color": {
       "accent": {
         "600": {
           "value": "#16b087",
           "type": "color"
         }
       }
     }
   }
   ```

2. **Naming convention errors**
   ```
   Error: Invalid token name 'AccentColor' - use nested lowercase structure
   ```

   **Fix:** Use nested lowercase structure:
   ```json
   // Wrong
   "AccentColor": { ... }
   "accent-color": { ... }

   // Correct (nested structure)
   "color": {
     "accent": {
       "600": { "value": "#16b087", "type": "color" }
     }
   }
   ```

3. **Reference errors**
   ```
   Error: Unresolved reference '{color.accent.700}'
   ```

   **Fix:** Ensure referenced token exists:
   ```json
   {
     "color": {
       "accent": {
         "600": { "value": "#16b087", "type": "color" },
         "700": { "value": "#129973", "type": "color" }
       }
     },
     "component": {
       "button": {
         "emphasis": {
           "primary": {
             "background_hover": { "value": "{color.accent.700}", "type": "color" }
           }
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
   cat tokens/color_base/tokens.json | jq .
   ```

   Common issues:
   - Trailing commas
   - Missing quotes
   - Unescaped characters

2. **Check token references**
   ```
   Error: Could not resolve reference {color.accent.500}
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

### React Native: Token Path Not Found

**Symptoms:**
```typescript
// This fails
tokens.color.accent.600  // undefined
```

**Solutions:**

1. **Check correct token path**
   ```typescript
   // Correct usage
   import { tokens } from '@angel/tokens-react-native';

   // Access base colors
   tokens.color.accent[600]  // Note: numeric key needs brackets

   // Access semantic colors
   tokens.surface.default
   tokens.text.primary

   // Access component colors
   tokens.component.button.emphasis.primary.background

   // Access button sizes
   tokens.button.size.md.height
   ```

---

### Web: CSS Variables Not Working

**Symptoms:**
- `var(--component-button-emphasis-primary-background)` shows as invalid
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

4. **Check variable name**
   ```css
   /* Correct token names */
   var(--color-accent-600)
   var(--surface-default)
   var(--component-button-emphasis-primary-background)
   var(--button-size-md-height)
   var(--spacing-md)
   ```

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

3. **Check token access**
   ```brightscript
   ' Use PascalCase for token names
   m.tokens.ColorAccent600
   m.tokens.SurfaceDefault
   m.tokens.ComponentButtonEmphasisPrimaryBackground
   m.tokens.ButtonSizeLgHeight
   m.tokens.SpacingMd
   ```

4. **Check for syntax errors in .brs file**
   - Open file and look for malformed strings
   - Hex colors should be `"0x16b087FF"` format

---

### Android: Resource Not Found

**Symptoms:**
```
error: resource color/component_button_emphasis_primary_background not found
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

4. **Check resource names**
   ```kotlin
   // Android uses snake_case
   R.color.color_accent_600
   R.color.surface_default
   R.color.component_button_emphasis_primary_background
   R.dimen.button_size_lg_height
   R.dimen.spacing_md
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
Property 'accent' does not exist on type 'typeof import("@angel/tokens-react-native")'
```

**Solutions:**

1. **Update package**
   ```bash
   npm update @angel/tokens-react-native
   ```

2. **Check import and access**
   ```typescript
   // Correct import
   import { tokens } from '@angel/tokens-react-native';

   // Correct access
   tokens.color.accent[600]  // Use brackets for numeric keys
   tokens.surface.default
   tokens.component.button.emphasis.primary.background
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

2. **Token values are now numbers**
   ```typescript
   // Spacing and sizing tokens are numbers
   const height = tokens.button.size.md.height;  // 40 (number)

   // Use directly in StyleSheet
   const styles = StyleSheet.create({
     button: {
       height: tokens.button.size.md.height,  // Works!
       padding: tokens.spacing.md,  // Works!
     }
   });
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
   - #angel_design_system channel

3. **Create a new issue**
   - Include:
     - Platform (Web, RN, Roku, etc.)
     - Package version
     - Error message (full text)
     - Steps to reproduce

4. **Contact Design System Manager**
   - For urgent issues affecting production
