import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-result',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss'],
})
export class SkillComponent implements OnInit {
  form!: FormGroup;
  skills = ['Javascript', 'Python', 'C++', 'Java', 'C#'];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      primarySkill: ['', Validators.required],
      skills: this.buildSkills(),
    });

    this.form.get('primarySkill')?.valueChanges.subscribe((value) => {
      const index = this.skills.indexOf(value);
      if (index > -1) {
        (this.form.get('skills') as FormArray).controls.forEach(
          (control, i) => {
            if (i === index) {
              control.setValue(true);
              control.disable();
            } else {
              control.setValue(false);
              control.enable();
            }
          }
        );
      }
    });
  }

  buildSkills() {
    const arr = this.skills.map((skill) => {
      return this.fb.control(false);
    });
    return this.fb.array(arr);
  }
}
