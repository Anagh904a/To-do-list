document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('form2');
    const addTaskButton = document.querySelector('.btn-info');
    const allTabContent = document.getElementById('ex1-tabs-1').querySelector('ul');
    const activeTabContent = document.getElementById('ex1-tabs-2').querySelector('ul');
    const completedTabContent = document.getElementById('ex1-tabs-3').querySelector('ul');

    function createTaskElement(taskText, completed = false) {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item d-flex align-items-center border-0 mb-2 rounded';
        listItem.style.backgroundColor = '#f4f6f7';

        const checkbox = document.createElement('input');
        checkbox.className = 'form-check-input me-2';
        checkbox.type = 'checkbox';
        checkbox.checked = completed;

        const textNode = document.createElement('span');
        textNode.textContent = taskText;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'btn btn-danger btn-sm ms-2';
        deleteButton.addEventListener('click', () => {
            listItem.remove();
            updateTasks();
        });

        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                textNode.style.textDecoration = 'line-through';
                textNode.style.color = '#888';
                completedTabContent.appendChild(listItem);
            } else {
                textNode.style.textDecoration = 'none';
                textNode.style.color = 'inherit';
                activeTabContent.appendChild(listItem);
            }
            updateTasks();
        });

        listItem.appendChild(checkbox);
        listItem.appendChild(textNode);
        listItem.appendChild(deleteButton);

        return listItem;
    }

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === '') return;

        const listItem = createTaskElement(taskText);
        allTabContent.appendChild(listItem);
        taskInput.value = '';
        updateTasks();
    }

    function updateTasks() {
        const allTasks = Array.from(allTabContent.children);
        const activeTasks = Array.from(activeTabContent.children);
        const completedTasks = Array.from(completedTabContent.children);

        allTasks.forEach(task => {
            const checkbox = task.querySelector('input');
            if (checkbox.checked) {
                completedTabContent.appendChild(task);
            } else {
                activeTabContent.appendChild(task);
            }
        });
    }

    addTaskButton.addEventListener('click', (e) => {
        e.preventDefault();
        addTask();
    });

    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask();
    });
});