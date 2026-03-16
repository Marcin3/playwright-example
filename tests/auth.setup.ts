import { LoginPage } from '@pages/loginPage';
import { test as setup } from '@playwright/test';
import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/standardUser.json');

setup('authenticate', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await page.goto(process.env.BASE_URL || 'https://www.saucedemo.com');
  await loginPage.login(process.env.STANDARD_USERNAME!, process.env.STANDARD_PASSWORD!);
  await loginPage.checkLoginSuccess();

  await page.context().storageState({ path: authFile });
});
