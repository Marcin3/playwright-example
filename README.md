# Playwright Example

Automated end-to-end tests for SauceDemo using Playwright + TypeScript.

## Tech Stack

- Playwright Test
- TypeScript (`strict: true`)
- ESLint + `eslint-plugin-playwright`
- Prettier
- GitHub Actions CI

## Project Features

- Custom fixtures for reusable test setup
- Authentication state reuse via `storageState`
- Page Object Model with page-level actions and assertions
- Tagged test suites for selective execution
- HTML Playwright report artifact in CI

## Requirements

- Node.js 20+ (LTS recommended)
- npm 10+

## Quick Start

1. Install dependencies:

```bash
npm install
```

2. Create local environment file:

```bash
cp .env.example .env
```

3. Fill `.env` with valid credentials.

4. Install Playwright browsers:

```bash
npx playwright install --with-deps
```

5. Run tests:

```bash
npm run test
```

## Environment Variables

The test suite expects these variables:

```dotenv
BASE_URL=https://www.saucedemo.com
STANDARD_USERNAME=***
STANDARD_PASSWORD=***
LOCKED_USERNAME=***
LOCKED_PASSWORD=***
```

Notes:

- Keep real credentials only in local `.env` and GitHub Secrets.
- Do not commit sensitive values.

## NPM Scripts

- `npm run test` - run Playwright tests
- `npm run test:smoke` - run smoke suite
- `npm run test:e2e` - run all e2e-tagged tests
- `npm run test:login` - run login tests
- `npm run test:cart` - run cart tests
- `npm run test:checkout` - run checkout tests
- `npm run test:inventory` - run inventory tests
- `npm run lint` - run ESLint
- `npm run lint:fix` - run ESLint with auto-fix
- `npm run format` - check formatting with Prettier
- `npm run format:fix` - format files with Prettier
- `npm run tsc:check` - TypeScript type-check without emit

## Test Architecture

### Fixtures

- `fixtures/loginFixture.ts` - login page fixture for login-tagged scenarios
- `fixtures/cartFixture.ts` - inventory/header/cart fixtures 
- `fixtures/checkoutFixture.ts` - checkout flow fixture with configurable product

### Auth Setup

- `tests/auth.setup.ts` logs in once and saves auth state to:
  - `playwright/.auth/standardUser.json`
- `playwright.config.ts` uses that file in authenticated project configuration.

## Running Selected Tests

This project uses both business tags and execution tags:

- business: `@login`, `@cart`, `@checkout`, `@inventory`
- execution: `@smoke`, `@e2e`

Examples:

```bash
npx playwright test --grep @login
npx playwright test --grep @cart
npx playwright test --grep @checkout
npx playwright test --grep @smoke
```

## Reports

Open local HTML report:

```bash
npx playwright show-report
```

## CI (GitHub Actions)

Workflow file:

- `.github/workflows/main.yml`

The workflow runs:

1. Install dependencies
2. Lint
3. Format check
4. TypeScript check
5. Playwright tests
6. Upload report artifact


## Naming Convention in Page Objects

- Use `verify...` when method performs actions and assertions.
- Use `check...` when method performs assertions only.
- Prefer descriptive user-action methods over low-level locator wrappers.

## Folder Structure

```text
fixtures/        # custom Playwright fixtures
pages/           # page objects
tests/           # test specs + auth setup
playwright/      # auth state and Playwright assets
```

## Troubleshooting

- If tests fail on auth, verify `.env` values and that `tests/auth.setup.ts` can log in.
- If report does not open, run tests first and then `npx playwright show-report`.
- If CI fails but local passes, verify GitHub Secrets names match exactly.
