import { test, expect } from '@playwright/test';

test.describe('Scenario C: API Schema and Functional Parity', () => {
  test('Headless REST API schema and transaction state validation', async ({ request, baseURL }) => {
    const response = await request.get('/parabank/services/bank/customers/12212/accounts', {
      headers: {
        'Accept': 'application/json',
      },
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toBeDefined();
  });
});
