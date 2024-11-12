import { Todo } from './todo';

export // src/modules/project.js
// src/modules/project.js
class Project {
    constructor(title) {
        this.title = title;
        this.todos = [];
    }

    addTodo(todo) {
        this.todos.push(todo);
    }

    deleteTodo(index) {
        this.todos.splice(index, 1);
    }
}

// Function to create a new project
export const createProject = (title) => {
    return new Project(title);
};

// Function to delete a project
export const deleteProject = (index) => {
    projects.splice(index, 1);
};

// Function to get all projects
export const getAllProjects = (projects) => {
    return projects;
};
