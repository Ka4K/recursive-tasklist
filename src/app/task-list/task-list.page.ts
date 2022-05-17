import { Component, OnInit } from '@angular/core';
import { ITaskWithPath, ITask, allTasks } from '../interface/task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.page.html',
  styleUrls: ['./task-list.page.scss'],
})
export class TaskListPage implements OnInit {
  tasks: ITaskWithPath[] = [];
  constructor() {}

  ngOnInit() {}
  ionViewWillEnter() {
    this.tasks = allTasks();
    this.tasks.sort((a: ITaskWithPath, b: ITaskWithPath) => {
      return a.duedate > b.duedate ? 1 : -1;
    });
  }
}
