var staffManager = new StaffManager();

new Validator("#formQLNV");

document.querySelector("#btnThem").addEventListener("click", function () {
  callModal("Thêm nhân viên", false, 1);
  updateForm();
})