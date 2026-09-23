import { Page, expect } from '@playwright/test';

export class TransferFundsPage {
  constructor(private page: Page) {}

  public async open(): Promise<void> {
    await this.page.goto('/parabank/transfer.htm');
  }

  public async transferAmount(amount: string, fromAccount: string, toAccount: string): Promise<void> {
    await expect(this.page.locator('select#fromAccountId option')).not.toHaveCount(0);
    
    await this.page.locator('input#amount').fill(amount);
    await this.page.locator('select#fromAccountId').selectOption(fromAccount);
    await this.page.locator('select#toAccountId').selectOption(toAccount);
    await this.page.locator('input[type="submit"][value="Transfer"]').click();

    await expect(this.page.locator('div#showResult h1.title')).toHaveText('Transfer Complete!', { timeout: 10000 });
  }
}