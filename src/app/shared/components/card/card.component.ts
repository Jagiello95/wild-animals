import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'card',
  standalone: true,
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  imports: [CommonModule, MatCardModule, MatIconModule],
})
export class CardComponent {
  @Input() header: string;
  @Input() icon: string;
  @Input() iconLeft: boolean = false;
  @Input() iconRight: boolean = false;

  constructor(public data: DataService) {}
}
