import { Component } from '@angular/core';
import { loadTasks } from './interface/task';
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
  constructor(taskManager: TaskProgressService) {
    loadTasks();
    taskManager.loadLocalStorage();
  }
}
