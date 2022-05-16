import { cloneDeep } from 'lodash';
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
function _updateRecentAtCreate(task: ITask) {
  if (
    !task.parent.parent ||
    !task.recentDuedate ||
    (task.parent.recentDuedate &&
      task.recentDuedate > task.parent.recentDuedate)
  ) {
    return;
  }
  task.parent.recentDuedate = task.recentDuedate;
  _updateRecentAtCreate(task.parent);
}
function _updateRecentAtDelete(parent: ITask, beforeDuedate: string) {
  if (!beforeDuedate || !parent) {
    return;
  }
  const parentDuedate: string = parent.recentDuedate;
  if (parent.children.length) {
    parent.recentDuedate = parent.children.reduce((a: ITask, b: ITask) => {
      return a.duedate && a.duedate < b.duedate ? a : b;
    }).duedate;
  } else {
    parent.recentDuedate = parent.duedate;
  }
  _updateRecentAtDelete(parent.parent, parentDuedate);
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
  if (duedate < task.recentDuedate || !task.recentDuedate) {
    task.recentDuedate = duedate;
    _updateRecentAtCreate(task);
  } else {
    _updateRecentAtDelete(task.parent, task.parent.recentDuedate);
  }
  _updateLocalstorage();
}
export function addChild(parent: ITask, child: ITask) {
  parent.children = [...parent.children, child];
  _updateRecentAtCreate(child);
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
  let beforeDuedate = parent.recentDuedate;
  parent.children.splice(idx, 1);
  _updateRecentAtDelete(parent, beforeDuedate);
  _updateLocalstorage();
}
export function clearTasks() {
  _root.children = [];
  _updateLocalstorage();
}
export function cloneTask(task: ITask) {
  return cloneDeep(task);
}
export function sortTask(task: ITask) {
  if (task.children.length) {
    task.children = task.children.sort((a, b) => {
      return a.recentDuedate > b.recentDuedate ? 1 : -1;
    });
    task.children.map((t) => {
      sortTask(t);
    });
    return task;
  }
}
