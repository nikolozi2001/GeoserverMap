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


const layer = new TileLayer({
  source: new OSM(),
});

//add georgia region map
var wmsURL = "http://localhost:8080/geoserver/Overlay/wms";

const wmsSource = new TileWMS({
  url: wmsURL,
  params: {
    // 'FORMAT': format,
    VERSION: "1.1.0",
    STYLES: "",
    LAYERS: "Overlay:munic",
  },
  // crossOrigin: 'anonymous',
});

//municipaliteties layer

const wmsSource2 = new TileWMS({
  url: wmsURL,
  params: {
    // 'FORMAT': format,
    VERSION: "1.1.0",
    STYLES: "",
    LAYERS: "Overlay:georgia1",
  },
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

const view = new View({
  center: [44799999, 5172947],
  zoom: 8,
});

const map = new Map({
  layers: [layer, wmsLayer, wmsLayer2],
  target: "map",
  view: view,
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

    if (result && result > 0) {
      axios
        .get(`http://localhost:3000/getMapIndexes/?id=${result}`)
        .then((response) => {
          let regionClicked = response.data[0];
          let municipalClicked = response.data[0];
          // if (viewResolution > 192.6092418558059) {
          //   content = regionContent;
          // } else {
          //   content = municipalContent;
          // }

          const coordinate = evt.coordinate;
          const hdms = toStringHDMS(toLonLat(coordinate));
          popup.setPosition(coordinate);
          let popover = bootstrap.Popover.getInstance(element);
          if (popover) {
            popover.dispose();
          }
          var content = null;

          let regionContent =
            `<p>დასახელება: ${regionClicked.Name}</p><p>ფართობი (კვ.კმ): ${regionClicked.Area}</p><p>მოსახლეობის რიცხოვნობა (ათასი): ${regionClicked.Population}</p><p>მთლიანი შიდა პროდუქტი (მლნ. ლარი): ${regionClicked.GDP}</p><p>მთლიანი შიდა პროდუქტი ერთ სულ მოსახლეზე (აშშ დოლარი): ${regionClicked.GDPPerCapita}</p><p>უმუშევრობის დონე (%): ${regionClicked.UnemploymentRate}</p><p>დასაქმებულთა რაოდენობა, სულ (ათასი კაცი): ${regionClicked.EmploymentRate}</p><p>დასაქმებულთა რაოდენობა - ბიზნეს სექტორში (ათასი კაცი):  ${regionClicked.EmploymentRateIndustry}</p><p>დასაქმებულთა საშუალოთვიური ხელფასი - ბიზნეს სექტორში (ლარი): ${regionClicked.AverageSalaryIndustry}</p><p>რეგისტრირებული ეკონომიკური სუბიექტების რაოდენობა (ერთეული):  ${regionClicked.RegistredEntities}</p>
            <code>`
            "</code>";

          let municipalContent =
            `<p>დასახელება: ${municipalClicked.Name}</p><p>ფართობი (კვ.კმ): ${municipalClicked.Area}</p><p>ქალაქების და დაბების რაოდენობა (ერთეული): ${municipalClicked.NumberOfCT}</p><p>სოფლების რაოდენობა (ერთეული): ${municipalClicked.Villages}</p><p>მოსახლეობის რიცხოვნობა (ათასი): ${municipalClicked.Population}</p><p>ცოცხლად დაბადებულთა რიცხოვნობა (კაცი): ${municipalClicked.LiveBirths}</p><p>შობადობის ზოგადი კოეფიციენტი (მოსახლეობის 1 000 კაცზე): ${municipalClicked.GeneralBirthRate}</p><p>გარდაცვლილთა რიცხოვნობა (კაცი): ${municipalClicked.Dead}</p><p>მოკვდაობის ზოგადი კოეფიციენტი (მოსახლეობის 1 000 კაცზე): ${municipalClicked.GeneralMortalityRate}</p><p>დასაქმებულთა რაოდენობა-ბიზნეს სექტორში (ათასი კაცი):  ${municipalClicked.Employees}</p><p>დასაქმებულთა საშუალოთვიური ხელფასი-ბიზნეს სექტორში (ლარი):  ${municipalClicked.AVGSalary}</p><p>რეგისტრირებული ეკონომიკური სუბიექტების რაოდენობა (ერთეული):  ${municipalClicked.RegEcSub}</p><p>აქტიური ეკონომიკური სუბიექტების რაოდენობა (ერთეული):  ${municipalClicked.ActEcSub}</p>
          <code>` 
          "</code>";
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
            title: "ძირითადი მაჩვენებლები",
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
