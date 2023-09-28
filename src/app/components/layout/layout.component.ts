import { Component, OnInit } from '@angular/core';

import { slideInAnimation } from './animations';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  animations: [slideInAnimation],
})
export class LayoutComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
