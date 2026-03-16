import { expect, Page } from '@playwright/test';

export abstract class BasePage {
  private readonly _page: Page;

  protected constructor(page: Page) {
    this._page = page;
  }

  async checkIfPageHasProperUrl(expectedUrl: string) {
    await expect(this._page).toHaveURL(expectedUrl);
  }
}
