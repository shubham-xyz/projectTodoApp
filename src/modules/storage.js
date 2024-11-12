// src/modules/storage.js
export const saveToLocalStorage = (projects) => {
    localStorage.setItem('projects', JSON.stringify(projects));
};

export const loadFromLocalStorage = () => {
    const projectsData = localStorage.getItem('projects');
    return projectsData ? JSON.parse(projectsData) : [];
};
