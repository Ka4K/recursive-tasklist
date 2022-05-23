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
