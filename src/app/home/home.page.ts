import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ITask } from '../interface/task';
import { newTask, addChild, rootTask } from '../interface/task';
import { MakeChildModalComponent } from '../make-child-modal/make-child-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  changemode: boolean = false;
  showform: boolean = true;
  taskname: string;
  duedate: string = '';
  task: ITask;
  constructor(public modalCtrl: ModalController) {
    this.task = rootTask();
  }
  async addTask() {
    const modal = await this.modalCtrl.create({
      component: MakeChildModalComponent,
      componentProps: {
        parent: this.task,
      },
    });
    await modal.present();
  }
}
