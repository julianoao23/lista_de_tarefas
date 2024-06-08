// Buscando os elementos necessários
const btnSearch = elemento(".navbar-toggler");
const panel = elemento(".panel");
const btnClose = elemento(".btn-close");
const searchMobile = elemento(".searchMobile");


// Função para abrir o painel na versão mobile
function abrirPanel(){
  panel.classList.toggle("d-none");
  searchMobile.focus();
}


// Função de pesquisa para versão mobile
const pesquisaMobile = () =>{
  const texto = searchMobile.value.toLowerCase();
  if(texto.trim() !== ""){
    const filtro = getBanco().filter( n => n.tarefa.toLowerCase().includes(texto));
    renderizarTarefa(filtro);
  }else{
    renderizarTarefa(getBanco());
  }
}

btnSearch.addEventListener("click",abrirPanel);
btnClose.addEventListener("click",abrirPanel);