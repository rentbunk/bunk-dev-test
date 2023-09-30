import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  skills = ['Javascript', 'Python', 'C++', 'Java', 'C#'];
  profileForm = this.fb.group({
    primarySkill: ['', Validators.required],
    skills: this.fb.group({
      Javascript: [{ value: false, disabled: false }],
      Python: [{ value: false, disabled: false }],
      'C++': [{ value: false, disabled: false }],
      Java: [{ value: false, disabled: false }],
      'C#': [{ value: false, disabled: false }],
    }),
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.profileForm.get('primarySkill')?.valueChanges.subscribe(value => {
      if (value) {
        this.profileForm.get('skills')?.get(value)?.setValue(true);
        this.profileForm.get('skills')?.get(value)?.disable();
      }
    });
  }

  onSubmit(): void {
    console.log(this.profileForm.value);
  }
}
