/*
구현 로직

유저가 값 입력
+ 버튼 클릭, 할일 목록에 추가
delete 버튼을 누르면 할일 삭제
check 버튼 누르면 할일 완료되며 줄 그어짐
1. check 버튼 누르는 순간 true / false
2. true = 완료된 것으로 간주하고 밑줄 보여주기
3. false = 진행중인 것으로 간주하고 그대로 진행
진행중 탭을 누르면 언더바 이동
완료탭은 완료된 항목만, 진행중 탭은 진행중 항목만 표시
전부탭을 누르면 다시 전체 항목으로 복귀
*/

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div");
let taskList = []; // 할일을 추가할 배열 생성
let mode = "";
let filterList = [];

for (let i = 1; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function (event) {
    filter(event);
  });
}
console.log(tabs);

addButton.addEventListener("click", addTask);

function addTask() {
  let task = {
    id: randomIDGenerate(),
    taskContent: taskInput.value,
    isComplete: false,
  };
  list.push(task);
  console.log("list");
  render(); // 생성한 render 함수 사용
} // 객체 = 필요정보, 관련정보를 하나로 묶어주는 것

function render() {
  let list = [];
  if (mode == "all") {
    list = taskList;
  } else if (mode == "ongoing" || mode == "done") {
    list = filterList;
  }

  let resultHTML = "";
  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete == true) {
      resultHTML += `<div class="task">
        <div class="task-done">${list[i].taskContent}</div>
        <div>
          <button onclick="toggleComplete('${list[i].id}')">Check</button>
          <button onclick="deleteTask('${list[i].id}')">Delete</button>
        </div>
      </div>`; // 백틱 사용
    } else {
      resultHTML += `<div class="task">
        <div>${list[i].taskContent}</div>
        <div>
          <button onclick="toggleComplete('${list[i].id}')">Check</button>
          <button onclick="deleteTask('${list[i].id}')">Delete</button>
        </div>
      </div>`; // 백틱 사용
    }
  }

  document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList[i].isComplete = !taskList[i].isComplete; // !(Not) = 현재 값의 반대 값 불러옴 = 스위치처럼 왔다갔다하는 기능 구현 시 사용
      break;
    }
  }
  render();
  console.log(list);
}

// 버튼 click 이벤트 생성 방법 2개 = addEventListener / onclick

function deleteTask(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList.splice(i, 1);
      break;
    }
  }
  render();
}

function filter(event) {
  mode = event.target.id;
  filterList = [];

  if (mode == "all") {
    render();
  } else if (mode == "ongoing") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete == false) {
        filterList.push(taskList[i]);
      }
    }
    render();
  } else if (mode == "done") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete == true) {
        filterList.push(taskList[i]);
      }
    }
    render();
  }
  console.log(filterList);
}

function randomIDGenerate() {
  return "_" + Math.random().toString(36).substr(2, 9);
}
