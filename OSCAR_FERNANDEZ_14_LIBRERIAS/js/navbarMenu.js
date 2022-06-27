const burgerIcon = document.querySelector("#burguer")
const navbarMenu = document.querySelector("#navbarBasicExample")
const itemsMenu = document.querySelector("#dropdown")

burgerIcon.addEventListener("click", () => {
    navbarMenu.classList.toggle("is-active")
    itemsMenu.classList.toggle("is-active")
})
itemsMenu.addEventListener("click", () => {
    itemsMenu.classList.toggle("is-active")
})

