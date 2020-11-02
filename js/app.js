// State
let todos = [];
let todosrename = [];
// 요소 찾기

const $todos = document.querySelector('.todos');
const $inputTodo = document.querySelector('.input-todo');
const $completeAll = document.querySelector('.complete-all');
const $completedTodos = document.querySelector('.completed-todos');
const $activeTodos = document.querySelector('.active-todos');
const $btn = document.querySelector('.btn');
const $nav = document.querySelector('.nav');

// 서버 데이터
const fetchTodos = () => {
  todos = [
    { id: 1, content: 'HTML', completed: false },
    { id: 2, content: 'CSS', completed: false },
    { id: 3, content: 'Javascript', completed: false },
  ].sort((todo1 , todo2) => todo2.id - todo1.id);
  render(todos);
};

// 함수

const render = (todoy) => {
  let html = '';
  todoy.forEach(todo => {
    html += ` <li id="${todo.id}" class="todo-item">
   <input id="ck-${todo.id}" class="checkbox" type="checkbox" ${todo.completed ? 'checked' : ""}>
   <label for="ck-${todo.id}">${todo.content}</label>
   <i class="remove-todo far fa-times-circle"></i>
 </li> `;
  }
);
 $todos.innerHTML = html;
 countFilterActive();
};

// onload

window.onload = () => fetchTodos();

// id 최대값

const maxId = () => {
 return todos.length ? Math.max(...todos.map(todo => todo.id))+1 : 1;
}

// clear completed 체크 갯수

const countFilter = () => {
  const count = todos.filter(todo => todo.completed === true).length;
  $completedTodos.textContent = count;
}
// item left
const countFilterActive = () => {
  const count = todos.filter(todo => todo.completed !== true).length;
  $activeTodos.textContent = count;
}

// 인풋 이벤트
$inputTodo.onkeyup = e => {
  if (e.key !== 'Enter' || $inputTodo.value === '') return;
  todos = [{id: maxId(), content: $inputTodo.value, completed: false}, ...todos];
  render(todos)
  $inputTodo.value = '';
};

// 체크 박스 이벤트(todos 변경)
$todos.onchange = e => {
  todos = todos.map(todo => todo.id === +e.target.parentNode.id 
    ? {...todo, completed: !todo.completed} : todo
  );
  countFilter();
  countFilterActive();
};

// remove
$todos.onclick = e => {
  if (!e.target.matches('.todos > li > .remove-todo')) return;
  console.log(e.target.parentNode.id);
  todos = todos.filter(todo => todo.id !== +e.target.parentNode.id)
  render(todos)
};
// 모두 선택 모두 선택 해제

$completeAll.onchange = e => {
  console.log(e.target);
 todos = todos.map(todo => {
    return  e.target.checked ? {...todo, completed: true} : {...todo, completed: false} 
  });
  render(todos)
  countFilter();
  countFilterActive();
};

// clear completed 누르면 클릭 된거 삭제
$btn.onclick = e => {
  todos = notCompleted();
  render(todos)
  countFilter();
};

const notCompleted = () => todos.filter(todo => todo.completed !== true);
const checkCompleted = () => todos.filter(todo => todo.completed === true);



// Active Completed(체크 안한것)
const $li = document.querySelectorAll('.nav > li');

$nav.onclick = e => {
  [...$li].forEach(li => li.classList.remove('active'));
  e.target.classList.toggle('active');
  console.log(e.target.id)
  activeClick(e); 
  if (e.target.id === 'all') { 
    render(todos);
  }else {
    render(todosrename);
  }
  
};

const activeClick = (e) => {
   e.target.id === 'active' ? todosrename = notCompleted() 
  : e.target.id === 'completed' ? todosrename = checkCompleted() : '';
}