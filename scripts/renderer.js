let table = $("#add-row").DataTable({
  columns: [
    { title: "Id", data: "id" },
    { title: "First Name", data: "firstname" },
    { title: "Last Name", data: "lastname" },
    {
      title: "Action",
      render: function (data, type, row) {
        return `<div class="btn-group"> <button type="button" onclick="btnDelete(${row.id})"  data-id="${row.id}" class="btn btn-danger" >Delete</button></div>`;
      },
    },
  ],
  pageLength: 5,
});

function btnDelete(id) {
  deletePerson(id);
  loadPersonToTable(table);
}

async function deletePerson(id) {
  let person = { id: id };
  return await Person.deletePerson(person);
}

async function addPerson(person) {
  return await Person.addPerson(person);
}

async function loadPersonToTable(table) {
  await Person.getAllPerson().then((_person) => {
    table.clear();
    table.rows.add(_person);
    table.draw();
  });
}

$(document).ready(function () {
  loadPersonToTable(table);

  $("#frmPerson").submit(function (e) {
    e.preventDefault();
    var data = {};
    $(this)
      .serializeArray()
      .map(function (x) {
        data[x.name] = x.value;
      });

    addPerson(data)
      .then((res) => {
        // console.log("result add: ", res);
        // if(){}
        loadPersonToTable(table);
      })
      .catch((err) => console.error(err));

    $(this).trigger("reset");
    $("#addRowModal").modal("hide");
  });
});
