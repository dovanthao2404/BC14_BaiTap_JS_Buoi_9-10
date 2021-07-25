var staffManager = new StaffManager();
staffManager.start();
var pwdPage = 1;
new Validtor("#formQLNV")


document.querySelector("#btnThemNV").addEventListener("click", handleAddStaff)

function handleAddStaff() {
  var validation = new Validtor("#formQLNV");
  var data = validation.getData();
  if (Object.keys(data).length !== 0) {
    var staff = new Staff();
    var dataStaff = [];
    var count = 0;
    for (var key in data) {
      dataStaff[count] = data[key]
      count++;
    }
    var newStaff = new Staff(...dataStaff);
    staffManager.addStaff(newStaff);
    showListStaff(staffManager.listStaff);
  }

}
