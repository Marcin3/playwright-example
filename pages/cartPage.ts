import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './basePage';

export class CartPage extends BasePage {
  private readonly _cartItemName: (productName: string) => Locator;
  private readonly _cartItemPrice: (productName: string) => Locator;
  private readonly _cartItems: Locator;
  private readonly _checkoutButton: Locator;
  private readonly _removeButton: (productName: string) => Locator;

  constructor(page: Page) {
    super(page);
    this._cartItemName = (productName: string) =>
      page.getByTestId('inventory-item-name').filter({
        hasText: productName,
      });
    this._cartItems = page.getByTestId('inventory-item');
    this._cartItemPrice = (productName: string) =>
      this._cartItems
        .filter({
          has: this._cartItemName(productName),
        })
        .locator('.inventory_item_price');
    this._checkoutButton = page.getByTestId('checkout');
    this._removeButton = (productName: string) =>
      page.getByTestId(`remove-${productName.toLowerCase().replace(/\s+/g, '-')}`);
  }

  async proceedToCheckout() {
    await this._checkoutButton.click();
    await this.checkIfPageHasProperUrl('/checkout-step-one\.html');
  }

  async removeFromCart(productName: string) {
    await this._removeButton(productName).click();
  }

  async checkItemInCart(productName: string, price: string) {
    await expect(this._cartItemName(productName)).toBeVisible();
    await expect(this._cartItemPrice(productName)).toHaveText(price);
  }

  async checkCartIsEmpty() {
    await expect(this._cartItems).toHaveCount(0);
  }
}
