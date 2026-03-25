# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

End-to-end tests for [SauceDemo](https://www.saucedemo.com) using Playwright Test and TypeScript strict mode.

## Setup

Copy `.env.example` to `.env` and fill in the credentials, then install:

```bash
npm install
npx playwright install --with-deps chromium
```

## Commands

```bash
npm test                  # run all tests
npm run test:smoke        # @smoke tagged tests
npm run test:e2e          # @e2e tagged tests
npm run test:login        # @login tagged tests
npm run test:cart         # @cart tagged tests
npm run test:checkout     # @checkout tagged tests
npm run test:inventory    # @inventory tagged tests
npx playwright test --grep "@smoke" --headed   # run with browser visible
npx playwright test tests/cart.spec.ts         # run single file
npm run lint              # ESLint
npm run format            # Prettier format
npm run format:check      # Prettier check (used in CI)
npm run tsc               # TypeScript type check
```

## Architecture

### Two Playwright Projects

- **setup**: Runs `tests/auth.setup.ts` once — logs in and saves session to `playwright/.auth/standardUser.json`
- **Chromium-authenticated**: All tests except `@login`; depends on setup, reuses saved auth state
- **Chromium-login**: Only `@login` tests; runs without auth state

### Page Object Model

`pages/` contains page classes extending `BasePage` (`pages/basePage.ts`). Each page class:
- Declares private locators prefixed with `_` (e.g., `_loginButton`)
- Uses `getByTestId()` as the primary locator strategy
- Uses `verify...` methods for action + assertion combined, `check...` methods for assertion only

### Fixture Composition

Fixtures in `fixtures/` extend each other in a chain:
- `loginFixture` — extends base Playwright test, provides `LoginPage`
- `cartFixture` — extends base test, provides `inventoryPage`, `headerPage`, `cartPage`
- `checkoutFixture` — extends `cartFixture`, adds `checkoutPage` and `defaultProductName` option

Tests import from the appropriate fixture instead of directly from `@playwright/test`.

### Test Tags

Every `test.describe` block uses exactly one scope tag and optionally a suite tag:

| Scope tag     | Suite tag |
|---------------|-----------|
| `@login`      | `@smoke`  |
| `@cart`       |           |
| `@checkout`   | `@e2e`    |
| `@inventory`  | `@smoke`  |

### Path Aliases (tsconfig)

- `@fixtures/*` → `fixtures/*`
- `@pages/*` → `pages/*`

## Conventions

- Private class fields use a leading underscore: `_page`, `_cartBadge`
- ESLint enforces this: non-constant class properties must match `/^_/`
- Assertion methods must match `^check.*` or `^verify.*` to satisfy `playwright/expect-expect`
- `test.step()` should wrap logical groupings of actions inside tests
- Random test data uses `@faker-js/faker`
