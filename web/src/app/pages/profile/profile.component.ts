import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  skills: string[] = ['Javascript', 'Python', 'C++', 'Java', 'C#'];
  primarySkill: string = '';
  selectedSkills: {[key: string]: boolean} = {};
  primarySkillRequired = false;
  noSkillsSelectedError = false;

  constructor() {
    this.skills.forEach(skill => {
      this.selectedSkills[skill] = false;
    });
  }

  ngDoCheck() {
    if (this.primarySkill !== '') {
      this.selectedSkills[this.primarySkill] = true;
      this.primarySkillRequired = false;
    } else if (this.primarySkill === '') {
      this.primarySkillRequired = true;
    }
  }
  validateSkills() {
    this.noSkillsSelectedError = !Object.values(this.selectedSkills).some(skill => skill);  // Set error state based on selected skills
  }
}
