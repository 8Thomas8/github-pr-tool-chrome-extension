# GitHub PR Tool Chrome Extension

GitHub PR Tool is a Chrome browser extension that streamlines the process of marking all files as viewed or unviewed in GitHub pull requests. The extension adds a convenient popup interface with buttons to check or uncheck all files in a pull request.

**Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.**

## Working Effectively

### Prerequisites and Setup

- Ensure Node.js v20+ is installed (`node --version` should show v20 or higher)
- Clone the repository and navigate to the project root
- Install development dependencies:
  ```bash
  npm install
  ```
  Takes ~5 seconds to complete.

### Development Workflow

- **Lint code**: `npm run lint` - runs ESLint to check code quality (<1 second)
- **Format code**: `npm run format` - runs Prettier to format all files (<1 second)
- **Package extension**: `make zip` - creates distribution zip file (<1 second)
- **Clean build artifacts**: `make clean` - removes generated zip file (<1 second)

### CI Validation Commands

Before committing changes, always run these exact commands that the CI pipeline uses:

- `npx eslint . --max-warnings=0` - strict linting with no warnings allowed (<1 second)
- `npx prettier --check .` - verify all files are properly formatted (<1 second)

**NEVER CANCEL these commands** - they all complete in under 5 seconds, so there's no need for long timeouts.

## Manual Testing and Validation

### Loading the Extension in Chrome

1. Open Google Chrome
2. Navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked" and select the project root directory
5. The extension icon should appear in the Chrome toolbar

### Testing Functionality

**ALWAYS manually test the extension after making changes:**

1. Navigate to any GitHub pull request with multiple files (e.g., https://github.com/owner/repo/pull/123/files)
2. Click the extension icon in the Chrome toolbar to open the popup
3. Test "Check all files" button - should mark all files as viewed (green checkmarks)
4. Test "Uncheck all files" button - should unmark all files (remove checkmarks)
5. Verify the popup UI displays correctly with both buttons

### Validation Requirements

- **UI Changes**: Always take a screenshot of the popup interface after modifications
- **Functionality Changes**: Test both check/uncheck operations on a real GitHub PR
- **Code Changes**: Run `npm run lint` and `npm run format` before committing

## Repository Structure

### Key Files and Directories

```
├── .github/
│   └── workflows/lint.yml     # CI pipeline for linting and formatting
├── assets/
│   ├── images/icon.png        # Extension icon (48x48px)
│   └── js/
│       ├── content.js         # Content script that manipulates GitHub pages
│       └── popup.js           # Popup interface behavior
├── manifest.json              # Chrome extension configuration (Manifest V3)
├── popup.html                 # Extension popup UI
├── package.json               # Development dependencies and npm scripts
├── eslint.config.js           # ESLint configuration
├── .prettierrc                # Prettier formatting configuration
├── Makefile                   # Packaging commands for Chrome Web Store
└── README.md                  # Project documentation
```

### Configuration Details

- **ESLint**: Uses recommended rules with Prettier integration, browser globals configured
- **Prettier**: Single quotes, no semicolons, 2-space indentation, 100 character line width
- **Manifest V3**: Uses activeTab permission, targets GitHub PR pages specifically
- **Node.js**: Development-only dependency for tooling (ESLint, Prettier)

## Common Tasks

### Making Code Changes

1. Edit JavaScript files in `assets/js/` or modify `popup.html`
2. Run `npm run lint` to check for code quality issues
3. Run `npm run format` to apply consistent formatting
4. Test manually by loading extension in Chrome and testing on GitHub PR
5. Commit changes after validation

### Preparing for Distribution

1. Ensure all changes are committed and tested
2. Run `make zip` to create `github-pr-tool-chrome-extension.zip`
3. The zip file contains all necessary files for Chrome Web Store upload
4. Run `make clean` to remove the zip file after upload

### Debugging Issues

- **Extension not loading**: Check `manifest.json` syntax and file paths
- **Popup not working**: Check browser console for errors in `popup.js`
- **GitHub interaction failing**: Check content script in `content.js`, may need selector updates
- **Lint failures**: Run `npm run lint` to see specific issues, use `npm run format` to auto-fix formatting

### CI Pipeline

The `.github/workflows/lint.yml` runs on all PRs and pushes:

1. Checkout code
2. Setup Node.js v20
3. Run `npm ci` to install dependencies
4. Run `npx eslint . --max-warnings=0` (strict linting)
5. Run `npx prettier --check .` (formatting verification)

**Important**: The CI will fail if there are any ESLint warnings or formatting issues.

## Technical Notes

### Chrome Extension Architecture

- **Manifest V3**: Modern Chrome extension format with improved security
- **Content Script**: Injected into GitHub pages to manipulate DOM elements
- **Popup**: Provides user interface for triggering actions
- **Permissions**: Limited to active tab and GitHub PR pages for security

### GitHub Integration

- Extension targets GitHub PR file pages specifically: `https://github.com/**/**/pull/**/files`
- Uses CSS selectors to find "viewed" toggle elements on GitHub's interface
- Handles both old and new GitHub PR interface designs
- **Note**: GitHub may change their CSS classes, requiring selector updates in `content.js`

### Development Limitations

- **No automated tests**: Manual testing required for all functionality changes
- **Browser dependency**: Full testing requires Chrome browser and real GitHub PRs
- **GitHub interface dependency**: Functionality may break if GitHub updates their UI

Always run `npm run lint` and `npm run format` before committing to ensure CI passes.
