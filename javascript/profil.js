/*récupération de l'id du photographe*/

const urlProfil = window.location.href;
var urlArray = urlProfil.split('?');
var idPhoto = urlArray[1];
//console.log(idPhoto);

/*fonction de création de la bannière*/

function bannerFactory(array){
    for(i=0;i<array.length;i++){
        if(array[i].id == idPhoto){
        document.getElementById("portrait").src ="../public/img/Sample Photos/Photographers ID Photos/" + array[i].portrait ;
        document.getElementById("name").innerHTML = array[i].name;
        document.getElementById("place").innerHTML = array[i].city + ", " + array[i].country;
        document.getElementById("tagline").innerHTML = array[i].tagline ;
        document.getElementById("price").innerHTML = array[i].price + "&euro;/jour";
  
            var tagArray=[];
            tagArray=array[i].tags;
            for(j=0;j<tagArray.length;j++){                     
                tagFactory(tagArray[j]);
            }  
        }
    }       
}

/*fonction de création des tags*/

function tagFactory(tagArray){           
    var tagDiv = document.createElement("a");
    tagDiv.className = 'tag tag-banner' + " " + tagArray;
    tagDiv.setAttribute("href","../index.html?" + tagArray);   

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
    photoListContainer.appendChild(photoCtn);

    var imgCtn = document.createElement("div");
    imgCtn.className = 'img-ctn';
    photoCtn.appendChild(imgCtn);    
    
    if(arrayMedia.image){
        var img = document.createElement("img");
        img.setAttribute("src","../public/img/Sample Photos/" + name + "/" + arrayMedia.image);
        imgCtn.appendChild(img);
    }    
    
    if(arrayMedia.video){
        var video = document.createElement("video");
        video.setAttribute("src","../public/img/Sample Photos/" + name + "/" + arrayMedia.video);
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

    var notationHeartSvg = document.createElement('div');
    notationHeartSvg.className = 'heart-svg' + ' ' + arrayMedia.id;
    notationHeartSvg.innerHTML = '<svg width="20" height="19" viewBox="0 0 20 19" xmlns="http://www.w3.org/2000/svg"><path d="M10 18.35L8.55 17.03C3.4 12.36 0 9.28 0 5.5C0 2.42 2.42 0 5.5 0C7.24 0 8.91 0.81 10 2.09C11.09 0.81 12.76 0 14.5 0C17.58 0 20 2.42 20 5.5C20 9.28 16.6 12.36 11.45 17.04L10 18.35Z" fill="#911C1C"/></svg>';
    imgNotation.appendChild(notationHeartSvg);
}

/*fonction qui retourne le nom du photographe selon son id*/

function photoId(arrayPhoto){
    for(i=0;i<arrayPhoto.length;i++){
        if(arrayPhoto[i].id == idPhoto){            
           return arrayPhoto[i].name;       
        }
    }
}

/*fonction qui appelle à chaque itération la fonction de création 
des miniatures de photos sur tout le contenu media.json*/

function photoDom(arrayMedia,name){        
    for(j=0;j<arrayMedia.length;j++){ 
        if(arrayMedia[j].photographerId == idPhoto){
            pictureFactory(arrayMedia[j],name);                                
        }
    }    
} 
  
/*fonction permettant de compter le total de like des photos */

function likeCount(arrayMedia){
    var totalLike = 0;
    for(j=0;j<arrayMedia.length;j++){ 
        if(arrayMedia[j].photographerId == idPhoto){
            totalLike += arrayMedia[j].likes;
        }
    } 
    return totalLike;
}

/*fonction permettant de changer le nombre de like d'une photo"*/

function likePicture(arrayMedia,idPicture){
    for(i=0;i<arrayMedia.length;i++){
        if(arrayMedia[i].id == idPicture){            
            arrayMedia[i].likes += 1;            
            document.getElementById(idPicture).innerHTML = arrayMedia[i].likes;

        }
    }
   
}



/*Requête permettant de lire et d'intéragir avec la base de donnée du site*/

var myfetch = fetch ('https://raw.githubusercontent.com/Frederic-Douville/FredericDouville_6_06092021/main/FishEyeData.json');
myfetch.then(response => {
    return response.json();
}).then(data => {
    console.log(data.photographers);
    console.log(data.media);
        
    bannerFactory(data.photographers);              
    var nameId= photoId(data.photographers);    
    photoDom(data.media,nameId);

    var likes = likeCount(data.media);
    document.getElementById('like-total').innerHTML = likes;

    var heartClass =document.getElementsByClassName('heart-svg');    
    Array.prototype.forEach.call(heartClass,el => el.addEventListener('click', event => {        
        var classHeart = event.currentTarget.getAttribute("class");        
        var classHeartArray = classHeart.split(' '); 
        var idPicture = classHeartArray[1]; 
        likePicture(data.media,idPicture);
        likes += 1;
        document.getElementById('like-total').innerHTML = likes;             
    }));

}).catch(err => {
    alert('error');
});