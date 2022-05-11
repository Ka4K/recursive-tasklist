import { Component } from '@angular/core';
import { loadTasks } from './interface/task';
import { TaskProgressManagerService } from './shared/task-progress-manager.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Statistics', url: '/statistics', icon: 'flask' },
  ];
  constructor(taskManager: TaskProgressManagerService) {
    loadTasks();
    taskManager.loadLocalStorage();
  }
}
