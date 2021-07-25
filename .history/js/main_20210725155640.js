var staffManager = new StaffManager();
staffManager.start();
new Validator("#formQLNV");

document.querySelector("#btnThem").addEventListener("click", function () {
  updateForm();
  removeMessage();
  callModal("Thêm nhân viên", false, 1);
})
document.querySelector("#btnThemNV").addEventListener("click", handleAddStaff)

function handleAddStaff() {
  var validation = new Validator("#formQLNV");
  var data = validation.getData();

  if (Object.keys(data).length !== 0) {
    var dataStaff = [];
    var count = 0;
    for (var key in data) {
      dataStaff[count] = data[key];
      count++;
    }
    var staff = new Staff(...dataStaff)
    staffManager.addStaff(staff);
  }
}

function updateForm() {
  var inputs = document.querySelectorAll("[name][rules]");
  var lengthInputs = inputs.length;
  for (var i = 0; i < lengthInputs; i++) {
    if (inputs[i].getAttribute("rules").includes("date")) continue;
    inputs[i].value = '';
  }
}
function getParent(element, selector) {
  while (element.parentElement) {
    if (element.parentElement.matches(selector)) {
      return element.parentElement;
    }
    element = element.parentElement;
  }
}

function removeMessage() {
  var inputs = document.querySelectorAll("[name][rules]");
  var lengthInputs = inputs.length;
  for (var i = 0; i < lengthInputs; i++) {
    var formGroup = getParent(inputs[i], ".form-group");
    var messageElement = formGroup.querySelector(".form-message");
    messageElement.innerText = "";
  }
}

function callModal(title, readonly, type) {
  document.querySelector("#header-title").innerText = title;
  if (readonly) {
    document.querySelector("#tknv").setAttribute("disable", "");
  } else {
    document.querySelector("#tknv").removeAttribute("disable");
  }
  if (type === 1) {
    document.querySelector("#btnThemNV").style.display = "block";
    document.querySelector("#btnCapNhat").style.display = "none";
  } else {
    document.querySelector("#btnThemNV").style.display = "none";
    document.querySelector("#btnCapNhat").style.display = "block";
  }
}