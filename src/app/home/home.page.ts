import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ITask } from '../interface/task';
import { rootTask, cloneTask, sortTask } from '../interface/task';
import { MakeChildModalComponent } from '../shared/make-child-modal/make-child-modal.component';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  task: ITask;
  sort: boolean = false;
  constructor(private modalCtrl: ModalController) {
    this.task = rootTask();
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
