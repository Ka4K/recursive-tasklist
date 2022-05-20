import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { CalendarData } from 'ng-calendar-heatmap';

@Injectable({
  providedIn: 'root',
})
export class TaskProgressService {
  private completeBeforeDuedate = 0;
  private completeAfterDuedate = 0;
  private calendarData: CalendarData[] = [];
  constructor(private storage: Storage) {
    this.initStorage();
  }
  increseComplete(duedate: string): void {
    const today = new Date().toISOString();
    if (duedate) {
      if (this.compareDate(duedate, today)) {
        this.completeBeforeDuedate++;
      } else {
        this.completeAfterDuedate++;
      }
    }
    const val = this.calendarData.find(
      (elm) =>
        this.getYYYYMMDD(elm.date.toISOString()) === this.getYYYYMMDD(today)
    );
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
  getCalendarData(): CalendarData[] {
    return this.calendarData;
  }

  loadLocalStorage(): void {
    this.storage.get('completeBeforeDuedate').then((data) => {
      if (data) {
        this.completeBeforeDuedate = Number(data);
      }
    });
    this.storage.get('completeAfterDuedate').then((data) => {
      if (data) {
        this.completeAfterDuedate = Number(data);
      }
    });
    this.storage.get('calendarData').then((data) => {
      if (data) {
        this.calendarData = JSON.parse(data);
        this.calendarData.map((elm) => (elm.date = new Date(elm.date)));
      }
    });
  }
  clearCompleted = (): void => {
    this.completeBeforeDuedate = 0;
    this.completeAfterDuedate = 0;
    this.calendarData = [];
    this.updateLocalstorage();
  };
  private initStorage(): void {
    this.storage.create();
  }
  private getYYYYMMDD(date: string): string {
    return date.slice(0, 10);
  }
  private compareDate(a: string, b: string): boolean {
    return this.getYYYYMMDD(a) >= this.getYYYYMMDD(b);
  }
  private updateLocalstorage(): void {
    this.storage.set(
      'completeBeforeDuedate',
      String(this.completeBeforeDuedate)
    );
    this.storage.set('completeAfterDuedate', String(this.completeAfterDuedate));
    this.storage.set('calendarData', JSON.stringify(this.calendarData));
  }
}
