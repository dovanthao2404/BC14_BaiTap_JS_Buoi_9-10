var staffManager = new StaffManager();

new Validator("#formQLNV");

document.querySelector("#btnThem").addEventListener("click", function () {
  updateForm();
  removeMessage();
  callModal("Thêm nhân viên", false, 1);
})

function updateForm() {
  var inputs = document.querySelectorAll("[name][rulse]");
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].value = '';
  }
}