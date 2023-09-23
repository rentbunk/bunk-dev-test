import { Component } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
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
import { Renderer2 } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  expenseList: Observable<Expense[]> = this.travelService.expenseList$;
  @ViewChild('expense_table', { static: false }) scrollContainer!: ElementRef;

  readonly faIconEdit: IconDefinition = faEdit;
  readonly faIconTrash: IconDefinition = faTrash;
  readonly faIconCheck: IconDefinition = faCheck;

  constructor(
    private router: Router,
    private renderer: Renderer2,
    private travelService: TravelService
  ) {}

  scrollToBottom(): void {
    setTimeout(() => {
      try {
        this.scrollContainer.nativeElement.scrollTop =
          this.scrollContainer.nativeElement.scrollHeight;
      } catch (err) {}
    }, 100);
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
