const logOut = document.getElementById("singOut");
logOut.addEventListener("click", () => {
    localStorage.removeItem("name");
    window.location = "index.html";
})