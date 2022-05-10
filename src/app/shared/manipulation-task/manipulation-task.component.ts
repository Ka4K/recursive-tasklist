import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ITask } from 'src/app/interface/task';

@Component({
  selector: 'app-manipulation-task',
  templateUrl: './manipulation-task.component.html',
  styleUrls: ['./manipulation-task.component.scss'],
})
export class ManipulationTaskComponent implements OnInit {
  @Input() task: ITask;
  @Input() manipulation: (task: ITask, name: string, date: string) => void;
  @Input() buttonName: string = '追加';
  @Input() name: string = '';
  @Input() duedate: string = '';
  @Input() isModal: boolean = false;
  now: string;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    this.now = new Date().toISOString();
  }

  update(task: ITask, name: string, date: string) {
    this.manipulation(task, name, date);
    if (this.isModal) {
      this.modalCtrl.dismiss();
    }
  }
}
