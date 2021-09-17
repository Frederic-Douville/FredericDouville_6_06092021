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
})