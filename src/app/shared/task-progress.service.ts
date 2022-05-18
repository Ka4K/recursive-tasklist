import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { CalendarData } from 'ng-calendar-heatmap';

@Injectable({
  providedIn: 'root',
})
export class TaskProgressService {
  private completeBeforeDuedate: number = 0;
  private completeAfterDuedate: number = 0;
  private calendarData: CalendarData[] = [];
  constructor(private storage: Storage) {
    this.initStorage();
  }
  private async initStorage() {
    await this.storage.create();
  }
  increseComplete(duedate: string) {
    let today = new Date().toISOString();
    if (duedate) {
      if (this.compareDate(duedate, today)) {
        this.completeBeforeDuedate++;
      } else {
        this.completeAfterDuedate++;
      }
    }
    let val = this.calendarData.find((elm) => {
      return elm.date == new Date(this.getYYYYMMDD(today));
    });
    if (val) {
      val.count++;
    } else {
      this.calendarData.push({
        date: new Date(this.getYYYYMMDD(today)),
        count: 1,
      });
    }
    this.updateLocalstorage();
  }
  getCompleteBeforeDuedate(): number {
    return this.completeBeforeDuedate;
  }
  getCompleteAfterDuedate(): number {
    return this.completeAfterDuedate;
  }
  getCalendarData() {
    return this.calendarData;
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
    this.storage.set('calendarData', JSON.stringify(this.calendarData));
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
    await this.storage.get('calendarData').then((data) => {
      if (data) {
        this.calendarData = JSON.parse(data);
      }
    });
  }
  clearCompleted() {
    this.completeBeforeDuedate = 0;
    this.completeAfterDuedate = 0;
    this.updateLocalstorage();
  }
}
