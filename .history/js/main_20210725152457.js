var staffManager = new StaffManager();

new Validator("#formQLNV");

document.querySelector("#btnThem").addEventListener("click", function () {
  updateForm();
  removeMessage();
  callModal("Thêm nhân viên", false, 1);
})

function updateForm() {
  var inputs = document.querySelectorAll("[name][rulse]");
  var lengthInputs = inputs.length;
  for (var i = 0; i < lengthInputs; i++) {
    inputs[i].value = '';
  }
}

function removeMessage() {
  var inputs = document.querySelectorAll("[name][rulse]");
}