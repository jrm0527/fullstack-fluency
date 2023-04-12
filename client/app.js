$("#show-tasks").on("click", showTasks);
$("#add-tasks").on("click", addTask);

function showTasks() {
  $("#task-table").empty();
  const inputName = $("<th>").attr("id", "task-name-header").text("Task Name");
  const checkbox = $("<th>").attr("id", "task-checkbox-header");
  const save = $("<th>").attr("id", "task-save-header");
  const tr = $("<tr>").append(inputName, checkbox, save);
  $("#task-table").append(tr);
  $.get(`http://localhost:3000/api/tasks`, (data) => {
    for (let i = 0; i < data.length; i++) {
      setupTable(data[i]);
    }
  });
}

function setupTable(task) {
  const inputName = $('<input type="text">')
    .addClass("name-text")
    .val(task.task);
  const nameTd = $("<td>").append(inputName);
  const checkbox = $('<input type="checkbox">').addClass("task-checkbox");
  checkbox.prop("checked", task.complete);
  checkbox.on("click", function () {
    const update = { complete: checkbox.is(":checked") };
    $.ajax({
      url: `http://localhost:3000/api/tasks/${task.id}`,
      type: "PATCH",
      data: JSON.stringify(update),
      contentType: "application/json",
      success: function (result) {
        console.log("Success");
        // showTasks();
      },
    });
  });

  const checkTd = $("<td>").append(checkbox);
  const save = $("<button>").addClass("task-buttons").text("Save");
  save.on("click", function () {
    const update = { task: inputName.val() };
    $.ajax({
      url: `http://localhost:3000/api/tasks/${task.id}`,
      type: "PATCH",
      data: JSON.stringify(update),
      contentType: "application/json",
      success: function (result) {
        console.log("Success");
        showTasks();
      },
    });
  });
  const saveTd = $("<td>").append(save);
  const tr = $("<tr>").append(nameTd, checkTd, saveTd);
  $("#task-table").append(tr);
}

function setupTable(task) {
  const inputName = $('<input type="text">')
    .addClass("name-text")
    .val(task.task);
  const nameTd = $("<td>").append(inputName);
  const checkbox = $('<input type="checkbox">').addClass("task-checkbox");
  checkbox.prop("checked", task.complete);
  checkbox.on("click", function () {
    const update = { complete: checkbox.is(":checked") };
    $.ajax({
      url: `http://localhost:3000/api/tasks/${task.id}`,
      type: "PATCH",
      data: JSON.stringify(update),
      contentType: "application/json",
      success: function (result) {
        console.log("Success");
        // showTasks();
      },
    });
  });

  const checkTd = $("<td>").append(checkbox);
  const save = $("<button>").addClass("task-buttons").text("Save");
  save.on("click", function () {
    const update = { task: inputName.val() };
    $.ajax({
      url: `http://localhost:3000/api/tasks/${task.id}`,
      type: "PATCH",
      data: JSON.stringify(update),
      contentType: "application/json",
      success: function (result) {
        console.log("Success");
        showTasks();
      },
    });
  });
  const saveTd = $("<td>").append(save);
  const tr = $("<tr>").append(nameTd, checkTd, saveTd);
  $("#task-table").append(tr);
}
