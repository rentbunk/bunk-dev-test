import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TravelService } from 'src/app/services/travel.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent {
  form: FormGroup;

  constructor(
    private travelService: TravelService
  ) {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      price: new FormControl(0, [Validators.required, Validators.min(1)]),
    });
  }

  ngOnInit(): void {}

  save() {
    this.form.markAllAsTouched();

    if (this.form.valid) {
      const newExpense = {
        name: this.form.value.name,
        amount: this.form.value.price,
      };

      this.travelService.addExpense(newExpense);
      this.form = new FormGroup({
        name: new FormControl('', Validators.required),
        price: new FormControl(0, [Validators.required, Validators.min(1)]),
      });
    }
  }
}
