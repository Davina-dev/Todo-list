// - Modelo: Datos puros en memoria
// - Render: función que "pinta" el modelo en el DOM.
// Modelo
class TodoItem {
  constructor(what, done = false, id) {
    this.what = what,
    this.done = done,
    this.id = Date.now()
  }

  toggle() {
    this.done = !this.done
  }
}

let todoList = []; //bbdd


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
     
    //localStorage________________________________________________________
      //save
      const list = todoList;
      const listaString = JSON.stringify(list);
      localStorage.setItem('list', listaString);
        }
      //get
      const tasksJson = localStorage.getItem('list');
      console.log(JSON.parse(tasksJson))
      

}

function onItemClick(event) {
  // Para acceder al elemento clicado:
  // 1) this (si es una function)
  // 2) event.target
  const li = this
  const index = Number(li.getAttribute('x-data-index'))
  // 1) Modifico el modelo
  todoList[index].toggle()
  // 2) Pinto el modelo (todo)
  render()
 
}

function onItemDelete(event) {
  const div = event.target
  const li = div.parentElement
  const index = Number(li.getAttribute('x-data-index'))
  // 1) Modifico el modelo
  todoList.splice(index, 1)

  //delete locasStorage________________________________________________
  localStorage.removeItem(taskListElement[index])

  // 2) Pinto el modelo (todo)
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
  event.preventDefault() //evita comportamiento x defecto del formulario de enviar al resvidor (recargar)
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


