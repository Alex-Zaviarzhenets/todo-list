const form = document.querySelector('form');
const ul = document.querySelector('ul');
const tasks = [];

loadTasks();
showTasks();

form.onsubmit = handleSubmit;
ul.onclick = handleItemClick;
ul.onchange = handleMark;

function handleSubmit(e) {
  e.preventDefault();

  const text = form.text.value.trim();

  if (!text) return;

  addTask(text);
  showTasks();
  saveTasks();

  form.reset();
}

function handleItemClick(e) {
  if (!e.target.matches('button')) return;
  
  const btn = e.target;
  const items = [...ul.children];
  const item = btn.parentElement;
  const i = items.indexOf(item);

  deleteTask(i);
  saveTasks();
  showTasks();
}

function handleMark(e) {
  const box = e.target;
  const items = [...ul.children];
  const item = box.parentElement;
  const i = items.indexOf(item);
  const checked = box.checked;

  markTask(i, checked);
  saveTasks();
}

function addTask(text) {
  const task = {text, done: false};

  tasks.push(task);
}

function deleteTask(i) {
  tasks.splice(i, 1);
}

function markTask(i, done) {
  tasks[i].done = done;
}

function showTasks() {
  let html = '';
  
  for (const task of tasks) {
    html += buildItem(task);
  }

  ul.innerHTML = html;
}

function buildItem(task) {
  return `
    <li>
      <input type="checkbox" ${task.done ? 'checked' : ''}>
      <span>${task.text}</span>
      <button>×</button>
    </li>
  `
} 

function saveTasks() {
  localStorage.tasks = JSON.stringify(tasks);
}

function loadTasks() {
  tasks.push(...JSON.parse(localStorage.tasks || '[]'));
}




