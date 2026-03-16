import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './basePage';

export class CheckoutPage extends BasePage {
  private readonly _continueButton: Locator;
  private readonly _firstNameInput: Locator;
  private readonly _inventoryItemName: (productName: string) => Locator;
  private readonly _lastNameInput: Locator;
  private readonly _postalCodeInput: Locator;

  private readonly _finishButton: Locator;
  private readonly _completeHeader: Locator;

  constructor(page: Page) {
    super(page);
    this._continueButton = page.getByTestId('continue');
    this._firstNameInput = page.getByTestId('firstName');
    this._lastNameInput = page.getByTestId('lastName');
    this._postalCodeInput = page.getByTestId('postalCode');
    this._inventoryItemName = (productName: string) =>
      page.getByTestId('inventory-item-name').filter({
        hasText: productName,
      });
    this._finishButton = page.getByTestId('finish');
    this._completeHeader = page.getByTestId('complete-header');
  }

  async fillUserInfo(user: User) {
    await this._firstNameInput.fill(user.firstName);
    await this._lastNameInput.fill(user.lastName);
    await this._postalCodeInput.fill(user.postalCode);
  }

  async proceedToOverview() {
    await this._continueButton.click();
    await this.checkIfPageHasProperUrl('/checkout-step-two\.html');
  }

  async checkOrderSummary(productName: string) {
    await expect(this._inventoryItemName(productName)).toBeVisible();
  }

  async completeCheckout() {
    await this._finishButton.click();
  }

  async checkOrderSuccess() {
    await expect(this._completeHeader).toHaveText('Thank you for your order!');
  }
}

export interface User {
  firstName: string;
  lastName: string;
  postalCode: string;
}
