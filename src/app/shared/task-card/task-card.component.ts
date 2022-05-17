import { Component, Input, OnInit } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { ITask } from 'src/app/interface/task';
import { TaskProgressService } from '../task-progress.service';
import { UpdateTaskModalComponent } from 'src/app/shared/update-task-modal/update-task-modal.component';
import { MakeChildModalComponent } from 'src/app/shared/make-child-modal/make-child-modal.component';
import { TaskService } from '../task.service';
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
    private actionSheetController: ActionSheetController,
    private modalCtrl: ModalController,
    private taskManager: TaskProgressService,
    private taskServise: TaskService
  ) {}
  async changeTask($event) {
    $event.stopPropagation();
    $event.preventDefault();
    const actionSheet = await this.actionSheetController.create({
      header: 'タスクの変更',
      buttons: [
        {
          text: '変更',
          icon: 'sync',
          handler: () => {
            this._renameTask();
          },
        },
        {
          text: '削除',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.taskServise.deleteChild(this.parent, this.index);
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
  taskComplete($event) {
    $event.stopPropagation();
    $event.preventDefault();
    this.taskManager.increseComplete(this.task.duedate);
    this.taskServise.deleteChild(this.parent, this.index);
  }
  private async _renameTask() {
    const modal = await this.modalCtrl.create({
      component: UpdateTaskModalComponent,
      componentProps: {
        task: this.task,
      },
    });
    await modal.present();
  }
  async createChild($event) {
    $event.stopPropagation();
    $event.preventDefault();
    const modal = await this.modalCtrl.create({
      component: MakeChildModalComponent,
      componentProps: {
        parent: this.task,
      },
    });
    await modal.present();
  }
}
