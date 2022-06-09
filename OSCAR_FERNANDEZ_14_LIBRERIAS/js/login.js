if (localStorage.getItem("name")) {
  window.location = "list.html";
}

let saveNameLogin = document.getElementById("formNameStorage");
saveNameLogin.addEventListener("input", () => {
  JSON.stringify(localStorage.setItem("name", saveNameLogin.value));
});

let enter = document.getElementById("singInLogin");
enter.addEventListener("click", (e) => {
    e.preventDefault();
    const loadLogin = document.getElementById("spinner");
    const divSpinner = document.createElement("div");
    divSpinner.innerHTML = `<div class="circles-to-rhombuses-spinner">
                              <div class="circle"></div>
                              <div class="circle"></div>
                              <div class="circle"></div>
                              </div>`;
    loadLogin.appendChild(divSpinner);
    setTimeout(() => {
        window.location = "list.html";
      }, 4000);
});