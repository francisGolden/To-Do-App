import './style.css';

const container = document.querySelector("#todo-container");
const submit = document.querySelector("#submit")
const modal = document.querySelector("#modal")
const openModal = document.querySelector(".open-button")
const closeModal = document.querySelector(".close-button")
const sidebar = document.querySelector("#sidebar")
let sidelabels;

class todo {
    constructor(title, description, dueDate, priority, label){
        this.title = title
        this.description = description
        this.dueDate = dueDate
        this.priority = priority
        this.label = label
    }
    
}

let arr = []
let item = {}
let itemJ;
let result;

const addItem = () => {
    item = new todo(
        form.title.value, 
        form.description.value, 
        form.dueDate.value,
        form.priority.value,
        form.label.value)
    arr.push(item)
    itemJ = JSON.stringify(item)
    localStorage.setItem(item.title, itemJ)
    result = localStorage.getItem("task")
    
    console.log(JSON.parse(result))
}

// sidebar
let labelTarget;
let rowTargets;
let taskTargets;
let taskTargetsSet;

const sidebarLogic = () => {
    sidebar.innerHTML = ""
    sidebar.innerHTML = "<div id='labelsAll'><b>Labels</b></div>"
    taskTargets = Array.from(document.querySelectorAll("#label-content"))

    // iterate through taskTargets array in order to update each element with each element's
    // textContent
    for (i=0;i<taskTargets.length;i++){
        taskTargets[i] = taskTargets[i].textContent
    }

    // create a set out of the new taskTargets in order to remove duplicates
    taskTargetsSet = [...new Set(taskTargets)]

    taskTargetsSet.forEach(tt=>{
        sidebar.innerHTML += `<div id="labelLink">${tt}</div>`
    })
}



sidebar.addEventListener("click", e=>{
    labelTarget = e.target
    console.log(labelTarget)
    if (labelTarget.matches("#labelLink") || labelTarget.matches("b")){
        rowTargets = document.querySelectorAll("#label-content")
        rowTargets.forEach(rt=>{
            if (rt.textContent == labelTarget.textContent) {
                
                rt.parentNode.parentNode.style.display = "grid"
            } else if (rt.textContent != labelTarget.textContent) {
                rt.parentNode.parentNode.style.display = "none"
        }   
            
        })
        if (labelTarget.matches("#sidebar b")) {
            
            let rows = document.querySelectorAll(".rowClass")
            rows.forEach(row=>{
                row.style.display = "grid"
            })
        }
    }
})


// DOM
const showItems = () => {
    
    let newRow = document.createElement("div")
    newRow.setAttribute("class", "rowClass")
    
    for (const property in item) {
        newRow.innerHTML += `<div class="colonnina" id="box-${property}">${property}<br><div id="${property}-content" class="box-contents">${item[property]}</div></div>`
    }

    newRow.innerHTML += `<button class="delete"><img id="deleteImg" src="/src/a76fb506077d2141063f0cd2e2cb514d.svg">`
    newRow.innerHTML += `<button class="edit" style="font-weight: bold" id="edit">Edit</button>`
    newRow.innerHTML += `<button id="expand" style="font-weight: bold">See description</button>`
    
    container.insertAdjacentElement("beforeend", newRow);

}



// Modals
openModal.addEventListener("click", () => {
    modal.showModal();
})

closeModal.addEventListener("click", ()=> {
    modal.close();
    
})




const resetForm = () => {
    form.title.value = ""
    form.description.value = ""
    form.dueDate.value = ""
    form.priority.value = ""
    form.label.value = ""
}

// edit task feature
const main = document.querySelector("#main")
let modal2 = document.querySelector("#modalEdit");
let target;
let storageCounterpart;

const editFunction = () => {
        main.addEventListener("click", e=>{
            
            target = e.target
            
            if (target.matches("#edit")) {
                
                let title = target.parentNode.querySelector("#box-title .box-contents")
                let description = target.parentNode.querySelector("#box-description .box-contents")
                let dueDate = target.parentNode.querySelector("#box-dueDate .box-contents")
                let priority = target.parentNode.querySelector("#box-priority .box-contents")
                let label = target.parentNode.querySelector("#box-label .box-contents")

                modal2.showModal();
                
                formEdit.titleEdit.value = title.textContent
                formEdit.descriptionEdit.value = description.textContent
                formEdit.dueDateEdit.value = dueDate.textContent
                formEdit.priorityEdit.value = priority.textContent
                formEdit.labelEdit.value = label.textContent

                storageCounterpart = localStorage.getItem(formEdit.titleEdit.value)
            }
            
        })
        
}

editFunction()

let edita = modal2.querySelector("#submitEdit")
let i;
let localstor;
let toDelete;

edita.addEventListener("click", e=>{

    let title = target.parentNode.querySelector("#box-title .box-contents")
    let description = target.parentNode.querySelector("#box-description .box-contents")
    let dueDate = target.parentNode.querySelector("#box-dueDate .box-contents")
    let priority = target.parentNode.querySelector("#box-priority .box-contents")
    let label = target.parentNode.querySelector("#box-label .box-contents")
    
    title.textContent = formEdit.titleEdit.value;
    
    // update the values of the stored task as well
    localstor = JSON.parse(storageCounterpart)

    localstor.title = formEdit.titleEdit.value;

    description.textContent = formEdit.descriptionEdit.value;
    localstor.description = formEdit.descriptionEdit.value;

    dueDate.textContent = formEdit.dueDateEdit.value;
    localstor.dueDate = formEdit.dueDateEdit.value

    priority.textContent = formEdit.priorityEdit.value;
    localstor.priority = formEdit.priorityEdit.value

    label.textContent = formEdit.labelEdit.value;
    localstor.label = formEdit.labelEdit.value
    toDelete = JSON.parse(storageCounterpart)
    localStorage.removeItem(toDelete.title)
    localStorage.setItem(formEdit.titleEdit.value, JSON.stringify(localstor))
    
    console.log(toDelete.title)
    
    
    modal2.close()

    // call sidebarLogic function so that the sidebar updates with the update of the task   
    sidebarLogic() 
    
})

let cancelEdit = modal2.querySelector("#cancelEdit")
cancelEdit.addEventListener("click", e=>{
    modal2.close()
})
let deleteTask;
let taskTitle;

const deleteTaskF = () => {
    deleteTask = document.querySelectorAll(".delete")
    sidelabels = document.querySelectorAll("#labelLink")
    deleteTask.forEach(task => {
        task.addEventListener("click", () => {
            task.parentNode.remove()
            taskTitle = task.parentNode.querySelector("#title-content").textContent
            localStorage.removeItem(taskTitle)
            // call sidebarLogic function so that the sidebar updates with the deletion of the task
            sidebarLogic()

           
        })
    })
}

// create task feature
submit.addEventListener("click", (e)=> {
    addItem()
    e.preventDefault();
    showItems();
    
    resetForm();
    sidebarLogic()
    
    deleteTaskF()
})

let cancel = document.querySelector("#cancel")
cancel.addEventListener("click", e=>{
    resetForm();
    modal.close();
})

// shrink and expand feature
const shrinkExpand = () => {
    main.addEventListener("click", e=>{
        target = e.target
        if (target.matches("#expand")){
            target.parentNode.style.transition = ".2s"
            target.style.backgroundColor = "#DB4C3F"
            target.style.color = "white"
            target.parentNode.style.height = "50vh"
            
            target.textContent = "Hide description"
            target.parentNode.querySelector("#box-description").style.display = "flex"
            target.parentNode.style.gridTemplateRows = "0.5fr 1fr 0.5fr 0.5fr 0.5fr"
            target.setAttribute("id", "shrink")
            
        } else if (target.matches("#shrink")) {
            target.parentNode.style.height = "40vh"
            target.style.backgroundColor = "#DB4C3F"
            target.style.color = "white"
            
            target.parentNode.querySelector("#box-description").style.display = "none"
            
            target.parentNode.style.gridTemplateRows = "0.25fr 0.3fr 0.3fr 0.3fr"
            target.setAttribute("id","expand")
            target.style.backgroundColor = "#4B7BE5"
            target.textContent = "See description"
        }
        
    })
}

shrinkExpand()

let risu = []

// localStorage functionality
window.addEventListener("load", e=>{
    if (localStorage.length>0) {
        for(let i=0; i<localStorage.length;i++){
            let key = localStorage.key(i)
            risu.push(localStorage.getItem(key))
            
        }
        risu.forEach(taska=>{
            taska = JSON.parse(taska)
            item = new todo(taska.title, taska.description, taska.dueDate, taska.priority, taska.label)
            arr.push(item)
        })

        console.log(arr)
        showStorageItems();
        
        resetForm();
        sidebarLogic()
        
        deleteTaskF()
    }

    
})


const showStorageItems = () => {
    arr.forEach(item=>{
        let newRow = document.createElement("div")
        newRow.setAttribute("class", "rowClass")
        
        for (const property in item) {
            newRow.innerHTML += `<div class="colonnina" id="box-${property}">${property}<br><div id="${property}-content" class="box-contents">${item[property]}</div></div>`
        }
    
        newRow.innerHTML += `<button class="delete"><img id="deleteImg" src="a76fb506077d2141063f0cd2e2cb514d.svg">`
        newRow.innerHTML += `<button class="edit" style="font-weight: bold" id="edit">Edit</button>`
        newRow.innerHTML += `<button id="expand" style="font-weight: bold">See description</button>`
        
        container.insertAdjacentElement("beforeend", newRow);
    })
}
