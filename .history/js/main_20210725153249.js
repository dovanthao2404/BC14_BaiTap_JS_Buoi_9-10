var staffManager = new StaffManager();

new Validator("#formQLNV");

document.querySelector("#btnThem").addEventListener("click", function () {
  updateForm();
  removeMessage();
  callModal("Thêm nhân viên", false, 1);
})

function updateForm() {
  var inputs = document.querySelectorAll("[name][rules]");
  var lengthInputs = inputs.length;
  for (var i = 0; i < lengthInputs; i++) {
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
  }
}