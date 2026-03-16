import { test } from '@fixtures/cartFixture';

test.describe('Inventory functionality', { tag: ['@inventory', '@smoke'] }, () => {
  test('Add 3 products to cart and remove one', async ({ inventoryPage, headerPage }) => {
    await test.step('Add product to cart', async () => {
      await inventoryPage.addToCart('Sauce Labs Bike Light');
      await inventoryPage.addToCart('Sauce Labs Onesie');
      await inventoryPage.addToCart('Sauce Labs Bolt T-Shirt');
    });

    await test.step('Check cart badge shows 3 item', async () => {
      await headerPage.checkCartItemCount(3);
    });

    await test.step('Remove product from cart on inventory page', async () => {
      await inventoryPage.removeFromCart('Sauce Labs Bike Light');
      await inventoryPage.checkProductIsNotInCartState('Sauce Labs Bike Light');
    });

    await test.step('Check cart badge shows 2 item', async () => {
      await headerPage.checkCartItemCount(2);
    });
  });
});
