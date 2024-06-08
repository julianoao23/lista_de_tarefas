// Função para simplificar o document.querySelector
const elemento = (seletor) => document.querySelector(seletor);

// Função para armazenar os dados no navegador
const setBanco = (banco) => localStorage.banco = JSON.stringify(banco);

// Função para pegar os dados armazenados
const getBanco = () => localStorage.banco ? JSON.parse(localStorage.banco) : [];

// Buscando os elementos necessários
const form = elemento(".form");
const input = elemento(".input");
const listaDeTarefas = elemento(".listaDeTarefas");
const search = elemento(".search");

// Função para adicionar tarefas ao setBanco()
const adicionarTarefa = (e) => {
  e.preventDefault();
  const texto = input.value.trim();
  if(texto != ""){
    const tarefas = getBanco();
    tarefas.push(
      {
        "id": tarefas.length,
        "tarefa": texto,
        "status": ""
      }
      );
    setBanco(tarefas);
    renderizarTarefa(getBanco())
  }
  input.value = "";
}

// Função para remover tarefas do setBanco()
const removerTarefa = (index) => {
  const tarefas = getBanco();
  tarefas.splice(index,1);
  setBanco(tarefas);
  renderizarTarefa(getBanco());
}

// Função para marcar tarefa como concluida
const concluirTarefa = (index) => {
  const tarefas = getBanco();
  tarefas[index].status = tarefas[index].status == "" ? "checked" : "";
  setBanco(tarefas);
  renderizarTarefa(getBanco());
}

// Função para filtrar tarefas
const pesquisarTarefas = () => {
  const texto = search.value.toLowerCase();
  if(texto.trim() !== ""){
    const filtro = getBanco().filter( n => n.tarefa.toLowerCase().includes(texto));
    renderizarTarefa(filtro);
  }else{
    renderizarTarefa(getBanco());
  }
}

// Função para listar tarefas na tela
const renderizarTarefa = (dados) => {
  listaDeTarefas.innerHTML = "";
  dados.forEach((item,index)=>{
    const newItem = document.createElement("div");
    newItem.classList.add("tarefa");
    newItem.innerHTML = `
    <div class="div1">
      <input type="checkbox" onclick="concluirTarefa(${index})" ${item.status}>
      <span class="ml-2">${item.tarefa}</span>
    </div>
    <div class="div2">
      <button onclick="removerTarefa(${index})"><span class="fa fa-delete-left"></span></button>
    </div>
    `;
    listaDeTarefas.appendChild(newItem);
  })
}

renderizarTarefa(getBanco())
form.addEventListener("submit",adicionarTarefa);