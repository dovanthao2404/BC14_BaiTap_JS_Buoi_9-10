/**
 * Mục đính: Quản lý các nghiệp vụ liên quan đến lớp nhân viên
 * Ngày tạo: 23/7/2021
 * Version: 1.0
 * Người tao: Đỗ Văn Thảo
 */

// Constructor
function Staff(account, fullName, email, password, startingDate, basicSalary, position, workingHours) {
  this.account = account,
    this.fullName = fullName,
    this.email = email,
    this.password = password,
    this.startingDate = startingDate,
    this.basicSalary = +basicSalary,
    this.position = position,
    this.workingHours = workingHours,
    this.classification,
    this.totalSalary,
    this.arrayProperties = [this.account, this.fullName, this.email, this.password, this.startingDate, this.basicSalary, this.position, this.workingHours]
}

// Methods
Staff.prototype.staffAssessment = function () {
  var excellent = "Xuất sắc";
  var veryGood = "Giỏi";
  var good = "Khá";
  var ordinary = "Trung bình"
  if (this.workingHours >= 192) {
    this.classification = excellent;
  } else if (this.workingHours >= 176) {
    this.classification = veryGood;
  } else if (this.workingHours >= 160) {
    this.classification = good;
  } else {
    this.classification = ordinary;
  }
}

Staff.prototype.calculationOfSalary = function () {
  var boss = "Sếp";
  var headOfDepartment = "Trưởng phòng";
  var regularStaff = "Nhân viên";

  if (this.position === boss) {
    this.totalSalary = (this.basicSalary * 3).toFixed(2);
  } else if (this.position === headOfDepartment) {
    this.totalSalary = (this.basicSalary * 2).toFixed(2);
  } else {
    this.totalSalary = (this.basicSalary).toFixed(2);
  }
}
