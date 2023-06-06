
import languageTextEn from "../lang/en.json";
import languageTextKa from "../lang/ka.json";

let machveneblebi = document.querySelector("#machveneblebi");
let languageText = languageTextKa;

machveneblebi.innerHTML = `
<span id="sidetitle" class="sidepanel-title">სტატისტიკა</span>
<table class="machveneblebi-right">
  <tbody>
    <tr>
      <th id="dziritadi1" title="" data-toggle="popover" data-placement="top"
        data-trigger="hover" data-content="">
        ${languageText.regions.dziritadi.title}<span class="float-right"></span>
      </th>
    </tr>
    <tr class="informacia1">
      <td>
        რეგიონის ფართობი
      </td>
      <td>
        <span class="float-right"><a class="region_download"
            href="">
            <img src="../images/excel-9-24.png" alt="exel" width="25" height="25"> </a></span>
      </td>
    </tr>
    <tr class="informacia1">
      <td>
        მუნიციპალიტეტების, ქალაქების და სოფლების რაოდენობა
      </td>
      <td>
        <span class="float-right"><a class="region_download"
            href="">
            <img src="../images/excel-9-24.png" alt="exel" width="25" height="25"> </a></span>
      </td>
    </tr>
  </tbody>
</table>`;

