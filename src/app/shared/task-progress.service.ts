import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TaskProgressService {
  completeBeforeDuedate: number = 0;
  completeAfterDuedate: number = 0;
  constructor() {}
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
    localStorage.completeBeforeDuedate = String(this.completeBeforeDuedate);
    localStorage.completeAfterDuedate = String(this.completeAfterDuedate);
  }
  loadLocalStorage() {
    if ('completeBeforeDuedate' in localStorage) {
      this.completeBeforeDuedate = Number(localStorage.completeBeforeDuedate);
    }
    if ('completeAfterDuedate' in localStorage) {
      this.completeAfterDuedate = Number(localStorage.completeAfterDuedate);
    }
  }
  clearCompleted() {
    this.completeBeforeDuedate = 0;
    this.completeAfterDuedate = 0;
    this.updateLocalstorage();
  }
}
