import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ShowDateComponent } from './show-date/show-date.component';
import { ManipulationTaskComponent } from './manipulation-task/manipulation-task.component';
import { FormsModule } from '@angular/forms';
import { UpdateTaskModalComponent } from '../update-task-modal/update-task-modal.component';
import { MakeChildModalComponent } from '../make-child-modal/make-child-modal.component';
import { TaskCardComponent } from '../shared/task-card/task-card.component';
@NgModule({
  declarations: [
    ShowDateComponent,
    ManipulationTaskComponent,
    UpdateTaskModalComponent,
    MakeChildModalComponent,
    TaskCardComponent,
  ],
  exports: [ShowDateComponent, ManipulationTaskComponent, TaskCardComponent],
  imports: [IonicModule, CommonModule, FormsModule],
})
export class SharedModule {}
