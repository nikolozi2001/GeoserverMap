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

const demografiaShow = document.getElementsByClassName("demografiaShow");
// console.log(demografiaShow);

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

function updateTexts(data) {
  main.innerHTML = "";
  let counter = 1;
  Object.entries(data[0]).map(([key, value]) => {
    console.log(data[1].basicInformation);
    if (value !== 1) {
      main.insertAdjacentHTML(
        "beforeend",
        `
      <tr>
        <th class="click__item" id=dziritadi${counter} title="" data-toggle="popover" data-placement="top"
          data-trigger="hover" data-content="">
          ${value} <span class="float-right"></span>
          
        </th>
      </tr>
      <tr class="informacia${counter}">
      <td>
        ${data[1].basicInformation}
      </td>
      <td>
        <span class="float-right"><a class="region_download" href="">
            <img src="../images/excel-9-24.png" alt="exel" width="25" height="25"> </a></span>
      </td>
      </tr>
  `
      );
      counter++;
    }
  });
}

fetchData("ka");
lang.addEventListener("click", () => {
  if (language === "ka") {
    language = "en";
    fetchData(language);
    sessionStorage.setItem("lang", language);
    sidetitle.innerHTML = "Statistic"

    // dziritadi1.innerHTML = "Main Information";
    // info1.innerHTML = "Municipality area";
    // info2.innerHTML = "Number of settlements";
    // dziritadi2.innerHTML = "Population";
    // info3.innerHTML =
    //   "Number of population by urban-rural settlements as of 1 January";
    // info4.innerHTML =
    //   "Share of urban population in total population of the municipality (%)";
    // info5.innerHTML = "Density of population per 1 sq. km";
  } else {
    language = "ka";
    fetchData(language);
    sessionStorage.setItem("lang", language);
    sidetitle.innerHTML = "სტატისტიკა"
    // dziritadi1.innerHTML = "ძირითადი ინფორმაცია";
    // info1.innerHTML = "რეგიონის ფართობი";
    // info2.innerHTML = "მუნიციპალიტეტების, ქალაქების და სოფლების რაოდენობა";
    // dziritadi2.innerHTML = "მოსახლეობა";
    // info3.innerHTML =
    //   "მოსახლეობის რიცხოვნობა საქალაქო-სასოფლო დასახლებების მიხედვით 1 იანვრის მდგომარეობით";
    // info4.innerHTML =
    //   "საქალაქო დასახლებაში მცხოვრები მოსახლეობის წილი მუნიციპალიტეტის მთლიან მოსახლეობაში (%)";
    // info5.innerHTML = "მოსახლეობის სიმჭიდროვე 1 კვ.კმ-ზე";
  }
});

