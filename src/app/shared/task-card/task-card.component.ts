import { Component, Input, OnInit } from '@angular/core';
import {
  ActionSheetController,
  AlertController,
  ModalController,
} from '@ionic/angular';
import { ITask, deleteChild } from 'src/app/interface/task';
import { TaskProgressManagerService } from '../task-progress-manager.service';
import { UpdateTaskModalComponent } from 'src/app/update-task-modal/update-task-modal.component';
import { MakeChildModalComponent } from 'src/app/make-child-modal/make-child-modal.component';
@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
})
export class TaskCardComponent implements OnInit {
  @Input() task: ITask;
  @Input() highlight: boolean = false;
  @Input() showRecent: boolean = false;
  @Input() edit: boolean = false;
  @Input() parent: ITask | undefined;
  @Input() index: number | undefined;

  constructor(
    public actionSheetController: ActionSheetController,
    public alertController: AlertController,
    public modalCtrl: ModalController,
    public taskManager: TaskProgressManagerService
  ) {}
  async changeTask($event) {
    $event.stopPropagation();
    $event.preventDefault();
    const actionSheet = await this.actionSheetController.create({
      header: 'タスクの変更',
      buttons: [
        {
          text: '完了',
          icon: 'checkbox',
          handler: () => {
            this.taskManager.increseComplete(this.task.duedate);
            deleteChild(this.parent, this.index);
          },
        },
        {
          text: '削除',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            deleteChild(this.parent, this.index);
          },
        },
        {
          text: '子タスクの追加',
          icon: 'create',
          handler: () => {
            this._createChild();
          },
        },
        {
          text: '変更',
          icon: 'sync',
          handler: () => {
            this._renameTask();
          },
        },
        {
          text: '閉じる',
          icon: 'close',
          role: 'cancel',
          handler: () => {},
        },
      ],
    });
    actionSheet.present();
  }
  ngOnInit() {}
  hasChildren(t: ITask) {
    return t.children.length;
  }
  async _renameTask() {
    const modal = await this.modalCtrl.create({
      component: UpdateTaskModalComponent,
      componentProps: {
        task: this.task,
      },
    });
    await modal.present();
  }
  async _createChild() {
    const modal = await this.modalCtrl.create({
      component: MakeChildModalComponent,
      componentProps: {
        parent: this.task,
      },
    });
    await modal.present();
  }
}
