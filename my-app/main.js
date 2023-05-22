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
import GeoJSON from "ol/format/GeoJSON.js";
import Select from "ol/interaction/Select.js";
import VectorLayer from "ol/layer/Vector.js";
import VectorSource from "ol/source/Vector.js";
import { Fill, Stroke, Style } from "ol/style.js";
import { pointerMove } from "ol/events/condition.js";
import {FullScreen, defaults as defaultControls} from 'ol/control.js';

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

const USLayer = new VectorLayer({
  extent: [-13884991, 2870341, -7455066, 6338219],
  source: new VectorSource({
    format: new GeoJSON(),
    // url: "https://ahocevar.com/geoserver/wfs?service=WFS&version=1.1.0&request=GetFeature&typename=topp:states&outputFormat=application/json",
    // url:"http://localhost:8080/geoserver/Overlay/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Overlay%3Ageorgia1&maxFeatures=50&outputFormat=application%2Fjson",
    url: "http://localhost:8080/geoserver/wfs?request=GetFeature&version=1.1.0&typeName=Overlay:georgia1&outputFormat=application/json",
  }),
  style: new Style({
    fill: new Fill({
      color: "transparent",
    }),
  }),
});

const view = new View({
  center: [44799999, 5172947],
  zoom: 8,

  // center: [-10997148, 4569099],
  // zoom: 4,
});

const map = new Map({
  layers: [layer, wmsLayer, wmsLayer2, USLayer],
  target: "map",
  view: view,
  controls: defaultControls().extend([
    new FullScreen({
      source: 'fullscreen',
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

    const regionDonwlaod = document.querySelectorAll(".region_download")

    regionDonwlaod[0].href = `/regions/${result}/dziritadi%20informacia/regionis%20fartobi.xlsx`
    regionDonwlaod[1].href = `/regions/${result}/dziritadi%20informacia/municipalitetebis,%20qalaqebis%20da%20soflebis%20raodenoba.xlsx`
    

    // regionDonwlaod[1].href = `/regions/regions/${result}/dziritadi%20informacia/`

    


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

          const data = regionClicked.Name
          const sidetitle = document.getElementById('sidetitle');
          sidetitle.innerHTML = data;

          let regionContent = `<p>დასახელება: ${regionClicked.Name}</p><p>ფართობი (კვ.კმ): ${regionClicked.Area}</p><p>მოსახლეობის რიცხოვნობა (ათასი): ${regionClicked.Population}</p><p>მთლიანი შიდა პროდუქტი (მლნ. ლარი): ${regionClicked.GDP}</p><p>მთლიანი შიდა პროდუქტი ერთ სულ მოსახლეზე (აშშ დოლარი): ${regionClicked.GDPPerCapita}</p><p>უმუშევრობის დონე (%): ${regionClicked.UnemploymentRate}</p><p>დასაქმებულთა რაოდენობა, სულ (ათასი კაცი): ${regionClicked.EmploymentRate}</p><p>დასაქმებულთა რაოდენობა - ბიზნეს სექტორში (ათასი კაცი):  ${regionClicked.EmploymentRateIndustry}</p><p>დასაქმებულთა საშუალოთვიური ხელფასი - ბიზნეს სექტორში (ლარი): ${regionClicked.AverageSalaryIndustry}</p><p>რეგისტრირებული ეკონომიკური სუბიექტების რაოდენობა (ერთეული):  ${regionClicked.RegistredEntities}</p>
            <code>`;
          ("</code>");

          let municipalContent = `<p>დასახელება: ${municipalClicked.Name}</p><p>ფართობი (კვ.კმ): ${municipalClicked.Area}</p><p>ქალაქების და დაბების რაოდენობა (ერთეული): ${municipalClicked.NumberOfCT}</p><p>სოფლების რაოდენობა (ერთეული): ${municipalClicked.Villages}</p><p>მოსახლეობის რიცხოვნობა (ათასი): ${municipalClicked.Population}</p><p>ცოცხლად დაბადებულთა რიცხოვნობა (კაცი): ${municipalClicked.LiveBirths}</p><p>შობადობის ზოგადი კოეფიციენტი (მოსახლეობის 1 000 კაცზე): ${municipalClicked.GeneralBirthRate}</p><p>გარდაცვლილთა რიცხოვნობა (კაცი): ${municipalClicked.Dead}</p><p>მოკვდაობის ზოგადი კოეფიციენტი (მოსახლეობის 1 000 კაცზე): ${municipalClicked.GeneralMortalityRate}</p><p>დასაქმებულთა რაოდენობა-ბიზნეს სექტორში (ათასი კაცი):  ${municipalClicked.Employees}</p><p>დასაქმებულთა საშუალოთვიური ხელფასი-ბიზნეს სექტორში (ლარი):  ${municipalClicked.AVGSalary}</p><p>რეგისტრირებული ეკონომიკური სუბიექტების რაოდენობა (ერთეული):  ${municipalClicked.RegEcSub}</p><p>აქტიური ეკონომიკური სუბიექტების რაოდენობა (ერთეული):  ${municipalClicked.ActEcSub}</p>
          <code>`;
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


//not working
map.addInteraction(
  new Select({
    condition: pointerMove,
    style: new Style({
      fill: new Fill({
        color: "transparent",
      }),
      stroke: new Stroke({
        color: "yellow",
        width: 2,
      }),
    }),
  })
);
