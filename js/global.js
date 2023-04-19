const block = document.querySelector(".wrapper");
const addBtn = document.querySelector(".add");
const mdBox = document.querySelector(".modal-block");
const mdClose = mdBox.querySelector(".modal-close");
const addForm =document.forms.add;



let name = "greyfenix"
let path = `https://cats.petiteweb.dev/api/single/${name}`;
/**
 * JSON.stringofy(obj)- преобразует объект в строку
 * JSON.parse(str)- преобразует строку в объект( в строке каждое слово должно быть обертнуто в ковычки )
 */