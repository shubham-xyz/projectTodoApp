// Array to store projects
let projects = [];

// Function to add a new project
function addProject(name) {
    const project = {
        name: name,
        todos: []
    };
    projects.push(project);
    saveToLocalStorage();
    displayProjects();
}

// Function to display all projects
function displayProjects() {
    const projectList = document.getElementById('project-list');
    projectList.innerHTML = '';
    
    projects.forEach((project, index) => {
        const projectItem = document.createElement('li');
        projectItem.textContent = project.name;
        projectItem.addEventListener('click', () => {
            displayTodos(index);
            document.getElementById('project-title').textContent = project.name;
        });
        projectList.appendChild(projectItem);
    });
}

// Function to add a new todo to a project
function addTodoToProject(projectIndex, title, dueDate) {
    const todo = {
        title: title,
        dueDate: dueDate
    };
    projects[projectIndex].todos.push(todo);
    saveToLocalStorage();
    displayTodos(projectIndex);
}

// Function to display todos for a project
function displayTodos(projectIndex) {
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';

    projects[projectIndex].todos.forEach(todo => {
        const todoItem = document.createElement('li');
        todoItem.textContent = `${todo.title} - Due: ${todo.dueDate}`;
        todoList.appendChild(todoItem);
    });
}

// Save projects to localStorage
function saveToLocalStorage() {
    localStorage.setItem('projects', JSON.stringify(projects));
}

// Load projects from localStorage
function loadFromLocalStorage() {
    const storedProjects = localStorage.getItem('projects');
    if (storedProjects) {
        projects = JSON.parse(storedProjects);
    }
    displayProjects();
}

// Event listeners for adding projects and todos
document.getElementById('add-project').addEventListener('click', () => {
    const projectName = prompt('Enter project name:');
    if (projectName) addProject(projectName);
});

document.getElementById('add-todo').addEventListener('click', () => {
    const projectTitle = document.getElementById('project-title').textContent;
    const projectIndex = projects.findIndex(project => project.name === projectTitle);

    if (projectIndex === -1) return;

    const todoTitle = prompt('Enter todo title:');
    const dueDate = prompt('Enter due date (YYYY-MM-DD):');
    if (todoTitle && dueDate) {
        addTodoToProject(projectIndex, todoTitle, dueDate);
    }
});

// Load saved projects when page loads
loadFromLocalStorage();
