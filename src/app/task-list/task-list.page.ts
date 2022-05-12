import { Component, OnInit } from '@angular/core';
import { ITask } from '../interface/task';
import { rootTask } from '../interface/task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.page.html',
  styleUrls: ['./task-list.page.scss'],
})
export class TaskListPage implements OnInit {
  tasks: ITask[] = [];
  constructor() {}

  ngOnInit() {}
  private pushChild(parent: ITask) {
    parent.children.map((t) => {
      this.tasks.push(t);
      this.pushChild(t);
    });
  }
  ionViewWillEnter() {
    let root = rootTask();
    this.pushChild(root);
  }
}
