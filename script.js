async function adicionarTarefa() {
  const novaTarefa = document.getElementById("new-todo").value;

  if (novaTarefa) {
    const tarefaObj = {
      texto: novaTarefa,
      completada: false,
    };
    const sucess = await addTask(tarefaObj);
    if(sucess)
    {
      document.getElementById("new-todo").value = "";
      atualizarLista();
    }
  } else {
    alert("Insira uma tarefa válida!");
  }
}

async function atualizarLista() {
  const lista = document.getElementById("todo-list");
  lista.innerHTML = "";
  const sucesso = await GetAllTasks();
  if(sucesso){
    sucesso.forEach((tarefa) => {
      const item = document.createElement("div");
      item.classList.add("todo-item");
      item.id = tarefa._id;
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = tarefa.completada;
      checkbox.addEventListener("change", () => {
        tarefa.completada = checkbox.checked;
        const sucess = EditTask(tarefa._id, tarefa);
        console.log(sucess)
        if(sucess)
        {
          atualizarLista();
        }
      });
      
      const texto = document.createElement("span");
      texto.textContent = tarefa.texto;
      
      const buttonContainer = document.createElement("div"); // Container para os botões
      buttonContainer.classList.add("button-container");
      
      const excluirButton = document.createElement("button");
      excluirButton.textContent = "Excluir";
      excluirButton.style.marginLeft = "5px";
      excluirButton.addEventListener("click", async () => {
      const sucess = await DeleteTask(tarefa._id);
      if(sucess)
      {
        atualizarLista();
      }
    });

    const alterarButton = document.createElement("button");
    alterarButton.textContent = "Alterar";
    alterarButton.addEventListener("click", () => {
      const novoTexto = prompt("Digite o novo texto da tarefa:");
      if (novoTexto !== null) {
        if (novoTexto.trim() !== "") {
        tarefa.texto = novoTexto
        alterarTarefa(tarefa._id, tarefa);
      } else {
        alert("Insira um texto válido para a tarefa!"); // Alerta se o novo texto estiver vazio
      }
      }
    });
    
    if (tarefa.completada) {
      item.classList.add("completed");
    }
    
    item.appendChild(checkbox);
    item.appendChild(texto);
    buttonContainer.appendChild(alterarButton);
    buttonContainer.appendChild(excluirButton);
    item.appendChild(buttonContainer);
    
    lista.appendChild(item);
  });
}
}

const addButton = document.getElementById("add-todo");
addButton.addEventListener("click", adicionarTarefa);

//tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
atualizarLista();

// ???
window.addEventListener("beforeunload", () => {
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
});

async function alterarTarefa(id, novoTexto) {
  
    // Verifica se o novo texto não está vazio ou apenas espaços em branco
    const sucess = await EditTask(id, novoTexto)// Atualiza o texto da tarefa com o novo texto
    if(sucess)
    {
      atualizarLista();
    }
  
}

function activeSearch() {
  const buttonSearch = document.querySelector(".button-search");
  const inputSearch = document.getElementById("input-search");
  const search = document.querySelector(".todo-search");

  buttonSearch.addEventListener("click", handleSearchButtonClick);

  inputSearch.addEventListener("focus", () => {
    search.style.borderColor = "var(--color-5)";
  });

  inputSearch.addEventListener("blur", () => {
    search.style.borderColor = "var(--color-2)";
  });

  inputSearch.addEventListener("keyup", () => {
    let taskSearch = inputSearch.value.toLowerCase();
    let tasksList = document.querySelectorAll("#todo-list li");

    tasksList.forEach((task) => {
      if (task.innerText.toLowerCase().includes(taskSearch)) {
        task.style.display = "flex";
      } else {
        task.style.display = "none";
      }
    });
  });

  buttonSearch.addEventListener("click", function () {
    handleSearchButtonClick(inputSearch);
  });
  activeSearch();

  function handleSearchButtonClick() {
    let searchVisible = search.classList.contains("show");

    if (searchVisible) {
      search.classList.remove("show");
    } else {
      search.classList.add("show");
      document.getElementById("input-search").focus();
    }
  }

  document
    .getElementById("button-search")
    .addEventListener("click", handleSearchButtonClick);
  handleSearchButtonClick();
}

function setupSearchButton() {
  const searchButton = document.getElementById("button-search");
  const searchContainer = document.getElementById("searchContainer");

  if (searchButton && searchContainer) {
    searchButton.addEventListener("click", function () {
      searchContainer.classList.toggle("show");
      if (searchContainer.classList.contains("show")) {
        document.getElementById("input-search").focus();
      }
    });
  }
}
document.addEventListener("DOMContentLoaded", setupSearchButton);

document.addEventListener("DOMContentLoaded", function () {
  function searchTodoList() {
    document
      .getElementById("input-search")
      .addEventListener("input", function () {
        let inputText = this.value;
        let todoList = document.getElementById("todo-list");
        let items = todoList.getElementsByTagName("div");
        for (let i = 0; i < items.length; i++) {
          let itemText = items[i].textContent || items[i].innerText;
          if (itemText.includes(inputText)) {
            items[i].style.display = "";
          } else {
            items[i].style.display = "none";
          }
        }
      });
  }
  searchTodoList();
});
