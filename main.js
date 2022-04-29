let taskList = [
  "lavar la ropa"
]

const formElement = document.querySelector('form')
const taskListElement = document.getElementById('task-list')

const addTask = () => {
  const input = formElement.querySelector('input')
  if (input.value != '') {
    const li = document.createElement('li')
    const checkBox = document.createElement('input');
    checkBox.type = "checkbox";
    const span = document.createElement('span');
    span.textContent = input.value;
    const div = document.createElement('div');
    div.textContent ="×";
    div.classList.add("delete");
    li.append(checkBox, span, div);
    taskListElement.appendChild(li);
    input.value = '';
  }
}

formElement.addEventListener('submit', (event) => {
  event.preventDefault()
  addTask()
})
