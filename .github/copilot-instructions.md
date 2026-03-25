# Project Guidelines

## Code Style
- Use TypeScript with strict typing and existing lint rules from `eslint.config.mjs`.
- Follow page object naming conventions: private locator fields use leading underscore (for example `_loginButton`).
- Keep assertion helper names as `check...` or `verify...` so they satisfy the Playwright ESLint assertion rule.
- Use `getByTestId(...)`-first locator strategy and rely on `data-test` attributes.

## Architecture
- Use Page Object Model classes in `pages/` with shared behavior in `pages/basePage.ts`.
- Keep reusable setup in typed fixtures under `fixtures/` and import composed fixtures in specs instead of constructing setup inline.
- Preserve fixture composition order (for example `checkoutFixture` extends `cartFixture`, which extends `loginFixture`) and add shared setup at the right layer.
- Keep specs in `tests/` focused on business flow and assertions, not low-level selector details.
- Preserve the auth setup flow: `tests/auth.setup.ts` creates storage state in `playwright/.auth/standardUser.json`, used by authenticated projects in `playwright.config.ts`.

## Build and Test
- Install dependencies: `npm install`
- Install Playwright browsers: `npx playwright install --with-deps`
- Run full test suite: `npm run test`
- Run tagged suites: `npm run test:smoke`, `npm run test:e2e`, `npm run test:login`, `npm run test:cart`, `npm run test:checkout`, `npm run test:inventory`
- Run quality checks: `npm run lint`, `npm run format`, `npm run tsc:check`

## Conventions
- Use `test.describe(..., { tag: [...] })` tags for both business domain tags (`@login`, `@cart`, `@checkout`, `@inventory`) and execution tags (`@smoke`, `@e2e`).
- Use `test.step(...)` to structure multi-step scenarios for readable reports.
- Read credentials and base URL from `.env` variables; avoid hardcoded secrets.
- Use TypeScript path aliases (`@pages/*`, `@fixtures/*`) instead of deep relative imports.
- Prefer adding or updating behavior in page objects and fixtures before changing test logic.
- Keep CI behavior in mind: CI runs with retries and a single worker, and `test.only()` is forbidden in CI; avoid introducing order-dependent tests.

## Key References
- Project overview and workflow: `README.md`
- Runner setup and projects: `playwright.config.ts`
- Lint and naming rules: `eslint.config.mjs`
- Example page object: `pages/loginPage.ts`
- Example fixture composition: `fixtures/cartFixture.ts`
- Example tagged spec: `tests/login.spec.ts`