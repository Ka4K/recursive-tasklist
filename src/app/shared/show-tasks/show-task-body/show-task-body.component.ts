import { Component, Input, OnInit } from '@angular/core';
import { ITask } from 'src/app/interface/task';
import { TaskProgressService } from '../../task-progress.service';
import { UpdateTaskModalComponent } from 'src/app/shared/update-task-modal/update-task-modal.component';
import { MakeChildModalComponent } from 'src/app/shared/make-child-modal/make-child-modal.component';
import { TaskService } from '../../task.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-show-task-body',
  templateUrl: './show-task-body.component.html',
  styleUrls: ['./show-task-body.component.scss'],
})
export class ShowTaskBodyComponent implements OnInit {
  @Input() index: number;
  @Input() task: ITask;
  constructor(
    private modalCtrl: ModalController,
    private taskManager: TaskProgressService,
    private taskServise: TaskService
  ) {}

  ngOnInit(): void {}
  deleteTask($event): void {
    $event.stopPropagation();
    $event.preventDefault();
    this.taskServise.deleteChild(this.task.parent, this.index);
  }
  createChild($event): void {
    $event.stopPropagation();
    $event.preventDefault();
    this.modalCtrl
      .create({
        component: MakeChildModalComponent,
        componentProps: {
          parent: this.task,
        },
      })
      .then((modal) => modal.present());
  }
  hasChildren(): boolean {
    return !!this.task.children.length;
  }
  taskComplete($event): void {
    $event.stopPropagation();
    $event.preventDefault();
    this.taskManager.increseComplete(this.task);
    this.taskServise.deleteChild(this.task.parent, this.index);
  }
  renameTask($event): void {
    $event.stopPropagation();
    $event.preventDefault();
    this.modalCtrl
      .create({
        component: UpdateTaskModalComponent,
        componentProps: {
          task: this.task,
        },
      })
      .then((modal) => modal.present());
  }
}
