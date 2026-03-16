import { test as base } from '@fixtures/cartFixture';
import { CheckoutPage } from '@pages/checkoutPage';

export type MyOptions = {
  defaultProductName: string;
};
type TestFixtures = {
  checkoutPage: CheckoutPage;
};

export const test = base.extend<TestFixtures & MyOptions>({
  defaultProductName: ['Sauce Labs Bolt T-Shirt', { option: true }],
  checkoutPage: async ({ page, inventoryPage, headerPage, cartPage, defaultProductName }, use) => {
    await test.step('Add product to cart', async () => {
      await inventoryPage.addToCart(defaultProductName);
    });

    await test.step('Go to cart and proceed to checkout', async () => {
      await headerPage.goToCart();
      await cartPage.proceedToCheckout();
    });

    await use(new CheckoutPage(page));
  },
});
