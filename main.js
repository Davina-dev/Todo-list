const form = document.querySelector('form')
const taskList = document.getElementById('task-list')

const addTask = () => {
  const what = form.querySelector('input').value
  const li = document.createElement('li')
  li.textContent = what
  taskList.appendChild(li)
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  addTask();
})
