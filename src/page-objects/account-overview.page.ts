import { Page, expect } from '@playwright/test';

export class AccountOverviewPage {
  constructor(private page: Page) {}

  public async open(): Promise<void> {
    await this.page.goto('/parabank/overview.htm');
  }

  public async getFirstAccountId(): Promise<string> {
    const firstAccountLink = this.page.locator('table#accountTable tbody tr').first().locator('td a');
    await expect(firstAccountLink).toBeVisible();
    return (await firstAccountLink.textContent())?.trim() || '';
  }

  public async getAccountBalance(accountId: string): Promise<string> {
    const row = this.page.locator(`table#accountTable tbody tr:has(a:text("${accountId}"))`);
    const balanceCell = row.locator('td').nth(1);
    await expect(balanceCell).toBeVisible();
    return (await balanceCell.textContent())?.trim() || '$0.00';
  }
}