import { test } from '@fixtures/cartFixture';

const BIKE_LIGHT = {
  name: 'Sauce Labs Bike Light',
  price: '$9.99',
};

test.describe('Cart functionality', { tag: '@cart' }, () => {
  [
    BIKE_LIGHT,
    {
      name: 'Sauce Labs Onesie',
      price: '$7.99',
    },
    {
      name: 'Sauce Labs Bolt T-Shirt',
      price: '$15.99',
    },
    {
      name: 'Test.allTheThings() T-Shirt (Red)',
      price: '$15.99',
    },
  ].forEach(({ name, price }) => {
    test(`Add ${name} to cart`, async ({ cartPage, inventoryPage, headerPage }) => {
      await test.step(`Add product ${name} to cart`, async () => {
        await inventoryPage.addToCart(name);
      });

      await test.step('Check cart badge shows 1 item', async () => {
        await headerPage.checkCartItemCount(1);
      });

      await test.step('Go to cart and verify item', async () => {
        await headerPage.goToCart();
        await cartPage.checkItemInCart(name, price);
      });
    });
  });

  test('Remove product from cart', async ({ cartPage, inventoryPage, headerPage }) => {
    await test.step('Add 1 product to cart', async () => {
      await inventoryPage.addToCart(BIKE_LIGHT.name);
    });

    await test.step('Verify item in cart', async () => {
      await headerPage.goToCart();
      await headerPage.checkCartItemCount(1);
      await cartPage.checkItemInCart(BIKE_LIGHT.name, BIKE_LIGHT.price);
    });

    await test.step('Remove product from cart', async () => {
      await cartPage.removeFromCart(BIKE_LIGHT.name);
    });

    await test.step('Check cart is empty', async () => {
      await headerPage.checkCartItemCount(0);
      await cartPage.checkCartIsEmpty();
    });
  });
});
