import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ITask, deleteChild } from 'src/app/interface/task';
import {
  ActionSheetController,
  AlertController,
  ModalController,
  IonAccordionGroup,
} from '@ionic/angular';
import { UpdateTaskModalComponent } from 'src/app/update-task-modal/update-task-modal.component';
import { MakeChildModalComponent } from 'src/app/make-child-modal/make-child-modal.component';
import { TaskProgressManagerService } from '../task-progress-manager.service';
@Component({
  selector: 'app-show-tasks',
  templateUrl: './show-tasks.component.html',
  styleUrls: ['./show-tasks.component.scss'],
})
export class ShowTasksComponent implements OnInit {
  @Input() task: ITask;
  @ViewChild(IonAccordionGroup, { static: true })
  accordionGroup: IonAccordionGroup;
  constructor(
    public actionSheetController: ActionSheetController,
    public alertController: AlertController,
    public modalCtrl: ModalController,
    public taskManager: TaskProgressManagerService
  ) {}
  async changeTask(index: number, $event) {
    $event.stopPropagation();
    $event.preventDefault();
    const actionSheet = await this.actionSheetController.create({
      header: 'タスクの変更',
      buttons: [
        {
          text: '完了',
          icon: 'checkbox',
          handler: () => {
            this.taskManager.increseComplete(this.task.children[index].duedate);
            deleteChild(this.task, index);
          },
        },
        {
          text: '削除',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            deleteChild(this.task, index);
          },
        },
        {
          text: '子タスクの追加',
          icon: 'create',
          handler: () => {
            this._createChild(index);
          },
        },
        {
          text: '変更',
          icon: 'sync',
          handler: () => {
            this._renameTask(index);
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
  async _renameTask(index: number) {
    const modal = await this.modalCtrl.create({
      component: UpdateTaskModalComponent,
      componentProps: {
        task: this.task.children[index],
      },
    });
    await modal.present();
  }
  async _createChild(index: number) {
    const modal = await this.modalCtrl.create({
      component: MakeChildModalComponent,
      componentProps: {
        parent: this.task.children[index],
      },
    });
    await modal.present();
  }
}
