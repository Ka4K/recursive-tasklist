import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-date',
  templateUrl: './show-date.component.html',
  styleUrls: ['./show-date.component.scss'],
})
export class ShowDateComponent implements OnInit {
  @Input() date: string;
  @Input() highlight = false;
  constructor() {}

  ngOnInit(): void {}
  dueDateIsToday(): boolean {
    return this.date.slice(0, 10) <= new Date().toISOString().slice(0, 10);
  }
}
