import { Component, OnInit } from '@angular/core';
import { QueryService } from 'src/app/http/query.service';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private queryService: QueryService, public data: DataService) {}
  ngOnInit(): void {
    this.queryService.testConnection().subscribe(console.log);
  }
}
