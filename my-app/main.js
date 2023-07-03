import Map from "ol/Map.js";
import OSM from "ol/source/OSM.js";
import Overlay from "ol/Overlay.js";
import TileLayer from "ol/layer/Tile.js";
import View from "ol/View.js";
import { fromLonLat, toLonLat } from "ol/proj.js";
import { toStringHDMS } from "ol/coordinate.js";
import TileWMS from "ol/source/TileWMS";
import axios from "axios";
import ScaleLine from "ol/control/ScaleLine.js";
import { FullScreen, defaults as defaultControls } from "ol/control.js";

const layer = new TileLayer({
  source: new OSM(),
});

//add municipaliteties map
var wmsURL = "http://localhost:8080/geoserver/Overlay/wms";

const wmsSource = new TileWMS({
  url: wmsURL,
  extent: [-13884991, 2870341, -7455066, 6338219],
  params: {
    // 'FORMAT': format,
    VERSION: "1.1.0",
    STYLES: "",
    LAYERS: "Overlay:munic",
    TILED: true,
  },
  serverType: "geoserver",
  // Countries have transparency, so do not fade tiles:
  transition: 0,
  // crossOrigin: 'anonymous',
});

//regions layer

const wmsSource2 = new TileWMS({
  url: wmsURL,
  extent: [-13884991, 2870341, -7455066, 6338219],
  params: {
    // 'FORMAT': format,
    VERSION: "1.1.0",
    STYLES: "",
    LAYERS: "Overlay:georgia1",
    TILED: true,
  },
  serverType: "geoserver",
  // Countries have transparency, so do not fade tiles:
  transition: 0,
  // crossOrigin: 'anonymous',
});

const wmsLayer = new TileLayer({
  source: wmsSource,
  minZoom: 9.5,
});

const wmsLayer2 = new TileLayer({
  source: wmsSource2,
  // minZoom: 9.5,
});

const closer = document.getElementById("popup");

closer.onclick = function () {
  popup.setPosition(undefined);
  closer.blur();
  return false;
};

var view = null;
// console.log(window.innerWidth);

// Check if the screen width is below a certain threshold
if (window.innerWidth < 900) {
  view = new View({
    center: [44888888, 5172947],
    zoom: 7,
  });
} else {
  view = new View({
    center: [44799999, 5172947],
    zoom: 8,
  });
}

const map = new Map({
  layers: [layer, wmsLayer, wmsLayer2],
  target: "map",
  view: view,
  controls: defaultControls().extend([
    new FullScreen({
      source: "fullscreen",
    }),
  ]),
});

const pos = fromLonLat([44.797886, 41.72947]);

// Popup showing the position the user clicked
const popup = new Overlay({
  element: document.getElementById("popup"),
});
map.addOverlay(popup);

const element = popup.getElement();

map.on("click", function (evt) {
  const viewResolution = /** @type {number} */ (view.getResolution());
  const url = wmsSource.getFeatureInfoUrl(
    evt.coordinate,
    viewResolution,
    "EPSG:3857",
    { INFO_FORMAT: "text/html" }
  );
  // console.log(url, "url");
  // console.log(viewResolution);

  function createElementFromHTML(htmlString) {
    let node = new DOMParser()
      .parseFromString(htmlString, "text/html")
      .body.querySelector(".featureInfo");
    var arr = {};
    // console.log("node", node);

    var objCells = node.rows.item(1).cells;
    // console.log("objCells", objCells);
    let titles = node.getElementsByTagName("th");
    // console.log("titles", titles);
    for (var j = 0; j < objCells.length; j++) {
      let title = titles[j].innerHTML;
      arr[title] = objCells.item(j).innerHTML;
    }
    // console.log("arr", arr);
    return arr;
  }

  axios({
    method: "get",
    headers: { "Content-Type": null },
    url: url,
  }).then(function (response) {
    const firstColumn = response.data;
    // console.log(firstColumn, firstColumn);
    // console.log("response data",response.data);
    var table = createElementFromHTML(response.data);
    // console.log("table", table);
    let result = null;

    if (viewResolution > 192.6092418558059) {
      result = table.REGION_ID;
    } else {
      result = table.MUNICIPAL1;
    }

    // let result = firstColumn.substring(1026, 1030);
    // if (result === ">4") {
    //   result = 47;
    // }
    // if (result === ">1") {
    //   result = 11;
    // }
    // console.log(result, "result");

    const regionView = document.getElementById("parent_main");
    // const municipalView = document.getElementById("parent_main2");

    if (viewResolution > 192.6092418558059) {
      regionView.style.display = "block";
      // municipalView.style.display = "none";
    } else {
      regionView.style.display = "none";
      // municipalView.style.display = "block";
    }

    // regionDonwlaod[0].href = `/regions/${result}/dziritadi%20informacia/regionis%20fartobi.xlsx`;
    // regionDonwlaod[1].href = `/regions/${result}/dziritadi%20informacia/municipalitetebis,%20qalaqebis%20da%20soflebis%20raodenoba.xlsx`;
    // regionDonwlaod[2].href = `/regions/${result}/mosakhleoba/მოსახლეობის%20რიცხოვნობა.xlsx`;
    // regionDonwlaod[3].href = `/regions/${result}/mosakhleoba/საქალაქო%20დასახლებაში%20მცხოვრები.xlsx`;
    // regionDonwlaod[4].href = `/regions/${result}/mosakhleoba/მოსახლეობის%20სიმჭიდროვე.xlsx`;

    // regionDonwlaod[1].href = `/regions/regions/${result}/dziritadi%20informacia/`

    let lang1 = sessionStorage.getItem("lang1");
    const regionDonwlaod = document.querySelectorAll(".region_download");
    regionDonwlaod.forEach((item) => {
      item.addEventListener("click", (event) => {
        if (result) {
          lang1 = sessionStorage.getItem("lang1");
          // console.log(lang1);
          if (lang1 === "en") {
            regionDonwlaod[0].href = `/regionseng/${result}/main%20information/area.xlsx`;
            regionDonwlaod[1].href = `/regionseng/${result}/main%20information/number%20of%20settlements.xlsx`;
            regionDonwlaod[2].href = `/regionseng/${result}/population/population_count.xlsx`;
            regionDonwlaod[3].href = `/regionseng/${result}/population/residents_in_urban_settlements.xlsx`;
            regionDonwlaod[4].href = `/regionseng/${result}/population/population_density.xlsx`;
          } else {
            regionDonwlaod[0].href = `/regions/${result}/dziritadi%20informacia/regionis%20fartobi.xlsx`;
            regionDonwlaod[1].href = `/regions/${result}/dziritadi%20informacia/municipalitetebis,%20qalaqebis%20da%20soflebis%20raodenoba.xlsx`;
            regionDonwlaod[2].href = `/regions/${result}/mosakhleoba/მოსახლეობის%20რიცხოვნობა.xlsx`;
            regionDonwlaod[3].href = `/regions/${result}/mosakhleoba/საქალაქო%20დასახლებაში%20მცხოვრები.xlsx`;
            regionDonwlaod[4].href = `/regions/${result}/mosakhleoba/მოსახლეობის%20სიმჭიდროვე.xlsx`;
          }
        }
      });
    });

    if (result && result > 0) {
      axios
        .get(`http://localhost:3000/getMapIndexes/?id=${result}`)
        .then((response) => {
          let regionClicked = response.data[0];
          let municipalClicked = response.data[0];
          const coordinate = evt.coordinate;
          const hdms = toStringHDMS(toLonLat(coordinate));
          popup.setPosition(coordinate);
          let popover = bootstrap.Popover.getInstance(element);
          if (popover) {
            popover.dispose();
          }
          var content = null;

          let data;
          const sidetitle = document.getElementById("sidetitle");

          if (lang1 === "en") {
            data = regionClicked.NameEN;
          } else {
            data = regionClicked.Name;
          }

          sidetitle.innerHTML = data;
          let regionContent;
          let municipalContent;
          let popoverTitle;
          if (lang1 === "en") {
            popoverTitle = "Key indicators";
            data = regionClicked.NameEN;

            regionContent = `<p>Name: ${regionClicked.NameEN}</p><p>Area (sq. km): ${regionClicked.Area}</p><p>Number of population (thousands): ${regionClicked.Population}</p><p>Number of live births (persons): ${regionClicked.LiveBirths}</p><p>Number of deaths (persons): ${regionClicked.Dead}</p><p>Natural Increase (persons): ${regionClicked.naturalIncrease}</p><p>Gross domestic product (million GEL): ${regionClicked.GDP}</p><p>Gross domestic product per capita (USD): ${regionClicked.GDPPerCapita}</p><p>Unemployment rate (%): ${regionClicked.UnemploymentRate}</p><p>Number of employees, total (thousands of people): ${regionClicked.EmploymentRate}</p><p>Number of employees - in the business sector (thousands of people):  ${regionClicked.EmploymentRateIndustry}</p><p>Average monthly salary of employees - in the business sector (GEL): ${regionClicked.AverageSalaryIndustry}</p><p>Number of registered economic entities (unit):  ${regionClicked.RegistredEntities}</p><p>Number of active economic entities (units): ${regionClicked.activeEntities}</p><p>Number of newly registered economic entities (units): ${regionClicked.newlyRegistredEntities}</p>
            <code>`;
            ("</code>");

            municipalContent = `<p>Name: ${municipalClicked.NameEN}</p><p>Area (sq. km): ${municipalClicked.Area}</p><p>Number of cities and boroughs (units): ${municipalClicked.NumberOfCT}</p><p>Number of villages (units): ${municipalClicked.Villages}</p><p>Number of Population (thousands): ${municipalClicked.Population}</p><p>Number of live births (persons): ${municipalClicked.LiveBirths}</p><p>Crude birth rate (per 1 000 population): ${municipalClicked.GeneralBirthRate}</p><p>Number of deaths (persons): ${municipalClicked.Dead}</p><p>Crude death rate (per 1 000 population): ${municipalClicked.GeneralMortalityRate}</p><p>Natural Increase (persons): ${municipalClicked.naturalIncrease}</p><p>Employment Level in Business Sector (thousand persons):  ${municipalClicked.Employees}</p><p>Average monthly remuneration of employed persons-in Business Sector (GEL):  ${municipalClicked.AVGSalary}</p><p>The Number of Registered Business Entities (units):  ${municipalClicked.RegEcSub}</p><p>Number of active economic subjects (units):  ${municipalClicked.ActEcSub}</p><p>Number of newly registered economic entities (units):  ${municipalClicked.newlyRegistredEntities}</p>
          <code>`;
          } else {
            popoverTitle = "ძირითადი მაჩვენებლები";
            data = regionClicked.Name;

            regionContent = `<p>დასახელება: ${regionClicked.Name}</p><p>ფართობი (კვ.კმ): ${regionClicked.Area}</p><p>მოსახლეობის რიცხოვნობა (ათასი): ${regionClicked.Population}</p><p>ცოცხლად დაბადებულთა რიცხოვნობა (კაცი): ${regionClicked.LiveBirths}</p><p>გარდაცვლილთა რიცხოვნობა (კაცი): ${regionClicked.Dead}</p><p>ბუნებრივი მატება (კაცი): ${regionClicked.naturalIncrease}</p><p>მთლიანი შიდა პროდუქტი (მლნ. ლარი): ${regionClicked.GDP}</p><p>მთლიანი შიდა პროდუქტი ერთ სულ მოსახლეზე (აშშ დოლარი): ${regionClicked.GDPPerCapita}</p><p>უმუშევრობის დონე (%): ${regionClicked.UnemploymentRate}</p><p>დასაქმებულთა რაოდენობა, სულ (ათასი კაცი): ${regionClicked.EmploymentRate}</p><p>დასაქმებულთა რაოდენობა - ბიზნეს სექტორში (ათასი კაცი):  ${regionClicked.EmploymentRateIndustry}</p><p>დასაქმებულთა საშუალოთვიური ხელფასი - ბიზნეს სექტორში (ლარი): ${regionClicked.AverageSalaryIndustry}</p><p>რეგისტრირებული ეკონომიკური სუბიექტების რაოდენობა (ერთეული):  ${regionClicked.RegistredEntities}</p><p>მოქმედი ეკონომიკური სუბიექტების რაოდენობა (ერთეული): ${regionClicked.activeEntities}</p><p>ახლადრეგისტრირებული ეკონომიკური სუბიექტების რაოდენობა (ერთეული): ${regionClicked.newlyRegistredEntities}</p>
            <code>`;
            ("</code>");

            municipalContent = `<p>დასახელება: ${municipalClicked.Name}</p><p>ფართობი (კვ.კმ): ${municipalClicked.Area}</p><p>ქალაქების და დაბების რაოდენობა (ერთეული): ${municipalClicked.NumberOfCT}</p><p>სოფლების რაოდენობა (ერთეული): ${municipalClicked.Villages}</p><p>მოსახლეობის რიცხოვნობა (ათასი): ${municipalClicked.Population}</p><p>ცოცხლად დაბადებულთა რიცხოვნობა (კაცი): ${municipalClicked.LiveBirths}</p><p>შობადობის ზოგადი კოეფიციენტი (მოსახლეობის 1 000 კაცზე): ${municipalClicked.GeneralBirthRate}</p><p>გარდაცვლილთა რიცხოვნობა (კაცი): ${municipalClicked.Dead}</p><p>მოკვდაობის ზოგადი კოეფიციენტი (მოსახლეობის 1 000 კაცზე): ${municipalClicked.GeneralMortalityRate}</p><p>ბუნებრივი მატება (კაცი): ${municipalClicked.naturalIncrease}</p><p>დასაქმებულთა რაოდენობა-ბიზნეს სექტორში (ათასი კაცი):  ${municipalClicked.Employees}</p><p>დასაქმებულთა საშუალოთვიური ხელფასი-ბიზნეს სექტორში (ლარი):  ${municipalClicked.AVGSalary}</p><p>რეგისტრირებული ეკონომიკური სუბიექტების რაოდენობა (ერთეული):  ${municipalClicked.RegEcSub}</p><p>მოქმედი ეკონომიკური სუბიექტების რაოდენობა (ერთეული):  ${municipalClicked.ActEcSub}</p><p>ახლადრეგისტრირებული ეკონომიკური სუბიექტების რაოდენობა (ერთეული):  ${municipalClicked.newlyRegistredEntities}</p>
          <code>`;
          }

          ("</code>");
          if (viewResolution > 192.6092418558059) {
            content = regionContent;
          } else {
            content = municipalContent;
          }
          popover = new bootstrap.Popover(element, {
            animation: true,
            container: element,
            content: content,
            html: true,
            placement: "top",
            title: popoverTitle,
          });
          popover.show();
        })
        .catch((error) => console.log(error));
    }
  });
});

var scale = new ScaleLine({
  bar: true,
  steps: 4,
});
map.addControl(scale);
