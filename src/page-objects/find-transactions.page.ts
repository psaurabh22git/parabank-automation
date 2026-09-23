import { Page, expect } from '@playwright/test';

export class FindTransactionsPage {
  constructor(private page: Page) {}

  public async open(): Promise<void> {
    await this.page.goto('/parabank/findtrans.htm');
  }

  public async selectAccount(accountId: string): Promise<void> {
    await expect(this.page.locator(`select#accountId option[value="${accountId}"]`)).toBeAttached();
    await this.page.locator('select#accountId').selectOption(accountId);
  }

  public async getAllTransactionAmounts(): Promise<string[]> {
    const transactionRows = this.page.locator('table#transactionTable tbody tr');
    await expect(transactionRows.first()).toBeVisible({ timeout: 10000 });
    const amountCells = transactionRows.locator('td:nth-child(3)');
    const count = await amountCells.count();
    
    const amounts: string[] = [];
    for (let i = 0; i < count; i++) {
      const text = await amountCells.nth(i).textContent();
      if (text) amounts.push(text.trim());
    }
    return amounts;
  }
}