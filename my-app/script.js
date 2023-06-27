let itemsToShow = {
  dziritadi1: "informacia1",
  dziritadi2: "informacia2",
  dziritadi3: "informacia3",
  dziritadi4: "informacia4",
  dziritadi5: "informacia5",
  dziritadi6: "informacia6",
  dziritadi7: "informacia7",
  dziritadi8: "informacia8",
  dziritadi9: "informacia9",
  dziritadi10: "informacia10",
  dziritadi11: "informacia11",
  dziritadi12: "informacia12",
  dziritadi13: "informacia13",
  dziritadi14: "informacia14",
  dziritadi15: "informacia15",
  dziritadi16: "informacia16",
  dziritadi17: "informacia17",
  dziritadi18: "informacia18",
  dziritadi19: "informacia19",
  dziritadi20: "informacia20",
  dziritadi21: "informacia21",
  dziritadi22: "informacia22",
  dziritadi31: "informacia31",
  dziritadi32: "informacia32",
  dziritadi33: "informacia33",
  dziritadi34: "informacia34",
  dziritadi35: "informacia35",
  dziritadi36: "informacia36",
  dziritadiMain: "informaciaMain",
  dziritadiMain2: "informacia11",
  dziritadiMain20: "informaciaMain20",
};

let elements = document.querySelectorAll(".click__item");
elements.forEach(function (element) {
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

document.addEventListener("DOMContentLoaded", () => {
  const demografiaShow = document.getElementsByClassName("demografiaShow");
  for (let i = 0; i < demografiaShow.length; i++) {
    demografiaShow[i].addEventListener("click", () => {
      for (let j = 3; j < 9; j++) {
        const x = document.getElementById(`dziritadi${j}`);
        if (x.style.display === "block") {
          x.style.display = "none";
        } else {
          x.style.display = "block";
        }
      }
    });
  }
});


const demographchildItem = document.getElementById("dziritadi3");
demographchildItem.addEventListener("click", () => {
  const collection = document.getElementsByClassName("informacia3");
  for (let index = 0; index < collection.length; index++) {
    const element = collection[index];
    if (element.style.display === "block") {
      element.style.display = "none";
    } else {
      element.style.display = "block";
    }
    
  }
});

const demographchildItem4 = document.getElementById("dziritadi4");
demographchildItem4.addEventListener("click", () => {
  const collection = document.getElementsByClassName("informacia4");
  for (let index = 0; index < collection.length; index++) {
    const element = collection[index];
    if (element.style.display === "block") {
      element.style.display = "none";
    } else {
      element.style.display = "block";
    }
    
  }
});



function getIdChange() {
  console.log("rame");
}

let language = "ka";
const lang = document.getElementById("lang");
// const dziritadi1 = document.getElementById("dziritadi1");
// const info1 = document.getElementById("info1");
// const info2 = document.getElementById("info2");

function fetchData(lang) {
  axios
    .get(`http://localhost:3000/regions/?lang=${lang ? lang : "ka"}`)
    .then((response) => {
      // Handle the successful response
      updateTexts(response.data);

      // Update the map or perform any other actions with the response data
      // ...
    })
    .catch((error) => {
      // Handle any errors
      console.error(error);
    });
}

const main = document.getElementById("parent_main");

let data; // Declare the data variable in a higher scope
let dziri1tadi;
let info1macia;
let info2macia;
let dziri2tadi;
let info3macia;
let info4macia;
let info5macia;
let dziri3tadi;

async function updateTexts(data) {
  await data;
  dziri1tadi = data[0].basicInformation;
  info1macia = data[1].basicInformation;
  info2macia = data[2].basicInformation;
  dziri2tadi = data[0].population;
  info3macia = data[1].population;
  info4macia = data[2].population;
  info5macia = data[3].population;
  dziri3tadi = data[0].birth;

  dziritadi1.innerHTML = dziri1tadi;
  info1.innerHTML = info1macia;
  info2.innerHTML = info2macia;
  dziritadi2.innerHTML = dziri2tadi;
  info3.innerHTML = info3macia;
  info4.innerHTML = info4macia;
  info5.innerHTML = info5macia;
  dziritadi3.innerHTML = dziri3tadi;

  // Rest of the code...
}

function fetchDataAndInitialize(callback) {
  fetchData("ka", (fetchedData) => {
    data = fetchedData;
    if (typeof callback === "function") {
      callback();
    }
  });
}

fetchDataAndInitialize(updateTexts);

lang.addEventListener("click", () => {
  if (language === "ka") {
    language = "en";
    fetchData(language, (fetchedData) => {
      data = fetchedData;
      updateTexts();
    });
    sidetitle.innerHTML = "Statistic";
    // dziritadi1.innerHTML = dziri1tadi;
    // info1.innerHTML = info1macia;
    // info2.innerHTML = info2macia;
    // dziritadi2.innerHTML = dziri2tadi;
    // info3.innerHTML = info3macia;
    // info4.innerHTML = info4macia;
    // info5.innerHTML = info5macia;
    dziritadiMain.innerHTML = "Demography";
    // dziritadi3.innerHTML = dziri3tadi;

    // Rest of the code...
  } else {
    language = "ka";
    fetchData(language, (fetchedData) => {
      data = fetchedData;
      updateTexts();
    });
    sidetitle.innerHTML = "სტატისტიკა";
    // dziritadi1.innerHTML = dziri1tadi;
    // info1.innerHTML = info1macia;
    // info2.innerHTML = info2macia;
    // dziritadi2.innerHTML = dziri2tadi;
    // info3.innerHTML = info3macia;
    // info4.innerHTML = info4macia;
    // info5.innerHTML = info5macia;
    dziritadiMain.innerHTML = "დემოგრაფია";
    // dziritadi3.innerHTML = dziri3tadi;

    // Rest of the code...
  }
});
