


fetch(path + "/show")
    .then(function (res) {
        return res.json();
    })
    .then(function (data) {
        if (data.length) {
            for (let pet of data) {
                createCard(pet, block)
            }
        }
    })

addBtn.addEventListener("click", e => {
    mdBox.classList.toggle("active");
})
mdClose.addEventListener("click", e => {
    mdBox.classList.remove("active");
})
mdBox.addEventListener("click", e => {
    if (e.target === e.currentTarget) {
        mdBox.classList.remove("active")
    }
})
addForm.elements.image.addEventListener("change", e =>{
    prevTag.style.backgroundImage =`url(${e.currentTarget.value})`;
})
//addForm.elements.favorite.addEventListener("change", e => {
        //console.log(e.currentTarget.checked);(checked) выдает булевое значени в кнопках импут 
        //( удобно сразу передевать данные на сервер, если требуеться булевое значение )
    //})

addForm.addEventListener("submit", e => {
    e.stopPropagation();//всплытие пузырков , bubble effect
    e.preventDefault(); // останавливает действие по умолчанию ,запрограмированно браузером

   // addForm.elements.image.addEventListener("change", e => {
   //     const prevTag = addForm.querySelector(".preview");
   //     prevTag.style.backgroundImage = `url(${e.currentTarget.value})`;
   // })
    //console.log(addForm);
    //console.log(e.currentTarget);
    //console.log(addForm.children);(обращение ко всем дочерним тегам, прямые потомки)
   //console.log(addForm.elements);(элеменьты формы :imput / button / select / textarea )
    const body = {}
    for (let i = 0; i < addForm.elements.length; i++) {
        const el = addForm.elements[i];
        //console.log(el.name, el.value);
        if (el.name) {
            el.name ==="favorite" ? body[el.name]= el.checked : body[el.name] = el.value //отправка лайка при создание котика в тернарном виде
        }
            
    }
    //console.log(body);

    fetch(path + "/ids")// узнать инфу с сервера , выделить id   чтоб создать карту с номером макс длинны  + 1 
        .then(res => res.json())
        .then(ids => {
           // console.log(ids);
            body.id = ids[ids.length - 1] + 1;
           // console.log(body);
            return fetch(path + "/add", {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            })
        })
        .then(res => {
            if (res.status === 200){
            addForm.reset();
            prevTag.style = null;
            mdBox.classList.remove("active");
            createCard(body, block);
            }
           // console.log(res.status);
           //
        })
        .catch(err=>{
            console.log(err)
        })
})


