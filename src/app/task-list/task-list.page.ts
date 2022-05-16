import { Component, OnInit } from '@angular/core';
import { ITask } from '../interface/task';
import { rootTask } from '../interface/task';

type TaskWithPath = ITask & { path: string };
@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.page.html',
  styleUrls: ['./task-list.page.scss'],
})
export class TaskListPage implements OnInit {
  tasks: TaskWithPath[] = [];
  constructor() {}

  ngOnInit() {}
  private pushChild(parent: ITask, path: string) {
    parent.children.map((task) => {
      let t: TaskWithPath = { ...task, path: path };
      this.tasks.push(t);
      this.pushChild(task, path + '/' + task.name);
    });
  }
  ionViewWillEnter() {
    let root = rootTask();
    this.pushChild(root, '');
    this.tasks.sort((a: TaskWithPath, b: TaskWithPath) => {
      return a.duedate > b.duedate ? 1 : -1;
    });
  }
}
