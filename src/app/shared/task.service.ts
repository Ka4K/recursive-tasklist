import { Injectable } from '@angular/core';
import { ITask, ITaskWithPath, newTask } from '../interface/task';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private root: ITask = newTask('', null);

  constructor(private storage: Storage) {
    this.initStorage();
  }

  rootTask(): ITask {
    return this.root;
  }
  loadTasks(): void {
    this.storage.get('task').then((data) => {
      if (data) {
        this.root.children = JSON.parse(data);
      }
      this.setParent(this.root);
    });
  }
  updateTask = (task: ITask, name: string, duedate: string = ''): void => {
    task.name = name;
    task.duedate = duedate;
    if (duedate < task.recentDuedate || !task.recentDuedate) {
      task.recentDuedate = duedate;
      this.updateRecentAtCreate(task);
    } else {
      this.updateRecentAtDelete(task);
    }
    this.updateLocalstorage();
  };
  addChild = (parent: ITask, child: ITask): void => {
    parent.children = [...parent.children, child];
    this.updateRecentAtCreate(child);
    this.updateLocalstorage();
  };
  deleteChild = (parent: ITask, idx: number): void => {
    parent.children.splice(idx, 1);
    parent.children = [...parent.children];
    this.updateRecentAtDelete(parent);
    this.updateLocalstorage();
  };
  clearTasks = (): void => {
    this.root.children = [];
    this.updateLocalstorage();
  };
  allTasks(): ITaskWithPath[] {
    const tasks: ITaskWithPath[] = [];
    const pushChild = (parent: ITask, path: string) => {
      parent.children.map((task) => {
        const t: ITaskWithPath = { ...task, path };
        tasks.push(t);
        pushChild(task, path + '/' + task.name);
      });
    };
    pushChild(this.root, '');
    return tasks;
  }
  private initStorage(): void {
    this.storage.create();
  }
  private updateLocalstorage(): void {
    this.storage.set(
      'task',
      JSON.stringify(this.root.children, [
        'name',
        'duedate',
        'recentDuedate',
        'children',
      ])
    );
  }
  private setParent(task: ITask): void {
    task.children.map((t) => {
      t.parent = task;
      if (t.children.length) {
        this.setParent(t);
      }
    });
  }
  private updateRecentAtCreate(task: ITask): void {
    if (
      !task.parent.parent ||
      !task.recentDuedate ||
      (task.parent.recentDuedate &&
        task.recentDuedate > task.parent.recentDuedate)
    ) {
      return;
    }
    task.parent.recentDuedate = task.recentDuedate;
    this.updateRecentAtCreate(task.parent);
  }
  private updateRecentAtDelete(parent: ITask): void {
    if (!parent.parent) {
      return;
    }
    parent.recentDuedate = parent.duedate;
    console.log(parent);
    if (parent.children.length) {
      parent.children.forEach((a: ITask) => {
        if (a.recentDuedate && a.recentDuedate < parent.recentDuedate) {
          parent.recentDuedate = a.recentDuedate;
        }
      });
    }
    this.updateRecentAtDelete(parent.parent);
  }
}
