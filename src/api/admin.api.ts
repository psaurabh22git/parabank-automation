import { APIRequestContext, expect } from '@playwright/test';

export class AdminApiService {
  private baseUrl: string;

  constructor(private request: APIRequestContext, baseUrl?: string) {
    this.baseUrl = baseUrl || 'https://parabank.parasoft.com';
  }

  public async resetDatabase(): Promise<void> {
    const response = await this.request.post(`${this.baseUrl}/parabank/services/bank/cleanDB`);
    expect([200, 204]).toContain(response.status());
  }

  public async setLoanProvider(provider: 'Web Service' | 'JMS' | 'Local'): Promise<void> {
    const response = await this.request.post(`${this.baseUrl}/parabank/services/bank/setParameter/loanProvider/${provider}`);
    expect([200, 204]).toContain(response.status());
  }
}