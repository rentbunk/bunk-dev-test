import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';
import { Expense, PayoutResponse } from '../interfaces/travel.interface';
import {
  ENV_CONFIG,
  EnvironmentConfig,
} from '../interfaces/environment-config.interface';
import { ExpenseStatus } from '../enums/ExpenseStatus';
import { UpdateStatus } from '../enums/UpdateStatus';

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
  private formStatus = new BehaviorSubject<string>(UpdateStatus.ADD);
  private selectedExpenseIndex = new BehaviorSubject<number | null>(null); 

  expenseList$ = this.expenseList.asObservable();
  payoutData$ = this.payoutData.asObservable();
  isLoading$ = this.isLoading.asObservable();
  formStatus$ = this.formStatus.asObservable();
  selectedExpenseIndex$ = this.selectedExpenseIndex.asObservable();

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

  editExpense(newExpense: Expense) {
    const currentExpenses = this.expenseList.getValue();
    const index = this.selectedExpenseIndex.getValue();
    if(index !== null) currentExpenses[index] = newExpense;
    this.selectedExpenseIndex.next(null);
    // this.selectedExpenseIndex.next(null);
  }

  removeExpense() {
    const currentExpenses = this.expenseList.getValue();
    const index = this.selectedExpenseIndex.getValue();
    const newExpenses = [...currentExpenses.slice(0, index ?? currentExpenses.length), ...currentExpenses.slice((index ?? currentExpenses.length) + 1)];
    this.expenseList.next(newExpenses);
    this.selectedExpenseIndex.next(null);
  }

  setAddStatus() {
    const currentExpenses = this.expenseList.getValue();
    const selectedIndex = this.selectedExpenseIndex.getValue();
    if(selectedIndex !== null) currentExpenses[selectedIndex].status = ExpenseStatus.ACTIVE;
    this.formStatus.next(UpdateStatus.ADD);
  }

  setEditData(index: number) {
    const currentExpenses = this.expenseList.getValue();
    const selectedIndex = this.selectedExpenseIndex.getValue();
    
    if(index === selectedIndex) {
      currentExpenses[index].status = ExpenseStatus.ACTIVE;
    } else {
      if(selectedIndex !== null) currentExpenses[selectedIndex].status = ExpenseStatus.ACTIVE;
    }
    currentExpenses[index].status = ExpenseStatus.EDITING;
    this.formStatus.next(UpdateStatus.EDIT);
    this.selectedExpenseIndex.next(index);
  }

  setRemoveData(index: number) {
    console.log("HEREHER")
    const currentExpenses = this.expenseList.getValue();
    const selectedIndex = this.selectedExpenseIndex.getValue();
    if(index === selectedIndex) {
      currentExpenses[index].status = ExpenseStatus.ACTIVE;
    } else {
      if(selectedIndex !== null) currentExpenses[selectedIndex].status = ExpenseStatus.ACTIVE;
    }
    currentExpenses[index].status = ExpenseStatus.DELETING;
    this.formStatus.next(UpdateStatus.DELETE);
    this.selectedExpenseIndex.next(index);
  }

  markExpense(index: number) {
    const currentExpenses = this.expenseList.getValue();
    currentExpenses[index].status = currentExpenses[index].status === ExpenseStatus.DONE ? ExpenseStatus.ACTIVE : ExpenseStatus.DONE;
  }

  getSelectedExpense() {
    const currentExpenses = this.expenseList.getValue();
    const index = this.selectedExpenseIndex.getValue();
    return index !== null ?currentExpenses[index] : null;
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
