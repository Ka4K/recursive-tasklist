import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ITask } from '../interface/task';
import { TaskService } from '../shared/task.service';
import { MakeChildModalComponent } from '../shared/make-child-modal/make-child-modal.component';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  task: ITask;
  modalOpening = false;
  constructor(
    private modalCtrl: ModalController,
    private taskService: TaskService
  ) {
    this.task = this.taskService.rootTask();
  }
  addTask(): void {
    this.modalOpening = true;
    this.modalCtrl
      .create({
        component: MakeChildModalComponent,
        componentProps: {
          parent: this.task,
        },
      })
      .then((modal) => modal.present().then(() => (this.modalOpening = false)));
  }
}
