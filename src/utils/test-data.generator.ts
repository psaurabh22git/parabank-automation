import { UserProfile } from '../types/parabank.types';

export function generateTestUser(): UserProfile {
  const uniqueId = Math.random().toString(36).substring(2, 9);
  const timestamp = Date.now();

  return {
    firstName: 'Test',
    lastName: 'User',
    street: '123 Main Street',
    city: 'Metropolis',
    state: 'NY',
    zipCode: '10001',
    phoneNumber: '5551234567',
    ssn: '999-99-9999',
    username: `qa_user_${timestamp}_${uniqueId}`,
    password: 'Password123!',
  };
}