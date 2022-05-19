import { Component, OnInit } from '@angular/core';
import { ITaskWithPath } from '../interface/task';
import { TaskService } from '../shared/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.page.html',
  styleUrls: ['./task-list.page.scss'],
})
export class TaskListPage implements OnInit {
  tasks: ITaskWithPath[] = [];
  constructor(private taskService: TaskService) {}

  ngOnInit() {}
  ionViewWillEnter() {
    this.tasks = this.taskService.allTasks();
    this.tasks.sort((a: ITaskWithPath, b: ITaskWithPath) =>
      !a.duedate && a.duedate > b.duedate ? 1 : -1
    );
  }
}
