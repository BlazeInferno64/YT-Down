const form = document.querySelector(".form");

const submitBtn = document.querySelector(".sub");
const clearBtn = document.querySelector(".clear");

const formatSelect = document.querySelector(".format");
const urlInput = document.querySelector(".url");


form.addEventListener("input", (e) => {
    if(urlInput.value.length <= 0){
        clearBtn.classList.add("none");
        submitBtn.classList.add("none");
    }
    else{
        submitBtn.classList.remove("none");
        clearBtn.classList.remove("none");
    }
})