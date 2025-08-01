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