import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { ITask } from '../../interface/task';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-update-task-modal',
  templateUrl: './update-task-modal.component.html',
  styleUrls: ['./update-task-modal.component.scss'],
})
export class UpdateTaskModalComponent implements OnInit {
  task: ITask;
  constructor(private navParams: NavParams, private taskService: TaskService) {}

  ngOnInit(): void {
    this.task = this.navParams.data.task;
  }
  update = (task: ITask, name: string, date: string): void => {
    this.taskService.updateTask(task, name, date);
  };
}
