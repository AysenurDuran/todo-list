
const myList = document.querySelector('#list');
let tasks = []

function newElement() {
    const inputValue = document.querySelector("#task").value;
    if(inputValue != "" && inputValue.trim() !== ''){
        $(".success").toast("show");
        // li elementi oluşturma ve listeye ekleme
        const liDOM = document.createElement('li');
        liDOM.innerHTML = inputValue;
        myList.appendChild(liDOM);
        document.querySelector("#task").value="";
        tasks.push(inputValue)
        // Yapılacaklar listesini stringe dönüştür
        let tasksString = JSON.stringify(tasks);
        // Yapılacaklar listesini localStorage'a kaydet
        localStorage.setItem("tasks", tasksString);
        //li lerin içine span ekleme
        let span =document.createElement("span");
        span.className="close"
        span.textContent = 'X';
        liDOM.appendChild(span);
        span.addEventListener("click",() => {
            removeElement(liDOM);
        });
        liDOM.addEventListener("click" ,() => {
            if (liDOM.classList.contains("checked"))
                liDOM.classList.remove("checked");
            else
                liDOM.classList.add("checked");
                let tasksString = JSON.stringify(tasks);
                localStorage.setItem("tasks", tasksString);
        });
    }
    else{
        $(".error").toast("show");
    }     
};

function removeElement(item) {
    item.remove();
    tasks.splice(item, 1);
};

window.onload = function() {            
    let storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
        tasks.forEach((task) => {
        let liDOM = document.createElement("li");
        liDOM.textContent = task;
        let span = document.createElement("span");
        span.className = "close";
        span.textContent = "X";
        liDOM.appendChild(span);
        myList.appendChild(liDOM);
        span.addEventListener("click",() => {
            removeElement(liDOM);
        });

    liDOM.addEventListener("click" ,() => {
        if (liDOM.classList.contains("checked"))
            liDOM.classList.remove("checked");
        else
            liDOM.classList.add("checked");
            let tasksString = JSON.stringify(tasks);
            localStorage.setItem("tasks", tasksString);
        });
      });
    }
  };