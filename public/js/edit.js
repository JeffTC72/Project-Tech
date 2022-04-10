const gamecheck = document.querySelector('#gamecheck');

const overwatchOpt = document.querySelectorAll(".Overwatch");
const valorantOpt = document.querySelectorAll(".Valorant");
const apexOpt = document.querySelectorAll(".Apex");

if (gamecheck.classList.contains("Overwatch")){
    overwatchOpt.forEach(element => {
        element.classList.remove("hidden")
    })
    apexOpt.forEach(element => {
        element.classList.add("hidden")
    })
    valorantOpt.forEach(element => {
        element.classList.add("hidden")
    })
};
if (gamecheck.classList.contains("Valorant")){
    overwatchOpt.forEach(element => {
        element.classList.add("hidden")
    })
    apexOpt.forEach(element => {
        element.classList.add("hidden")
    })
    valorantOpt.forEach(element => {
        element.classList.remove("hidden")
    })
};
if (gamecheck.classList.contains("Apex")){
    overwatchOpt.forEach(element => {
        element.classList.add("hidden")
    })
    apexOpt.forEach(element => {
        element.classList.remove("hidden")
    })
    valorantOpt.forEach(element => {
        element.classList.add("hidden")
    })
};