import { APIRequestContext, expect } from '@playwright/test';
import { ApiCustomerResponse, ApiTransactionResponse } from '../types/parabank.types';

export class BankApiService {
  private baseUrl: string;

  constructor(private request: APIRequestContext, baseUrl?: string) {
    this.baseUrl = baseUrl || 'https://parabank.parasoft.com';
  }

  public async getCustomerByUsername(username: string): Promise<ApiCustomerResponse> {
    const response = await this.request.get(`${this.baseUrl}/parabank/services/bank/customers/username/${username}`, {
      headers: { 'Accept': 'application/json' }
    });
    expect(response.status()).toBe(200);
    return await response.json();
  }

  public async deposit(accountId: number, amount: number): Promise<void> {
    const response = await this.request.post(`${this.baseUrl}/parabank/services/bank/deposit`, {
      params: { accountId, amount }
    });
    expect(response.status()).toBe(200);
  }

  public async getAccountTransactions(accountId: number): Promise<ApiTransactionResponse[]> {
    const response = await this.request.get(`${this.baseUrl}/parabank/services/bank/accounts/${accountId}/transactions`, {
      headers: { 'Accept': 'application/json' }
    });
    expect(response.status()).toBe(200);
    return await response.json();
  }
}