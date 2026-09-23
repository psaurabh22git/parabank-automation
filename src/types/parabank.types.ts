export interface UserProfile {
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  phoneNumber: string;
  ssn: string;
  username: string;
  password: string;
}

export interface ApiTransactionResponse {
  id: number;
  accountId: number;
  type: 'Credit' | 'Debit';
  date: string;
  amount: number;
  description: string;
}

export interface ApiCustomerResponse {
  id: number;
  firstName: string;
  lastName: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  phoneNumber: string;
  ssn: string;
}