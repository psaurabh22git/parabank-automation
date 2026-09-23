import { Page, expect } from '@playwright/test';
import { UserProfile } from '../types/parabank.types';

export class RegisterPage {
  constructor(private page: Page) {}

  public async open(): Promise<void> {
    await this.page.goto('/parabank/register.htm', { waitUntil: 'domcontentloaded' });
  }

  public async registerNewUser(user: UserProfile): Promise<void> {
    await this.open();

    // Ensure page loaded properly
    await this.page.locator('input[name="customer.firstName"]').waitFor({ state: 'visible', timeout: 15000 });

    // Fill each field with a forced blur to ensure ParaBank's internal scripts register inputs
    const fields: [string, string][] = [
      ['input[name="customer.firstName"]', user.firstName],
      ['input[name="customer.lastName"]', user.lastName],
      ['input[name="customer.address.street"]', user.street],
      ['input[name="customer.address.city"]', user.city],
      ['input[name="customer.address.state"]', user.state],
      ['input[name="customer.address.zipCode"]', user.zipCode],
      ['input[name="customer.phoneNumber"]', user.phoneNumber],
      ['input[name="customer.ssn"]', user.ssn],
      ['input[name="customer.username"]', user.username],
      ['input[name="customer.password"]', user.password],
      ['input[name="repeatedPassword"]', user.password],
    ];

    for (const [selector, value] of fields) {
      const input = this.page.locator(selector);
      await input.fill(value);
      await input.blur();
    }

    // Click submit and wait for navigation response
    await Promise.all([
      this.page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 15000 }).catch(() => {}),
      this.page.locator('input[type="submit"][value="Register"]').click(),
    ]);

    // Fallback: If registration failed or redirected to login/error, attempt self-healing recovery check
    const isSuccess = await this.page.locator('#rightPanel').textContent().then(text => 
      text?.includes('Welcome') || text?.includes('Your account was created successfully')
    ).catch(() => false);

    if (!isSuccess) {
      // If ParaBank logged the user in automatically or navigated to overview despite UI glitch
      if (this.page.url().includes('overview.htm')) {
        return;
      }
      
      // Secondary assertion with relaxed timeout for slower backend DB writes
      await expect(this.page.locator('#rightPanel')).toContainText(/Welcome|Your account was created successfully/i, { timeout: 15000 });
    }
  }
}