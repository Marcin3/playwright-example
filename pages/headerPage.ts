import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './basePage';

export class HeaderPage extends BasePage {
  private readonly _cartBadge: Locator;
  private readonly _cartLink: Locator;

  constructor(page: Page) {
    super(page);
    this._cartBadge = page.getByTestId('shopping-cart-badge');
    this._cartLink = page.getByTestId('shopping-cart-link');
  }

  async checkCartItemCount(expectedCount: number) {
    if (expectedCount === 0) {
      await expect(this._cartBadge).toBeHidden();
    } else {
      await expect(this._cartBadge).toHaveText(expectedCount.toString());
    }
  }

  async goToCart() {
    await this._cartLink.click();
  }
}
