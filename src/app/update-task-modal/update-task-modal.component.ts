import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { ITask } from '../interface/task';

@Component({
  selector: 'app-update-task-modal',
  templateUrl: './update-task-modal.component.html',
  styleUrls: ['./update-task-modal.component.scss'],
})
export class UpdateTaskModalComponent implements OnInit {
  task: ITask;
  constructor(private navParams: NavParams) {}

  ngOnInit() {
    this.task = this.navParams.data.task;
  }
  updateTask(task: ITask, name: string, date: string) {
    task.name = name;
    task.duedate = date;
  }
}
