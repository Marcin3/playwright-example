import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './basePage';

export class InventoryPage extends BasePage {
  private readonly _addButton: (productName: string) => Locator;
  private readonly _removeButton: (productName: string) => Locator;

  constructor(page: Page) {
    super(page);
    this._addButton = (productName: string) =>
      page.getByTestId(`add-to-cart-${productName.toLowerCase().replace(/\s+/g, '-')}`);
    this._removeButton = (productName: string) =>
      page.getByTestId(`remove-${productName.toLowerCase().replace(/\s+/g, '-')}`);
  }

  async addToCart(productName: string) {
    await this._addButton(productName).click();
    await expect(this._removeButton(productName)).toBeVisible();
  }

  async removeFromCart(productName: string) {
    await this._removeButton(productName).click();
    await expect(this._addButton(productName)).toBeVisible();
  }

  async checkProductIsNotInCartState(productName: string) {
    await expect(this._addButton(productName)).toBeVisible();
  }
}
