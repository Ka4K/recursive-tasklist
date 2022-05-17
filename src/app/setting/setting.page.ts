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
  private async makeAlert(handler: (any) => boolean | void): Promise<void> {
    const prompt = await this.alertController.create({
      header: 'この操作は元に戻せません。よろしいですか？',
      buttons: [
        {
          text: 'いいえ',
        },
        {
          text: 'はい',
          handler: handler,
        },
      ],
    });
    prompt.present();
  }
  async clearTasks(): Promise<void> {
    this.makeAlert(this.taskService.clearTasks);
  }
  async clearCompleted(): Promise<void> {
    this.makeAlert(this.taskProgress.clearCompleted);
  }
}
