/*fonction faisant apparaitre l'encre de haut de page lors du scrolling vers le bas*/

const scrollLink = document.getElementById("scroll-link");

window.addEventListener("scroll",function(){
    if(window.scrollY > 100){        
        scrollLink.style.display = "block";
    }else{
        scrollLink.style.display = "none";
    }
},false);

/*fonction de création des vignettes de photographes*/

function thumbnailFactory(array){
    for(i=0;i<array.length;i++){
    document.getElementById("portrait_"+i).src ="./public/img/Sample Photos/Photographers ID Photos/" + array[i].portrait ;
    document.getElementById("name_"+i).innerHTML = array[i].name;
    document.getElementById("place_"+i).innerHTML = array[i].city + ", " + array[i].country;
    document.getElementById("tagline_"+i).innerHTML = array[i].tagline ;
    document.getElementById("price_"+i).innerHTML = array[i].price + "&euro;/jour";
  
    var tagArray=[];
    tagArray=array[i].tags;
    for(j=0;j<tagArray.length;j++){                     
            tagFactory(tagArray[j],i);
        }  
    }
    
}

/*fonction de création des tags*/

function tagFactory(tagArray,index){           
    var tagDiv = document.createElement("div");
    tagDiv.className = 'tag tag-tbn' + " " + tagArray;     

    var tagContent = document.createTextNode("#"+tagArray);
    tagDiv.appendChild(tagContent);

    var tagCtn = document.getElementById('tag-ctn_'+index);
    tagCtn.appendChild(tagDiv);   
}

/*Déclaration d'une variable globale stockant le nom du tag cliqué*/

var tag = '';

/*récupération de l'intitulé du tag */

const urlIndex = window.location.href;
var urlArray = urlIndex.split('?');
var tagFromUrl = '';

urlArrayVerif(urlArray);

function urlArrayVerif(urlarray){
    if(urlarray.length == 2){
        tagFromUrl = urlArray[1];
    }else{
        tagFromUrl = '';
    }
}

/*fonction permettant de filtrer les vignettes en fonctions du tag cliqué */

function tagFilter(array){
    //console.log(tag);            
    for(i=0;i<array.length;i++){
        var tagArray=[];
        tagArray=array[i].tags;            
        for(j=0;j<tagArray.length;j++){
            if(tag == tagArray[j]){               
                document.getElementById(array[i].id).style.display="flex";
                break;
            }else{
                document.getElementById(array[i].id).style.display="none";                
            }
        }
    }  
           
}

/*Requête permettant de lire 
et d'intéragir avec la base de donnée du site*/
var myfetch = fetch ('https://raw.githubusercontent.com/Frederic-Douville/FredericDouville_6_06092021/main/FishEyeData.json');

myfetch.then(response => {
    return response.json();
}).then(data => {
    //console.log(data.photographers);    
    thumbnailFactory(data.photographers);  

    /*condition si intitulé de tag est présent dans url*/ 
    if(tagFromUrl !== ''){
        tag += tagFromUrl;
        tagFilter(data.photographers);
    }

    /*fonction appelé lors d'un click sur les tags des headers */

    var tagClass =document.getElementsByClassName('tag');
    Array.prototype.forEach.call(tagClass,el => el.addEventListener('click', event => {        
        var classTag = event.target.getAttribute("class");
        var strTag = classTag.split(' '); 
        if (tag == null){
            tag += strTag[2];
        }else{
            tag='';
            tag += strTag[2];
        };
        tagFilter(data.photographers);         
    }));    
    
}).catch(err => {
    alert('error');
});

/* Transmettre l'ID des photographes dans le href des liens des vignettes*/


