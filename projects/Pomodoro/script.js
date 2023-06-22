let timerInterval;
let minutes;
let seconds;
let isTimerRunning = false;
let workTime = document.getElementById('work-time');
let shortBreakTime = document.getElementById('short-break-time');
let longBreakTime = document.getElementById('long-break-time');
let todoList = document.getElementById('todo-list');
let newTaskInput = document.getElementById('new-task-input');

function startTimer() {
  if (!isTimerRunning) {
    minutes = parseInt(workTime.value);
    seconds = 0;
    timerInterval = setInterval(updateTimer, 1000);
    isTimerRunning = true;
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
}

function resetTimer() {
  clearInterval(timerInterval);
  isTimerRunning = false;
  minutes = parseInt(workTime.value);
  seconds = 0;
  document.getElementById('timer').textContent = formatTime(minutes, seconds);
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
        <button onclick="updateTask(${taskId})">Update</button>
        <button onclick="removeTask(${taskId})">Remove</button>
      </div>
    `;
    todoList.appendChild(taskItem);
    newTaskInput.value = '';
  }
}

function updateTask(taskId) {
  const taskInput = document.querySelector(`#${taskId} + .task-input`);
  if (taskInput) {
    taskInput.disabled = !taskInput.disabled;
    taskInput.classList.toggle('disabled');
  }
}

function removeTask(index) {
  todoList.removeChild(todoList.children[index]);
}




function getCheckedTasks() {
  const checkedTasks = [];
  const checkboxes = document.querySelectorAll('.task-actions input[type="checkbox"]');
  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      checkedTasks.push(checkbox.id);
    }
  });
  return checkedTasks;
}
