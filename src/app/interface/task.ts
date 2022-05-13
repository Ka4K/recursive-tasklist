export interface ITask {
  name: string;
  duedate: string;
  recentDuedate: string;
  children: ITask[];
  parent: ITask | null;
}
let _root: ITask = {
  name: '',
  duedate: '',
  recentDuedate: '',
  children: [],
  parent: null,
};
export function rootTask(): ITask {
  return _root;
}
function _updateLocalstorage() {
  console.log(_root);
  localStorage.task = JSON.stringify(_root, [
    'name',
    'duedate',
    'recentDuedate',
    'children',
  ]);
}
function _setParent(task: ITask) {
  task.children.map((t) => {
    t.parent = task;
    if (t.children.length) {
      _setParent(t);
    }
  });
}
function _updateRecent(task: ITask) {
  if (
    task.parent == null ||
    task.recentDuedate > task.parent.recentDuedate ||
    !task.recentDuedate
  ) {
    return;
  }
  task.parent.recentDuedate = task.recentDuedate;
  _updateRecent(task.parent);
}
export function loadTasks() {
  if ('task' in localStorage) {
    _root = JSON.parse(localStorage.task);
    _setParent(_root);
  }
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
export function updateTask(task: ITask, name: string, duedate: string = '') {
  task.name = name;
  task.duedate = duedate;
  if (duedate < task.recentDuedate) {
    task.recentDuedate = duedate;
  }
  _updateRecent(task);
  _updateLocalstorage();
}
export function addChild(parent: ITask, child: ITask) {
  parent.children.push(child);
  _updateRecent(child);
  _updateLocalstorage();
}
export function addChildFromName(
  parent: ITask,
  name: string,
  duedate: string = ''
) {
  addChild(parent, newTask(name, parent, duedate));
}
export function deleteChild(parent: ITask, idx: number) {
  parent.children.splice(idx, 1);
  _updateLocalstorage();
}
export function clearTasks() {
  _root.children = [];
  _updateLocalstorage();
}
