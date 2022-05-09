import { Component } from '@angular/core';
import { ITask } from '../interface/task';
import { newTask } from '../interface/task';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  changemode: boolean = false;
  showform: boolean = true;
  task: ITask = {
    name: 'dumy',
    duedate: '',
    children: [
      newTask('1'),
      {
        name: '2',
        duedate: '',
        children: [
          { name: '3', duedate: '', children: [] },
          { name: '4', duedate: '', children: [newTask('5')] },
        ],
      },
    ],
  };
  taskname: string;
  constructor() {}
  addTask() {
    this.task.children.push(newTask(this.taskname));
  }
}
