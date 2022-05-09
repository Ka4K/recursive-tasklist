import { Component, OnInit, Input } from '@angular/core';
import { ITask } from 'src/app/interface/task';

@Component({
  selector: 'app-show-tasks',
  templateUrl: './show-tasks.component.html',
  styleUrls: ['./show-tasks.component.scss'],
})
export class ShowTasksComponent implements OnInit {
  @Input() tasks: ITask[];
  constructor() {}

  ngOnInit() {}
  hasChildren(idx: number) {
    return this.tasks[idx].children.length;
  }
}
