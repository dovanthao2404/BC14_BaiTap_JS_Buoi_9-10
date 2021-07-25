var staffManager = new StaffManager();

Validtor("#formQLNV")
document.querySelector("#btnThemNV").addEventListener("click", handleAddStaff)

function handleAddStaff() {
  var validation = new Validtor("#formQLNV");
  var data = validation.getData();
  if (Object.keys(data).length !== 0) {
    var staff = new Staff();
  }

}
