const overwatch = document.querySelector("#overwatch");
const valorant = document.querySelector("#valorant");
const apex = document.querySelector("#apex");

const overwatchOpt = document.querySelectorAll(".Overwatch");
const valorantOpt = document.querySelectorAll(".Valorant");
const apexOpt = document.querySelectorAll(".Apex");

overwatch.addEventListener('click', () => {
    if (overwatch.checked == true){
        overwatchOpt.forEach(element => {
            element.classList.remove("hidden")
        })
        apexOpt.forEach(element => {
            element.classList.add("hidden")
        })
        valorantOpt.forEach(element => {
            element.classList.add("hidden")
        })
    }
});
valorant.addEventListener('click', () => {
    if (valorant.checked == true){
        overwatchOpt.forEach(element => {
            element.classList.add("hidden")
        })
        apexOpt.forEach(element => {
            element.classList.add("hidden")
        })
        valorantOpt.forEach(element => {
            element.classList.remove("hidden")
        })
    }
});
apex.addEventListener('click', () => {
    if (apex.checked == true){
        overwatchOpt.forEach(element => {
            element.classList.add("hidden")
        })
        apexOpt.forEach(element => {
            element.classList.remove("hidden")
        })
        valorantOpt.forEach(element => {
            element.classList.add("hidden")
        })
    }
});