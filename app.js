// regular expression for validation
const strRegex = /^[a-zA-Z\s]*$/; // containing only letters
const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phoneRegex =
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
/* supports following number formats - (123) 456-7890, (123)456-7890, 123-456-7890, 123.456.7890, 1234567890, +31636363634, 075-63546725 */
const digitRegex = /^\d+$/;

const countryList = document.getElementById('country-list');
const fullscreenDiv = document.getElementById('fullscreen-div');
const modal = document.getElementById('modal');
const addBtn = document.getElementById('add-btn');
const closeBtn = document.getElementById('close-btn');
const modalBtns = document.getElementById('modal-btns');
const form = document.getElementById('modal');
const addrBookList = document.querySelector('#addr-book-list tbody');

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

class Address {
  constructor(
    id,
    addrName,
    firstName,
    lastName,
    email,
    phone,
    streerAddr,
    postCode,
    city,
    country,
    labels
  ) {
    this.id = id;
    this.addrName = addrName;
    this.firstName = firstName;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
    this.streerAddr = streerAddr;
    this.postCode = postCode;
    this.city = city;
    this.country = country;
    this.labels = labels;
  }

  static getAddresses() {
    // from local storage
    let addresses;
    if (localStorage.getItem('addresses') == null) {
      addresses = [];
    } else {
      addresses = JSON.parse(localStorage.getItem('addresses'));
    }
    return addresses;
  }

  static addAddress(address) {
    const addresses = Address.getAddresses();
    addresses.push(address);
    localStorage.setItem('addresses', JSON.stringify(addresses));
  }
}
class UI {
  static showAddressList() {
    const addresses = Address.getAddresses();
    addresses.forEach((address) => UI.addToAddressList(address));
  }

  static addToAddressList(address) {
    const tableRow = document.createElement('tr');
    tableRow.setAttribute('data-id', address.id);
    tableRow.innerHTML = `
            <td>${address.id}</td>
            <td>
                <span class = "addressing-name">${
                  address.addrName
                }</span><br><span class = "address">${address.streetAddr} ${
      address.postCode
    } ${address.city} ${address.country}</span>
            </td>
            <td><span>${address.labels}</span></td>
            <td>${address.firstName + ' ' + address.lastName}</td>
            <td>${address.phone}</td>
        `;
    addrBookList.appendChild(tableRow);
  }

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
  UI.showAddressList();
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
      } else {
        let allItem = Address.getAddresses();
        lastItemId = allItem.length > 0 ? allItem[allItem.length - 1].id : 0;
        lastItemId++;

        const addressesItem = new Address(
          lastItemId,
          addrName,
          firstName,
          lastName,
          email,
          phone,
          streerAddr,
          postCode,
          city,
          country,
          labels
        );
        Address.addAddress(addressesItem);
        UI.closeModal();
        UI.addToAddressList(addressesItem);
        form.reset();
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
        html += `
                <option> ${country.country} </option>
            `;
      });
      countryList.innerHTML = html;
    });
}

function getFormData() {
  let inputValidStatus = [];
  // console.log(form.addr_ing_name.value, form.first_name.value, form.last_name.value, form.email.value, form.phone.value, form.street_addr.value, form.postal_code.value, form.city.value, form.country.value, form.labels.value);

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
  return inputValidStatus.includes(false) ? false : true;
}

function addErrMsg(inputBox) {
  inputBox.classList.add('errorMsg');
}
