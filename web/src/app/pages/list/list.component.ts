import { Component, AfterViewChecked, ElementRef, ViewChild, importProvidersFrom } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Expense } from '../../interfaces/travel.interface';
import { TravelService } from '../../services/travel.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements AfterViewChecked {
  @ViewChild('expense_table') tableElement: ElementRef | null = null;
  expenseList: Observable<Expense[]> = this.travelService.expenseList$;
  
  constructor(
    private router: Router,
    private travelService: TravelService,
  ) {}
  
  ngAfterViewChecked(): void {
    const tableDOMElement = this.tableElement?.nativeElement;
    tableDOMElement.scrollTop = tableDOMElement.scrollHeight;
  }

  remove(index: number): void {
    this.travelService.removeExpense(index);
  }
  settleUp(): void {
    this.travelService.getPayouts();
    this.router.navigate(['result']);
  }
}
