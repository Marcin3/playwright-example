import { test as base } from '@playwright/test';

import { LoginPage } from '@pages/loginPage';

type TestFixtures = {
  loginPage: LoginPage;
};

export const test = base.extend<TestFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);

    await test.step('Navigate to login page', async () => {
      await page.goto('/');
    });

    await use(loginPage);
  },
});
