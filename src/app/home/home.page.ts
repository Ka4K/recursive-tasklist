import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ITask } from '../interface/task';
import { rootTask, cloneTask, sortTask } from '../interface/task';
import { MakeChildModalComponent } from '../shared/make-child-modal/make-child-modal.component';
import { addChildFromName } from '../interface/task';
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
  sort: boolean = false;
  constructor(public modalCtrl: ModalController) {
    this.task = rootTask();
    if (!this.task.children.length) {
      for (let i = 0; i < 4000; i++) {
        let name1 = ('0000' + i).slice(-4);
        addChildFromName(this.task, name1);
        let t1 = this.task.children[i];
        console.log(i);
        /*for (let j = 0; j < 10; j++) {
        let name2 = ('00' + j).slice(-3);
        addChildFromName(t1, name1 + '-' + name2);
        let t2 = t1.children[j];
        for (let k = 0; k < 3; k++) {
          let name3 = String(k);
          addChildFromName(t2, name1 + '-' + name2 + '-' + name3);
          let t3 = t1.children[j];
          for (let l = 0; l < 3; l++) {
            let name4 = String(l);
            addChildFromName(
              t3,
              name1 + '-' + name2 + '-' + name3 + '-' + name4
            );
          }
        }
      }*/
      }
    }
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

  sortTasks(task: ITask) {
    return sortTask(cloneTask(task));
  }
}
