import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  hidden: string | null = 'hidden';
  constructor() {}
  ngOnInit(): void {}
  showValue(hidden: string | null, toogleButton?: boolean) {
    if (toogleButton) {
      if (this.hidden) {
        this.hidden = null;
        return false;
      } else {
        this.hidden = 'hidden';
        return false;
      }
    }
    if (this.hidden) {
      this.hidden = hidden;
    } else {
      this.hidden = hidden;
    }
  }
}
