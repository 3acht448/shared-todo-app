// Supabase URL und Public API Key aus deinem Projekt
const SUPABASE_URL = 'https://DEINE-SUPABASE-URL.supabase.co';
const SUPABASE_ANON_KEY = 'DEIN-ÖFFENTLICHER-ANON-KEY';

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const areaSelect = document.getElementById('areaSelect');
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const todoList = document.getElementById('todoList');

async function loadTasks() {
  const { data, error } = await supabase
    .from('todos')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Fehler beim Laden:', error);
    return;
  }

  todoList.innerHTML = '';

  data.forEach(todo => {
    const li = document.createElement('li');
    li.textContent = `[${todo.area}] ${todo.task}`;
    li.style.textDecoration = todo.done ? 'line-through' : 'none';
    li.onclick = () => toggleDone(todo.id, todo.done);
    todoList.appendChild(li);
  });
}

async function addTask() {
  const task = taskInput.value.trim();
  if (!task) return alert('Bitte gib eine Aufgabe ein.');

  const area = areaSelect.value;

  const { data, error } = await supabase
    .from('todos')
    .insert([{ task, area, done: false }]);

  if (error) {
    console.error('Fehler beim Hinzufügen:', error);
    alert('Fehler beim Hinzufügen der Aufgabe.');
  } else {
    taskInput.value = '';
    loadTasks();
  }
}

async function toggleDone(id, currentDone) {
  const { data, error } = await supabase
    .from('todos')
    .update({ done: !currentDone })
    .eq('id', id);

  if (error) {
    console.error('Fehler beim Aktualisieren:', error);
  } else {
    loadTasks();
  }
}

addTaskBtn.addEventListener('click', addTask);

loadTasks();