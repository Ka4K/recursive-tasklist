import { Component, OnInit, Input } from '@angular/core';
import { ITask } from 'src/app/interface/task';
import { ActionSheetController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-show-tasks',
  templateUrl: './show-tasks.component.html',
  styleUrls: ['./show-tasks.component.scss'],
})
export class ShowTasksComponent implements OnInit {
  @Input() task: ITask;
  @Input() change: boolean;
  constructor(
    public actionSheetController: ActionSheetController,
    public alertController: AlertController
  ) {}
  async changeTask(index: number) {
    const actionSheet = await this.actionSheetController.create({
      header: 'タスクの変更',
      buttons: [
        {
          text: '削除',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.task.children.splice(index, 1);
          },
        },
        {
          text: '変更',
          icon: 'create',
          handler: () => {
            //this._renameTask(index);
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
}
