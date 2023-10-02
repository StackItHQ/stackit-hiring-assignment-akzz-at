function openDialog() {
  // Created an HTML output object from the file named 'Page',
  // and set its dimensions to 400x300 pixels
  var html = HtmlService.createHtmlOutputFromFile("Page")
    .setWidth(400)
    .setHeight(300);
  // Access the user interface of the current spreadsheet and
  // show a modal dialog box with the specified HTML content and title
  SpreadsheetApp.getUi().showModalDialog(html, "Upload CSV");
}

function parseCSV(csvData) {
  // Split the CSV data into lines based on newline characters
  var lines = csvData.split("\n");
  // Split the first line of the CSV data into an array of headers based on commas
  var headers = lines[0].split(",");
  // Return the array of headers
  return headers;
}

function importSelectedColumns(selectedColumns, csvData) {
  var lines = csvData.split("\n");
  var headers = lines[0].split(",");
  var data = [];
  for (var i = 1; i < lines.length; i++) {
    var values = lines[i].split(",");
    var row = [];
    for (var j = 0; j < selectedColumns.length; j++) {
      var index = headers.indexOf(selectedColumns[j]);
      if (index !== -1) {
        row.push(values[index]);
      } else {
        row.push("");
      }
    }
    data.push(row);
  }
}
