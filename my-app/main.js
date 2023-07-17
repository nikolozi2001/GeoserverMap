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
    const municipalView = document.getElementById("parent_main2");

    if (viewResolution > 192.6092418558059) {
      regionView.style.display = "block";
      municipalView.style.display = "none";
    } else {
      regionView.style.display = "none";
      municipalView.style.display = "block";
    }

    const prices_inflation = document.getElementById("dziritadi10");

    if (
      result === "23" ||
      result === "32" ||
      result === "35" ||
      result === "41" ||
      result === "44"
    ) {
      prices_inflation.style.display = "none";
    } else {
      prices_inflation.style.display = "block";
    }

    // regionDonwlaod[0].href = `/regions/${result}/dziritadi%20informacia/regionis%20fartobi.xlsx`;
    // regionDonwlaod[1].href = `/regions/${result}/dziritadi%20informacia/municipalitetebis,%20qalaqebis%20da%20soflebis%20raodenoba.xlsx`;
    // regionDonwlaod[2].href = `/regions/${result}/mosakhleoba/მოსახლეობის%20რიცხოვნობა.xlsx`;
    // regionDonwlaod[3].href = `/regions/${result}/mosakhleoba/საქალაქო%20დასახლებაში%20მცხოვრები.xlsx`;
    // regionDonwlaod[4].href = `/regions/${result}/mosakhleoba/მოსახლეობის%20სიმჭიდროვე.xlsx`;

    // regionDonwlaod[1].href = `/regions/regions/${result}/dziritadi%20informacia/`

    let globalResponseName;
    let globalResponseNameEN;

    let lang1 = sessionStorage.getItem("lang1");
    const regionDonwlaod = document.querySelectorAll(".region_download");
    regionDonwlaod.forEach((item) => {
      item.addEventListener("click", (event) => {
        if (result) {
          lang1 = sessionStorage.getItem("lang1");
          // console.log(lang1);
          if (lang1 === "en") {
            sidetitle.innerHTML = globalResponseNameEN;
            regionDonwlaod[0].href = `/regionseng/${result}/main%20information/area.xlsx`;
            regionDonwlaod[1].href = `/regionseng/${result}/main%20information/number%20of%20settlements.xlsx`;
            regionDonwlaod[2].href = `/regionseng/${result}/population/Number%20of%20population.xlsx`;
            regionDonwlaod[3].href = `/regionseng/${result}/population/Share%20of%20urban%20population.xlsx`;
            regionDonwlaod[4].href = `/regionseng/${result}/population/Density%20of%20population.xlsx`;
            regionDonwlaod[5].href = `/regionseng/Demography/Number%20of%20live%20births/${globalResponseNameEN}.xlsx`;
            regionDonwlaod[6].href = `/regionseng/Demography/Crude%20birth%20rate/${globalResponseNameEN}.xlsx`;
            regionDonwlaod[7].href = `/regionseng/Demography/Number%20of%20live%20births%20by%20sex/${globalResponseNameEN}.xlsx`;
            regionDonwlaod[8].href = `/regionseng/Demography/Quantitative%20ratio%20of%20sexes/${globalResponseNameEN}.xlsx`;
            regionDonwlaod[9].href = `/regionseng/Demography/Mean%20age%20of%20childbearing/${globalResponseNameEN}.xlsx`;
            regionDonwlaod[10].href = `/regionseng/Demography/Number%20of%20stillbirths/${globalResponseNameEN}.xlsx`;
            regionDonwlaod[11].href = `/regionseng/Demography/Number%20of%20deaths/${globalResponseNameEN}.xlsx`;
            regionDonwlaod[12].href = `/regionseng/Demography/Crude%20death%20rate/${globalResponseNameEN}.xlsx`;
            regionDonwlaod[13].href = `/regionseng/Demography/Number%20of%20deaths%20by%20age%20and%20sex/${globalResponseNameEN}.xlsx`;
            regionDonwlaod[14].href = `/regionseng/Demography/Infant%20mortality%20rate/${globalResponseNameEN}.xlsx`;
            regionDonwlaod[15].href = `/regionseng/Demography/Under-5%20mortality%20rate/${globalResponseNameEN}.xlsx`;
            regionDonwlaod[16].href = `/regionseng/Demography/Number%20of%20deaths%20by%20chapters%20of%20ICD-10%20and%20sex/${globalResponseNameEN}.xlsx`;
            regionDonwlaod[17].href = `/regionseng/Demography/Number%20of%20deaths%20by%20chapters%20of%20ICD-10%20and%20by%20urban-rural%20settlements/${globalResponseNameEN}.xlsx`;
            regionDonwlaod[18].href = `/regionseng/Demography/Number%20of%20divorced%20people%20by%20age%20groups%20and%20sex/${globalResponseNameEN}.xlsx`;
            regionDonwlaod[19].href = `/regionseng/Demography/Deaths%20from%20suicide/${globalResponseNameEN}.xlsx`;
            regionDonwlaod[20].href = `/regionseng/Demography/Suicide%20rate/${globalResponseNameEN}.xlsx`;
            regionDonwlaod[21].href = `/regionseng/Demography/Natural%20increase/${globalResponseNameEN}.xlsx`;
            regionDonwlaod[22].href = `/regionseng/Demography/Natural%20increase%20rate/${globalResponseNameEN}.xlsx`;
            regionDonwlaod[23].href = `/regionseng/Demography/Number%20of%20registered%20marriages/${globalResponseNameEN}.xlsx`;
            regionDonwlaod[24].href = `/regionseng/Demography/Crude%20marriage%20rate/${globalResponseNameEN}.xlsx`;
            regionDonwlaod[25].href = `/regionseng/Demography/Number%20of%20married%20people/${globalResponseNameEN}.xlsx`;
            regionDonwlaod[26].href = `/regionseng/Demography/Mean%20age%20of%20spouses/${globalResponseNameEN}.xlsx`;
            regionDonwlaod[27].href = `/regionseng/Demography/Number%20of%20registered%20divorces/${globalResponseNameEN}.xlsx`;
            regionDonwlaod[28].href = `/regionseng/Demography/Crude%20divorce%20rate/${globalResponseNameEN}.xlsx`;
            regionDonwlaod[29].href = `/regionseng/Demography/Number%20of%20divorced%20people%20by%20age%20groups%20and%20sex/${globalResponseNameEN}.xlsx`;
            regionDonwlaod[30].href = `/regionseng/Population%20census/Median%20age%20of%20population/${globalResponseNameEN}.xlsx`;
            regionDonwlaod[31].href = `/regionseng/Population%20census/Percentage%20of%20population%20aged%2065%20and%20over/${globalResponseNameEN}.xlsx`;
            regionDonwlaod[32].href = `/regionseng/Population%20census/Age%20dependency%20ratios/${globalResponseNameEN}.xlsx`;
            regionDonwlaod[33].href = `/regionseng/Population%20census/Number%20of%20population/${globalResponseNameEN}.xlsx`;
            regionDonwlaod[34].href = `/regionseng/Population%20census/Share%20of%20working%20age%20population/${globalResponseNameEN}.xlsx`;
            regionDonwlaod[35].href = `/regionseng/Population%20census/Number%20of%20private%20households/${globalResponseNameEN}.xlsx`;
            regionDonwlaod[36].href = `/regionseng/${result}/gdp%20and%20va/gdp%20and%20va.xls`;
            regionDonwlaod[37].href = `/regionseng/${result}/ext.trade%20and%20foreign%20direct%20invset/ext.trade%20and%20foreign%20direct%20invset.xlsx`;
            regionDonwlaod[38].href = `/regionseng/${result}/employment%20and%20unemployment/employment%20and%20unemployment.xlsx`;
            regionDonwlaod[39].href = `/regionseng/${result}/employment%20and%20unemployment/wages.xlsx`;
            regionDonwlaod[40].href = `/regionseng/${result}/prices/consumer%20price%20index%2012%20month%20avarage%20over%20the%20previous%2012%20month%20avarage.xlsx`;
            regionDonwlaod[41].href = `/regionseng/${result}/prices/consumer%20price%20index%20to%20the%20previous%20month.xlsx`;
            regionDonwlaod[42].href = `/regionseng/${result}/prices/consumer%20price%20index%20to%20the%20same%20month%20of%20previous%20year.xlsx`;
            regionDonwlaod[43].href = `/regionseng/${result}/prices/consumer%20price%20index%202010%20=%20100.xlsx`;
            regionDonwlaod[44].href = `/regionseng/${result}/standard%20of%20living/incomes.xlsx`;
            regionDonwlaod[45].href = `/regionseng/${result}/standard%20of%20living/expenditures.xlsx`;
            regionDonwlaod[46].href = `/regionseng/${result}/business%20sector/by%20kind%20of%20activity_nace%20rev.2.xlsx`;
            regionDonwlaod[47].href = `/regionseng/${result}/business%20sector/by%20ownership.xlsx`;
            regionDonwlaod[48].href = `/regionseng/${result}/business%20sector/by%20size.xlsx`;
            regionDonwlaod[49].href = `/regionseng/${result}/agriculture/1.%20Annual%20crops.xlsx`;
            regionDonwlaod[50].href = `/regionseng/${result}/agriculture/2.%20Production%20of%20permanent%20crops.xlsx`;
            regionDonwlaod[51].href = `/regionseng/${result}/agriculture/3.%20Number%20of%20livestock.xlsx`;
            regionDonwlaod[52].href = `/regionseng/${result}/agriculture/4.%20Production%20of%20animal%20housbandry.xlsx`;
            regionDonwlaod[53].href = `/regionseng/${result}/industry/industry.xlsx`;
            regionDonwlaod[54].href = `/regionseng/${result}/construction/mshenebloba_nebartvebi.xlsx`;
            regionDonwlaod[55].href = `/regionseng/${result}/construction/eqspluataciashi%20migebuli%20obieqtebi.xlsx`;
            regionDonwlaod[56].href = `/regionseng/${result}/construction/mshenebloba_dziritadi%20machveneblebi.xlsx`;
            regionDonwlaod[57].href = `/regionseng/service/By%20organizational%20legal%20forms/${globalResponseNameEN}.xlsx`;
            regionDonwlaod[58].href = `/regionseng/service/By%20ownership%20type/${globalResponseNameEN}.xlsx`;
            regionDonwlaod[59].href = `/regionseng/service/Number%20of%20markets%20and%20fairs%20by%20type/${globalResponseNameEN}.xlsx`;
            regionDonwlaod[60].href = `/regionseng/service/Days%20of%20trade/${globalResponseNameEN}.xlsx`;
            regionDonwlaod[61].href = `/regionseng/service/Employed%20persons/${globalResponseNameEN}.xlsx`;
            regionDonwlaod[62].href = `/regionseng/service/Market-place%20and%20sellers/${globalResponseNameEN}.xlsx`;
            regionDonwlaod[63].href = `/regionseng/service/Financial%20indices%20of%20markets/${globalResponseNameEN}.xlsx`;
            regionDonwlaod[64].href = `/regionseng/${result}/trade/trade.xlsx`;
            regionDonwlaod[65].href = `/regionseng/${result}/hotels%20and%20restaurants/hotels%20and%20restaurants.xlsx`;
            regionDonwlaod[66].href = `/regionseng/Hotels/Number%20of%20Hotels/${globalResponseNameEN}.xlsx`;
            regionDonwlaod[67].href = `/regionseng/Hotels/Number%20of%20Rooms/${globalResponseNameEN}.xlsx`;
            regionDonwlaod[68].href = `/regionseng/Hotels/Number%20of%20Guests/${globalResponseNameEN}.xlsx`;
            regionDonwlaod[69].href = `/regionseng/Hotels/Number%20of%20Employees/${globalResponseNameEN}.xlsx`;
            regionDonwlaod[70].href = `/regionseng/${result}/transport%20and%20storage/transport%20and%20storage.xlsx`;
            regionDonwlaod[71].href = `/regionseng/${result}/transport%20and%20storage/number%20of%20motor%20vehicles.xlsx`;
            regionDonwlaod[72].href = `/regionseng/${result}/transport%20and%20storage/the%20length%20of%20the%20roads.xlsx`;
            regionDonwlaod[73].href = `/regionseng/${result}/tourism/place%20of%20residence.xls`;
            regionDonwlaod[74].href = `/regionseng/${result}/tourism/visited%20regions.xls`;
            regionDonwlaod[75].href = `/regionseng/${result}/justice statistics/justice%20statistics.xlsx`;
            regionDonwlaod[76].href = `/regionseng/${result}/health%20care%20and%20social%20protection/health%20care%20and%20social%20protection.xlsx`;
            regionDonwlaod[77].href = `/regionseng/${result}/education/education.xlsx`;
            regionDonwlaod[78].href = `/regionseng/${result}/culture/culture.xlsx`;
            regionDonwlaod[79].href = `/regionseng/${result}/environmental%20protection/environmental%20protection.xlsx`;
            regionDonwlaod[80].href = `/regionseng/${result}/infrastructure/infrastructure.xlsx`;
          } else {
            sidetitle.innerHTML = globalResponseName;
            regionDonwlaod[0].href = `/regions/${result}/dziritadi%20informacia/regionis%20fartobi.xlsx`;
            regionDonwlaod[1].href = `/regions/${result}/dziritadi%20informacia/municipalitetebis,%20qalaqebis%20da%20soflebis%20raodenoba.xlsx`;
            regionDonwlaod[2].href = `/regions/${result}/mosakhleoba/მოსახლეობის%20რიცხოვნობა.xlsx`;
            regionDonwlaod[3].href = `/regions/${result}/mosakhleoba/საქალაქო%20დასახლებაში%20მცხოვრები.xlsx`;
            regionDonwlaod[4].href = `/regions/${result}/mosakhleoba/მოსახლეობის%20სიმჭიდროვე.xlsx`;
            regionDonwlaod[5].href = `/regions/დემოგრაფია/ცოცხლად%20დაბადებულთა%20რიცხოვნობა/${globalResponseName}.xlsx`;
            regionDonwlaod[6].href = `/regions/დემოგრაფია/შობადობის%20ზოგადი%20კოეფიციენტი/${globalResponseName}.xlsx`;
            regionDonwlaod[7].href = `/regions/დემოგრაფია/ცოცხლად%20დაბადებულთა%20რიცხოვნობა%20სქესის%20მიხედვით/${globalResponseName}.xlsx`;
            regionDonwlaod[8].href = `/regions/დემოგრაფია/სქესთა%20რაოდენობრივი%20თანაფარდობა/${globalResponseName}.xlsx`;
            regionDonwlaod[9].href = `/regions/დემოგრაფია/დედის%20საშუალო%20ასაკი%20ბავშვის%20დაბადებისას/${globalResponseName}.xlsx`;
            regionDonwlaod[10].href = `/regions/დემოგრაფია/მკვდრადშობილთა%20რიცხოვნობა/${globalResponseName}.xlsx`;
            regionDonwlaod[11].href = `/regions/დემოგრაფია/გარდაცვლილთა%20რიცხოვნობა/${globalResponseName}.xlsx`;
            regionDonwlaod[12].href = `/regions/დემოგრაფია/მოკვდაობის%20ზოგადი%20კოეფიციენტი/${globalResponseName}.xlsx`;
            regionDonwlaod[13].href = `/regions/დემოგრაფია/გარდაცვლილთა%20რიცხოვნობა%20ასაკის%20და%20სქესის%20მიხედვით/${globalResponseName}.xlsx`;
            regionDonwlaod[14].href = `/regions/დემოგრაფია/ჩვილ%20ბავშვთა%20მოკვდაობის%20კოეფიციენტი/${globalResponseName}.xlsx`;
            regionDonwlaod[15].href = `/regions/დემოგრაფია/5%20წლამდე%20ასაკის%20ბავშვთა%20მოკვდაობის%20კოეფიციენტი/${globalResponseName}.xlsx`;
            regionDonwlaod[16].href = `/regions/დემოგრაფია/გარდაცვალების%20მიზეზები%20სქესის%20მიხედვით/${globalResponseName}.xlsx`;
            regionDonwlaod[17].href = `/regions/დემოგრაფია/გარდაცვალების%20მიზეზები%20საქალაქო%20სასოფლო%20დასახლებების%20მიხედვით/${globalResponseName}.xlsx`;
            regionDonwlaod[18].href = `/regions/დემოგრაფია/გარდაცვლილთა%20რიცხოვნობა%20ასაკის%20და%20სქესის%20მიხედვით/${globalResponseName}.xlsx`;
            regionDonwlaod[19].href = `/regions/დემოგრაფია/თვითმკვლელობით%20გარდაცვლილთა%20რიცხოვნობა/${globalResponseName}.xlsx`;
            regionDonwlaod[20].href = `/regions/დემოგრაფია/თვითმკვლელობის%20შედეგად%20სიკვილიანობის%20კოეფიციენტი/${globalResponseName}.xlsx`;
            regionDonwlaod[21].href = `/regions/დემოგრაფია/ბუნებრივი%20მატება/${globalResponseName}.xlsx`;
            regionDonwlaod[22].href = `/regions/დემოგრაფია/ბუნებრივი%20მატების%20კოეფიციენტი/${globalResponseName}.xlsx`;
            regionDonwlaod[23].href = `/regions/დემოგრაფია/რეგისტრირებულ%20ქორწინებათა%20რაოდენობა/${globalResponseName}.xlsx`;
            regionDonwlaod[24].href = `/regions/დემოგრაფია/ქორწინების%20ზოგადი%20კოეფიციენტი/${globalResponseName}.xlsx`;
            regionDonwlaod[25].href = `/regions/დემოგრაფია/დაქორწინებულთა%20რიცხოვნობა/${globalResponseName}.xlsx`;
            regionDonwlaod[26].href = `/regions/დემოგრაფია/ქორწინების%20საშუალო%20ასაკი/${globalResponseName}.xlsx`;
            regionDonwlaod[27].href = `/regions/დემოგრაფია/რეგისტრირებულ%20განქორწინებათა%20რაოდენობა/${globalResponseName}.xlsx`;
            regionDonwlaod[28].href = `/regions/დემოგრაფია/განქორწინების%20ზოგადი%20კოეფიციენტი/${globalResponseName}.xlsx`;
            regionDonwlaod[29].href = `/regions/დემოგრაფია/განქორწინებულთა%20რიცხოვნობა/${globalResponseName}.xlsx`;
            regionDonwlaod[30].href = `/regions/მოსახლეობის%20აღწერა/მოსახლეობის%20მედიანური%20ასაკი/${globalResponseName}.xlsx`;
            regionDonwlaod[31].href = `/regions/მოსახლეობის%20აღწერა/65%20წელზე%20მეტი/${globalResponseName}.xlsx`;
            regionDonwlaod[32].href = `/regions/მოსახლეობის%20აღწერა/ასაკის%20დატვირთვის%20კოეფიციენტები/${globalResponseName}.xlsx`;
            regionDonwlaod[33].href = `/regions/მოსახლეობის%20აღწერა/მოსახლეობის%20რიცხოვნობა/${globalResponseName}.xlsx`;
            regionDonwlaod[34].href = `/regions/მოსახლეობის%20აღწერა/შრომისუნარიანი%20ასაკის/${globalResponseName}.xlsx`;
            regionDonwlaod[35].href = `/regions/მოსახლეობის%20აღწერა/კერძო%20შინამეურნეობები/${globalResponseName}.xlsx`;
            regionDonwlaod[36].href = `/regions/${result}/mshp%20da%20damatebuli%20girebuleba/mshp%20da%20damatebuli%20girebuleba.xls`;
            regionDonwlaod[37].href = `/regions/${result}/pirdapiri%20uckhouri%20investiciebi/pirdapiri%20uckhouri%20investiciebi.xlsx`;
            regionDonwlaod[38].href = `/regions/${result}/dasaqmeba_umushevroba/dasaqmeba_umushevroba.xlsx`;
            regionDonwlaod[39].href = `/regions/${result}/dasaqmeba_umushevroba/khelfasi.xlsx`;
            regionDonwlaod[40].href = `/regions/${result}/fasebi/samomxmareblo%20fasebis%20indeqsebi%2012%20tvis%20sashualo%20wina%2012%20Tvis%20saSualosTan.xlsx`;
            regionDonwlaod[41].href = `/regions/${result}/fasebi/samomxmareblo%20fasebis%20indeqsebi%20wina%20TvesTan.xlsx`;
            regionDonwlaod[42].href = `/regions/${result}/fasebi/samomxmareblo%20fasebis%20indeqsebi%20wina%20wlis%20shesabamis%20TvesTan.xlsx`;
            regionDonwlaod[43].href = `/regions/${result}/fasebi/samomxmareblo%20fasebis%20indeqsebi%202010%20wlis%20sashualo=100.xlsx`;
            regionDonwlaod[44].href = `/regions/${result}/ckhovrebis%20done/shemosavlebi.xlsx`;
            regionDonwlaod[45].href = `/regions/${result}/ckhovrebis%20done/kharjebi.xlsx`;
            regionDonwlaod[46].href = `/regions/${result}/biznes%20seqtori/saqmianobis%20mikhedvit_nace%20rev.2.xlsx`;
            regionDonwlaod[47].href = `/regions/${result}/biznes%20seqtori/sakutrebis%20formis%20mikhedvit.xlsx`;
            regionDonwlaod[48].href = `/regions/${result}/biznes%20seqtori/zomis%20mikhedvit.xlsx`;
            regionDonwlaod[49].href = `/regions/${result}/soflis%20meurneoba/1.%20erttsliani%20kulturebi.xlsx`;
            regionDonwlaod[50].href = `/regions/${result}/soflis%20meurneoba/2.%20mravaltslovani%20kulturebis%20tsarmoeba.xlsx`;
            regionDonwlaod[51].href = `/regions/${result}/soflis%20meurneoba/3.%20pirutkvis%20suladoba.xlsx`;
            regionDonwlaod[52].href = `/regions/${result}/soflis%20meurneoba/4.%20metskhoveleobis%20produktsiis%20tsarmoeba.xlsx`;
            regionDonwlaod[53].href = `/regions/${result}/mretsveloba/mretsveloba.xlsx`;
            regionDonwlaod[54].href = `/regions/${result}/mshenebloba/mshenebloba_nebartvebi.xlsx`;
            regionDonwlaod[55].href = `/regions/${result}/mshenebloba/eqspluataciashi%20migebuli%20obieqtebi.xlsx`;
            regionDonwlaod[56].href = `/regions/${result}/mshenebloba/mshenebloba_dziritadi%20machveneblebi.xlsx`;
            regionDonwlaod[57].href = `/regions/მომსახურება/ორგანიზაციულ%20სამართლებრივი/${globalResponseName}.xlsx`;
            regionDonwlaod[58].href = `/regions/მომსახურება/საკუთრების%20ფორმების%20მიხედვით/${globalResponseName}.xlsx`;
            regionDonwlaod[59].href = `/regions/მომსახურება/ტიპების%20მიხედვით/${globalResponseName}.xlsx`;
            regionDonwlaod[60].href = `/regions/მომსახურება/ვაჭრობის%20დღეთა%20რაოდენობის%20მიხედვით/${globalResponseName}.xlsx`;
            regionDonwlaod[61].href = `/regions/მომსახურება/დირექციაში%20დასაქმებულები/${globalResponseName}.xlsx`;
            regionDonwlaod[62].href = `/regions/მომსახურება/სავაჭრო%20ადგილები%20და%20მოვაჭრეთა%20რაოდენობა/${globalResponseName}.xlsx`;
            regionDonwlaod[63].href = `/regions/მომსახურება/საფინანსო%20მაჩვენებლები/${globalResponseName}.xlsx`;
            regionDonwlaod[64].href = `/regions/${result}/vachroba/vachroba.xlsx`;
            regionDonwlaod[65].href = `/regions/${result}/sastumroebi%20da%20restornebi/sastumroebi%20da%20restornebi.xlsx`;
            regionDonwlaod[66].href = `/regions/სასტუმროები/რაოდენობა%20და%20ფართობი/${globalResponseName}.xlsx`;
            regionDonwlaod[67].href = `/regions/სასტუმროები/ნომრების%20რაოდენობა/${globalResponseName}.xlsx`;
            regionDonwlaod[68].href = `/regions/სასტუმროები/სტუმართა%20რაოდენობა/${globalResponseName}.xlsx`;
            regionDonwlaod[69].href = `/regions/სასტუმროები/დასაქმებულთა%20რაოდენობა/${globalResponseName}.xlsx`;
            regionDonwlaod[70].href = `/regions/${result}/transporti%20da%20dasawyobeba/transporti%20da%20dasawyobeba.xlsx`;
            regionDonwlaod[71].href = `/regions/${result}/transporti%20da%20dasawyobeba/registrirebuli%20avtomobilebis%20raodenoba.xlsx`;
            regionDonwlaod[72].href = `/regions/${result}/transporti%20da%20dasawyobeba/gzebis%20sigrdze.xlsx`;
            regionDonwlaod[73].href = `/regions/${result}/turizmi/ganawileba%20sacxovrebeli%20adgilis%20mixedvit.xls`;
            regionDonwlaod[74].href = `/regions/${result}/turizmi/ganawileba%20monaxulebuli%20regionebit.xls`;
            regionDonwlaod[75].href = `/regions/${result}/samartlebrivi%20statistika/samartlebrivi%20statistika.xlsx`;
            regionDonwlaod[76].href = `/regions/${result}/jandacva%20da%20socialuri%20uzrunvelkofa/jandacva%20da%20socialuri%20uzrunvelkofa.xlsx`;
            regionDonwlaod[77].href = `/regions/${result}/ganatleba/ganatleba.xlsx`;
            regionDonwlaod[78].href = `/regions/${result}/kultura/kultura.xlsx`;
            regionDonwlaod[79].href = `/regions/${result}/garemos%20dacva/garemos%20dacva.xlsx`;
            regionDonwlaod[80].href = `/regions/${result}/infrastruqtura/infrastruqtura.xlsx`;
          }
        }
      });
    });
    console.log(result);

    axios
      .get(`http://localhost:3000/getMunicipalName/?id=${result}`)
      .then((response) => {
        globalResponseName = response.data[0].Name;
        globalResponseNameEN = response.data[0].NameEN;
        console.log(globalResponseName, "globalResponseName");
        console.log(globalResponseNameEN, "globalResponseNameEN");
        console.log(response.data[0]);
        const municipalDonwlaod = document.querySelectorAll(
          ".municipal_download"
        );
        municipalDonwlaod.forEach((item) => {
          item.addEventListener("click", (event) => {
            lang1 = sessionStorage.getItem("lang1");
            console.log(`Language value: '${lang1}'`);
            if (lang1 === "en") {
              sidetitle.innerHTML = globalResponseNameEN;
              municipalDonwlaod[0].href = `/municipal/ENG/Main%20Information/Municipality%20area/${response.data[0].NameEN}%20Municipality.xlsx`;
              municipalDonwlaod[1].href = `/municipal/ENG/Main%20Information/Administrative%20structure/${response.data[0].NameEN}.xlsx`;
              municipalDonwlaod[2].href = `/municipal/ENG/Population/Number%20of%20population/${response.data[0].NameEN}.xlsx`;
              municipalDonwlaod[3].href = `/municipal/ENG/Population/Share%20of%20urban%20population/${response.data[0].NameEN}.xlsx`;
              municipalDonwlaod[4].href = `/municipal/ENG/Population/Density%20of%20population/${response.data[0].NameEN}.xlsx`;
            } else {
              sidetitle.innerHTML = globalResponseName;
              municipalDonwlaod[0].href = `/municipal/ძირითადი%20ინფორმაცია/მუნიციპალიტეტის%20ფართობი/${response.data[0].Name}.xlsx`;
              municipalDonwlaod[1].href = `/municipal/ძირითადი%20ინფორმაცია/ადმინისტრაციული%20მოწყობა/${response.data[0].Name}.xlsx`;
              municipalDonwlaod[2].href = `/municipal/მოსახლეობა/მოსახლეობის%20რიცხოვნობა%20საქალაქო-სასოფლო%20დასახლებების%20მიხედვით/${response.data[0].Name}.xlsx`;
              municipalDonwlaod[3].href = `/municipal/მოსახლეობა/საქალაქო%20დასახლებაში%20მცხოვრები%20მოსახლეობის%20წილი/${response.data[0].Name}.xlsx`;
              municipalDonwlaod[4].href = `/municipal/მოსახლეობა/მოსახლეობის%20სიმჭიდროვე/${response.data[0].Name}.xlsx`;
            }
          });
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
