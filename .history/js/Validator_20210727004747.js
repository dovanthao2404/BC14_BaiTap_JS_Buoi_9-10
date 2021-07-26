function Validator(formSelector) {

  // Danh sách rule sẽ thực hiện
  var formRules = {}

  // Các rule
  var validatorRules = {
    required: function (value) {
      return value ? undefined : "Vui lòng nhập vào trường này";
    },
    requiredSL: function (value) {
      return value ? undefined : "Vui lòng chọn";
    },
    account: function (value) {
      // Giả đò đây là API danh sách tên account :))))
      var listStaff = JSON.parse(localStorage.getItem("listStaff"))
      var listAccount;
      if (listStaff) {
        listAccount = listStaff.map(function (staff) {
          return staff.account;
        })
      }
      var oldAccount;
      if (listAccount) {
        oldAccount = listAccount.find((account) => {
          return account === value;
        })
      }
      var validation = /^[a-zA-z0-9]+$/;
      if (!validation.test(value)) {
        return "Vui lòng nhập vào tài khoảng hợp lệ";
      }
      if (oldAccount) {
        return "Tài khoản này đã tồn tại trên hệ thống";
      }
      return undefined;
    }
    ,
    digitalSignature: function (value) {
      var validation =
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])[0-9a-zA-Z!@#$%^&*(),.?":{}|<>]{4,}$/
      return validation.test(value) ? undefined : "Vui lòng nhập mật khẩu hợp lệ";
    }

    ,
    stringVN: function (value) {
      var validation = /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$/
        ;

      return validation.test(value) ? undefined : 'Vui lòng nhập tên hợp lệ'
    },
    email: function (value) {
      var emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

      return emailPattern.test(value) ? undefined : "Vui lòng nhập email hợp lệ";
    },
    min: function (min) {
      return function (value) {
        return value.length >= +min ? undefined : `Vui lòng nhập tối thiểu ${min} ký tự`;
      }
    },
    max: function (max) {
      return function (value) {
        return value.length <= +max ? undefined : `Vui lòng nhập tối đa ${max} ký tự`;
      }
    },
    minValue: function (min) {
      return function (value) {
        return +value >= +min ? undefined : `Vui lòng nhập giá trị tối thiểu là ${min}`
      }
    },
    maxValue: function (max) {
      return function (value) {
        return +value <= +max ? undefined : `Vui lòng nhập giá trị tối đa là ${max}`
      }
    }
    ,
    date: function (value) {

      var date = value.split("/");
      var month = +date[0];
      var day = +date[1];
      var year = +date[2];
      var isDate = false;
      if (year >= 1582) {
        switch (month) {
          case 1:
          case 3:
          case 5:
          case 7:
          case 8:
          case 10:
          case 12:
            if (day <= 31 && day >= 1) {
              isDate = true;
            }
            break;
          case 4:
          case 6:
          case 9:
          case 11:
            if (day <= 30 && day >= 1) {
              isDate = true;
            }
            break;
          case 2:
            if (year % 400 === 0 ||
              (year % 4 === 0 && year % 100 !== 0)) {
              if (day <= 28 && day >= 1) {
                isDate = true;
              }
            } else {
              if (day <= 29 && day >= 1) {
                isDate = true;
              }
            }
            break;
          default:
            isDate: false;
            break;
        }
      } else {
        isDate = false;
      }

      return isDate ? undefined : "Vui lòng nhập ngày hợp lệ";
    },
    number: function (value) {
      return !isNaN(value) ? undefined : "Vui lòng nhập vào số"
    },
    password: function (value) {
      var validation =
        /^(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])[0-9a-zA-Z!@#$%^&*(),.?":{}|<>]{4,}$/
      return validation.test(value) ? undefined : "Vui lòng nhập mật khẩu hợp lệ";
    },
  }

  // getForm
  var formElement = document.querySelector(formSelector);

  if (formElement) {

    // Lấy các thẻ liên quan đến form có name và rules
    var inputs = formElement.querySelectorAll("[name][rules]")

    for (var input of inputs) {

      // danh sách các rule của input
      var rules = input.getAttribute("rules").split("|");

      // lọc rule để thêm vào formRules
      for (var rule of rules) {
        var isRuleHasValue = rule.includes(":");
        var ruleInfo;

        if (isRuleHasValue) {
          ruleInfo = rule.split(":")
          rule = ruleInfo[0]
        }

        var ruleFunc = validatorRules[rule];
        if (isRuleHasValue) {
          ruleFunc = ruleFunc(ruleInfo[1]);
        }
        // Thêm vào formRules
        if (Array.isArray(formRules[input.name])) {
          formRules[input.name].push(ruleFunc)
        } else {
          formRules[input.name] = [ruleFunc];
        }
      }

      input.onblur = handleValidate;
      input.oninput = handleClearError;
      if (input.name === "ngaylam") {
        input.onchange = handleClearError;
      }
    }
  }

  // Lấy ra thẻ cha ủa element matches với selector
  function getParent(element, selector) {
    while (element.parentElement) {
      if (element.parentElement.matches(selector)) {
        return element.parentElement;
      }
      element = element.parentElement;
    }
  }

  function handleValidate(event) {
    var rules = formRules[event.target.name];
    var errorMessage;
    for (var rule of rules) {
      errorMessage = rule(event.target.value);
      if (errorMessage) break;
    }

    if (errorMessage) {
      var formGroup = getParent(event.target, ".form-group");
      var errorElement = formGroup.querySelector(".form-message");
      errorElement.innerText = errorMessage;
    }
    return !errorMessage;
  }

  function handleClearError(event) {
    var formGroup = getParent(event.target, ".form-group");
    var formMessage = formGroup.querySelector(".form-message");

    formMessage.innerText = "";

  }
  this.getData = function () {
    var formValues = {};

    var inputs = formElement.querySelectorAll("[name][rules]");
    var isValid = true;
    for (var input of inputs) {
      if (!handleValidate({ target: input })) {
        isValid = false;
      }
    }

    if (isValid) {
      formValues =
        Array.from(inputs).reduce(function (values, input) {
          values[input.name] = input.value
          return values;
        }, {})
      return formValues;
    }
  }

  this.getDataUpdate = function () {
    var formValues = {};

    var inputs = formElement.querySelectorAll("[name][rules]:not(#tknv)");
    var isValid = true;
    for (var input of inputs) {
      if (input.name !== "tk") {
        if (!handleValidate({ target: input })) {
          isValid = false;
        }
      }
    }

    if (isValid) {

      formValues =
        Array.from(inputs).reduce(function (values, input) {
          if (input.name !== "tk") {
            values[input.name] = input.value
            return values;
          }
        }, {})

      return formValues;
    }
  }

}
