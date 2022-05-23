import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ITask } from 'src/app/interface/task';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-manipulation-task',
  templateUrl: './manipulation-task.component.html',
  styleUrls: ['./manipulation-task.component.scss'],
})
export class ManipulationTaskComponent implements OnInit {
  @Input() task: ITask;
  @Input() manipulation: (task: ITask, name: string, date: string) => void;
  @Input() buttonName = '追加';
  @Input() name = '';
  @Input() duedate = '';
  @Input() isModal = false;
  @Input() maxDuedate = undefined;
  @Input() toastMsg = '';
  now: string;

  constructor(
    private modalCtrl: ModalController,
    private toastCtrl: ToastController
  ) {}

  ngOnInit(): void {
    this.now = new Date().toISOString();
  }

  update(task: ITask, name: string, date: string): void {
    this.manipulation(task, name, date);
    if (this.toastMsg) {
      this.toastCtrl
        .create({
          message: this.toastMsg,
          duration: 1000,
          position: 'top',
        })
        .then((toast) => {
          toast.present();
        });
    }
    if (this.isModal) {
      this.modalCtrl.dismiss();
    }
  }
  cancel(): void {
    if (this.isModal) {
      this.modalCtrl.dismiss();
    }
  }
}
