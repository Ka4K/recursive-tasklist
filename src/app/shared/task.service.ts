import { Injectable } from '@angular/core';
import { ITask, ITaskWithPath } from '../interface/task';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private storage: Storage) {
    this.initStorage();
  }
  async initStorage() {
    await this.storage.create();
  }
  root: ITask = {
    name: '',
    duedate: '',
    recentDuedate: '',
    children: [],
    parent: null,
  };
  rootTask(): ITask {
    return this.root;
  }
  async loadTasks() {
    await this.storage.get('task').then((data) => {
      if (data) {
        this.root.children = JSON.parse(data);
      }
    });
    this.setParent(this.root);
  }
  updateTask(task: ITask, name: string, duedate: string = '') {
    task.name = name;
    task.duedate = duedate;
    if (duedate < task.recentDuedate || !task.recentDuedate) {
      task.recentDuedate = duedate;
      this.updateRecentAtCreate(task);
    } else {
      this.updateRecentAtDelete(task.parent, task.parent.recentDuedate);
    }
    this.updateLocalstorage();
  }
  addChild(parent: ITask, child: ITask) {
    parent.children = [...parent.children, child];
    this.updateRecentAtCreate(child);
    this.updateLocalstorage();
  }
  deleteChild(parent: ITask, idx: number) {
    let beforeDuedate = parent.recentDuedate;
    parent.children.splice(idx, 1);
    parent.children = [...parent.children];
    this.updateRecentAtDelete(parent, beforeDuedate);
    this.updateLocalstorage();
  }
  clearTasks() {
    this.root.children = [];
    this.updateLocalstorage();
  }
  allTasks(): ITaskWithPath[] {
    let tasks: ITaskWithPath[] = [];
    function pushChild(parent: ITask, path: string) {
      parent.children.map((task) => {
        let t: ITaskWithPath = { ...task, path: path };
        tasks.push(t);
        pushChild(task, path + '/' + task.name);
      });
    }
    pushChild(this.root, '');
    return tasks;
  }
  private async updateLocalstorage() {
    await this.storage.set(
      'task',
      JSON.stringify(this.root.children, [
        'name',
        'duedate',
        'recentDuedate',
        'children',
      ])
    );
  }
  private setParent(task: ITask) {
    task.children.map((t) => {
      t.parent = task;
      if (t.children.length) {
        this.setParent(t);
      }
    });
  }
  private updateRecentAtCreate(task: ITask) {
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
  private updateRecentAtDelete(parent: ITask, beforeDuedate: string) {
    if (!beforeDuedate || !parent.parent) {
      return;
    }
    const parentDuedate: string = parent.parent.recentDuedate;
    if (parent.children.length) {
      parent.recentDuedate = parent.children.reduce((a: ITask, b: ITask) => {
        return a.duedate && a.duedate < b.duedate ? a : b;
      }).duedate;
    } else {
      parent.recentDuedate = parent.duedate;
    }
    this.updateRecentAtDelete(parent.parent, parentDuedate);
  }
}
