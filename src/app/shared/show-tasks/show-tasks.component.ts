import { Component, OnInit, Input } from '@angular/core';
import { ITask } from 'src/app/interface/task';

@Component({
  selector: 'app-show-tasks',
  templateUrl: './show-tasks.component.html',
  styleUrls: ['./show-tasks.component.scss'],
})
export class ShowTasksComponent implements OnInit {
  @Input() task: ITask;
  @Input() virtualScroll: boolean = false;
  constructor() {}
  ngOnInit() {}
}
