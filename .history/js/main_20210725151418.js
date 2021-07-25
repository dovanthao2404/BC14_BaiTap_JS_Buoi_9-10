var staffManager = new StaffManager();
new Validtor("#formQLNV")
staffManager.start();
var pwdPage = 1;
showListStaff(staffManager.listStaff);


document.querySelector("#btnThem").addEventListener("click", function () {
  callModal("Thêm nhân viên", false, 1);
  updateForm();
})
document.querySelector("#btnThemNV").addEventListener("click", handleAddStaff);
document.querySelector("#tableDanhSach").addEventListener("click", function (event) {
  delegationTable(event);
})

function handleAddStaff() {
  var validation = new Validtor("#formQLNV");
  var data = validation.getData();
  if (Object.keys(data).length !== 0) {
    var dataStaff = [];
    var count = 0;
    for (var key in data) {
      dataStaff[count] = data[key]
      count++;
    }
    var newStaff = new Staff(...dataStaff);
    staffManager.addStaff(newStaff);
    showListStaff(staffManager.listStaff);
    updateForm();
  }

}


document.querySelector("#ulPhanTrang").addEventListener("click", function (event) {
  if (event.target.id.includes("page")) {
    var id = event.target.id.split("-");
    pwdPage = id[1];
    showListStaff(staffManager.listStaff);
  }
})

function showListStaff(staffManager) {
  var tableDanhSach = document.getElementById("tableDanhSach");
  var ulPagination = document.getElementById("ulPhanTrang");
  ulPagination.innerHTML = '';
  var totalStaff = staffManager.length;
  var row = 4;
  var totalPages = Math.ceil(totalStaff / row);
  var html = "";
  var htmlPagination = "";


  for (var i = 1; i <= totalPages; i++) {
    htmlPagination += `<li class="page-item"><a class="page-link" href="#" id="page-${i}">${i}</a></li>`
  }
  ulPagination.innerHTML = htmlPagination;

  var startPage = (pwdPage - 1) * row
  var endPage = pwdPage * row;
  if (totalStaff < endPage) {
    endPage = totalStaff;
  }

  for (var i = startPage; i < endPage; i++) {
    html += `
    <tr>
    <th>${staffManager[i].account}</th>
    <th>${staffManager[i].fullName}</th>
    <th>${staffManager[i].email}</th>
    <th>${staffManager[i].startingDate}</th>
    <th>${staffManager[i].position}</th>
    <th>${staffManager[i].salary}</th>
    <th>${staffManager[i].classification}</th>
    <th>
    <button class="btn btn-danger" data-action="delete" data-account="${staffManager[i].account}" >Xóa</button>
    <button class="btn btn-warning" data-action="change" data-account="${staffManager[i].account}" data-toggle="modal" data-target="#myModal">Sửa</button>
    </th>
  </tr>
    `
  }
  tableDanhSach.innerHTML = html;
}

function callModal(modalTitle, readOnly, type) {
  document.querySelector("#header-title").innerText = modalTitle;
  if (readOnly) {
    document.querySelector("#tknv").setAttribute("disabled", "");
  } else {
    document.querySelector("#tknv").removeAttribute("disabled");
  }
  if (type === 1) {
    updateForm();
    removeMessage();
    document.querySelector("#btnThemNV").style.display = "block";
    document.querySelector("#btnCapNhat").style.display = "none";
  } else {
    removeMessage()
    document.querySelector("#btnThemNV").style.display = "none";
    document.querySelector("#btnCapNhat").style.display = "block";
  }
}

function updateForm(Staff) {
  var inputs = document.querySelectorAll("[name][rules]")

  for (var i = 0; i < inputs.length; i++) {
    if (inputs[i].name !== "ngaylam" && !Staff) {
      inputs[i].value = "";
    }
    if (Staff) {
      inputs[i].value = Staff.arrayProperties[i];
    }
  }
}

/**
 *
 * @param {Xóa thông báo lỗi}
 */
function removeMessage() {
  var listMessage = document.querySelectorAll(".form-message");

  Array.from(listMessage).forEach(function (message) {
    message.innerHTML = ''
  })

}

function delegationTable(event) {
  var account = event.target.getAttribute("data-account");
  var action = event.target.getAttribute("data-action");
  if (action === "change") {
    callModal("Sửa nhân viên", true, 2);
    var staff = staffManager.listStaff.find(function (staff) {
      return staff.account == account;
    })
    updateForm(staff);
    document.querySelector("#btnCapNhat").addEventListener("click", function () {

      handleUpdate(staff.account);
      showListStaff(staffManager.listStaff);
    })
  }

  if (action === "delete") {
    staffManager.removeStaff(account);
    pwdPage = 1;
    showListStaff(staffManager.listStaff);
  }
}


// function handleUpdate(account) {
//   var validation = new Validtor("#formQLNV");
//   var data = validation.getDataUpdate();
//   var newStaff;
//   if (Object.keys(data).length !== 0) {
//     var dataStaff = [];
//     var count = 0;
//     for (var key in data) {
//       dataStaff[count] = data[key]
//       count++;
//     }
//     newStaff = new Staff(account, ...dataStaff);
//   }
//   if (newStaff) {
//     console.log(staffManager.listStaff)
//     var oldStaff = staffManager.listStaff.find(function (staff) {
//       if (staff.account === account) {
//         return staff;
//       }
//     })
//     if (oldStaff) {
//       staffManager.updateStaff(newStaff);
//       newStaff.calculationOfSalary();
//       newStaff.staffAssessment();
//     }
//   }
// }

function handleUpdate(account) {
  var validation = new Validtor("#formQLNV");
  var data = validation.getDataUpdate();
  var newStaff;
  if (Object.keys(data).length !== 0) {
    var dataStaff = [];
    var count = 0;
    for (var key in data) {
      dataStaff[count] = data[key]
      count++;
    }
    newStaff = new Staff(account, ...dataStaff);
  }
  staffManager.updateStaff(newStaff, account);
}
