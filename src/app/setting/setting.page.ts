import { Component, OnInit } from '@angular/core';
import { clearTasks } from '../interface/task';
import { TaskProgressManagerService } from '../shared/task-progress-manager.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {
  constructor(public taskManager: TaskProgressManagerService) {}

  ngOnInit() {}
  clearTasks() {
    clearTasks();
  }
  clearCompleted() {
    this.taskManager.clearCompleted();
  }
}
