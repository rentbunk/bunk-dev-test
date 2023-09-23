import { Component, OnInit, AfterViewChecked, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TravelService } from 'src/app/services/travel.service';
import { ExpenseStatus } from 'src/app/enums/ExpenseStatus';
import { UpdateStatus } from 'src/app/enums/UpdateStatus';
import { combineLatest, Subscription } from 'rxjs';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit, AfterViewChecked, OnDestroy {
  @ViewChild('name_input') nameInput: ElementRef | null = null;
  form: FormGroup;
  status: string | null = null;
  formStatus = this.travelService.formStatus$;
  selectedExpenseIndex = this.travelService.selectedExpenseIndex$;
  private combineLatestSubscription: Subscription | undefined;
  private shouldFocusInput = false;

  constructor(
    private travelService: TravelService
  ) {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      price: new FormControl(0, [Validators.required, Validators.min(1)]),
    });
  }

  ngOnInit(): void {
    this.combineLatestSubscription = combineLatest([this.formStatus, this.selectedExpenseIndex]).subscribe(([formStatus, selectedIndex]) => {
      this.status = formStatus;
      if(formStatus === UpdateStatus.ADD) {
        this.form = new FormGroup({
          name: new FormControl('', Validators.required),
          price: new FormControl(0, [Validators.required, Validators.min(1)]),
        });
      } else if(formStatus === UpdateStatus.EDIT) {
        const selectedExpense = this.travelService.getSelectedExpense();
        this.form = new FormGroup({
          name: new FormControl(selectedExpense?.name, Validators.required),
          price: new FormControl(selectedExpense?.amount, [Validators.required, Validators.min(1)]),
        });
      }
      this.shouldFocusInput = true;
    })
  }

  ngAfterViewChecked(): void {
    if(this.shouldFocusInput)this.nameInput?.nativeElement.focus();
    this.shouldFocusInput = false;
  }

  ngOnDestroy(): void {
    if (this.combineLatestSubscription) {
      this.combineLatestSubscription.unsubscribe();
    }
  }

  save() {
    this.form.markAllAsTouched();

    if (this.form.valid) {
      const newExpense = {
        name: this.form.value.name,
        amount: this.form.value.price,
        status: ExpenseStatus.ACTIVE,
      };

      if(this.status === UpdateStatus.ADD) this.travelService.addExpense(newExpense);
      if(this.status === UpdateStatus.EDIT) this.travelService.editExpense(newExpense);

      this.travelService.setAddStatus();
      this.form = new FormGroup({
        name: new FormControl('', Validators.required),
        price: new FormControl(0, [Validators.required, Validators.min(1)]),
      });
    }
  }

  delete() {
    this.travelService.removeExpense();
    this.travelService.setAddStatus();
  }
  
  cancel() {
    this.travelService.setAddStatus();
  }
}
