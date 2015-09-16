/**
 * Created by timyork on 8/23/15.
 */
var viz, workbook;
var landingPages = ["Landing_page", "Deals Landing Page", "Investor Landing Page", "Search Landing Page", "Round Size", "Filters", "Library", "Glossary"];
var pos = 0;

var ticket = window.ticketValue;
console.log(localStorage.getItem('ticketValue'));

window.onload = function () {

  console.log('#{ticket}')

  //http://<TableauServerName>/trusted/<unique ID from step 4>/t/<SiteName from step 3>/views/BusinessDashboard/AreaSalesPerformance

  var vizDiv = document.getElementById('viz');
  //      var vizURL = "https://10ay.online.tableau.com/#/site/gcvdealsdata/views/Subscription_Beta/Landing_page";
  //var vizURL = "http://70.35.203.217/#/site/GCVAnalytics/views/Subscription_Product_dev/Landing_page?:embed=y:render=false";
  var vizURL = "http://viz.gcvanalytics.com/trusted/" + ticket + "/t/GCVAnalytics/views/Subscription_Product_Release/Landing_page?:embed=y:render=false";
  var options = {
    //        width: '1000px',
    //        height: '540px',
    hideToolbar: true,
    hideTabs: true
  };
  console.log(vizURL);
  viz = new tableauSoftware.Viz(vizDiv, vizURL, options);

  viz.addEventListener('tabswitch', function (event) {
    var oldSheetName = event.getOldSheetName();
    var newSheetName = event.getNewSheetName();
    var isNewSheetLandingPage = landingPages.indexOf(newSheetName);
    var isOldSheetLandingPage = landingPages.indexOf(oldSheetName);
    console.log(newSheetName);
    console.log(landingPages.indexOf(newSheetName));
    var urlPrefix = "#/";
    var urlSheet = event.getNewSheetName();
    var urlString = urlPrefix.concat(urlSheet.replace(" ", "%20"));
    pos += 1;
    console.log("about to run history.pushState; stateValue=" + pos);
    history.pushState({pos: pos, sheetName: newSheetName}, 'New Title', urlString);
    $(document).ready(function () {
      $('a[href="' + this.location.pathname + '"]').parent().addClass('active');
    });
  })
};
window.onpopstate = function (event) {
  console.log("running onpopstate function");
  console.log("location: " + document.location + ", state: " + event.state.pos + ", SheetName: " + event.state.sheetName);
  if(pos !== null){
    workbook.activateSheetAsync(event.state.sheetName);
  } else {
    sheetName = "Landing_page";
    workbook.activateSheetAsync(event.state.sheetName);
  }
  if(event.originalEvent.state!=null){
    alert("location: " + document.location);
  };
};
var switchView = function (sheetName) {
  try {
    console.log("running switchView function");
    workbook = viz.getWorkbook();
    //         alert(workbook);
    workbook.activateSheetAsync(sheetName)
      .then(function(sheet){
        worksheet = sheet;
        console.log("running then function");
      });
  }
  catch (err) {
    alert(sheetName);
    alert(err.message);
  }
};
var viewCompanyDetails = function () {
  try {
    //document.getElementById("fieldid").get
    console.log("running switchViewCompany function");
    workbook = viz.getWorkbook();
    //         alert(workbook);
    workbook.activateSheetAsync("Company Details")
      .then(function (sheet) {
        dashboard = sheet;
        companyDetails1Sheet = dashboard.getWorksheets().get("Company Details 1 WS");
        companyDetailsSheet = dashboard.getWorksheets().get("Company Details WS");
        companyDetailsInvestorsSheet = dashboard.getWorksheets().get("Company Details - Investors WS");
        companyDetailsSheet.applyFilterAsync("Portfolio Company", companyName, tableau.FilterUpdateType.REPLACE);
        return companyDetailsSheet;
      })
      .then(function () {
        return companyDetails1Sheet.applyFilterAsync("Portfolio Company", companyName, tableau.FilterUpdateType.REPLACE);
      })
      .then(function () {
        return companyDetailsInvestorsSheet.applyFilterAsync("Portfolio Company", companyName, tableau.FilterUpdateType.REPLACE);
      });
  }
  catch (err) {
    alert(sheetName);
    alert(err.message);
  }
};
var exportPDF = function () {
  viz.showExportPDFDialog();
};
var exportImage = function () {
  viz.showExportImageDialog();
};
var exportData = function () {
  viz.showExportDataDialog();
};
var exportCrossTab = function () {
  viz.showExportCrossTabDialog();
};
var revertAll = function () {
  viz.revertAllAsync();
};