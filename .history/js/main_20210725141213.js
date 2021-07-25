var staffManager = new StaffManager();
var staff = new Validator("#formAddStaff");
staffManager.start();
var pwdPage = 1;

Validtor("#formQLNV")
document.querySelector("#btnThemNV").addEventListener("click", handleAddStaff)

function handleAddStaff() {
  var validation = new Validtor("#formQLNV");
  var data = validation.getData();
  if (Object.keys(data).length !== 0) {
    var staff = new Staff();
  }

}
