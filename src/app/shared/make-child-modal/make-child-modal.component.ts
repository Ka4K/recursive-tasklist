import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { ITask, newTask } from '../../interface/task';
import { TaskService } from '../task.service';
@Component({
  selector: 'app-make-child-modal',
  templateUrl: './make-child-modal.component.html',
  styleUrls: ['./make-child-modal.component.scss'],
})
export class MakeChildModalComponent implements OnInit {
  task: ITask;
  constructor(private navParams: NavParams, private taskService: TaskService) {}

  ngOnInit() {
    this.task = this.navParams.data.parent;
  }
  addTask = (task: ITask, name: string, date: string) => {
    this.taskService.addChild(task, newTask(name, task, date));
  };
}
