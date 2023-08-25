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

let itemsToShow2 = {
  dziritadi2_1: "informacia1",
  dziritadi2_2: "informacia2",
  dziritadi2_3: "informacia3",
  dziritadi2_4: "informacia4",
  dziritadi2_5: "informacia5",
  dziritadi2_6: "informacia6",
  dziritadi2_7: "informacia7",
  dziritadi2_8: "informacia8",
  dziritadi2_9: "informacia9",
  dziritadi2_10: "informacia10",
  dziritadi2_11: "informacia11",
  dziritadi2_12: "informacia12",
  dziritadi2_13: "informacia13",
  dziritadi2_14: "informacia14",
  dziritadi2_15: "informacia15",
  dziritadi2_16: "informacia16",
  dziritadi2_17: "informacia17",
  dziritadi2_18: "informacia18",
  dziritadi2_19: "informacia19",
  dziritadi2_20: "informacia20",
  dziritadi2_21: "informacia21",
  dziritadi2_22: "informacia22",
  dziritadi2_31: "informacia31",
  dziritadi2_32: "informacia32",
  dziritadi2_33: "informacia33",
  dziritadi2_34: "informacia34",
  dziritadi2_35: "informacia35",
  dziritadi2_36: "informacia36",
  dziritadiMainMunic: "informaciaMainMunic",
  dziritadiMainMunic2: "informaciaMainMunic2",
  dziritadiMainMunic3: "informaciaMainMunic3",
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

    var informacia2 = document.querySelectorAll(
      `.${itemsToShow2[dziritadiel]}`
    );
    if (informacia2) {
      informacia2.forEach(function (element) {
        if (element.style.display === "flex") {
          element.style.display = "none";
        } else {
          element.style.display = "flex";
        }
      });
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

document.addEventListener("DOMContentLoaded", () => {
  const demografiaShow2 = document.getElementsByClassName("demografiaShow2");
  for (let i = 0; i < demografiaShow2.length; i++) {
    demografiaShow2[i].addEventListener("click", () => {
      for (let j = 3; j < 9; j++) {
        const x = document.getElementById(`dziritadi2_${j}`);
        if (x.style.display === "block") {
          x.style.display = "none";
        } else {
          x.style.display = "block";
        }
      }
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const registerShowMunic =
    document.getElementsByClassName("registerShowMunic");
  for (let i = 0; i < registerShowMunic.length; i++) {
    registerShowMunic[i].addEventListener("click", () => {
      for (let j = 12; j < 15; j++) {
        const x = document.getElementById(`dziritadi2_${j}`);
        if (x.style.display === "block") {
          x.style.display = "none";
        } else {
          x.style.display = "block";
        }
      }
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const healthCareShowMunic = document.getElementsByClassName(
    "healthCareShowMunic"
  );
  for (let i = 0; i < healthCareShowMunic.length; i++) {
    healthCareShowMunic[i].addEventListener("click", () => {
      for (let j = 18; j < 20; j++) {
        const x = document.getElementById(`dziritadi2_${j}`);
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

const demographchildItem2_3 = document.getElementById("dziritadi2_3");
demographchildItem2_3.addEventListener("click", () => {
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

const demographchildItem2_4 = document.getElementById("dziritadi2_4");
demographchildItem2_4.addEventListener("click", () => {
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

const demographchildItem2_5 = document.getElementById("dziritadi2_5");
demographchildItem2_5.addEventListener("click", () => {
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

const demographchildItem2_6 = document.getElementById("dziritadi2_6");
demographchildItem2_6.addEventListener("click", () => {
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

const demographchildItem2_7 = document.getElementById("dziritadi2_7");
demographchildItem2_7.addEventListener("click", () => {
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

const demographchildItem2_8 = document.getElementById("dziritadi2_8");
demographchildItem2_8.addEventListener("click", () => {
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
  // Create two separate requests
  const request1 = axios.get(
    `http://localhost:3000/regions/?lang=${lang ? lang : "ka"}`
  );
  const request2 = axios.get(
    `http://localhost:3000/municipal/?lang=${lang ? lang : "ka"}`
  );

  // Execute both requests concurrently
  axios
    .all([request1, request2])
    .then(
      axios.spread((response1, response2) => {
        // Handle the responses of both requests
        const regionsData = response1.data;
        const municipalData = response2.data;

        // Update texts and perform other actions with the data
        updateTexts(regionsData);
        updateTexts2(municipalData);

        // ...
      })
    )
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

//municipalText
const main2 = document.getElementById("parent_main2");

// const dziritadi2_1 = document.getElementById("dziritadi2_1");
// const dziritadi2_1 = document.querySelectorAll(".dziritadi1");
// const dziritadi2_2 = document.querySelectorAll(".dziritadi2");

let data2; // Declare the data variable in a higher scope
let Dziri2_1tadi;
let info2_1macia;
let info2_2macia;
let Dziri2_2tadi;
let info2_3macia;
let info2_4macia;
let info2_5macia;
let dziri2_3tadi;
let info2_6macia;
let info2_7macia;
let info2_8macia;
let info2_9macia;
let info2_10macia;
let info2_11macia;
let dziri2_4tadi;
let info2_12macia;
let info2_13macia;
let info2_14macia;
let info2_15macia;
let info2_16macia;
let info2_17macia;
let info2_18macia;
let info2_19macia;
let info2_20macia;
let info2_21macia;
let dziri2_5tadi;
let info2_22macia;
let info2_23macia;
let dziri2_6tadi;
let info2_24macia;
let info2_25macia;
let info2_26macia;
let info2_27macia;
let dziri2_7tadi;
let info2_28macia;
let info2_29macia;
let info2_30macia;
let dziri2_8tadi;
let info2_31macia;
let info2_32macia;
let info2_33macia;
let info2_34macia;
let info2_35macia;
let info2_36macia;
let dziri2_9tadi;
let info2_37macia;
let info2_38macia;
let info2_39macia;
let dziri2_10tadi;
let info2_40macia;
let info2_41macia;
let info2_42macia;
let info2_43macia;
let info2_44macia;
let info2_45macia;
let info2_46macia;
let info2_47macia;
let dziri2_11tadi;
let info2_48macia;
let info2_49macia;
let info2_50macia;
let info2_51macia;
let dziri2_12tadi;
let info2_52macia;
let info2_53macia;
let dziri2_13tadi;
let info2_54macia;
let info2_55macia;
let info2_56macia;
let dziri2_14tadi;
let info2_57macia;
let info2_58macia;
let info2_59macia;
let dziritadi2_1excel;
let dziri2_15tadi;
let info2_60macia;
let info2_61macia;
let dziri2_16tadi;
let info2_62macia;
let info2_63macia;
let info2_64macia;
let info2_65macia;
let info2_66macia;
let info2_67macia;
let info2_68macia;
let dziri2_17tadi;
let info2_69macia;
let info2_70macia;
let info2_71macia;
let info2_72macia;
let dziritadi2_2excel;
let dziritadi3MainMunic;
let dziri2_18tadi;
let info2_73macia;
let info2_74macia;
let info2_75macia;
let info2_76macia;
let info2_77macia;
let info2_78macia;
let info2_79macia;
let info2_80macia;
let dziri2_19tadi;
let info2_81macia;
let info2_82macia;
let info2_83macia;
let info2_84macia;
let dziri2_20tadi;
let info2_85macia;
let info2_86macia;
let dziritadi2_3excel;

async function updateTexts2(data) {
  await data2;
  Dziri2_1tadi = data[0].basicInformation;
  info2_1macia = data[1].basicInformation;
  info2_2macia = data[2].basicInformation;
  Dziri2_2tadi = data[0].Population;
  info2_3macia = data[1].Population;
  info2_4macia = data[2].Population;
  info2_5macia = data[3].Population;
  dziri2_3tadi = data[0].birth;
  info2_6macia = data[1].birth;
  info2_7macia = data[2].birth;
  info2_8macia = data[3].birth;
  info2_9macia = data[4].birth;
  info2_10macia = data[5].birth;
  info2_11macia = data[6].birth;
  dziri2_4tadi = data[0].death;
  info2_12macia = data[1].death;
  info2_13macia = data[2].death;
  info2_14macia = data[3].death;
  info2_15macia = data[4].death;
  info2_16macia = data[5].death;
  info2_17macia = data[6].death;
  info2_18macia = data[7].death;
  info2_19macia = data[8].death;
  info2_20macia = data[9].death;
  info2_21macia = data[10].death;
  dziri2_5tadi = data[0].naturalIncrease;
  info2_22macia = data[1].naturalIncrease;
  info2_23macia = data[2].naturalIncrease;
  dziri2_6tadi = data[0].marriage;
  info2_24macia = data[1].marriage;
  info2_25macia = data[2].marriage;
  info2_26macia = data[3].marriage;
  info2_27macia = data[4].marriage;
  dziri2_7tadi = data[0].divorce;
  info2_28macia = data[1].divorce;
  info2_29macia = data[2].divorce;
  info2_30macia = data[3].divorce;
  dziri2_8tadi = data[0].populationDescription;
  info2_31macia = data[1].populationDescription;
  info2_32macia = data[2].populationDescription;
  info2_33macia = data[3].populationDescription;
  info2_34macia = data[4].populationDescription;
  info2_35macia = data[5].populationDescription;
  info2_36macia = data[6].populationDescription;
  dziri2_9tadi = data[0].employmentAndSalaries;
  info2_37macia = data[1].employmentAndSalaries;
  info2_38macia = data[2].employmentAndSalaries;
  info2_39macia = data[3].employmentAndSalaries;
  dziri2_10tadi = data[0].businessSector;
  info2_40macia = data[1].businessSector;
  info2_41macia = data[2].businessSector;
  info2_42macia = data[3].businessSector;
  info2_43macia = data[4].businessSector;
  info2_44macia = data[5].businessSector;
  info2_45macia = data[6].businessSector;
  info2_46macia = data[7].businessSector;
  info2_47macia = data[8].businessSector;
  dziri2_11tadi = data[0].businessRegister;
  info2_48macia = data[1].businessRegister;
  info2_49macia = data[2].businessRegister;
  info2_50macia = data[3].businessRegister;
  info2_51macia = data[4].businessRegister;
  dziri2_12tadi = data[0].accordingToTheTypesOfActivities;
  info2_52macia = data[1].accordingToTheTypesOfActivities;
  info2_53macia = data[2].accordingToTheTypesOfActivities;
  dziri2_13tadi = data[0].AccordingToTheFormsOfOwnership;
  info2_54macia = data[1].AccordingToTheFormsOfOwnership;
  info2_55macia = data[2].AccordingToTheFormsOfOwnership;
  info2_56macia = data[3].AccordingToTheFormsOfOwnership;
  dziri2_14tadi = data[0].accordingToOrganizationalLegalForms;
  info2_57macia = data[1].accordingToOrganizationalLegalForms;
  info2_58macia = data[2].accordingToOrganizationalLegalForms;
  info2_59macia = data[3].accordingToOrganizationalLegalForms;
  dziritadi2_1excel = data[0].agriculture;
  dziri2_15tadi = data[0].construction;
  info2_60macia = data[1].construction;
  info2_61macia = data[2].construction;
  dziri2_16tadi = data[0].trading;
  info2_62macia = data[1].trading;
  info2_63macia = data[2].trading;
  info2_64macia = data[3].trading;
  info2_65macia = data[4].trading;
  info2_66macia = data[5].trading;
  info2_67macia = data[6].trading;
  info2_68macia = data[7].trading;
  dziri2_17tadi = data[0].hotels;
  info2_69macia = data[1].hotels;
  info2_70macia = data[2].hotels;
  info2_71macia = data[3].hotels;
  info2_72macia = data[4].hotels;
  dziritadi2_2excel = data[0].transportAndStorage;
  dziritadi3MainMunic = data[0].healthCareAndSocialSecurity;
  dziri2_18tadi = data[1].healthCareAndSocialSecurity;
  info2_73macia = data[2].healthCareAndSocialSecurity;
  info2_74macia = data[3].healthCareAndSocialSecurity;
  info2_75macia = data[4].healthCareAndSocialSecurity;
  info2_76macia = data[5].healthCareAndSocialSecurity;
  info2_77macia = data[6].healthCareAndSocialSecurity;
  info2_78macia = data[7].healthCareAndSocialSecurity;
  info2_79macia = data[8].healthCareAndSocialSecurity;
  info2_80macia = data[9].healthCareAndSocialSecurity;
  dziri2_19tadi = data[10].healthCareAndSocialSecurity;
  info2_81macia = data[11].healthCareAndSocialSecurity;
  info2_82macia = data[12].healthCareAndSocialSecurity;
  info2_83macia = data[13].healthCareAndSocialSecurity;
  info2_84macia = data[14].healthCareAndSocialSecurity;
  dziri2_20tadi = data[0].education;
  info2_85macia = data[1].education;
  info2_86macia = data[2].education;
  dziritadi2_3excel = data[0].culture;

  dziritadi2_1.innerHTML = Dziri2_1tadi;
  info2_1.innerHTML = info2_1macia;
  info2_2.innerHTML = info2_2macia;
  dziritadi2_2.innerHTML = Dziri2_2tadi;
  info2_3.innerHTML = info2_3macia;
  info2_4.innerHTML = info2_4macia;
  info2_5.innerHTML = info2_5macia;
  dziritadi2_3.innerHTML = dziri2_3tadi;
  info2_6.innerHTML = info2_6macia;
  info2_7.innerHTML = info2_7macia;
  info2_8.innerHTML = info2_8macia;
  info2_9.innerHTML = info2_9macia;
  info2_10.innerHTML = info2_10macia;
  info2_11.innerHTML = info2_11macia;
  dziritadi2_4.innerHTML = dziri2_4tadi;
  info2_12.innerHTML = info2_12macia;
  info2_13.innerHTML = info2_13macia;
  info2_14.innerHTML = info2_14macia;
  info2_15.innerHTML = info2_15macia;
  info2_16.innerHTML = info2_16macia;
  info2_17.innerHTML = info2_17macia;
  info2_18.innerHTML = info2_18macia;
  info2_19.innerHTML = info2_19macia;
  info2_20.innerHTML = info2_20macia;
  info2_21.innerHTML = info2_21macia;
  dziritadi2_5.innerHTML = dziri2_5tadi;
  info2_22.innerHTML = info2_22macia;
  info2_23.innerHTML = info2_23macia;
  dziritadi2_6.innerHTML = dziri2_6tadi;
  info2_24.innerHTML = info2_24macia;
  info2_25.innerHTML = info2_25macia;
  info2_26.innerHTML = info2_26macia;
  info2_27.innerHTML = info2_27macia;
  dziritadi2_7.innerHTML = dziri2_7tadi;
  info2_28.innerHTML = info2_28macia;
  info2_29.innerHTML = info2_29macia;
  info2_30.innerHTML = info2_30macia;
  dziritadi2_8.innerHTML = dziri2_8tadi;
  info2_31.innerHTML = info2_31macia;
  info2_32.innerHTML = info2_32macia;
  info2_33.innerHTML = info2_33macia;
  info2_34.innerHTML = info2_34macia;
  info2_35.innerHTML = info2_35macia;
  info2_36.innerHTML = info2_36macia;
  dziritadi2_9.innerHTML = dziri2_9tadi;
  info2_37.innerHTML = info2_37macia;
  info2_38.innerHTML = info2_38macia;
  info2_39.innerHTML = info2_39macia;
  dziritadi2_10.innerHTML = dziri2_10tadi;
  info2_40.innerHTML = info2_40macia;
  info2_41.innerHTML = info2_41macia;
  info2_42.innerHTML = info2_42macia;
  info2_43.innerHTML = info2_43macia;
  info2_44.innerHTML = info2_44macia;
  info2_45.innerHTML = info2_45macia;
  info2_46.innerHTML = info2_46macia;
  info2_47.innerHTML = info2_47macia;
  dziritadi2_11.innerHTML = dziri2_11tadi;
  info2_48.innerHTML = info2_48macia;
  info2_49.innerHTML = info2_49macia;
  info2_50.innerHTML = info2_50macia;
  info2_51.innerHTML = info2_51macia;
  dziritadi2_12.innerHTML = dziri2_12tadi;
  info2_52.innerHTML = info2_52macia;
  info2_53.innerHTML = info2_53macia;
  dziritadi2_13.innerHTML = dziri2_13tadi;
  info2_54.innerHTML = info2_54macia;
  info2_55.innerHTML = info2_55macia;
  info2_56.innerHTML = info2_56macia;
  dziritadi2_14.innerHTML = dziri2_14tadi;
  info2_57.innerHTML = info2_57macia;
  info2_58.innerHTML = info2_58macia;
  info2_59.innerHTML = info2_59macia;
  dziritadi_excel2_1.innerHTML = dziritadi2_1excel;
  dziritadi2_15.innerHTML = dziri2_15tadi;
  info2_60.innerHTML = info2_60macia;
  info2_61.innerHTML = info2_61macia;
  dziritadi2_16.innerHTML = dziri2_16tadi;
  info2_62.innerHTML = info2_62macia;
  info2_63.innerHTML = info2_63macia;
  info2_64.innerHTML = info2_64macia;
  info2_65.innerHTML = info2_65macia;
  info2_66.innerHTML = info2_66macia;
  info2_67.innerHTML = info2_67macia;
  info2_68.innerHTML = info2_68macia;
  dziritadi2_17.innerHTML = dziri2_17tadi;
  info2_69.innerHTML = info2_69macia;
  info2_70.innerHTML = info2_70macia;
  info2_71.innerHTML = info2_71macia;
  info2_72.innerHTML = info2_72macia;
  dziritadi_excel2_2.innerHTML = dziritadi2_2excel;
  dziritadiMainMunic3.innerHTML = dziritadi3MainMunic;
  dziritadi2_18.innerHTML = dziri2_18tadi;
  info2_73.innerHTML = info2_73macia;
  info2_74.innerHTML = info2_74macia;
  info2_75.innerHTML = info2_75macia;
  info2_76.innerHTML = info2_76macia;
  info2_77.innerHTML = info2_77macia;
  info2_78.innerHTML = info2_78macia;
  info2_79.innerHTML = info2_79macia;
  info2_80.innerHTML = info2_80macia;
  dziritadi2_19.innerHTML = dziri2_19tadi;
  info2_81.innerHTML = info2_81macia;
  info2_82.innerHTML = info2_82macia;
  info2_83.innerHTML = info2_83macia;
  info2_84.innerHTML = info2_84macia;
  dziritadi2_20.innerHTML = dziri2_20tadi;
  info2_85.innerHTML = info2_85macia;
  info2_86.innerHTML = info2_86macia;
  dziritadi_excel2_3.innerHTML = dziritadi2_3excel;
}

function fetchDataAndInitialize(callback) {
  fetchData("ka", (fetchedData) => {
    data = fetchedData;
    if (typeof callback === "function") {
      callback();
    }
  });
}

fetchDataAndInitialize(updateTexts, updateTexts2);
let popup = document.getElementById("popup");

lang.addEventListener("click", () => {
  popup.style.display = "none";
  if (language === "ka") {
    language = "en";
    fetchData(language, (fetchedData) => {
      data = fetchedData;
      updateTexts();
      updateTexts2();
    });
    // sidetitle.innerHTML = "Statistic";
    dziritadiMain.innerHTML = "Demography";
    dziritadiMainMunic.innerHTML = "Demography";
  } else {
    language = "ka";
    fetchData(language, (fetchedData) => {
      data = fetchedData;
      updateTexts();
      updateTexts2();
    });
    // sidetitle.innerHTML = "სტატისტიკა";
    dziritadiMain.innerHTML = "დემოგრაფია";
    dziritadiMainMunic.innerHTML = "დემოგრაფია";
  }
  sessionStorage.setItem("lang1", language);
  console.log(language, "language");
});

// Apply styles to elements with class name informacia1 to informacia18 within a media query
const mediaQuery = window.matchMedia("(max-width: 768px)"); // Adjust the media query as needed

function applyStylesToInformaciaElements() {
  const informaciaElements = document.querySelectorAll(
    ".informacia1, .informacia2, .informacia3, .informacia4, .informacia5, .informacia6, .informacia7, .informacia8, .informacia9, .informacia10, .informacia11, .informacia12, .informacia13, .informacia14, .informacia15, .informacia16, .informacia17, .informacia18"
  );

  informaciaElements.forEach((element) => {
    element.style.width = "98%";
    element.style.maxWidth = "600px"; // Optional: Set a maximum width if needed
    element.style.margin = "0 auto"; // Optional: Center horizontally if desired
    // Add other styles as needed
  });
}

function handleMediaQueryChange(e) {
  if (e.matches) {
    applyStylesToInformaciaElements();
  } else {
    // Reset styles if needed when the media query no longer matches
    const informaciaElements = document.querySelectorAll(
      ".informacia1, .informacia2, .informacia3, .informacia4, .informacia5, .informacia6, .informacia7, .informacia8, .informacia9, .informacia10, .informacia11, .informacia12, .informacia13, .informacia14, .informacia15, .informacia16, .informacia17, .informacia18"
    );

    informaciaElements.forEach((element) => {
      element.style.width = ""; // Reset width
      element.style.maxWidth = ""; // Reset max width
      element.style.margin = ""; // Reset margin
      // Reset other styles as needed
    });
  }
}

mediaQuery.addListener(handleMediaQueryChange); // Attach listener to the media query
handleMediaQueryChange(mediaQuery); // Call the function initially based on the media query state


function applyStylesToDziritadiElements() {
  for (let i = 1; i <= 18; i++) {
    const dziritadiElement = document.getElementById(`dziritadi${i}`);
    if (dziritadiElement) {
      dziritadiElement.style.width = '150px';
      dziritadiElement.style.maxWidth = '600px'; // Optional: Set a maximum width if needed
      dziritadiElement.style.margin = '0 auto'; // Optional: Center horizontally if desired
      dziritadiElement.style.fontSize = '0.5em';
      // Add other styles as needed
    }
  }
}

function handleMediaQueryChangeDziritadi(o) {
  if (o.matches) {
    applyStylesToDziritadiElements();
  } else {
    // Reset styles if needed when the media query no longer matches
    for (let i = 1; i <= 18; i++) {
      const dziritadiElement = document.getElementById(`dziritadi${i}`);
      if (dziritadiElement) {
        dziritadiElement.style.width = ''; // Reset width
        dziritadiElement.style.maxWidth = ''; // Reset max width
        dziritadiElement.style.margin = ''; // Reset margin
        dziritadiElement.style.fontSize = '';
        // Reset other styles as needed
      }
    }
  }
}

mediaQuery.addListener(handleMediaQueryChangeDziritadi); // Attach listener to the media query
handleMediaQueryChangeDziritadi(mediaQuery); // Call the function initially based on the media query state
