import { Page, expect } from '@playwright/test';

export class RequestLoanPage {
  constructor(private page: Page) {}

  public async open(): Promise<void> {
    await this.page.goto('/parabank/requestloan.htm');
  }

  public async applyForLoan(amount: string, downPayment: string, expectedSourceAccountId: string): Promise<string> {
    await this.page.locator('input#amount').fill(amount);
    await this.page.locator('input#downPayment').fill(downPayment);

    const targetOption = this.page.locator(`select#fromAccountId option[value="${expectedSourceAccountId}"]`);
    await expect(targetOption).toBeAttached({ timeout: 10000 });
    
    await this.page.locator('select#fromAccountId').selectOption(expectedSourceAccountId);
    await this.page.locator('input[type="submit"][value="Apply Now"]').click();

    await expect(this.page.locator('td#loanStatus')).toHaveText('Approved', { timeout: 10000 });
    return (await this.page.locator('a#newAccountId').textContent())?.trim() || '';
  }
}