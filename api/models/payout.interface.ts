export interface Payout {
  owes: string;
  owed: string;
  amount: number;
}

export interface Expense {
  name: string;
  amount: number;
  status: string;
}

export interface PayoutResponse {
  total: number;
  equalShare: number;
  payouts: Payout[];
}

export type Traveller = Record<string, number>;