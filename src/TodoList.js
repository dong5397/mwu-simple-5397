export default function TodoList({ $target, initialState }) {
  const $todoList = document.createElement("div");
  $target.appendChild($todoList);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $todoList.innerHTML = `
      <ul>
        ${this.state
          .map(
            (todo, index) =>
              `<li>
              
            <input type="checkbox" data-index="${index}" ${
                todo.checked ? "checked" : ""
              } />
            <span ${
              todo.checked ? 'style="text-decoration: line-through;"' : ""
            }>${todo.text}</span>
            <button class="delete-button" data-index="${index}">삭제</button>
          </li>`
          )
          .join("")}
      </ul>
    `;

    const $deleteButtons = $todoList.querySelectorAll(".delete-button");
    $deleteButtons.forEach(($button) => {
      $button.addEventListener("click", this.deleteButtonClick);
    });

    const $checkboxes = $todoList.querySelectorAll("input[type=checkbox]");
    $checkboxes.forEach((checkbox, index) => {
      checkbox.addEventListener("click", () => this.checkboxClick(index));
    });
  };

  this.deleteButtonClick = (e) => {
    const index = e.target.dataset.index;
    this.state.splice(index, 1);
    this.render();
  };

  this.checkboxClick = (index) => {
    const todoItem = this.state[index];

    if (todoItem) {
      todoItem.checked = !todoItem.checked;
      this.render();
    }
  };

  this.render();
}
