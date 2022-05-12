import { Component } from '@angular/core';
import { ITask } from '../interface/task';
import { newTask, addChild, rootTask } from '../interface/task';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  showform: boolean = true;
  taskname: string;
  duedate: string = '';
  task: ITask;
  constructor() {
    this.task = rootTask();
  }
  addTask(task: ITask, name: string, date: string) {
    addChild(task, newTask(name, date));
  }
}
