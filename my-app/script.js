let itemsToShow = {
  dziritadi1: "informacia1",
};

let element = document.getElementById("dziritadi1");
element.addEventListener("click", function (event) {
  let dziritadiel = event.target.id;
  if (
    window.event.target.style.background ==
    'url("https://cdn-icons-png.flaticon.com/512/32/32323.png") 98% 50% no-repeat'
  ) {
    window.event.target.style.background =
      "url('https://cdn-icons-png.flaticon.com/512/32/32195.png')  no-repeat";
    window.event.target.style.backgroundPosition = "96% 50%";
    window.event.target.style.backgroundSize = "18px 18px";
  } else {
    window.event.target.style.background =
      "url('https://cdn-icons-png.flaticon.com/512/32/32323.png') no-repeat";
    window.event.target.style.backgroundPosition = "98% 50%";
  }

  var informacia = document.querySelectorAll(`.${itemsToShow[dziritadiel]}`);
  if (informacia) {
    for (let i = 0; i < informacia.length; i++) {
      const element = informacia[i];
      if (element.style.display === "flex") {
        element.style.display = "none";
      } else {
        element.style.display = "flex";
      }
    }
  }
});

const sidepanel = document.getElementById("sidepanel");
const burgerBtn = document.getElementById("burger__btn");
const map = document.getElementById("map");
const burgerImg =
  '<img src="images/hamburger.png" alt="burgerIcon" style="width: 15px;">';
const burgerClose =
  '<img src="images/close.png" alt="burgerIcon" style="width: 15px;">';

burgerBtn.addEventListener("click", () => {
  if (sidepanel.style.display === "none") {
    sidepanel.style.display = "block";
    burgerBtn.innerHTML = burgerClose;
    map.style.width = "80%";
    burgerBtn.style.right = "23%";
  } else {
    sidepanel.style.display = "none";
    burgerBtn.innerHTML = burgerImg;
    burgerBtn.style.right = "4%";
    map.style.width = "100%";
  }
});
