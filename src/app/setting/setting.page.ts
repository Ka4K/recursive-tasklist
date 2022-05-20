import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { TaskProgressService } from '../shared/task-progress.service';
import { TaskService } from '../shared/task.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {
  constructor(
    private taskProgress: TaskProgressService,
    private alertController: AlertController,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {}
  async clearTasks(): Promise<void> {
    this.makeAlert(this.taskService.clearTasks);
  }
  async clearCompleted(): Promise<void> {
    this.makeAlert(this.taskProgress.clearCompleted);
  }
  private makeAlert(handler: () => boolean | void): void {
    this.alertController
      .create({
        header: 'この操作は元に戻せません。よろしいですか？',
        buttons: [
          {
            text: 'いいえ',
          },
          {
            text: 'はい',
            handler,
          },
        ],
      })
      .then((prompt) => prompt.present());
  }
}
