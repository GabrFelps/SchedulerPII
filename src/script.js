class ListetaADS {
  constructor() {
    this.contador = 1
    this.tabelaBody = document.querySelector('#tabelaTarefas tbody')
    this.noTasksMessage = document.getElementById('noTasksMessage')
    this.listaMemorias = document.getElementById('listaMemorias')
    document.getElementById('adicionarBtn').addEventListener('click', () => this.adicionarTarefa())
    this.updateNoTasksMessage()
  }

  updateNoTasksMessage() {
    this.noTasksMessage.style.display = this.tabelaBody.children.length === 0 ? 'block' : 'none'
  }

  adicionarTarefa() {
    const descricaoInput = document.getElementById('descricaoTarefa')
    const descricao = descricaoInput.value.trim()
    const errorMessage = document.getElementById('errorMessage')

    if (descricao === '') {
      errorMessage.innerText = 'Por favor, insira uma descrição para a memória.'
      setTimeout(() => errorMessage.innerText = '', 2000)
      return
    }

    const tr = this.criarLinhaTabela(descricao)
    const cardItem = this.criarItemCard(descricao)

    this.tabelaBody.appendChild(tr)
    this.listaMemorias.appendChild(cardItem)

    descricaoInput.value = ''
    this.contador++
    this.updateNoTasksMessage()
  }

  criarLinhaTabela(descricao) {
    const tr = document.createElement('tr')
    tr.id = `task-${this.contador}`

    const tdContador = document.createElement('td')
    tdContador.innerText = this.contador

    const tdDescricao = document.createElement('td')
    tdDescricao.innerText = descricao

    const tdDataInicio = document.createElement('td')
    tdDataInicio.innerText = new Date().toLocaleDateString()

    const tdDataConclusao = document.createElement('td')
    tdDataConclusao.innerText = 'Em andamento'

    const tdAcoes = document.createElement('td')

    const botaoConcluir = document.createElement('button')
    botaoConcluir.className = 'concluirBtn action-btn'
    botaoConcluir.title = 'Concluir Memória'
    botaoConcluir.innerHTML = '<svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>'
    botaoConcluir.addEventListener('click', () => {
      tdDataConclusao.innerText = new Date().toLocaleDateString()
      tdDataConclusao.style.color = '#90ee90'
      botaoConcluir.disabled = true
      tr.classList.add('completed-task')
      document.querySelector(`#card-${this.contador} input`).checked = true
    })

    const botaoExcluir = document.createElement('button')
    botaoExcluir.className = 'excluirBtn action-btn'
    botaoExcluir.title = 'Excluir Memória'
    botaoExcluir.innerHTML = '<svg viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>'
    botaoExcluir.addEventListener('click', () => {
      tr.remove()
      document.querySelector(`#card-${this.contador}`).remove()
      this.updateNoTasksMessage()
    })

    tdAcoes.appendChild(botaoConcluir)
    tdAcoes.appendChild(botaoExcluir)

    tr.append(tdContador, tdDescricao, tdDataInicio, tdDataConclusao, tdAcoes)
    return tr
  }

  criarItemCard(descricao) {
    const item = document.createElement('div')
    item.className = 'flex items-center justify-between py-3'
    item.id = `card-${this.contador}`

    item.innerHTML = `
      <div class="flex items-center gap-2">
        <input type="checkbox" class="defaultCheckbox h-5 w-5 rounded-md border border-gray-300">
        <p class="text-base font-bold text-navy-700">${descricao}</p>
      </div>
      <span class="material-symbols-rounded h-6 w-6 text-navy-700 cursor-pointer">drag_indicator</span>
    `
    return item
  }
}

document.addEventListener('DOMContentLoaded', () => new ListetaADS())
