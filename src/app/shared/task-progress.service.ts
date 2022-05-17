import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class TaskProgressService {
  private completeBeforeDuedate: number = 0;
  private completeAfterDuedate: number = 0;
  constructor(private storage: Storage) {
    this.initStorage();
  }
  private async initStorage() {
    await this.storage.create();
  }
  increseComplete(duedate: string) {
    if (duedate) {
      if (this.compareDate(duedate, new Date().toISOString())) {
        this.completeBeforeDuedate++;
      } else {
        this.completeAfterDuedate++;
      }
      this.updateLocalstorage();
    }
  }
  getCompleteBeforeDuedate(): number {
    return this.completeBeforeDuedate;
  }
  getCompleteAfterDuedate(): number {
    return this.completeAfterDuedate;
  }
  private getYYYYMMDD(date: string): string {
    return date.slice(0, 10);
  }
  private compareDate(a: string, b: string): boolean {
    return this.getYYYYMMDD(a) >= this.getYYYYMMDD(b);
  }
  private updateLocalstorage() {
    this.storage.set(
      'completeBeforeDuedate',
      String(this.completeBeforeDuedate)
    );
    this.storage.set('completeAfterDuedate', String(this.completeAfterDuedate));
  }
  async loadLocalStorage() {
    await this.storage.get('completeBeforeDuedate').then((data) => {
      if (data) {
        this.completeBeforeDuedate = Number(data);
      }
    });
    await this.storage.get('completeAfterDuedate').then((data) => {
      if (data) {
        this.completeAfterDuedate = Number(data);
      }
    });
  }
  clearCompleted() {
    this.completeBeforeDuedate = 0;
    this.completeAfterDuedate = 0;
    this.updateLocalstorage();
  }
}
