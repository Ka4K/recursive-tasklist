import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { clearTasks } from '../interface/task';
import { TaskProgressManagerService } from '../shared/task-progress-manager.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {
  constructor(
    public taskManager: TaskProgressManagerService,
    public alertController: AlertController
  ) {}

  ngOnInit(): void {}
  async makeAlert(handler: (any) => boolean | void) {
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
  async clearTasks() {
    this.makeAlert(clearTasks);
  }
  async clearCompleted() {
    this.makeAlert(this.taskManager.clearCompleted);
  }
}
