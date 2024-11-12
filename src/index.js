// src/index.js

let projects = [{
    name: "Default Project",
    todos: []
}];
let currentProjectIndex = 0;

// Select elements
const addProjectButton = document.getElementById('add-project');
const projectList = document.getElementById('project-list');
const addTodoButton = document.getElementById('add-todo');
const todoList = document.getElementById('todo-list');
const todoTitleInput = document.getElementById('todo-title');
const todoDescriptionInput = document.getElementById('todo-description');
const todoDueDateInput = document.getElementById('todo-dueDate');
const todoPrioritySelect = document.getElementById('todo-priority');

// Function to render projects
function renderProjects() {
    projectList.innerHTML = '';
    projects.forEach((project, index) => {
        const projectItem = document.createElement('li');
        projectItem.innerText = project.name;
        projectItem.addEventListener('click', () => {
            currentProjectIndex = index;
            renderTodos();
        });
        projectList.appendChild(projectItem);
    });
}

// Function to render todos for the current project
function renderTodos() {
    todoList.innerHTML = '';
    const currentProject = projects[currentProjectIndex];
    currentProject.todos.forEach(todo => {
        const todoItem = document.createElement('li');
        todoItem.classList.add(todo.priority);
        todoItem.innerHTML = `
            <span>${todo.title} - ${todo.dueDate}</span>
            <button class="delete-todo">Delete</button>
        `;
        todoList.appendChild(todoItem);
    });
}

// Add event listener for adding projects
addProjectButton.addEventListener('click', () => {
    const projectName = prompt("Enter project name:");
    if (projectName) {
        projects.push({ name: projectName, todos: [] });
        renderProjects();
    }
});

// Add event listener for adding todos
addTodoButton.addEventListener('click', () => {
    const title = todoTitleInput.value;
    const description = todoDescriptionInput.value;
    const dueDate = todoDueDateInput.value;
    const priority = todoPrioritySelect.value;

    if (title && dueDate) {
        const newTodo = { title, description, dueDate, priority };
        projects[currentProjectIndex].todos.push(newTodo);
        renderTodos();
        todoTitleInput.value = '';
        todoDescriptionInput.value = '';
        todoDueDateInput.value = '';
    }
});

// Event delegation for deleting todos
todoList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-todo')) {
        const todoItem = e.target.parentElement;
        const todoTitle = todoItem.querySelector('span').innerText.split(' - ')[0];
        projects[currentProjectIndex].todos = projects[currentProjectIndex].todos.filter(todo => todo.title !== todoTitle);
        renderTodos();
    }
});

// Initial render
renderProjects();
renderTodos();

// src/index.js

function saveToLocalStorage() {
    localStorage.setItem('projects', JSON.stringify(projects));
}

function loadFromLocalStorage() {
    const storedProjects = localStorage.getItem('projects');
    if (storedProjects) {
        projects = JSON.parse(storedProjects);
    }
}

// Load data from localStorage on initial load
loadFromLocalStorage();

// Add event listener for adding projects
addProjectButton.addEventListener('click', () => {
    const projectName = prompt("Enter project name:");
    if (projectName) {
        projects.push({ name: projectName, todos: [] });
        saveToLocalStorage();  // Save to localStorage
        renderProjects();
    }
});

// Add event listener for adding todos
addTodoButton.addEventListener('click', () => {
    const title = todoTitleInput.value;
    const description = todoDescriptionInput.value;
    const dueDate = todoDueDateInput.value;
    const priority = todoPrioritySelect.value;

    if (title && dueDate) {
        const newTodo = { title, description, dueDate, priority };
        projects[currentProjectIndex].todos.push(newTodo);
        saveToLocalStorage();  // Save to localStorage
        renderTodos();
        todoTitleInput.value = '';
        todoDescriptionInput.value = '';
    }
});

// Event delegation for deleting todos
todoList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-todo')) {
        const todoItem = e.target.parentElement;
        const todoTitle = todoItem.querySelector('span').innerText.split(' - ')[0];
        projects[currentProjectIndex].todos = projects[currentProjectIndex].todos.filter(todo => todo.title !== todoTitle);
        saveToLocalStorage();  // Save to localStorage
        renderTodos();
    }
});

// Initial render
renderProjects();
renderTodos();
