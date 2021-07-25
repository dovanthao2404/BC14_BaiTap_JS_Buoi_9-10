
Validtor("#formQLNV")
document.querySelector("#btnThemNV").addEventListener("click", function () {
  var validation = new Validtor("#formQLNV");
  var data = validation.getData();
  console.log(data);
})