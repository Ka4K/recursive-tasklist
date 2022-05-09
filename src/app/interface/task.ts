export interface ITask {
  name: string;
  duedate: string;
  children: ITask[];
}

export function newTask(name: string, duedate: string = '') {
  return { name: name, duedate: duedate, children: [] };
}
