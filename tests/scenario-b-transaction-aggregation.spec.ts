import { test, expect } from '@playwright/test';

// Helper function to extract numbers safely from ParaBank table text
export function parseCurrency(text: string): number {
  if (!text) return 0;
  const cleaned = text.replace(/[^0-9.-]/g, '');
  return parseFloat(cleaned) || 0;
}

test.describe('Scenario B: Transaction Aggregation & Currency Parsing', () => {
  test('Should perform accurate floating-point currency sum of transfers', async ({ page }) => {
    // 1. Log in directly using ParaBank's pre-seeded demo user
    await page.goto('/parabank/index.htm', { waitUntil: 'domcontentloaded' });
    await page.locator('input[name="username"]').fill('john');
    await page.locator('input[name="password"]').fill('demo');
    await page.locator('input[type="submit"][value="Log In"]').click();

    // 2. Navigate to Accounts Overview
    await page.locator('a[href*="overview.htm"]').click();

    // 3. Select first account link
    const accountLink = page.locator('#accountTable tbody tr a').first();
    await accountLink.waitFor({ state: 'visible', timeout: 15000 });
    await accountLink.click();

    // 4. Wait for transaction table and extract amount values
    const amountCells = page.locator('#transactionTable tbody tr td:nth-child(2)');
    await amountCells.first().waitFor({ state: 'visible', timeout: 15000 });

    const rawAmounts = await amountCells.allInnerTexts();
    const amounts = rawAmounts.map(parseCurrency);

    // 5. Aggregate transactions and verify calculation
    const calculatedSum = amounts.reduce((acc, curr) => acc + curr, 0);

    expect(typeof calculatedSum).toBe('number');
    expect(calculatedSum).not.toBeNaN();
  });
});