/******************************************************************************************/
/******************************************************************************************/
/*Requête permettant de lire et d'intéragir avec la base de donnée du site*/

var myfetch = fetch ('https://raw.githubusercontent.com/Frederic-Douville/FredericDouville_6_06092021/main/FishEyeData.json');
myfetch.then(response => {
    return response.json();
}).then(data => {
    //console.log(data.photographers);
    //console.log(data.media);

    /*appel de fonctions pour ajouter le DOM de la bannière et des miniatures de photos
    et pour fixer l'id du photographe*/    
    bannerFactory(data.photographers);              
    var nameId = photoId(data.photographers);    
    var mediaPhotoArray = photoDom(data.media,nameId);

    /*appel de fonctions pour ajouter le compte total de like*/
    var likes = likeCount(mediaPhotoArray);
    document.getElementById('like-total').innerHTML = likes;

    /*fonction permettant d'ajouter un like à une photo*/
    var heartClass = document.getElementsByClassName('heart-svg');      
    Array.prototype.forEach.call(heartClass,el => el.addEventListener('click', event => {        
        var classHeart = event.currentTarget.getAttribute("class");        
        var classHeartArray = classHeart.split(' ');        
        var idPicture = classHeartArray[1];                
        likePicture(idPicture);
        likes += 1;
        document.getElementById('like-total').innerHTML = likes;             
    }));

    /*fonction permettant d'ouvrir la lightbox en clickant sur une miniature d'image*/
    var lightRoomLink = document.getElementsByClassName('img-ctn');
    Array.prototype.forEach.call(lightRoomLink,el => el.addEventListener('click', event => {        
    var imgId = event.currentTarget.getAttribute("id");
    var imgIdArray = imgId.split('-');
    var idImg = imgIdArray[1];
    openImgLight(idImg);
    openLight();        
    }));

    
}).catch(err => {
    alert('error:' + err);
});

/******************************************************************************************/
/******************************************************************************************/
/*récupération de l'id du photographe*/

const urlProfil = window.location.href;
var urlArray = urlProfil.split('?');
var idPhoto = urlArray[1];

/*fonction qui retourne le nom du photographe selon son id*/

function photoId(arrayPhoto){
    for(var i=0;i<arrayPhoto.length;i++){
        if(arrayPhoto[i].id == idPhoto){            
           return arrayPhoto[i].name;       
        }
    }
}

/*fonction qui appelle à chaque itération la fonction de création 
des miniatures de photos sur tout le contenu media.json copié dans mediaArray*/

var mediaArray = [];
function photoDom(arrayMedia,name){            
    for(var j=0;j<arrayMedia.length;j++){ 
        if(arrayMedia[j].photographerId == idPhoto){
            mediaArray.push(arrayMedia[j]);                                            
        }
    }
    for(var i=0;i<mediaArray.length;i++){
        pictureFactory(mediaArray[i],name);
        lightImageFactory(mediaArray[i],name);
    }
    return mediaArray    
} 

/******************************************************************************************/
/******************************************************************************************/
/*fonction de création de la bannière*/

function bannerFactory(array){
    for(var i=0;i<array.length;i++){
        if(array[i].id == idPhoto){
        document.getElementById("portrait").src ="../public/img/Sample Photos/Photographers ID Photos/" + array[i].portrait ;
        document.getElementById("portrait").setAttribute('alt',array[i].name);
        document.getElementById("name").innerHTML = array[i].name;
        document.getElementById("name").setAttribute("aria-label",array[i].name);
        document.getElementById("formName").innerHTML = array[i].name;        
        document.getElementById("place").innerHTML = array[i].city + ", " + array[i].country;
        document.getElementById("tagline").innerHTML = array[i].tagline ;
        document.getElementById("price").innerHTML = array[i].price + "&euro;/jour";
  
            var tagArray=[];
            tagArray=array[i].tags;
            for(var j=0;j<tagArray.length;j++){                     
                tagFactory(tagArray[j]);
            }  
        }
    }       
}

/*fonction de création des tags*/

function tagFactory(tagArray){           
    var tagDiv = document.createElement("a");
    tagDiv.className = 'tag tag-banner unfocus' + " " + tagArray;
    tagDiv.setAttribute("href","../index.html?" + tagArray);
    tagDiv.setAttribute("tabindex","1");
    tagDiv.setAttribute('aria-label','Tag');
    tagDiv.setAttribute('role','link');   

    var tagContent = document.createTextNode("#"+tagArray);
    tagDiv.appendChild(tagContent);

    var tagCtn = document.getElementById('tag-ctn');
    tagCtn.appendChild(tagDiv);   
}

/*fonction de création des miniatures de photos*/

function pictureFactory(arrayMedia,name){    
    var photoListContainer = document.getElementById('photo-list-container');
    var photoCtn = document.createElement("div");
    photoCtn.className = 'photo-ctn';
    photoCtn.id = 'pCtn-' + arrayMedia.id;    
    photoListContainer.appendChild(photoCtn);

    var imgCtn = document.createElement("button");
    imgCtn.className = 'img-ctn unfocus';
    imgCtn.id = 'ctn-' + arrayMedia.id;
    photoCtn.appendChild(imgCtn);    
    
    if(arrayMedia.image){
        var img = document.createElement("img");
        img.setAttribute("src","../public/img/Sample Photos/" + name + "/" + arrayMedia.image);
        img.setAttribute("alt",arrayMedia.altText);
        img.setAttribute("aria-label",arrayMedia.altText);
        img.setAttribute("role","link");
        imgCtn.appendChild(img);
    }    
    
    if(arrayMedia.video){
        var video = document.createElement("video");
        video.setAttribute("src","../public/img/Sample Photos/" + name + "/" + arrayMedia.video);
        video.setAttribute("alt",arrayMedia.altText);
        video.setAttribute("aria-label",arrayMedia.altText);
        video.setAttribute("role","link");
        imgCtn.appendChild(video);
    }   
                    
    var imgDesc = document.createElement("div");
    imgDesc.className = 'img-desc';
    photoCtn.appendChild(imgDesc);

    var imgTitle = document.createElement("div");
    imgTitle.className = 'img-title';
    imgDesc.appendChild(imgTitle);

    var titleContent = document.createTextNode(arrayMedia.title);
    imgTitle.appendChild(titleContent);
                    
    var imgNotation = document.createElement("div");
    imgNotation.className = 'img-notation';
    imgDesc.appendChild(imgNotation);

    var notationContent = document.createElement('span');
    notationContent.className = 'notation';
    notationContent.id = arrayMedia.id;
    notationContent.innerHTML = arrayMedia.likes;
    imgNotation.appendChild(notationContent);

    var notationHeartSvg = document.createElement('button');
    notationHeartSvg.className = 'heart-svg' + ' ' + arrayMedia.id + ' ' + 'unfocus';
    notationHeartSvg.innerHTML = '<svg width="20" height="19" viewBox="0 0 20 19" xmlns="http://www.w3.org/2000/svg"><path d="M10 18.35L8.55 17.03C3.4 12.36 0 9.28 0 5.5C0 2.42 2.42 0 5.5 0C7.24 0 8.91 0.81 10 2.09C11.09 0.81 12.76 0 14.5 0C17.58 0 20 2.42 20 5.5C20 9.28 16.6 12.36 11.45 17.04L10 18.35Z" fill="#911C1C"/></svg>';
    notationHeartSvg.setAttribute('aria-label','like');
    imgNotation.appendChild(notationHeartSvg);
}

/******************************************************************************************/
/******************************************************************************************/
/*fonction permettant de compter le nombre total de like des photos */

function likeCount(array){
    var totalLike = 0;
    for(var j=0;j<array.length;j++){ 
        totalLike += array[j].likes;        
    } 
    return totalLike;
}

/*fonction permettant de changer le nombre de like d'une photo"*/

function likePicture(idPicture){
    for(var i=0;i<mediaArray.length;i++){
        if(mediaArray[i].id == idPicture){            
            mediaArray[i].likes += 1;            
            document.getElementById(idPicture).innerHTML = mediaArray[i].likes;
        }    
    }   
}

/******************************************************************************************/
/******************************************************************************************/
/*tableau regroupant les intitulés d'option de tri*/

var choice = ['Popularité','Date','Titre'];

/*fonction permettant d'afficher dans la div 
les différentes options selon leur indice dans le tableau */

function choiceButton(){    
    for(var i=0;i<choice.length;i++){
        document.getElementById('choice-'+i).innerHTML = choice[i];
        document.getElementById('choice-'+i).setAttribute('aria-label',choice[i]);
    }
}
choiceButton();

/*déclaration des variables correspondant aux éléments du choix des options*/

const arrowDown = document.querySelectorAll('.arrow-down-btn');
const arrowDownCtn = document.querySelector('.optbtn-arrow-down');
const arrowUp = document.querySelectorAll('.arrow-up-btn');
const arrowUpCtn = document.querySelector('.optbtn-arrow-up');
const optionDrop = document.querySelector('.option-dropdown');
const optionBtnFirst = document.getElementById('optionBtnFirst');
/*fonction permettant de faire apparaitre ou disparaitre les options de tri 
en cliquant sur la flêche*/

arrowDown.forEach((btn) => btn.addEventListener('click',dropDown));
arrowUp.forEach((btn) => btn.addEventListener('click',dropUp))

function dropDown(){
    optionDrop.style.display = "block";
    optionBtnFirst.setAttribute('aria-expended','true');
    arrowDownCtn.style.display = "none";
    arrowUpCtn.style.display = "block";
}

function dropUp(){
    optionDrop.style.display = "none";
    optionBtnFirst.setAttribute('aria-expended','false');
    arrowDownCtn.style.display = "block";
    arrowUpCtn.style.display = "none";
}

/*fonction permettant de changer la position d'une option lorsqu'elle est cliqué, 
puis d'activer la fonction de tri des photos*/

var optionBtn = document.getElementsByClassName('option-btn-choice');    
Array.prototype.forEach.call(optionBtn,el => el.addEventListener('click', event => {
    var optionId = event.currentTarget.getAttribute("id");
    var optionIdArray = optionId.split('-');
    var idNumber = optionIdArray[1];
    var optionText = event.currentTarget.innerHTML;
    choice.splice(idNumber,1);
    choice.splice(0,0,optionText);    
    choiceButton();
    dropUp();
    pictureSort(optionText);        
    }))

/*fonction permettant de récupérer une option choisie et d'effectuer le tri correspondant*/

function pictureSort(option){
    if(option == "Popularité"){
        popularSort();
    }else if(option == "Date"){
       dateSort();
    }else if(option == "Titre"){
        titleSort();
    }        
}

/*fonctions permettant de trier les photos en fonction de l'option */

var photoListCtn = document.getElementById('photo-list-container');
function popularSort(){            
    mediaArray.sort((a,b) => b.likes - a.likes);    
    for(var i=0;i<mediaArray.length;i++){
        sortFactory(mediaArray[i]);
    }
}

function dateSort(){    
    mediaArray.sort((a,b) => new Date(b.date) - new Date(a.date));       
    for(var i=0;i<mediaArray.length;i++){
        sortFactory(mediaArray[i]);
    }
}

function titleSort(){    
    mediaArray.sort((a,b) => a.title.localeCompare(b.title));
    for(var i=0;i<mediaArray.length;i++){
        sortFactory(mediaArray[i]);
    } 
}

function sortFactory(mediaArray){        
    var ctnId = document.getElementById('pCtn-' + mediaArray.id);
    photoListCtn.appendChild(ctnId);   
}

/******************************************************************************************/
/******************************************************************************************/
/*Partie modale lightbox*/

/*déclaration des variables correspondant aux éléments de la lightbox*/

var modalLightCtn = document.getElementById('modalLightCtn');
var closeLightCross = document.getElementById('closeLightCross');
var allImgSlide = document.getElementsByClassName('light-img-Slide');
var prevBtn = document.getElementById('prev');
var nextBtn = document.getElementById('next');
const unfocus = document.getElementsByClassName('unfocus');
const blocPageLight = document.getElementById('blocpage');

/*event lors du click sur la croix de fermeture et les flêches de navigation*/

closeLightCross.addEventListener('click',closeLight);
prevBtn.addEventListener('click',prevIndex);
nextBtn.addEventListener('click',nextIndex);

/*fonction appelé lorsque les touches flèche droite et flèche gauche sont pressées */

window.addEventListener("keydown",function(event){
    if(event.defaultPrevented){
        return;
    }
    switch(event.key){
        case "ArrowLeft":
            prevIndex();
            break;   
        case "ArrowRight":
            nextIndex();
            break;
        case "Escape":
            closeLight();
            closeModalForm();
            break;
        default:
            return;
    }
    event.preventDefault();
},true);

function openLight(){
    modalLightCtn.style.display = 'block';
    modalLightCtn.setAttribute('aria-hidden','false');
    blocPageLight.setAttribute('aria-hidden','true');
    Array.prototype.forEach.call(unfocus,el => el.setAttribute("tabindex","-1"));
}

function closeLight(){
    modalLightCtn.style.display='none';
    modalLightCtn.setAttribute('aria-hidden','true');
    blocPageLight.setAttribute('aria-hidden','false');
    Array.prototype.forEach.call(allImgSlide,el => el.style.display='none');
    Array.prototype.forEach.call(unfocus,el => el.setAttribute("tabindex","1"));
}

/*fonction d'ouverture de l'image ciblé par un click sur sa miniature
 ou appelé lors d'un click sur les flèches de navigation*/

var index = 0;
function openImgLight(idImg){
    var imgSlide = document.getElementById('slide-' + idImg);    
    imgSlide.style.display = 'block';
    for(var i=0;i<mediaArray.length;i++){
        if(mediaArray[i].id == idImg){
            index = 0;
            index += i ;
        }
    }    
}

/*fonctions appelées par le click sur les flèches de navigation 
et imposant une valeur à la variable d'entrée de la fonction plusSlide(n)*/

function prevIndex(){
    plusSlide(-1);
}

function nextIndex(){
    plusSlide(1);
}

/*fonction permettant, en fonction de la valeur de l'indice
 (càd la position de l'objet dans le tableau arrayMedia),
 de récupérer l'id de la nouvelle image et de l'ouvrir*/

function plusSlide(n){
    index += n;
    if(index == -1){
        index = mediaArray.length-1;
    }
    if(index > mediaArray.length-1){
        index = 0;
    }    
    var slideId = mediaArray[index].id;    
    Array.prototype.forEach.call(allImgSlide,el => el.style.display='none');
    openImgLight(slideId);    
}

/*fonction permettant de crées le DOM de chaque images de la lightbox*/

function lightImageFactory(arrayMedia,name){
    var lightImgCtn = document.getElementById('lightImgCtn');

    var lightSlide = document.createElement('div');
    lightSlide.className = "light-img-Slide";
    lightSlide.id = "slide-" + arrayMedia.id;
    lightSlide.style.display = 'none';
    lightImgCtn.appendChild(lightSlide);
    
    if(arrayMedia.image){
        var imgLight = document.createElement('img');
        imgLight.setAttribute("src","../public/img/Sample Photos/" + name + "/" + arrayMedia.image);
        imgLight.setAttribute("alt",arrayMedia.altText);
        imgLight.setAttribute("aria-label",arrayMedia.altText);
        lightSlide.appendChild(imgLight);
    }    
    
    if(arrayMedia.video){
        var videoLight = document.createElement('video');
        videoLight.setAttribute("src","../public/img/Sample Photos/" + name + "/" + arrayMedia.video);
        videoLight.setAttribute("alt",arrayMedia.altText);
        videoLight.setAttribute("aria-label",arrayMedia.altText);
        videoLight.setAttribute("controls","");
        lightSlide.appendChild(videoLight);
    }

    var lightTitleCtn = document.createElement('div');
    lightTitleCtn.className = "light-title-ctn";
    lightSlide.appendChild(lightTitleCtn);

    var lightTitleSpan = document.createElement('span');
    lightTitleSpan.innerHTML = arrayMedia.title;
    lightTitleCtn.appendChild(lightTitleSpan);
} 

/******************************************************************************************/
/******************************************************************************************/
/* Partie modale formulaire */

/*déclaration des variables correspondant aux éléments du formulaire*/

const modalFormBg = document.querySelector(".modalForm-ctn");
const modalFormBtn = document.querySelectorAll(".banner-btn");
const modalFormCross = document.querySelectorAll(".form-closeCross-btn");
const unfocusForm = document.getElementsByClassName("unfocus");
const blocPage = document.getElementById("blocpage");

/*event lors du clique sur les boutons "contactez-moi" et "croix"*/

modalFormBtn.forEach((btn) => btn.addEventListener("click", launchModalForm));
modalFormCross.forEach((btn) => btn.addEventListener("click", closeModalForm));

function launchModalForm() {
  modalFormBg.style.display = "block";
  modalFormBg.setAttribute('aria-hidden','false');
  blocPage.setAttribute('aria-hidden','true');
  Array.prototype.forEach.call(unfocusForm,el => el.setAttribute("tabindex","-1"));
}

function closeModalForm() {
  modalFormBg.style.display = "none";
  modalFormBg.setAttribute('aria-hidden','true');
  blocPage.setAttribute('aria-hidden','false');
  Array.prototype.forEach.call(unfocusForm,el => el.setAttribute("tabindex","1"));
}

/*déclaration des éléments du formulaire, inputs,
 bouton de soumission et regex de validation*/

const btnSubmit = document.getElementById("submit-btn");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const email = document.getElementById("email");
const message = document.getElementById("message");

const regexLetter = /^[a-zA-Zéèêëàùûôçï]+$/;
const regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,3}$/;
const regexMsg = /^[a-zA-Zéèêëàùûôçï0-9.!#$%&'*+/=?()_~'-]+$/;

/*fonctions permettants de valider les champs remplis par l'utilisateur*/

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

/*tableau d'objet regroupant résultat de validation, id du span, et intitulé du message d'erreur*/

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

/*event lors du clique sur le bouton envoyer*/

btnSubmit.addEventListener("click", validCycle);

/*fonction appelant trois fonctions du cycle de validation*/

function validCycle(event) {
  update(event);
  validOrNot(event);
  validForm(event);
}

/*fonction mettant à jour les résultats des fonctions
 de validation de champs dans le tableau d'objets*/

function update(){
    functionMessage[0].result = firstValid();
    functionMessage[1].result = lastValid();
    functionMessage[2].result = emailValid();
    functionMessage[3].result = msgValid();
}

/*fonction permettant de parcourir le tableau d'objets
 et d'écrire ou non les messages d'erreurs*/

function validOrNot(){
    for(var i = 0 ; i < functionMessage.length ; i++){    
      if(functionMessage[i].result == false){
        document.getElementById(functionMessage[i].errorId).innerHTML = functionMessage[i].msgError;
      }else{
        document.getElementById(functionMessage[i].errorId).innerHTML = "";
      }
    }
  }

/*fonction de validation de formulaire si tous les champs saisis sont corrects*/

function validForm(event) {
  if (firstValid() && lastValid() && emailValid() && msgValid()) {
    modalFormBg.style.display = "none";
    event.preventDefault();
    console.log('Prénom: ' + firstName.value);
    console.log('Nom: ' + lastName.value);
    console.log('Email: ' + email.value);
    document.getElementById('form').reset();
    return true;
  } else {
    event.preventDefault();
    return false;
  }
}

