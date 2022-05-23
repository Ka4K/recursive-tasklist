import { Component, Input, OnInit } from '@angular/core';
import { ITask } from 'src/app/interface/task';

@Component({
  selector: 'app-show-task-body',
  templateUrl: './show-task-body.component.html',
  styleUrls: ['./show-task-body.component.scss'],
})
export class ShowTaskBodyComponent implements OnInit {
  @Input() index: number;
  @Input() task: ITask;
  constructor() {}

  ngOnInit(): void {}
  hasChildren(t: ITask): boolean {
    return !!t.children.length;
  }
}
