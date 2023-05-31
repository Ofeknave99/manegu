class Task {
  id: number;
  description: string;
  completed: boolean;

  constructor(description: string) {
    this.id = Math.floor(Math.random() * 1000);
    this.description = description;
    this.completed = false;
  }
}

class TaskManager {
  public tasks: Task[];

  constructor() {
    this.tasks = [];
    this.loadTasksFromLocalStorage();
  }

  addTask(description: string): void {
    this.tasks.push(new Task(description));
    this.updateLocalStorage();
  }

  deleteTask(id: number): void {
    let indexToDelete = this.tasks.findIndex((task: Task) => task.id === id);
    this.tasks.splice(indexToDelete, 1);
    this.updateLocalStorage();
  }

  updateTaskDescription(id: number, newDescription: string): void {
    let indexToUpdate = this.tasks.findIndex((task: Task) => task.id === id);
    this.tasks[indexToUpdate].description = newDescription;
    this.updateLocalStorage();
  }

  completeTask(id: number): void {
    let indexToUpdate = this.tasks.findIndex((task: Task) => task.id === id);
    this.tasks[indexToUpdate].completed = true;
    this.updateLocalStorage();
  }

  private loadTasksFromLocalStorage(): void {
    const tasksString = localStorage.getItem('tasks');
    if (tasksString) {
      this.tasks = JSON.parse(tasksString);
    }
  }

  private updateLocalStorage(): void {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
}

let manager = new TaskManager();

console.log(manager.tasks);

function showTasksInLists(): void {
  document.getElementById("active")!.innerHTML = "";
  document.getElementById("completed")!.innerHTML = "";

  for (let task of manager.tasks) {
    if (task.completed === false) {
      document.getElementById("active")!.innerHTML += `
     <div> <li class="list-group-item d-inline-block w-50">${task.description}</li> <span> <button class="btn btn-success" onclick="completeTask(${task.id})"><i class="fa-solid fa-check"></i></button> <button class="btn btn-primary" onclick="updateDescription(${task.id})"><i class="fa-solid fa-pen"></i></button> <button class="btn btn-danger" onclick="deleteTask(${task.id})"><i class="fa-solid fa-trash"></i></button></span> </div> `;
    } else {
      document.getElementById("completed")!.innerHTML += `
      <div> <li class="list-group-item d-inline-block w-50 text-decoration-line-through">${task.description}</li> <span> <button class="btn btn-success" disabled><i class="fa-solid fa-check-double"></i></button> <button class="btn btn-primary" disabled><i class="fa-solid fa-pen"></i></button> <button class="btn btn-danger" disabled><i class="fa-solid fa-trash"></i></button></span> </div> `;
    }
  }
}

showTasksInLists();

function completeTask(id: number): void {
  manager.completeTask(id);
  showTasksInLists();
}

function updateDescription(id: number): void {
  // prompt for new description
  let newDescription = prompt("Enter new description:");
  if (newDescription != null || newDescription !== "") {
    manager.updateTaskDescription(id, newDescription!);
    showTasksInLists();
  } else {
    alert("Sorry! Something went wrong");
  }
}

function deleteTask(id: number): void {
  // confirm "Are you sure?"
  if (confirm("Are you sure?")) {
    manager.deleteTask(id);
    showTasksInLists();
  }
}

function addNewTask(): void {
  let description = (document.getElementById("description") as HTMLInputElement).value;
  manager.addTask(description);
  (document.getElementById("description") as HTMLInputElement).value = "";
  showTasksInLists();
}
