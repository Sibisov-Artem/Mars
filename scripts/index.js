const root = document.querySelector('.root');

root.addEventListener("mousemove", (e) => {
    let leftLimit = window.innerWidth * 0.35;
    let rightLimit = window.innerWidth * 0.65;
    if (e.clientX < leftLimit) {
        root.style.backgroundPositionX = "-5vw";
    } else if (e.clientX > rightLimit) {
        root.style.backgroundPositionX = "-25vw";
    } else {
        root.style.backgroundPositionX = "-15vw";
    }
});