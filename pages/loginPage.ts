import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './basePage';

export class LoginPage extends BasePage {
  private readonly _errorContainer: Locator;
  private readonly _loginButton: Locator;
  private readonly _passwordInput: Locator;
  private readonly _usernameInput: Locator;

  constructor(page: Page) {
    super(page);
    this._errorContainer = page.getByTestId('error');
    this._loginButton = page.getByTestId('login-button');
    this._passwordInput = page.getByTestId('password');
    this._usernameInput = page.getByTestId('username');
  }

  async login(username: string, password: string) {
    await this._usernameInput.fill(username);
    await this._passwordInput.fill(password);
    await this._loginButton.click();
  }

  async checkLoginSuccess() {
    await this.checkIfPageHasProperUrl('/inventory\.html');
    await expect(this._loginButton).toBeHidden();
  }

  async checkLoginError(expectedError: string) {
    await expect(this._errorContainer).toContainText(expectedError);
  }
}
