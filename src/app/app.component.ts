import { Component } from '@angular/core';
import { TaskService } from './shared/task.service';
import { TaskProgressService } from './shared/task-progress.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Statistics', url: '/statistics', icon: 'flask' },
    { title: 'TaskList', url: '/tasks', icon: 'list' },
    { title: 'Setting', url: '/setting', icon: 'options' },
  ];
  constructor(
    private taskProgress: TaskProgressService,
    private taskService: TaskService
  ) {
    taskService.loadTasks();
    taskProgress.loadLocalStorage();
  }
}
