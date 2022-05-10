export interface ITask {
  name: string;
  duedate: string;
  children: ITask[];
}
let _root: ITask = { name: 'dumy', duedate: '', children: [] };
export function rootTask(): ITask {
  return _root;
}
function _updateLocalstorage() {
  localStorage.task = JSON.stringify(_root);
}
export function loadTasks() {
  if ('task' in localStorage) {
    _root = JSON.parse(localStorage.task);
  }
}
export function newTask(name: string, duedate: string = ''): ITask {
  return { name: name, duedate: duedate, children: [] };
}
export function updateTask(task: ITask, name: string, duedate: string = '') {
  task.name = name;
  task.duedate = duedate;
  _updateLocalstorage();
}
export function addChild(parent: ITask, child: ITask) {
  parent.children.push(child);
  _updateLocalstorage();
}
export function deleteChild(parent: ITask, idx: number) {
  parent.children.splice(idx, 1);
  _updateLocalstorage();
}
