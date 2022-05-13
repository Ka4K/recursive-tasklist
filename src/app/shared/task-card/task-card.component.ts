import { Component, Input, OnInit } from '@angular/core';
import { ITask } from 'src/app/interface/task';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
})
export class TaskCardComponent implements OnInit {
  @Input() task: ITask;
  @Input() highlight: boolean = false;
  @Input() showRecent: boolean = false;
  constructor() {}

  ngOnInit() {}
}
