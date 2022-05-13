import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { addChildFromName, ITask } from '../interface/task';

@Component({
  selector: 'app-make-child-modal',
  templateUrl: './make-child-modal.component.html',
  styleUrls: ['./make-child-modal.component.scss'],
})
export class MakeChildModalComponent implements OnInit {
  task: ITask;
  constructor(private navParams: NavParams) {}

  ngOnInit() {
    this.task = this.navParams.data.parent;
  }
  addTask(task: ITask, name: string, date: string) {
    addChildFromName(task, name, date);
  }
}
