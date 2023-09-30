import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  active: string = 'list';

  ngOnInit(): void {}

  setActiveButton(button: string): void {
    this.active = button;
  }
}
