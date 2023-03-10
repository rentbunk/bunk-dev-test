import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Expense } from './interfaces/expense.interface';
import { Payouts } from './interfaces/payouts.interface';
import { PayoutsSevices } from './services/payouts.services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  expenses: Expense[] = [{ name: '', amount: 0 }];
  total: number = 0;
  equalShare: number = 0;
  payouts: Payouts[] = [];
  isApiCalled: boolean = false;

  constructor(private http: HttpClient, private readonly payoutsSevices: PayoutsSevices) {}

  /**

  Add new expense to the expenses array
  @returns void
  */
  addExpense(): void {
    this.expenses.push({ name: '', amount: 0 });
  }

  /**

  Removes an expense from the expenses array.
  @param index The index of the expense to remove.
  @returns void
  */
  removeExpense(index: number): void {
    this.expenses.splice(index, 1);
  }

  /**

  Reset expenses array and detail area
  @returns void
  */
  reset(): void {
    this.expenses = [{ name: '', amount: 0 }];
    this.total = 0;
    this.equalShare = 0;
    this.payouts = [];
  }

  /**

  Sets up the settlement of expenses between participants
  @returns {void}
  */
  settleUp(): void {
    this.payoutsSevices
      .settleUp(this.expenses)
      .then((result) => {
        this.total = result.total;
        this.equalShare = result.equalShare;
        this.payouts = result.payouts;
      })
      .catch((error) => console.log(error));
  }
}
