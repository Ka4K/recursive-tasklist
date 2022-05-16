import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { clearTasks } from '../interface/task';
import { TaskProgressService } from '../shared/task-progress.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {
  constructor(
    private taskManager: TaskProgressService,
    private alertController: AlertController
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
    this.makeAlert(clearTasks);
  }
  async clearCompleted(): Promise<void> {
    this.makeAlert(this.taskManager.clearCompleted);
  }
}
