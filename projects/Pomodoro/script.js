let timerInterval;
let minutes;
let seconds;
let isTimerRunning = false;
let workTime = document.getElementById('work-time');
let shortBreakTime = document.getElementById('short-break-time');
let longBreakTime = document.getElementById('long-break-time');
let todoList = document.getElementById('todo-list');
let newTaskInput = document.getElementById('new-task-input');
let startButton = document.getElementById('start-btn');
let stopButton = document.getElementById('stop-btn');
let resetButton = document.getElementById('reset-btn');

function startTimer() {
  if (!isTimerRunning) {
    minutes = parseInt(workTime.value);
    seconds = 0;
    timerInterval = setInterval(updateTimer, 1000);
    isTimerRunning = true;
    startButton.disabled = true;
    stopButton.disabled = false;
    resetButton.disabled = false;
  }
}

function updateTimer() {
  if (seconds === 0) {
    if (minutes === 0) {
      clearInterval(timerInterval);
      isTimerRunning = false;
      alert('Time is up!');
      if (getCheckedTasks().length > 0) {
        if (minutes % parseInt(shortBreakTime.value) === 0) {
          startBreakTimer(true);
        } else {
          startBreakTimer(false);
        }
      }
    } else {
      minutes--;
      seconds = 59;
    }
  } else {
    seconds--;
  }

  document.getElementById('timer').textContent = formatTime(minutes, seconds);
}

function startBreakTimer(isShortBreak) {
  if (!isTimerRunning) {
    minutes = isShortBreak ? parseInt(shortBreakTime.value) : parseInt(longBreakTime.value);
    seconds = 0;
    timerInterval = setInterval(updateTimer, 1000);
    isTimerRunning = true;
  }
}

function stopTimer() {
  clearInterval(timerInterval);
  isTimerRunning = false;
  startButton.disabled = false;
  stopButton.disabled = true;
  resetButton.disabled = false;
}

function resetTimer() {
  clearInterval(timerInterval);
  isTimerRunning = false;
  minutes = parseInt(workTime.value);
  seconds = 0;
  document.getElementById('timer').textContent = formatTime(minutes, seconds);
  startButton.disabled = false;
  stopButton.disabled = true;
  resetButton.disabled = true;
}

function formatTime(minutes, seconds) {
  let formattedMinutes = minutes.toString().padStart(2, '0');
  let formattedSeconds = seconds.toString().padStart(2, '0');
  return `${formattedMinutes}:${formattedSeconds}`;
}

function addTask() {
  const taskText = newTaskInput.value;
  if (taskText.trim() !== '') {
    const taskId = 'task' + todoList.children.length;
    const taskItem = document.createElement('li');
    taskItem.classList.add('todo-item');
    taskItem.innerHTML = `
      <div class="task-actions">
        <input type="checkbox" id="${taskId}">
        <input type="text" class="task-input" value="${taskText}">
        <button onclick="updateTask(${todoList.children.length})">Update</button>
        <button onclick="removeTask(${todoList.children.length})">Remove</button>
      </div>
    `;
    todoList.appendChild(taskItem);
    newTaskInput.value = '';
  }
}

function removeTask(index) {
  todoList.removeChild(todoList.children[index]);
}

function updateTask(index) {
  const taskInput = todoList.children[index].querySelector('.task-input');
  const taskId = 'task' + index;
  const labelFor = taskInput.value !== '' ? taskId : '';
  todoList.children[index].innerHTML = `
    <div class="task-actions">
      <input type="checkbox" id="${taskId}">
      <input type="text" class="task-input" value="${taskInput.value}">
      <button onclick="updateTask(${index})">Update</button>
      <button onclick="removeTask(${index})">Remove</button>
    </div>
  `;
  const label = todoList.children[index].querySelector('label');
  if (label) {
    label.setAttribute('for', labelFor);
  }
}

function getCheckedTasks() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  const checkedTasks = [];
  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      const taskIndex = parseInt(checkbox.id.replace('task', ''));
      checkedTasks.push(taskIndex);
    }
  });
  return checkedTasks;
}
