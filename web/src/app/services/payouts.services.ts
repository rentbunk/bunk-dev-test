import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Payouts } from '../interfaces/payouts.interface';
import { Expense } from '../interfaces/expense.interface';

@Injectable()
export class PayoutsSevices {
  constructor(private readonly http: HttpClient) {}

  /**

  Sends an HTTP POST request to settle up expenses with the backend API.
  @param expenses - An array of expenses to be settled up.
  @returns A promise that resolves with the response data from the backend API.
  */
  public async settleUp(expenses: Expense[]) {
    return this.http.post<any>('payouts', { expenses }).toPromise();
  }
}
