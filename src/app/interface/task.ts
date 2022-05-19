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
export const newTask = (
  name: string,
  parent: ITask,
  duedate: string = ''
): ITask => ({
  name,
  duedate,
  recentDuedate: duedate,
  children: [],
  parent,
});

export const cloneTask = (task: ITask): ITask => cloneDeep(task);

export const sortTask = (task: ITask): ITask => {
  if (task.children.length) {
    task.children = task.children.sort((a, b) =>
      !a.recentDuedate && a.recentDuedate > b.recentDuedate ? 1 : -1
    );
    task.children.map((t) => {
      sortTask(t);
    });
    return task;
  }
};
