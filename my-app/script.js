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
    if (element.style.display === "flex") {
      element.style.display = "none";
    } else {
      element.style.display = "flex";
    }
  }
});

const demographchildItem4 = document.getElementById("dziritadi4");
demographchildItem4.addEventListener("click", () => {
  const collection = document.getElementsByClassName("informacia4");
  for (let index = 0; index < collection.length; index++) {
    const element = collection[index];
    if (element.style.display === "flex") {
      element.style.display = "none";
    } else {
      element.style.display = "flex";
    }
  }
});

const demographchildItem5 = document.getElementById("dziritadi5");
demographchildItem5.addEventListener("click", () => {
  const collection = document.getElementsByClassName("informacia5");
  for (let index = 0; index < collection.length; index++) {
    const element = collection[index];
    if (element.style.display === "flex") {
      element.style.display = "none";
    } else {
      element.style.display = "flex";
    }
  }
});

const demographchildItem6 = document.getElementById("dziritadi6");
demographchildItem6.addEventListener("click", () => {
  const collection = document.getElementsByClassName("informacia6");
  for (let index = 0; index < collection.length; index++) {
    const element = collection[index];
    if (element.style.display === "flex") {
      element.style.display = "none";
    } else {
      element.style.display = "flex";
    }
  }
});

const demographchildItem7 = document.getElementById("dziritadi7");
demographchildItem7.addEventListener("click", () => {
  const collection = document.getElementsByClassName("informacia7");
  for (let index = 0; index < collection.length; index++) {
    const element = collection[index];
    if (element.style.display === "flex") {
      element.style.display = "none";
    } else {
      element.style.display = "flex";
    }
  }
});

const demographchildItem8 = document.getElementById("dziritadi8");
demographchildItem8.addEventListener("click", () => {
  const collection = document.getElementsByClassName("informacia8");
  for (let index = 0; index < collection.length; index++) {
    const element = collection[index];
    if (element.style.display === "flex") {
      element.style.display = "none";
    } else {
      element.style.display = "flex";
    }
  }
});

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
let info6macia;
let info7macia;
let info8macia;
let info9macia;
let info10macia;
let info11macia;
let dziri4tadi;
let info12macia;
let info13macia;
let info14macia;
let info15macia;
let info16macia;
let info17macia;
let info18macia;
let info19macia;
let info20macia;
let info21macia;
let dziri5tadi;
let info22macia;
let info23macia;
let dziri6tadi;
let info24macia;
let info25macia;
let info26macia;
let info27macia;
let dziri7tadi;
let info28macia;
let info29macia;
let info30macia;
let dziri8tadi;
let info31macia;
let info32macia;
let info33macia;
let info34macia;
let info35macia;
let info36macia;
let dziritadi1excel;
let dziritadi2excel;
let dziri9tadi;
let info37macia;
let info38macia;
let dziri10tadi;
let info39macia;
let info40macia;
let info41macia;
let info42macia;
let dziri11tadi;
let info43macia;
let info44macia;
let dziri12tadi;
let info45macia;
let info46macia;
let info47macia;
let businessRegister;
let dziri13tadi;
let info48macia;
let info49macia;
let info50macia;
let info51macia;
let dziritadi3excel;
let dziri14tadi;
let info52macia;
let info53macia;
let info54macia;
let dziri15tadi;
let info55macia;
let info56macia;
let info57macia;
let info58macia;
let info59macia;
let info60macia;
let info61macia;
let dziritadi4excel;
let dziri16tadi;
let info62macia;
let info63macia;
let info64macia;
let info65macia;
let info66macia;
let dziri17tadi;
let info67macia;
let info68macia;
let info69macia;
let dziri18tadi;
let info70macia;
let info71macia;
let dziritadi5excel;
let dziritadi6excel;
let dziritadi7excel;
let dziritadi8excel;
let dziritadi9excel;
let dziritadi10excel;

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
  info6macia = data[1].birth;
  info7macia = data[2].birth;
  info8macia = data[3].birth;
  info9macia = data[4].birth;
  info10macia = data[5].birth;
  info11macia = data[6].birth;
  dziri4tadi = data[0].death;
  info12macia = data[1].death;
  info13macia = data[2].death;
  info14macia = data[3].death;
  info15macia = data[4].death;
  info16macia = data[5].death;
  info17macia = data[6].death;
  info18macia = data[7].death;
  info19macia = data[8].death;
  info20macia = data[9].death;
  info21macia = data[10].death;
  dziri5tadi = data[0].naturalIncrease;
  info22macia = data[1].naturalIncrease;
  info23macia = data[2].naturalIncrease;
  dziri6tadi = data[0].marriage;
  info24macia = data[1].marriage;
  info25macia = data[2].marriage;
  info26macia = data[3].marriage;
  info27macia = data[4].marriage;
  dziri7tadi = data[0].divorce;
  info28macia = data[1].divorce;
  info29macia = data[2].divorce;
  info30macia = data[3].divorce;
  dziri8tadi = data[0].populationDescription;
  info31macia = data[1].populationDescription;
  info32macia = data[2].populationDescription;
  info33macia = data[3].populationDescription;
  info34macia = data[4].populationDescription;
  info35macia = data[5].populationDescription;
  info36macia = data[6].populationDescription;
  dziritadi1excel = data[0].gdbAndValueAdded;
  dziritadi2excel = data[0].foreignDirectInvestment;
  dziri9tadi = data[0].employmentAndSalaries;
  info37macia = data[1].employmentAndSalaries;
  info38macia = data[2].employmentAndSalaries;
  dziri10tadi = data[0].pricesAndInflation;
  info39macia = data[1].pricesAndInflation;
  info40macia = data[2].pricesAndInflation;
  info41macia = data[3].pricesAndInflation;
  info42macia = data[4].pricesAndInflation;
  dziri11tadi = data[0].standartOfLiving;
  info43macia = data[1].standartOfLiving;
  info44macia = data[2].standartOfLiving;
  dziri12tadi = data[0].businessSector;
  info45macia = data[1].businessSector;
  info46macia = data[2].businessSector;
  info47macia = data[3].businessSector;
  businessRegister = data[0].businessRegister;
  dziri13tadi = data[0].agriculture;
  info48macia = data[1].agriculture;
  info49macia = data[2].agriculture;
  info50macia = data[3].agriculture;
  info51macia = data[4].agriculture;
  dziritadi3excel = data[0].industry;
  dziri14tadi = data[0].construction;
  info52macia = data[1].construction;
  info53macia = data[2].construction;
  info54macia = data[3].construction;
  dziri15tadi = data[0].service;
  info55macia = data[1].service;
  info56macia = data[2].service;
  info57macia = data[3].service;
  info58macia = data[4].service;
  info59macia = data[5].service;
  info60macia = data[6].service;
  info61macia = data[7].service;
  dziritadi4excel = data[0].trading;
  dziri16tadi = data[0].hotelsAndRestaurants;
  info62macia = data[1].hotelsAndRestaurants;
  info63macia = data[2].hotelsAndRestaurants;
  info64macia = data[3].hotelsAndRestaurants;
  info65macia = data[4].hotelsAndRestaurants;
  info66macia = data[5].hotelsAndRestaurants;
  dziri17tadi = data[0].transportAndStorage;
  info67macia = data[1].transportAndStorage;
  info68macia = data[2].transportAndStorage;
  info69macia = data[3].transportAndStorage;
  dziri18tadi = data[0].tourism;
  info70macia = data[1].tourism;
  info71macia = data[2].tourism;
  dziritadi5excel = data[0].legalStatistics;
  dziritadi6excel = data[0].healthCareAndSocialSecurity;
  dziritadi7excel = data[0].education;
  dziritadi8excel = data[0].culture;
  dziritadi9excel = data[0].environmentalProtection;
  dziritadi10excel = data[0].infrastructure;

  dziritadi1.innerHTML = dziri1tadi;
  info1.innerHTML = info1macia;
  info2.innerHTML = info2macia;
  dziritadi2.innerHTML = dziri2tadi;
  info3.innerHTML = info3macia;
  info4.innerHTML = info4macia;
  info5.innerHTML = info5macia;
  dziritadi3.innerHTML = dziri3tadi;
  info6.innerHTML = info6macia;
  info7.innerHTML = info7macia;
  info8.innerHTML = info8macia;
  info9.innerHTML = info9macia;
  info10.innerHTML = info10macia;
  info11.innerHTML = info11macia;
  dziritadi4.innerHTML = dziri4tadi;
  info12.innerHTML = info12macia;
  info13.innerHTML = info13macia;
  info14.innerHTML = info14macia;
  info15.innerHTML = info15macia;
  info16.innerHTML = info16macia;
  info17.innerHTML = info17macia;
  info18.innerHTML = info18macia;
  info19.innerHTML = info19macia;
  info20.innerHTML = info20macia;
  info21.innerHTML = info21macia;
  dziritadi5.innerHTML = dziri5tadi;
  info22.innerHTML = info22macia;
  info23.innerHTML = info23macia;
  dziritadi6.innerHTML = dziri6tadi;
  info24.innerHTML = info24macia;
  info25.innerHTML = info25macia;
  info26.innerHTML = info26macia;
  info27.innerHTML = info27macia;
  dziritadi7.innerHTML = dziri7tadi;
  info28.innerHTML = info28macia;
  info29.innerHTML = info29macia;
  info30.innerHTML = info30macia;
  dziritadi8.innerHTML = dziri8tadi;
  info31.innerHTML = info31macia;
  info32.innerHTML = info32macia;
  info33.innerHTML = info33macia;
  info34.innerHTML = info34macia;
  info35.innerHTML = info35macia;
  info36.innerHTML = info36macia;
  dziritadi_excel1.innerHTML = dziritadi1excel;
  dziritadi_excel2.innerHTML = dziritadi2excel;
  dziritadi9.innerHTML = dziri9tadi;
  info37.innerHTML = info37macia;
  info38.innerHTML = info38macia;
  dziritadi10.innerHTML = dziri10tadi;
  info39.innerHTML = info39macia;
  info40.innerHTML = info40macia;
  info41.innerHTML = info41macia;
  info42.innerHTML = info42macia;
  dziritadi11.innerHTML = dziri11tadi;
  info43.innerHTML = info43macia;
  info44.innerHTML = info44macia;
  dziritadi12.innerHTML = dziri12tadi;
  info45.innerHTML = info45macia;
  info46.innerHTML = info46macia;
  info47.innerHTML = info47macia;
  businessLink.innerHTML = businessRegister;
  dziritadi13.innerHTML = dziri13tadi;
  info48.innerHTML = info48macia;
  info49.innerHTML = info49macia;
  info50.innerHTML = info50macia;
  info51.innerHTML = info51macia;
  dziritadi_excel3.innerHTML = dziritadi3excel;
  dziritadi14.innerHTML = dziri14tadi;
  info52.innerHTML = info52macia;
  info53.innerHTML = info53macia;
  info54.innerHTML = info54macia;
  dziritadi15.innerHTML = dziri15tadi;
  info55.innerHTML = info55macia;
  info56.innerHTML = info56macia;
  info57.innerHTML = info57macia;
  info58.innerHTML = info58macia;
  info59.innerHTML = info59macia;
  info60.innerHTML = info60macia;
  info61.innerHTML = info61macia;
  dziritadi_excel4.innerHTML = dziritadi4excel;
  dziritadi16.innerHTML = dziri16tadi;
  info62.innerHTML = info62macia;
  info63.innerHTML = info63macia;
  info64.innerHTML = info64macia;
  info65.innerHTML = info65macia;
  info66.innerHTML = info66macia;
  dziritadi17.innerHTML = dziri17tadi;
  info67.innerHTML = info67macia;
  info68.innerHTML = info68macia;
  info69.innerHTML = info69macia;
  dziritadi18.innerHTML = dziri18tadi;
  info70.innerHTML = info70macia;
  info71.innerHTML = info71macia;
  dziritadi_excel5.innerHTML = dziritadi5excel;
  dziritadi_excel6.innerHTML = dziritadi6excel;
  dziritadi_excel7.innerHTML = dziritadi7excel;
  dziritadi_excel8.innerHTML = dziritadi8excel;
  dziritadi_excel9.innerHTML = dziritadi9excel;
  dziritadi_excel10.innerHTML = dziritadi10excel;
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
    dziritadiMain.innerHTML = "Demography";
  } else {
    language = "ka";
    fetchData(language, (fetchedData) => {
      data = fetchedData;
      updateTexts();
    });
    sidetitle.innerHTML = "სტატისტიკა";
    dziritadiMain.innerHTML = "დემოგრაფია";
  }
  sessionStorage.setItem("lang1", language);
});
