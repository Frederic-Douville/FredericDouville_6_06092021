function tagFactory(tagArray,index){
    //console.log(tagArray);
    //for(i=0;i<tagArray.length;i++){        
        var tagDiv = document.createElement("div");
        tagDiv.className = 'tag tag-tbn';

        var tagContent = document.createTextNode("#"+tagArray);
        tagDiv.appendChild(tagContent);

        var tagCtn = document.getElementById('tag-ctn_'+index);
        tagCtn.appendChild(tagDiv);     
    //}
}


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
            console.log(tagArray);            
            tagFactory(tagArray[j],i);
        }  
    }
}

fetch ('../FishEyeData.json').then(response => {
    return response.json();
}).then(data => {
    console.log(data);
    thumbnailFactory(data.photographers);   
   
}).catch(err => {
    alert('error');
});


