// 変数の定義
const form = document.getElementById("form");
const input = document.getElementById("input");
const ul = document.getElementById("ul");

const todos = JSON.parse(localStorage.getItem("todos"));

// To Doに入力していたら*する。
if (todos) {
    todos.forEach((todo) => {
        add(todo);
    });
}

form.addEventListener("submit", function (event) {
    event.preventDefault();
    add();
});

/*
    関数"todo"に関して定義
*/ 
function add(todo) {
    // デフォルトで"todoText"に入力値を適用
    let todoText = input.value;

    // 何をさせる処理だっけ...?忘れた。
    if (todo) {
        todoText = todo.text;
    }

    if (todoText) {
        const li = document.createElement("li");

        li.innerText = todoText;
        li.classList.add('list-group-item')

        if (todo && todo.completed) {
            li.classList.add("text-decoration-line-through");
        }

        // 右クリックされたときの動作を定義（To Doを削除）
        li.addEventListener("contextmenu", function (event) {
            event.preventDefault();
            li.remove();
            saveData();
        });

        // 左クリックされたときの動作を定義（To Doを完了）
        li.addEventListener("click", function () {
                li.classList.toggle("text-decoration-line-through");
                saveData();
        });

        ul.appendChild(li);
        input.value = "";
        saveData();
    }
}

/*
    関数"savedata"に関して定義
*/
function saveData() {
    const lists = document.querySelectorAll("li");
    const todos = [];

    // 保存するデータに関して定義
    lists.forEach((li) => {
        todos.push({
            text: li.innerText,
            completed: li.classList.contains("text-decoration-line-through"),
        });
    });

    // 定義したデータをローカルストレージにJSON形式で保存
    localStorage.setItem("todos", JSON.stringify(todos));
}
