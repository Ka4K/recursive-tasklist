import { Component, OnInit } from '@angular/core';
import { clearTasks } from '../interface/task';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {
  constructor() {}

  ngOnInit() {}
  clearTasks() {
    clearTasks();
  }
}
