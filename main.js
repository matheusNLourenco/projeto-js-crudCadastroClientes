const modal = document.querySelector('.modal')

function openModal() {
  modal.classList.add('active')
}

function closeModal() {
  modal.classList.remove('active')
}

class Cliente {
  constructor() {
    this.id = 1
    this.arr = []
    this.editId = null
  }

  save() {
    const cliente = this.readData()

    if(this.validateFields(cliente)) {
      if(this.editId == null) {
        this.add(cliente)

      } else {
        this.atualizar(this.editId, cliente)
      }
    }

    this.populaTable(this.arr)
    this.cancel()
  }

  add(cliente) {
    this.arr.push(cliente)
    this.id++
  }

  atualizar(id, cliente) {
    for(let i in this.arr) {
      if(this.arr[i].id == id) {
        this.arr[i].nome = cliente.nome
        this.arr[i].email = cliente.email
        this.arr[i].cel = cliente.cel
        this.arr[i].city = cliente.city
      }
    }
  }

  remove(value) {
    const bodyTable = document.querySelector('.body')

    if(confirm('Deseja realmente remover esse item?')) {
      for(let i = 0; i < this.arr.length; i++) {
        if(this.arr[i].nome == value) {
          this.arr.splice(i, 1)
          bodyTable.deleteRow(i);
        }
      }
    }
    
  }

  edit(dados) {
    this.editId = dados.id

    document.getElementById('name').value = dados.nome
    document.getElementById('email').value = dados.email
    document.getElementById('tel').value = dados.cel
    document.getElementById('city').value = dados.city

    document.querySelector('.btn-salvar').innerText = 'Atualizar'

    openModal()
  }
  
  readData() {
    const cliente = {
      id: this.id,
      nome: (document.getElementById('name').value),
      email: document.getElementById('email').value,
      cel: document.getElementById('tel').value,
      city: document.getElementById('city').value
    }

    return cliente;
  }

  populaTable(arr) {
    const bodyTable = document.querySelector('.body')
    bodyTable.innerText = ''

    for(let obj in arr) {
      const {id,nome, email, cel, city} = arr[obj]
      
      const tr = bodyTable.insertRow()
      const tdId = tr.insertCell()
      const tdName = tr.insertCell()
      const tdEmail = tr.insertCell()
      const tdCel = tr.insertCell()
      const tdCity = tr.insertCell()
      const tdBtn = tr.insertCell()
      const btnOne = document.createElement('button')
      const btnTwo = document.createElement('button')

      btnOne.classList.add('btn', 'btn-editar')
      btnTwo.classList.add('btn', 'btn-excluir')
      btnOne.textContent = 'Editar'
      btnOne.setAttribute('onclick', 'cliente.edit('+ JSON.stringify(this.arr[obj]) +')')
      btnTwo.textContent = 'Excluir'
      btnTwo.setAttribute('onclick',`cliente.remove('${nome}')`)

      tdId.innerText = id
      tdName.innerText = nome
      tdEmail.innerText = email
      tdCel.innerText = cel
      tdCity.innerText = city
      
      tdBtn.classList.add('btn-group')
      tdBtn.appendChild(btnOne)
      tdBtn.appendChild(btnTwo)
    }
  }

  cancel() {
    this.clearInputs()

    document.getElementById('btn-salvar').innerText = 'Salvar'
    this.editId = null
    closeModal()
  }

  validateFields(field){
    let msg = ''

    if(field.nome == '') {
      msg += '- Informe o nome do cliente. \n'
    }

    if(field.email == '') {
      msg += '- Informe o email do cliente. \n'
    }

    if(field.cel == '') {
      msg += '- Informe o telefone do cliente. \n'
    }

    if(field.city == '') {
      msg += '- Informe a cidade do cliente. \n'
    }
    

    if(msg !== '') {
      alert(msg)

      return false
    }

    return true
  }

  clearInputs() {
    const inputs = document.querySelectorAll('input')

    for(let input of inputs){
      input.value = ''
    }
  }
}

const cliente = new Cliente()
