/**
 * Created by timyork on 8/23/15.
 */
var viz, workbook;
var landingPages = ["Landing_page","Deals Landing Page","Investor Landing Page","Search Landing Page","Round Size","Filters","Library","Glossary"];
var pos=0;

window.onload= function() {
  var vizDiv = document.getElementById('viz');
//      var vizURL = "https://10ay.online.tableau.com/#/site/gcvdealsdata/views/Subscription_Beta/Landing_page";
  var vizURL = "http://70.35.203.217/#/site/GCVAnalytics/views/Subscription_Product_RevT%2FLanding_page?:embed=y";
  var options = {
//        width: '1000px',
//        height: '540px',
    hideToolbar: true,
    hideTabs: true
  };
  viz = new tableauSoftware.Viz(vizDiv, vizURL, options);
  viz.addEventListener('tabswitch', function(event){
    var oldSheetName = event.getOldSheetName();
    var newSheetName = event.getNewSheetName();
    var isNewSheetLandingPage = landingPages.indexOf(newSheetName);
    var isOldSheetLandingPage = landingPages.indexOf(oldSheetName);

    console.log(newSheetName);
    console.log(landingPages.indexOf(newSheetName));

    var urlPrefix = "#/";
    var urlSheet = event.getNewSheetName();
    var urlString = urlPrefix.concat(urlSheet.replace(" ","%20"));

    pos += 1;

    console.log("about to run history.pushState; stateValue=" + pos);

    history.pushState({pos: pos, sheetName: newSheetName}, 'New Title', urlString);
  })
};

window.onpopstate = function(event) {
  console.log("running onpopstate function");
//        console.log("location: " + document.location + ", state: " + event.state.pos + ", SheetName: " + event.state.sheetName);
//      if(pos !== null){
//        workbook.activateSheetAsync(event.state.sheetName);
//      } else {
//        sheetName = "Landing_page";
//        workbook.activateSheetAsync(event.state.sheetName);
//      }

//      if(event.originalEvent.state!=null){
//        alert("location: " + document.location);
//      };
};

var switchView = function(sheetName) {
    try {
      workbook = viz.getWorkbook();
//         alert(workbook);
      workbook.activateSheetAsync(sheetName)
        .then(function clearFilters() {
          activeSheet.clearFilterAsync("Region");
          activeSheet.clearFilterAsync("F: GDP per capita (curr $)");
        });
    }
    catch(err) {
      alert(sheetName);
      alert(err.message);
    }
  }