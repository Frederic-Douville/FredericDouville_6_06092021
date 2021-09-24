/* Partie modale formulaire */

const modalFormBg = document.querySelector(".modalForm-ctn");
const modalFormBtn = document.querySelectorAll(".banner-btn");
const modalFormCross = document.querySelectorAll(".form-closeCross");

modalFormBtn.forEach((btn) => btn.addEventListener("click", launchModalForm));
modalFormCross.forEach((btn) => btn.addEventListener("click", closeModalForm));

function launchModalForm() {
  modalFormBg.style.display = "block";
}

function closeModalForm() {
  modalFormBg.style.display = "none";
}

const btnSubmit = document.getElementById("submit-btn");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const email = document.getElementById("email");
const message = document.getElementById("message");

const regexLetter = /^[a-zA-Zéèêëàùûôçï]+$/;
const regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,3}$/;
const regexMsg = /^[a-zA-Zéèêëàùûôçï0-9.!#$%&'*+/=?()_~'-]+$/;

function firstValid() {
  if (
    firstName.value !== null &&
    firstName.value.length >= 2 &&
    firstName.value.match(regexLetter)
  ) {
    return true;
  } else {
    return false;
  }
}

function lastValid() {
  if (
    lastName.value !== null &&
    lastName.value.length >= 2 &&
    lastName.value.match(regexLetter)
  ) {
    return true;
  } else {
    return false;
  }
}

function emailValid() {
  if (email.value !== null && email.value.match(regexEmail)) {
    return true;
  } else {
    return false;
  }
}

function msgValid() {
    if (
      message.value !== null &&
      message.value.length >= 2 &&
      message.value.match(regexMsg)
    ) {
      return true;
    } else {
      return false;
    }
  }

let functionMessage = [
  {
    result: firstValid(),
    errorId: "firstError",
    msgError: "Veuillez entrer 2 caractères ou plus pour le champ du prénom.",
  },
  {
    result: lastValid(),
    errorId: "lastError",
    msgError: "Veuillez entrer 2 caractères ou plus pour le champ du nom.",
  },
  {
    result: emailValid(),
    errorId: "emailError",
    msgError: "Veuillez entrer une adresse e-mail valide.",
  },
  {
    result: msgValid(),
    errorId: "msgError",
    msgError: "Veuillez entrer un message valide.",
  },
];

btnSubmit.addEventListener("click", validCycle);

function validCycle(event) {
  update(event);
  validOrNot(event);
  validForm(event);
}

function update(event){
    functionMessage[0].result = firstValid();
    functionMessage[1].result = lastValid();
    functionMessage[2].result = emailValid();
    functionMessage[3].result = msgValid();
}

function validOrNot(event){
    for(i = 0 ; i < functionMessage.length ; i++){    
      if(functionMessage[i].result == false){
        document.getElementById(functionMessage[i].errorId).innerHTML = functionMessage[i].msgError;
      }else{
        document.getElementById(functionMessage[i].errorId).innerHTML = "";
      }
    }
  }

function validForm(event) {
  if (firstValid() && lastValid() && emailValid() && msgValid()) {
    modalFormBg.style.display = "none";
    return true;
  } else {
    event.preventDefault();
    return false;
  }
}

/* Code qui permet de développer le bouton option 
const optionDropdown = document.querySelector(".option-dropdown");
const optionArrowBtn = document.querySelector(".option-btn-arrow");

function dropOption(){
    if(!optionDropdown.getAttribute('style') || optionDropdown.getAttribute('style') === 'display:none'){
        optionDropdown.style.display = "block";
    }else{
        optionDropdown.style.display = "none";
    }
}

optionArrowBtn.addEventListener('click',function(e) {
    e.preventDefault();
    dropOption();
})*/