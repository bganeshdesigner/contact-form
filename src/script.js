// Validation for contact us form
function regvalidate() {
    let nameInput = document.getElementById("nameInput");
    let emailInput = document.getElementById("emailInput");
    let phoneInput = document.getElementById("phoneInput");
    let nameRegex = /^[a-zA-Z\s]+$/;
    let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    let phoneRegex = /^\d{10}$/;
    let isValid = true;  
  
    // Name validation
    let nameError = document.getElementById("nameError");
    if (nameInput.value == "") {
      nameError.innerHTML = "*Name should not be empty";
      isValid = false;
    } else if (!nameRegex.test(nameInput.value)) {
      nameError.innerHTML = "*Name should contain only letters";
      isValid = false;
    } else {
      nameError.innerHTML = "";
    }
  
    nameInput.addEventListener("input", function () {
      console.log("Input detected");
      if (nameInput.value == "") {
        nameError.innerHTML = "*Name should not be empty";
      } else if (!nameRegex.test(nameInput.value)) {
        nameError.innerHTML = "*Name should contain only letters";
      } else {
        nameError.innerHTML = "";
      }
    });
  
    // Email validation
    let emailError = document.getElementById("emailError");
    if (emailInput.value == "") {
      emailError.innerHTML = "*Email id required";
      isValid = false;
    } else if (!emailRegex.test(emailInput.value)) {
      emailError.innerHTML = "*Email id should be in proper format";
      isValid = false;
    } else {
      emailError.innerHTML = "";
    }
  
    emailInput.addEventListener("input", function () {
      console.log("Input detected");
      if (emailInput.value == "") {
        emailError.innerHTML = "*Email id required";
      } else if (!emailRegex.test(emailInput.value)) {
        emailError.innerHTML = "*Email id should be in proper format";
      } else {
        emailError.innerHTML = "";
      }
    });
  
    // Phone validation
    let phoneError = document.getElementById("phoneError");
    if (phoneInput.value == "") {
      phoneError.innerHTML = "*Phone number should not be empty";
      isValid = false;
    } else if (!phoneRegex.test(phoneInput.value)) {
      phoneError.innerHTML = "*Phone number should contain 10 digits";
      isValid = false;
    } else {
      phoneError.innerHTML = "";
    }
  
    phoneInput.addEventListener("input", function (event) {
      this.value = this.value.replace(/[^0-9]/g, "");
      let phoneInputLength = this.value.length;
      console.log(phoneInputLength);
      if (phoneInputLength > 10) {
        event.preventDefault();
        this.value = this.value.slice(0, 10);
      } else if (phoneInput.value == "") {
        phoneError.innerHTML = "*Phone number should not be empty";
      } else if (!phoneRegex.test(phoneInput.value)) {
        phoneError.innerHTML = "*Phone number should contain 10 digits";
      } else {
        phoneError.innerHTML = "";
      }
    });
  
    // Gender validation
  
    let genderInput = document.querySelectorAll('input[type="radio"]');
    let genderError = document.getElementById("genderError");
  
    let isGenderSelected = false;
    for (let i = 0; i < genderInput.length; i++) {
      if (genderInput[i].checked) {
        isGenderSelected = true;
        break;
      }
    }
  
    if (!isGenderSelected) {
      genderError.innerHTML = "*Select the gender";
      isValid = false;
    } else {
      genderError.innerHTML = "";
    }
  
    for (let i = 0; i < genderInput.length; i++) {
      genderInput[i].addEventListener("change", function () {
        let isGenderSelected = false;
        for (let j = 0; j < genderInput.length; j++) {
          if (genderInput[j].checked) {
            isGenderSelected = true;
            break;
          }
        }
  
        if (!isGenderSelected) {
          genderError.innerHTML = "*Select the gender";
          isValid = false;
        } else {
          genderError.innerHTML = "";
        }
      });
    }
  
    // T&Cs validation
    let agree = document.getElementById("agree");
    let tcError = document.getElementById("tcError");
    if (agree.checked == false) {
      console.log("unchecked");
      tcError.innerHTML = "*Agree to the T&Cs to submit";
      isValid = false;
    } else {
      tcError.innerHTML = "";
    }
  
    agree.addEventListener("change", function () {
      if (agree.checked == false) {
        console.log("unchecked");
        tcError.innerHTML = "*Agree to the T&Cs to submit";
      } else {
        tcError.innerHTML = "";
      }
    });
  
    return isValid;
  }
  
  //Adding data to the table
  let data = [];
  
  function addData(id = null) {
    console.log("addData:", id);
  
    if (regvalidate()) {
      let nameInput = document.getElementById("nameInput");
      let emailInput = document.getElementById("emailInput");
      let phoneInput = document.getElementById("phoneInput");
      let genderInput = document.querySelector(
        'input[name="genderInput"]:checked'
      );
      console.log("genderInput", genderInput);
  
      let name = nameInput ? nameInput.value : "";
      let email = emailInput ? emailInput.value : "";
      let phone = phoneInput ? phoneInput.value : "";
      let gender = genderInput ? genderInput.value : "";
      console.log("gender", gender);
  
      let existingEmail = data.find((d) => d.email === email);
      let existingPhoneNumber = data.find((d) => d.phone === phone);
      let emailError = document.getElementById("emailError");
      let phoneError = document.getElementById("phoneError");
  
      if (existingEmail && existingPhoneNumber) {
        emailError.innerHTML = "*Email already exists";
        phoneError.innerHTML = "*Phone Number already exists";
        return false;
      } else if (existingEmail) {
        emailError.innerHTML = "*Email already exists";
        return false;
      } else if (existingPhoneNumber) {
        phoneError.innerHTML = "*Phone Number already exists";
        return false;
      }
  
      if (id) {
        // update existing data
        let index = data.findIndex((d) => d.id === id);
        console.log("addData index", index);
        let updatedData = data[index];
        if (index !== -1) {
          console.log("Updating...");
          updatedData.id = email;
          updatedData.name = name;
          updatedData.email = email;
          updatedData.phone = phone;
          updatedData.gender = gender;
          console.log("Updated Data", data);
  
          let table = document.getElementById("output-table");
          let row = table.rows[index + 1];
  
          row.cells[0].innerHTML = index + 1;
          row.cells[1].innerHTML = name;
          row.cells[2].innerHTML = email;
          row.cells[3].innerHTML = phone;
          row.cells[4].innerHTML = gender;
  
          document
            .querySelector(".contact-form")
            .removeAttribute("data-selected-id");
          id = row.setAttribute("id", email);
          console.log("Updated iD:", id);
        }
      } else {
        // add new data
        let newData = {
          id: email,
          name: name,
          email: email,
          phone: phone,
          gender: gender,
        };
        console.log("Adding...");
  
        data.push(newData);
        dataTable(newData);
      }
      clearInputs();
    }
  }
  
  window.onload = function () {
    document.getElementById("submit").addEventListener("click", function () {
      let selectedDataId = document
        .querySelector(".contact-form")
        .getAttribute("data-selected-id");
      addData(selectedDataId);
    });
  };
  
  // Editing data from the table
  function editData(btn) {
    let row = btn.parentNode.parentNode.parentNode;
    let id = row.getAttribute("id");
    console.log("Editing id:", id);
    let index = data.findIndex((d) => d.id === id);
    console.log("editData btn index", index);
    let selectedData = data[index];
    console.log("selectedData:", selectedData);
  
    // checking if selectedData is defined before accessing its properties
    if (selectedData) {
      let nameInput = document.getElementById("nameInput");
      let emailInput = document.getElementById("emailInput");
      let phoneInput = document.getElementById("phoneInput");
      let genderInputs = document.getElementsByName("genderInput");
      let agree = document.getElementById("agree");
  
      nameInput.value = selectedData.name;
      emailInput.value = selectedData.email;
      phoneInput.value = selectedData.phone;
      genderInputs.forEach((input) => {
        if (input.value === selectedData.gender) {
          input.checked = true;
        }
      });
      agree.checked = true;
      console.log("Editing...");
    }
    document.querySelector(".contact-form").setAttribute("data-selected-id", id);
    id = row.removeAttribute("id");
  }
  
  function deleteData(btn) {
    let row = btn.parentNode.parentNode.parentNode;
    let id = row.getAttribute("id");
    console.log("Deleting id:", id);
    row.remove();
    // remove the data from the array
    data = data.filter((item) => item.id !== id);
  
    console.log(data);
  
    // update the serial numbers of the remaining rows
    let table = document.getElementById("output-table");
    let rows = table.getElementsByTagName("tr");
    for (let i = 1; i < rows.length; i++) {
      let serialNumberCell = rows[i].getElementsByTagName("td")[0];
      serialNumberCell.innerHTML = i;
    }
  }
  
  function dataTable(newData) {
    console.log("dataTable:", newData);
    let table = document.getElementById("output-table");
    let id = newData.id;
    console.log(newData);
  
    let newRow = table.insertRow();
    newRow.setAttribute("id", id);
  
    let serialNumberCell = newRow.insertCell(0);
    serialNumberCell.innerHTML = data.indexOf(newData) + 1;
  
    let nameCell = newRow.insertCell(1);
    nameCell.innerHTML = newData.name;
  
    let emailCell = newRow.insertCell(2);
    emailCell.innerHTML = newData.email;
  
    let phoneCell = newRow.insertCell(3);
    phoneCell.innerHTML = newData.phone;
  
    let genderCell = newRow.insertCell(4);
    genderCell.innerHTML = newData.gender;
  
    let actionCell = newRow.insertCell(5);
    actionCell.innerHTML =
      '<div class="action-btns">' +
      '<button class="action-btn" onclick="editData(this)">Edit</button>' +
      '<button class="action-btn" onclick="deleteData(this)">Delete</button>' +
      "</div>";
  
    console.log("NewData: ", data);
    console.log("Table added by NewData");
  }
  
  // Search Bar functionality
  window.addEventListener("DOMContentLoaded", () => {
    const searchBar = document.getElementById("searchBar");
    const genderFilter = document.getElementById("genders");
  
    searchBar.addEventListener("input", function () {
      const searchValue = this.value.toLowerCase();
      const selectedGender = genderFilter.value.toLowerCase();
  
      const filteredData = data.filter(function (item) {
        return (
          (item.name.toLowerCase().includes(searchValue) ||
            item.email.toLowerCase().includes(searchValue) ||
            item.phone.toLowerCase().includes(searchValue)) &&
          (selectedGender === "all" ||
            item.gender.toLowerCase() === selectedGender)
        );
      });
  
      renderTable(filteredData);
    });
  
    genderFilter.addEventListener("change", function () {
      const selectedGender = this.value.toLowerCase();
      const searchValue = searchBar.value.toLowerCase();
  
      const filteredData = data.filter(function (item) {
        return (
          (item.name.toLowerCase().includes(searchValue) ||
            item.email.toLowerCase().includes(searchValue) ||
            item.phone.toLowerCase().includes(searchValue)) &&
          (selectedGender === "all" ||
            item.gender.toLowerCase() === selectedGender)
        );
      });
  
      renderTable(filteredData);
    });
  });
  
  function renderTable(data) {
    let table = document.getElementById("output-table");
    table.innerHTML = "";
    let headerRow = table.insertRow();
    headerRow.innerHTML =
      "<th>Serial Number</th><th>Name</th><th>Email</th><th>Phone</th><th>Gender</th><th>Action</th>";
    data.forEach(function (item) {
      let newRow = table.insertRow();
      newRow.setAttribute("id", item.id);
  
      let serialNumberCell = newRow.insertCell(0);
      serialNumberCell.innerHTML = data.indexOf(item) + 1;
  
      let nameCell = newRow.insertCell(1);
      nameCell.innerHTML = item.name;
  
      let emailCell = newRow.insertCell(2);
      emailCell.innerHTML = item.email;
  
      let phoneCell = newRow.insertCell(3);
      phoneCell.innerHTML = item.phone;
  
      let genderCell = newRow.insertCell(4);
      genderCell.innerHTML = item.gender;
  
      let actionCell = newRow.insertCell(5);
      actionCell.innerHTML =
        '<div class="action-btns">' +
        '<button class="action-btn" onclick="editData(this)">Edit</button>' +
        '<button class="action-btn" onclick="deleteData(this)">Delete</button>' +
        "</div>";
    });
  }
  
  // Clearing the input fields
  
  function clearInputs() {
    document.getElementById("nameInput").value = "";
    document.getElementById("emailInput").value = "";
    document.getElementById("phoneInput").value = "";
  
    const genderInput = document.querySelector(
      'input[name="genderInput"]:checked'
    );
    if (genderInput) {
      genderInput.checked = false;
    }
  
    document.getElementById("agree").checked = false;
  }