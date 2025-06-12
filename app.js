const strRegex = /^[a-z][a-z-]+[a-z]$/;
const emailRegex =
  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
const phoneRegex = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
const digitRegex = /^\d+$/;

const countryList = document.getElementById('country-list');
const fullscreenDiv = document.getElementById('fullscreen-div');
const modal = document.getElementById('modal');
const addBtn = document.getElementById('add-btn');
const closeBtn = document.getElementById('close-btn');
const modalBtns = document.getElementById('modal-btns');
const form = document.getElementById('modal');
const addBookList = document.querySelector('#addr-book-list tbody');

let addName =
  (firstName =
  lastNAme =
  email =
  phone =
  streerAddr =
  postCode =
  city =
  country =
  labels =
    '');

class UI {
  static showModal() {
    modal.style.display = 'block';
    fullscreenDiv.style.display = 'block';
  }

  static closeModal() {
    modal.style.display = 'none';
    fullscreenDiv.style.display = 'none';
  }
}

window.addEventListener('DOMContentLoaded', () => {
  loadJSON();
  eventListeners();
});

function eventListeners() {
  //show add item modal
  addBtn.addEventListener('click', () => {
    form.reset();
    document.getElementById('modal-title').innerHTML = 'Add Address';
    UI.showModal();
    document.getElementById('modal-btn').innerHTML = `
    <button type = "submit" id = "save-btn"> Save </button>`;
  });

  // close add item modal
  closeBtn.addEventListener('click', UI.closeModal);

  // add address item
  modalBtns.addEventListener('click', (event) => {
    event.preventDefault();
    if (event.target.id == 'save-btn') {
      let isFormValid = getFormData();
      if (!isFormValid) {
        form.querySelectorAll('input').forEach((input) => {
          setTimeout(() => {
            input.classList.remove('errorMsg');
          }, 1500);
        });
      }
    }
  });
}

function loadJSON() {
  fetch('countries.json')
    .then((response) => response.json())
    .then((data) => {
      let html = '';
      data.forEach((country) => {
        html += `<option>${country.country}</option>`;
      });
      countryList.innerHTML = html;
    });
}

// async function loadJSON() {
//   let res = await fetch('countries.json');
//   let data = await res.json();

//   console.log(data);
// }

function getFormData(event) {
  let inputValidStatus = [];
  //   console.log(
  //     form.addr_ing_name.value,
  //     form.first_name.vale,
  //     form.last_name.value,
  //     form.email.value,
  //     form.phone.value,
  //     form.street_addr.value,
  //     form.postal_code.value,
  //     form.city.value,
  //     form.country.value,
  //     form.labels.value
  //   );
  if (
    !strRegex.test(form.addr_ing_name.value) ||
    form.addr_ing_name.value.trim().length == 0
  ) {
    addErrMsg(form.addr_ing_name);
    inputValidStatus[0] = false;
  } else {
    addrName = form.addr_ing_name.value;
    inputValidStatus[0] = true;
  }

  if (
    !strRegex.test(form.first_name.value) ||
    form.first_name.value.trim().length == 0
  ) {
    addErrMsg(form.first_name);
    inputValidStatus[1] = false;
  } else {
    firstName = form.first_name.value;
    inputValidStatus[1] = true;
  }

  if (
    !strRegex.test(form.last_name.value) ||
    form.last_name.value.trim().length == 0
  ) {
    addErrMsg(form.last_name);
    inputValidStatus[2] = false;
  } else {
    lastName = form.last_name.value;
    inputValidStatus[2] = true;
  }

  if (!emailRegex.test(form.email.value)) {
    addErrMsg(form.email);
    inputValidStatus[3] = false;
  } else {
    email = form.email.value;
    inputValidStatus[3] = true;
  }

  if (!phoneRegex.test(form.phone.value)) {
    addErrMsg(form.phone);
    inputValidStatus[4] = false;
  } else {
    phone = form.phone.value;
    inputValidStatus[4] = true;
  }

  if (!(form.street_addr.value.trim().length > 0)) {
    addErrMsg(form.street_addr);
    inputValidStatus[5] = false;
  } else {
    streetAddr = form.street_addr.value;
    inputValidStatus[5] = true;
  }

  if (!digitRegex.test(form.postal_code.value)) {
    addErrMsg(form.postal_code);
    inputValidStatus[6] = false;
  } else {
    postCode = form.postal_code.value;
    inputValidStatus[6] = true;
  }

  if (!strRegex.test(form.city.value) || form.city.value.trim().length == 0) {
    addErrMsg(form.city);
    inputValidStatus[7] = false;
  } else {
    city = form.city.value;
    inputValidStatus[7] = true;
  }
  country = form.country.value;
  labels = form.labels.value;
  // console.log(
  //   addrName,
  //   firstName,
  //   lastName,
  //   email,
  //   phone,
  //   streerAddr,
  //   postCode,
  //   city,
  //   country,
  //   labels
  // );
  return inputValidStatus.includes(false) ? false : true;
}

function addErrMsg(inputBox) {
  inputBox.classList.add('errorMsg');
}
