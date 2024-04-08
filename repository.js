
const apiUrl = 'https://crudcrud.com/api/8db7a01d5f744381b49420a70dc1745f/task';
//const apiUrl = 'https://crudcrud.com/api/22c494bc05aa46898942bbe21fb245a4/task';

// Função para carregar tarefas da API
async function GetAllTasks() {
  const response = await fetch(apiUrl);
  return response.json();
}
async function GetTasksById(id) {
  const response = await fetch(apiUrl + id);
  return response.json();
}

// Função para adicionar uma nova tarefa
async function addTask(taskName) {
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(taskName),
  });
  
  return response.ok;
}
// Função para editar uma tarefa
async function EditTask(taskId, newName){
  const response = await fetch(apiUrl + '/' + taskId, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify( {texto: newName.texto, completada: newName.completada}),
  });

  return response.ok;
}

// Função para deletar uma tarefa
async function DeleteTask(taskId){
  const response = await fetch(`${apiUrl}/${taskId}`, {
    method: 'DELETE'
  });
  return response.ok;
}


