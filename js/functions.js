/**
 Полиморфный код - переиспользование кода (функций ,классы)
 Инкапсуляция -код не должен выполнять то что от него не требуются 
 пример:
 sum(a,b){
    console.log(a+b)-плохо
    return a+b
 }
 */
function createCard(pet, tag) {
    const card = document.createElement("div");
    card.className = "card";
    const cardImg = document.createElement("div");
    cardImg.className = "pic";
    if (pet.image) {
        cardImg.style.backgroundImage = `url(${pet.image})`;
    } else {
        cardImg.classList.add("tmp");
    }
    const cardTitle = document.createElement("h2");
    cardTitle.innerText = pet.name

    const cardLike = document.createElement("i");
    cardLike.className = "fa-heart like";
    cardLike.classList.add(pet.favorite ? "fa-solid" : "fa-regular");
    cardLike.addEventListener("click", e => {
        setLike(cardLike, pet.id, !pet.favorite);
    })
    const delCats = document.createElement("i");
    delCats.className = "fa-solid fa-skull-crossbones delcats"
    delCats.addEventListener("click", e =>{
        e.stopPropagation();
        let isDelete = confirm(
          `Вы уверены, что хотите удалить котика с именем ${pet.name} ?`
        );
        if (isDelete){
        deleteCard(pet.id, card);
    }
    })

    card.append(cardImg, cardTitle, cardLike, delCats);
    tag.append(card);
}


function setLike(el, id, like) {

    el.classList.toggle("fa-solid");
    el.classList.toggle("fa-regular");

    fetch(path + "/update/" + id, {
        method: "put",
        //без headers на сервер прийдет undefined

        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify({favorite: like})
    })
        .then(res => res.json())
        .then(data => {
           // console.log(data);
        })

}
function deleteCard(id, el){
    if (id) {
        fetch(`${path}/delete/${id}`, {
            method: "delete"
        })
            .then(res => {
                if (res.status === 200) {
                    el.remove();
                   
                }
            })
    }}