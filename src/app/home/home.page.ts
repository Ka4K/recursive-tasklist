import { Component } from '@angular/core';
import { ITask } from '../interface/task';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  tasks: ITask[] = [
    { name: '1', children: [] },
    {
      name: '2',
      children: [
        { name: '3', children: [] },
        { name: '4', children: [{ name: '5', children: [] }] },
      ],
    },
  ];
  task: string;
  constructor() {}
  addTask() {
    this.tasks.push({ name: this.task, children: [] });
  }
}
