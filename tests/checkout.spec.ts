import { faker } from '@faker-js/faker';
import { test } from '@fixtures/checkoutFixture';
import { User } from '@pages/checkoutPage';

test.describe('Checkout functionality', { tag: ['@checkout', '@e2e'] }, () => {
  const PRODUCT_NAME = 'Sauce Labs Backpack';
  test.use({ defaultProductName: PRODUCT_NAME });

  test('complete checkout process', async ({ checkoutPage }) => {
    const user: User = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      postalCode: faker.location.zipCode(),
    };

    await test.step('Fill user information', async () => {
      await checkoutPage.fillUserInfo(user);
    });

    await test.step('Verify order summary', async () => {
      await checkoutPage.proceedToOverview();
      await checkoutPage.checkOrderSummary(PRODUCT_NAME);
    });

    await test.step('Complete checkout', async () => {
      await checkoutPage.completeCheckout();
    });

    await test.step('Check order success', async () => {
      await checkoutPage.checkOrderSuccess();
    });
  });
});
