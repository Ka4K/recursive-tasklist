import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ITask } from '../interface/task';
import { cloneTask, sortTask } from '../interface/task';
import { TaskService } from '../shared/task.service';
import { MakeChildModalComponent } from '../shared/make-child-modal/make-child-modal.component';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  task: ITask;
  sort: boolean = false;
  constructor(
    private modalCtrl: ModalController,
    private taskService: TaskService
  ) {
    this.task = this.taskService.rootTask();
  }
  async addTask(): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: MakeChildModalComponent,
      componentProps: {
        parent: this.task,
      },
    });
    await modal.present();
  }

  sortTasks(task: ITask): ITask {
    return sortTask(cloneTask(task));
  }
}
