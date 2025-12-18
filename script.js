const button = document.getElementById('button_submit')
const input = document.getElementById('text-input')
let tasks = []

let savedTasks = localStorage.getItem('tasks')
if (savedTasks != null) {
	tasks = JSON.parse(savedTasks)
	tasks.forEach((task, index) => {
		if (!task.id) {
			task.id = 'old-' + Date.now() + '-' + index
		}
	})
	localStorage.setItem('tasks', JSON.stringify(tasks))
}

loadTasks()

function loadTasks() {
	const task_list = document.getElementById('task-list')
	task_list.innerHTML = ''

	for (let i = 0; i < tasks.length; i++) {
		let taskContainer = document.createElement('div')
		taskContainer.classList.add('task-item')
		let checkbox = document.createElement('input')
		checkbox.classList.add('task-checkbox')
		let taskText = document.createElement('span')
		taskText.classList.add('task-text')
		let deleteButton = document.createElement('button')
		deleteButton.classList.add('delete-btn')

		deleteButton.textContent = '×'
		checkbox.type = 'checkbox'

		taskText.textContent = tasks[i].text
		checkbox.checked = tasks[i].completed

		taskContainer.appendChild(deleteButton)
		taskContainer.appendChild(taskText)
		taskContainer.appendChild(checkbox)
		task_list.appendChild(taskContainer)

		let taskId = tasks[i].id

		checkbox.addEventListener('change', function () {
			let taskIndex = tasks.findIndex(task => task.id === taskId)
			if (taskIndex > -1) {
				tasks[taskIndex].completed = checkbox.checked
				localStorage.setItem('tasks', JSON.stringify(tasks))
			}
		})

		deleteButton.addEventListener('click', function () {
			let taskIndex = tasks.findIndex(task => task.id === taskId)
			if (taskIndex > -1) {
				tasks.splice(taskIndex, 1)
				localStorage.setItem('tasks', JSON.stringify(tasks))
			}
			taskContainer.remove()
		})
	}
}

button.addEventListener('click', function (event) {
	event.preventDefault()

	let taskTextValue = input.value
	if (!taskTextValue.trim()) return

	let taskContainer = document.createElement('div')
	taskContainer.classList.add('task-item')
	let checkbox = document.createElement('input')
	checkbox.classList.add('task-checkbox')
	let taskText = document.createElement('span')
	taskText.classList.add('task-text')
	let deleteButton = document.createElement('button')
	deleteButton.classList.add('delete-btn')

	deleteButton.textContent = '×'
	checkbox.type = 'checkbox'
	taskText.textContent = taskTextValue

	let newTaskId = Date.now()

	tasks.push({
		id: newTaskId,
		text: taskTextValue,
		completed: false,
	})
	localStorage.setItem('tasks', JSON.stringify(tasks))

	const task_list = document.getElementById('task-list')
	taskContainer.appendChild(deleteButton)
	taskContainer.appendChild(taskText)
	taskContainer.appendChild(checkbox)
	task_list.appendChild(taskContainer)

	input.value = ''

	checkbox.addEventListener('change', function () {
		let taskIndex = tasks.findIndex(task => task.id === newTaskId)
		if (taskIndex > -1) {
			tasks[taskIndex].completed = checkbox.checked
			localStorage.setItem('tasks', JSON.stringify(tasks))
		}
	})

	deleteButton.addEventListener('click', function () {
		let taskIndex = tasks.findIndex(task => task.id === newTaskId)
		if (taskIndex > -1) {
			tasks.splice(taskIndex, 1)
			localStorage.setItem('tasks', JSON.stringify(tasks))
		}
		taskContainer.remove()
	})
})