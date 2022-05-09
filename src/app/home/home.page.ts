import { Component } from '@angular/core';
import { ITask } from '../interface/task';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  changemode: boolean = false;
  task: ITask = {
    name: 'dumy',
    children: [
      { name: '1', children: [] },
      {
        name: '2',
        children: [
          { name: '3', children: [] },
          { name: '4', children: [{ name: '5', children: [] }] },
        ],
      },
    ],
  };
  taskname: string;
  constructor() {}
  addTask() {
    this.task.children.push({ name: this.taskname, children: [] });
  }
}
