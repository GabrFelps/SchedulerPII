class Task {
  constructor(id, descricao) {
    this.id = id;
    this.descricao = descricao;
    this.dataInicio = new Date().toLocaleDateString();
    this.dataConclusao = null;
    this.concluida = false;
  }

  concluir() {
    if (!this.concluida) {
      this.dataConclusao = new Date().toLocaleDateString();
      this.concluida = true;
    } else {
      this.dataConclusao = null;
      this.concluida = false;
    }
  }

  desfazer() {
    this.dataConclusao = null;
    this.concluida = false;
  }

  editar(descricao) {
    this.descricao = descricao;
  }
}

class SchedulerADS {
  constructor() {
    this.idAtual = 1;
    this.listaTarefas = [];
    this.tabelaBody = document.querySelector('#tabelaTarefas tbody');
    this.noTasksMessage = document.getElementById('noTasksMessage');

    document.getElementById('adicionarBtn').addEventListener('click', () => this.adicionar())
    document.getElementById('darkToggle').addEventListener('click', this.toggleDarkMode)

    // carrega preferência de tema
    if (localStorage.getItem('modo') === 'dark') document.body.classList.add('dark')

    this.atualizarMensagem()
  }

  toggleDarkMode() {
    document.body.classList.toggle('dark');
    localStorage.setItem('modo', document.body.classList.contains('dark') ? 'dark' : 'light');
  }

  atualizarMensagem() {
    this.noTasksMessage.style.display = this.tabelaBody.children.length ? 'none' : 'block';
  }

  adicionar() {
    const descricaoInput = document.getElementById('descricaoTarefa');
    const descricao = descricaoInput.value.trim();
    descricaoInput.value = '';
    const erro = document.getElementById('errorMessage');

    if (!descricao) {
      erro.textContent = 'Por favor, insira uma descrição.';
      setTimeout(() => erro.textContent = '', 2000);
      return;
    }

    const id = this.idAtual;
    const dataHoje = new Date().toLocaleDateString();

    const tarefa = new Task(this.idAtual, descricao);
    this.listaTarefas.push(tarefa);

    this.criarLinhaTabela(tarefa);
  }

  criarLinhaTabela(tarefa) {
    /* ---- linha da tabela ---- */
    const tr = document.createElement('tr')
    tr.id = `task-${tarefa.id}`

    tr.innerHTML = `
      <td>${tarefa.id}</td>
      <td>${tarefa.descricao}</td>
      <td>${tarefa.dataInicio}</td>
      <td class="status">Em andamento</td>
      <td></td>
    `

    /* botões ação */
    const concluir = document.createElement('button')
    concluir.className = 'action-btn'
    concluir.title = 'Concluir'
    concluir.innerHTML = '<svg viewBox="0 0 24 24"><path d="M9 16.17 4.83 12 3.41 13.41 9 19 21 7 19.59 5.59 9 16.17Z"/></svg>'
    concluir.addEventListener('click', () => this.marcarConcluida(tarefa.id))

    const excluir = document.createElement('button')
    excluir.className = 'action-btn'
    excluir.title = 'Excluir'
    excluir.innerHTML = '<svg viewBox="0 0 24 24"><path d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12ZM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4Z"/></svg>'
    excluir.addEventListener('click', () => this.remover(tarefa.id))

    tr.lastElementChild.append(concluir, excluir)
    this.tabelaBody.appendChild(tr)

    this.idAtual++
    this.atualizarMensagem()
  }


  marcarConcluida(id) {
    const tarefa = this.listaTarefas.find(tarefa => tarefa.id === id)
    tarefa.concluir()

    const tr = document.getElementById(`task-${id}`)
    const statusTd = tr.querySelector('.status')

    if (tarefa.concluida) {
      statusTd.textContent = new Date().toLocaleDateString()
      statusTd.style.color = '#90ee90'
      tr.classList.add('completed-task')
    } else {
      statusTd.textContent = 'Em andamento'
      statusTd.style.color = ''
      tr.classList.remove('completed-task')
    }
  }

  remover(id) {
    document.getElementById(`task-${id}`).remove()
    this.atualizarMensagem()
  }
}

document.addEventListener('DOMContentLoaded', () => new SchedulerADS())
