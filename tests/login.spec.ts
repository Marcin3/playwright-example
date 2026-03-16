import { test } from '@fixtures/loginFixture';

test.describe('Login functionality', { tag: ['@login', '@smoke'] }, () => {
  test('successful login with valid credentials', async ({ loginPage }) => {
    await test.step('Login with valid credentials', async () => {
      await loginPage.login(process.env.STANDARD_USERNAME!, process.env.STANDARD_PASSWORD!);
    });

    await test.step('Check successful login', async () => {
      await loginPage.checkLoginSuccess();
    });
  });

  test('failed login with locked out user', async ({ loginPage }) => {
    await test.step('Attempt login with locked user', async () => {
      await loginPage.login(process.env.LOCKED_USERNAME!, process.env.LOCKED_PASSWORD!);
    });

    await test.step('Check error message', async () => {
      await loginPage.checkLoginError('Epic sadface: Sorry, this user has been locked out.');
    });
  });
});
