import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';
import { Expense, PayoutResponse } from '../interfaces/travel.interface';
import {
  ENV_CONFIG,
  EnvironmentConfig,
} from '../interfaces/environment-config.interface';

@Injectable({
  providedIn: 'root',
})
export class TravelService {
  private apiUrl;
  private expenseList = new BehaviorSubject<Expense[]>([]);
  private payoutData = new BehaviorSubject<PayoutResponse>({
    total: 0,
    equalShare: 0,
    payouts: [],
  });
  private isLoading = new BehaviorSubject<boolean>(false);

  expenseList$ = this.expenseList.asObservable();
  payoutData$ = this.payoutData.asObservable();
  isLoading$ = this.isLoading.asObservable();
  constructor(
    private http: HttpClient,
    @Inject(ENV_CONFIG) private config: EnvironmentConfig
  ) {
    this.apiUrl = `${config.environment.apiURL}`;
  }

  addExpense(newExpense: Expense) {
    const currentExpenses = this.expenseList.getValue();
    currentExpenses.push(newExpense);
    this.expenseList.next(currentExpenses);
  }

  removeExpense(index: number) {
    const currentExpenses = this.expenseList.getValue();
    const newExpenses = [...currentExpenses.slice(0, index), ...currentExpenses.slice(index + 1)];
    this.expenseList.next(newExpenses);
  }

  getPayouts() {
    this.isLoading.next(true);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const currentExpenses = this.expenseList.getValue();
    const postJsonData = {
      expenses: currentExpenses,
    }

    this.http
      .post<PayoutResponse>(`${this.apiUrl}`, postJsonData, { headers })
      .pipe(
        catchError(this.handleError)
      ).subscribe((payouts: PayoutResponse) => {
        this.payoutData.next(payouts);
        this.isLoading.next(false);
      });
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
