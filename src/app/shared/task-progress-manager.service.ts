import { Injectable } from '@angular/core';

let _completeBeforeDuedate = 0;
let _completeAfterDuedate = 0;
@Injectable({
  providedIn: 'root',
})
export class TaskProgressManagerService {
  constructor() {}
  increseComplete(duedate: string) {
    if (this.compareDate(duedate, new Date().toISOString())) {
      _completeBeforeDuedate++;
    } else {
      _completeAfterDuedate++;
    }
    this.updateLocalstorage();
  }
  getCompleteBeforeDuedate(): number {
    return _completeBeforeDuedate;
  }
  getCompleteAfterDuedate(): number {
    return _completeAfterDuedate;
  }
  private getYYYYMMDD(date: string): string {
    return date.slice(0, 10);
  }
  private compareDate(a: string, b: string): boolean {
    return this.getYYYYMMDD(a) >= this.getYYYYMMDD(b);
  }
  private updateLocalstorage() {
    localStorage.completeBeforeDuedate = String(_completeBeforeDuedate);
    localStorage.completeAfterDuedate = String(_completeAfterDuedate);
  }
  loadLocalStorage() {
    if ('completeBeforeDuedate' in localStorage) {
      _completeBeforeDuedate = Number(localStorage.completeBeforeDuedate);
    }
    if ('completeAfterDuedate' in localStorage) {
      _completeAfterDuedate = Number(localStorage.completeAfterDuedate);
    }
  }
  clearCompleted() {
    _completeBeforeDuedate = 0;
    _completeAfterDuedate = 0;
    this.updateLocalstorage();
  }
}
