// 유저는 할일을 추가할 수 있다.
// 각 할일에 삭제와 체크버튼이 있다.
// 삭제버튼을 클릭하면 할일이 리스트에서 삭제된다.
// 체크버튼을 누르면 할일이 끝난것으로 간주하고 밑줄이간다.
// 끝난 할일은 되돌리기 버튼을 클릭하면 다시 되돌릴 수 있다.
// 탭을 이용해 아이템들을 상태별로 나누어서 볼 수 있다.
// 모바일 버전에서도 확인할 수 있는 반응형 웹이다


let taskInput = document.getElementById("task-input")
let addButton = document.getElementById("add-btn")

addButton.addEventListener("click", addTask)

// tab 밑줄 로직
let tabs = document.querySelectorAll(".task-tabs div")
let mode = "all-task"
let filterList = []  // 전역변수로 할당

for(let i = 1; i < tabs.length; i++) {
    tabs[i].addEventListener("click", function(e) {filter(e)})
}

function filter(e) {
  mode = e.target.id;
  filterList = []; // 탭을 누를 때마다 초기화를 하여 UI에 중복을 막음

  // document.getElementById("underline").style.width =
  //   e.target.offsetWidth + "px";                        // width, height 역시 비슷한 로직
  // document.getElementById("underline").style.height =
  //   e.target.offsetWidth + "px";
  if(e.target.id == "all-task") {
    document.getElementById("underline").style.left = e.target.offsetLeft+1 + "px";
     } else if(e.target.id == "ongoing-task") {
        document.getElementById("underline").style.left = e.target.offsetLeft+20 + "px";
     } else if(e.target.id == "done-task") {
        document.getElementById("underline").style.left = e.target.offsetLeft+9 + "px";
     } // 언더바 로직

  console.log("클릭댐", e.target.id); // 클릭 시, 클릭 된 div의 id 출력

  if (mode == "all-task") {
    render();
  } else if (mode == "ongoing-task") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete == false) {
        filterList.push(taskList[i]);
      }
    }
    render();
  } else if (mode == "done-task") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete == true) {
        filterList.push(taskList[i]);
      }
    }
    render();
  }
}


let taskList = []

// + 버튼을 누르면 실행
function addTask() {

    let task = {
        // 유니크한 아이디 할당하는 법
        // google에 generate random id javascript 검색
        id: randomIdGenerator(),
        taskContent: taskInput.value,
        isComplete: false          // 객체형으로 만들어 체크박스에 활용
    }

    taskList.push(task)
    render()
}

// task Input창에 focus시, 초기화
taskInput.addEventListener('focus', disappearInput)
function disappearInput() {
  taskInput.value = ""
}

// // 엔터를 눌러도 Add
function enterTask() {
    addTask()
    taskInput.value = ""
}

// task List 를 그리는 함수
function render() {
    let list = []
    
    if(mode == "all-task") {
        list = taskList
    } else if(mode == "ongoing-task") {
        list = filterList
    } else if(mode == "done-task") {
        list = filterList
    }

    let resultHtml = "";
    for (let i = 0; i < list.length; i++) {
      if (list[i].isComplete == true) {
        resultHtml += `<div class="task">
            <div class="task-done">
                ${list[i].taskContent}
            </div>
            <div>
                <button class="check-btn" onClick="checkTask('${list[i].id}')">🟢</button>
                <button class="delete-btn" onClick="deleteTask('${list[i].id}')">🗑</button>
            </div>
        </div>`
      } else {
        resultHtml += `<div class="task">
            <div class="task-container">
                ${list[i].taskContent}
            </div>
            <div>
                <button class="check-btn" onClick="checkTask('${list[i].id}')">🔴</button>
                <button class="delete-btn" onClick="deleteTask('${list[i].id}')">🗑</button>
            </div>
        </div>`
      }
    }

    document.getElementById("task-board").innerHTML = resultHtml
    console.log(taskList)
}

// check 버튼
function checkTask(id) {
    // 어떠한 아이템을 선택하는지 알려주는 코드
    for(let i=0; i < taskList.length; i++) {
        if(taskList[i].id == id) {
            taskList[i].isComplete = !taskList[i].isComplete  // true, false 왔다갔다
            break    // 찾았으면 다른 id는 볼 필요 없으므로 break
        }
    }
    render()
}

// random id 만드는 함수
function randomIdGenerator() {
    return '_' + Math.random().toString(36).substr(2, 9)
}

// delete 버튼
function deleteTask(id) {
    for(let i=0; i < taskList.length; i++) {
        if(taskList[i].id == id) {
            taskList.splice(i, 1)      // taskList의 id가 일치하는 i번째 요소 1개 삭제
            break
        }
    }
    render()
}