export interface Expense {
  name: string;
  amount: number;
}

export interface Payout {
  owes: string;
  owed: string;
  amount: number;
}

export interface PayoutResponse {
  total: number;
  equalShare: number;
  payouts: Payout[];
}
