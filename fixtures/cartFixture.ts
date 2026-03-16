import { test as base } from '@playwright/test';

import { CartPage } from '@pages/cartPage';
import { HeaderPage } from '@pages/headerPage';
import { InventoryPage } from '@pages/inventoryPage';

type TestFixtures = {
  cartPage: CartPage;
  inventoryPage: InventoryPage;
  headerPage: HeaderPage;
};

export const test = base.extend<TestFixtures>({
  inventoryPage: async ({ page }, use) => {
    const inventoryPage = new InventoryPage(page);

    await test.step('Navigate to inventory page', async () => {
      await page.goto('inventory.html');
    });

    await use(inventoryPage);
  },

  headerPage: async ({ page }, use) => {
    await use(new HeaderPage(page));
  },

  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
});
