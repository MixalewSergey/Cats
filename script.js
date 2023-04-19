


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
addForm.addEventListener("submit", e => {
    e.stopPropagation();
    e.preventDefault();
   
    addForm.elements.image.addEventListener("change", e => {
        const prevTag = addForm.querySelector(".preview");
        prevTag.style.backgroundImage = `url(${e.currentTarget.value})`;
    })


    //console.log(addForm);
    //console.log(e.currentTarget);
    //console.log(addForm.children);
    const body = {}
    for (let i = 0; i < addForm.elements.length; i++) {
        const el = addForm.elements[i];
        console.log(el.name, el.value);
        if (el.name) {
            body[el.name] = el.value
        }
    }
    console.log(body);
    
    fetch(path + "/ids")
    .then(res => res.json())
    .then(ids => {
        console.log(ids);
        body.id = ids[ids.length - 1] + 1;
        console.log(body);
        return fetch(path + "/add", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
    })    
    .then(res => {
        console.log(res.status);
        return res.json();
    })
    .then(data => {
        console.log(data);
    })
})


