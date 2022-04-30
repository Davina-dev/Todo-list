// - Modelo: Datos puros en memoria
// - Render: función que "pinta" el modelo en el DOM.

// Modelo
class TodoItem {
  constructor(what, done = false) {
    this.what = what
    this.done = done
  }

  toggle() {
    this.done = !this.done
  }
}

let todoList = []

// View

const formElement = document.querySelector('form')
const taskListElement = document.getElementById('task-list')

// pinta el model en el DOM

const renderListItem = (index, todoItem) => {
  const li = document.createElement('li')

  const checkBox = document.createElement('input')
  checkBox.type = 'checkbox'
  checkBox.checked = todoItem.done

  const span = document.createElement('span')
  span.textContent = todoItem.what

  const div = document.createElement('div')
  div.textContent = '×'
  div.classList.add('delete')
  div.addEventListener('click', onItemDelete)

  li.append(checkBox, span, div)
  li.setAttribute('x-data-index', index)
  if (todoItem.done) {
    li.classList.add('checked')
  }

  li.addEventListener('click', onItemClick)
  return li
}

const render = () => {
  taskListElement.textContent = '' // Borra interior de taskListElement
  for (let i = 0; i < todoList.length; i++) {
    taskListElement.appendChild(renderListItem(i, todoList[i]))
  }
}

function onItemClick(event) {
  // Para acceder al elemento clicado:
  // 1) this (si es un function)
  // 2) event.target
  const li = this
  const index = Number(li.getAttribute('x-data-index'))
  // 1) Modifico el modelo
  todoList[index].toggle()
  // 2) Pinter el modelo (todo)
  render()
}

function onItemDelete(event) {
  const div = event.target
  const li = div.parentElement
  const index = Number(li.getAttribute('x-data-index'))
  // 1) Modifico el modelo
  todoList.splice(index, 1)
  // 2) Pinter el modelo (todo)
  render()
  // Consumir el click y que no llegue más arriba (en particular al <li>)
  event.stopPropagation()
}

const addTask = () => {
  const input = formElement.querySelector('input')
  if (input.value !== '') {
    // 1) Modifico modelo
    todoList.push(new TodoItem(input.value))
    input.value = '' // form.reset()
    // 2) Pintar el modelo
    render()
  }
}

formElement.addEventListener('submit', (event) => {
  event.preventDefault()
  addTask()
})

document.getElementById('delete-all').addEventListener('click', () => {
  todoList = []
  render()
})
document.getElementById('delete-checked').addEventListener('click', () => {
  todoList = todoList.filter((item) => !item.done)
  render()
})

render()
