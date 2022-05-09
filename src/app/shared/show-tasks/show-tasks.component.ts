import { Component, OnInit, Input } from '@angular/core';
import { ITask, newTask } from 'src/app/interface/task';
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
  async _createTextPrompt(
    header: string,
    value: string,
    operation: (any) => boolean | void
  ) {
    const prompt = await this.alertController.create({
      header: header,
      inputs: [
        {
          name: 'task',
          placeholder: 'タスク',
          value: value,
        },
      ],
      buttons: [
        {
          text: '閉じる',
        },
        {
          text: '保存',
          handler: operation,
        },
      ],
    });
    prompt.present();
  }
  async _renameTask(index: number) {
    this._createTextPrompt(
      '変更後のタスク',
      this.task.children[index].name,
      (data) => {
        this.task.children[index].name = data.task;
      }
    );
  }
  async _createChild(index: number) {
    this._createTextPrompt('子タスクの名前', '', (data) => {
      this.task.children[index].children.push(newTask(data.task));
    });
  }
}
