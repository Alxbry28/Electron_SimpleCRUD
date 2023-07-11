var personTransaction = 1;

var table = $("#add-row").DataTable({
  columns: [
    { title: "Id", data: "id" },
    { title: "First Name", data: "firstname" },
    { title: "Last Name", data: "lastname" },
    {
      title: "Action",
      render: function (data, type, row) {
        return `<div class="form-button-action">
      <button
        type="button"
        data-toggle="tooltip"
        title=""
        onclick="btnEdit(${row.id})" 
        class="btn btn-link btn-primary btn-lg"
        data-original-title="Edit"
      >
        <i class="fa fa-edit"></i>
      </button>
      <button
        type="button"
        data-toggle="tooltip"
        title=""
        onclick="btnDelete(${row.id})"
        class="btn btn-link btn-danger"
        data-original-title="Remove"
      >
        <i class="fa fa-times"></i>
      </button>
    </div>`;
      
      },
    },
  ],
  pageLength: 5,
});

function btnDelete(id) {
  deletePerson(id);
  loadPersonToTable(table);
}

function btnEdit(id) {
  console.log("Edit " + id);
  let person = { id: id };

  console.log("Edit ", person);

  personTransaction = 2;

  $("#transaction").val(personTransaction);
  Person.findPerson(person).then((res) => {
    $("#transactionModalTitle").text("Edit");

    $("#personId").val(res.id);
    $("#inpFirstName").val(res.firstname);
    $("#inpLastName").val(res.lastname);
    $("#addRowModal").modal("show");
  });
}

async function updatePerson(person, id) {
  let where = { id: id };
  return await Person.updatePerson(person, where);
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

  $("#btnAddPerson").click(() => {
    personTransaction = 1;
    $("#frmPerson").trigger("reset");
    $("#transactionModalTitle").text("Add");
    $("#transaction").val(personTransaction);
  });

  $("#frmPerson").submit(function (e) {
    e.preventDefault();
    var data = {};
    $(this)
      .serializeArray()
      .map(function (x) {
        data[x.name] = x.value;
      });

    let person = {
      firstname: data.firstname,
      lastname: data.lastname,
    };

    console.log("data", data);
    if (data.transaction == 1) {
      console.log("add");
      addPerson(person)
        .then((res) => {
          // console.log("result add: ", res);
          // if(){}
          loadPersonToTable(table);
        })
        .catch((err) => console.error(err));
    } else if (data.transaction == 2) {
      let id = data.personId;

      console.log("update");
      updatePerson(person, id)
        .then((res) => {
          // console.log("result update: ", res);
          // if(){}
          loadPersonToTable(table);
        })
        .catch((err) => console.error(err));
    }

    $(this).trigger("reset");
    $("#addRowModal").modal("hide");
  });
});
