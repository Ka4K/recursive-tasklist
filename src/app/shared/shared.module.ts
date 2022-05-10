import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ShowDateComponent } from './show-date/show-date.component';
import { ManipulationTaskComponent } from './manipulation-task/manipulation-task.component';
import { FormsModule } from '@angular/forms';
import { UpdateTaskModalComponent } from '../update-task-modal/update-task-modal.component';

@NgModule({
  declarations: [
    ShowDateComponent,
    ManipulationTaskComponent,
    UpdateTaskModalComponent,
  ],
  exports: [ShowDateComponent, ManipulationTaskComponent],
  imports: [IonicModule, CommonModule, FormsModule],
})
export class SharedModule {}
