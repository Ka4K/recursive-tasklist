export interface ITask {
  name: string;
  duedate: string;
  children: ITask[];
}

export function newTask(name: string, duedate: string = '') {
  return { name: name, duedate: duedate, children: [] };
}

export function addChild(parent: ITask, child: ITask) {
  parent.children.push(child);
}
