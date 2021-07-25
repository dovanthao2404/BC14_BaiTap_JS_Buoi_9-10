
Validtor("#formQLNV")
document.querySelector("#btnThemNV").addEventListener("click", function () {
  var validation = new Validtor("#formQLNV");
  input_field.addEventListener("click", function () {
    var data = validation.getData();
    console.log(data);
  })
})