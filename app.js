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

    if (todo.done) {
      li.classList.add('done');
    } else {
      li.classList.remove('done');
    }

    // Klick-Handler zum Abhaken
    li.onclick = () => toggleDone(todo.id, todo.done);

    todoList.appendChild(li);
  });
}