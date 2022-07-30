"use strict";
// window.onload = new UncompletedTodos().loadTodos();
// Get the modal container
let modal = document.getElementById("myModal");
// Get the button that opens the modal
let getModalbtn = document.getElementById("getModalBtn");
// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];
// Element to append to-do to
let todoContainer = document.querySelector(".to-do-container");
// Form elements
let titleElement = document.getElementById("title");
let descriptionElement = document.getElementById("description");
let dateElement = document.getElementById("date");
let submitBtn = document.getElementById("submit");
// Icons
// When the user clicks on Add a task button, display the modal
getModalbtn.addEventListener("click", (e) => {
    modal.style.display = "block";
});
// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
};
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};
submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let title = titleElement.value;
    let description = descriptionElement.value;
    let date = dateElement.value;
    validateInput(title, description, date);
    let uncompletedTodo = new UncompletedTodos();
    uncompletedTodo.addTodo(title, description, date);
});
function validateInput(title, description, date) {
    if (!title || !description || !date) {
        alert("Please fill all fields!");
    }
    else {
        modal.style.display = "none";
    }
}
class UncompletedTodos {
    constructor() {
        this.uncompletedTodos = JSON.parse(localStorage.getItem("todos")) || [];
        // public getTodos() {
        //     this.uncompletedTodos = JSON.parse(localStorage.getItem("todos")) || [];
        //     let allTodos = this.uncompletedTodos;
        //      return allTodos;
        // }
    }
    // Add todo
    addTodo(title, description, date) {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();
        today = mm + '/' + dd + '/' + yyyy;
        // console.log(today)
        // alert("no todos");
        let todo = {
            todoId: Math.floor(Math.random() * 90000) + 10000,
            todoTitle: title,
            todoDescription: description,
            todoDate: date,
            completed: false,
            createdAt: today
        };
        this.uncompletedTodos.push(todo);
        //   Add to local storage
        localStorage.setItem("todos", JSON.stringify(this.uncompletedTodos));
        // Clear form
        titleElement.value = "";
        descriptionElement.value = "";
        dateElement.value = "";
        this.loadTodos();
        return true;
    }
    // load todos
    loadTodos() {
        this.uncompletedTodos = JSON.parse(localStorage.getItem("todos")) || [];
        // alert(this.uncompletedTodos.length)
        if (this.uncompletedTodos.length > 0) {
            todoContainer.innerHTML = " ";
            this.uncompletedTodos.forEach((todo) => {
                // todoContainer.innerHTML = todoMarkup;
                const div = document.createElement("div");
                div.setAttribute("id", `${todo.todoId}`);
                div.className = "to-do";
                let textDecoration;
                if (todo.completed === false) {
                    textDecoration = "line-through";
                }
                else {
                    textDecoration = "none";
                }
                div.innerHTML = `
                    <!-- Mark btn -->
                    <div class="mark-btn">
                    <ion-icon name="checkmark-circle-outline"></ion-icon>
                    </div>

                    <!-- To-do-details -->
                    <div class="to-do-details">
                        <!-- To-do-Title -->
                        <h4 style="text-decoration: ${textDecoration}">${todo.todoTitle}</h4>
                        <!-- To-do-description -->
                        <p style="text-decoration: ${textDecoration}">${todo.todoDescription}</p>
                        <!-- To-do-date -->
                        <div class="date" style="text-decoration: ${textDecoration}">
                            <!-- Calendar icon -->
                            <ion-icon name="calendar-outline"></ion-icon>
                            <!-- If to-do is overdue or not -->
                            <p>Overdue, ${todo.todoDate}</p>
                        </div>
                        </div>
                        
                        <!-- edit-delete div -->
                        <div class="edit-delete">
                        <!-- Edit btn -->

                        <div class="edit-btn">
                            <ion-icon name="create-outline"></ion-icon>
                        </div>

                        <!-- Delete btn -->
                        <div class="delete-btn">
                            <ion-icon name="trash-outline"></ion-icon>
                        </div>
                    </div>`;
                todoContainer.appendChild(div);
            });
        }
        else if (this.uncompletedTodos.length === 0) {
            // Fallback when no todos
            const noContentMarkup = `
            <div class="no-to-do-container">
                <img src="images/no-content.png" alt="" />
                <p>Nothing Here!!!</p>
            </div>
            `;
            todoContainer.innerHTML = noContentMarkup;
        }
    }
    // Mark complete
    markComplete(e) {
        let id = e.currentTarget.parentNode.id;
        this.uncompletedTodos = JSON.parse(localStorage.getItem("todos")) || [];
        this.uncompletedTodos.find((todo) => {
            // alert(todo.todoId)
            if (todo.todoId == id) {
                // alert(!todo.completed)
                let updated = Object.assign(Object.assign({}, todo), { completed: !todo.completed });
                this.uncompletedTodos.push(updated);
                // alert(updated.completed)
                this.uncompletedTodos.indexOf(todo);
                // alert(this.uncompletedTodos.indexOf(todo););
                this.uncompletedTodos.splice(this.uncompletedTodos.indexOf(todo), 1);
                //   Add to local storage
                localStorage.setItem("todos", JSON.stringify(this.uncompletedTodos));
                window.location.reload();
                // this.loadTodos();
            }
        });
    }
}
window.onload = new UncompletedTodos().loadTodos();
let markBtn = document.getElementsByClassName("mark-btn");
for (let i = 0; i < markBtn.length; i++) {
    markBtn[i].addEventListener("click", (e) => {
        // alert("Hi");
        let uncompletedTodos = new UncompletedTodos();
        uncompletedTodos.markComplete(e);
    });
}
let unComplete = document.getElementById("uncomplete");
let complete = document.getElementById("complete");
unComplete.addEventListener("click", (e) => {
    // Fallback when no todos
    const noContentMarkup = `
    <div class="no-to-do-container">
        <img src="images/no-content.png" alt="" />
        <p>Nothing Here!!!</p>
    </div>
    `;
    todoContainer.innerHTML = noContentMarkup;
});
complete.addEventListener("click", () => {
    // Fallback when no todos
    const noContentMarkup = `
    <div class="no-to-do-container">
        <img src="images/no-content.png" alt="" />
        <p>Nothing Here!!!</p>
    </div>
    `;
    todoContainer.innerHTML = noContentMarkup;
});
// // Fallback when no todos
// const noContentMarkup = `
// <div class="no-to-do-container">
//     <img src="images/no-content.png" alt="" />
//     <p>Nothing Here!!!</p>
// </div>
// `;
// // Create todo
// const todoMarkup: string = `
// <div class="to-do">
//     <!-- Mark btn -->
//     <div class="mark-btn">
//     <ion-icon name="checkmark-circle-outline"></ion-icon>
//     </div>
//     <!-- To-do-details -->
//     <div class="to-do-details">
//     <!-- To-do-Title -->
//     <h4>Go Shopping</h4>
//     <!-- To-do-description -->
//     <p>I will go shopping later</p>
//     <!-- To-do-date -->
//     <div class="date">
//         <!-- Calendar icon -->
//         <ion-icon name="calendar-outline"></ion-icon>
//         <!-- If to-do is overdue or not -->
//         <p>Overdue, Sat, July 23</p>
//     </div>
//     </div>
//     <!-- edit-delete div -->
//     <div class="edit-delete">
//     <!-- Edit btn -->
//     <div class="edit-btn">
//         <ion-icon name="create-outline"></ion-icon>
//     </div>
//     <!-- Delete btn -->
//     <div class="delete-btn">
//         <ion-icon name="trash-outline"></ion-icon>
//     </div>
//     </div>
// </div>
// `;
