import { cloneDeep } from 'lodash';
export interface ITask {
  name: string;
  duedate: string;
  recentDuedate: string;
  children: ITask[];
  parent: ITask | null;
}
export interface ITaskWithPath extends ITask {
  path: string;
}
export function newTask(
  name: string,
  parent: ITask,
  duedate: string = ''
): ITask {
  return {
    name: name,
    duedate: duedate,
    recentDuedate: duedate,
    children: [],
    parent: parent,
  };
}
export function cloneTask(task: ITask) {
  return cloneDeep(task);
}
export function sortTask(task: ITask) {
  if (task.children.length) {
    task.children = task.children.sort((a, b) => {
      return !a.recentDuedate && a.recentDuedate > b.recentDuedate ? 1 : -1;
    });
    task.children.map((t) => {
      sortTask(t);
    });
    return task;
  }
}
