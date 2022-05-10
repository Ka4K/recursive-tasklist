import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ShowDateComponent } from './show-date/show-date.component';

@NgModule({
  declarations: [ShowDateComponent],
  exports: [ShowDateComponent],
  imports: [IonicModule, CommonModule],
})
export class SharedModule {}
