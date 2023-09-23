import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {
  faEdit,
  faTrash,
  faCheck,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { Expense } from '../../interfaces/travel.interface';
import { TravelService } from '../../services/travel.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  @ViewChild('expense_table', { static: false }) table!: ElementRef;
  expenseList: Observable<Expense[]> = this.travelService.expenseList$;

  readonly faIconEdit: IconDefinition = faEdit;
  readonly faIconTrash: IconDefinition = faTrash;
  readonly faIconCheck: IconDefinition = faCheck;

  constructor(private router: Router, private travelService: TravelService) {}

  ngOnInit() {
    this.expenseList.subscribe(() => {
      this.scrollToBottom();
    });
  }

  scrollToBottom() {
    setTimeout(() => {
      this.table.nativeElement.scrollTop =
        this.table.nativeElement.scrollHeight;
    }, 0);
  }

  remove(index: number): void {
    this.travelService.setRemoveData(index);
  }

  settleUp(): void {
    this.travelService.getPayouts();
    this.router.navigate(['result']);
  }

  edit(index: number): void {
    this.travelService.setEditData(index);
  }

  mark(index: number): void {
    this.travelService.markExpense(index);
  }
}
