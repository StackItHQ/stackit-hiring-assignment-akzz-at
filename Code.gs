function openDialog() {
  // Create an HTML output object from the file named 'Page',
  // and set its dimensions to 400x300 pixels
  var html = HtmlService.createHtmlOutputFromFile("Page")
    .setWidth(400)
    .setHeight(300);
  // Access the user interface of the current spreadsheet and
  // show a modal dialog box with the specified HTML content and title
  SpreadsheetApp.getUi().showModalDialog(html, "Upload CSV");
}

// Define the function parseCSV to extract the header row from the CSV data
function parseCSV(csvData) {
  // Split the CSV data into lines based on newline characters
  var lines = csvData.split("\n");
  // Split the first line of the CSV data into an array of headers based on commas
  var headers = lines[0].split(",");
  // Return the array of headers
  return headers;
}

// Define the function importSelectedColumns to import selected columns from the CSV data

function importSelectedColumns(
  selectedColumns,
  csvData,
  lowerBounds,
  upperBounds,
  exactValues,
  lengths
) {
  var lines = csvData.split("\n");
  var headers = lines[0].split(",");
  var data = [];
  for (var i = 1; i < lines.length; i++) {
    var values = lines[i].split(",");
    var row = [];
    for (var j = 0; j < selectedColumns.length; j++) {
      var index = headers.indexOf(selectedColumns[j]);
      if (index !== -1) {
        var value = values[index];
        var lowerBound = lowerBounds[j];
        var upperBound = upperBounds[j];
        var exactValue = exactValues[j];
        var length = lengths[j];
        var exactString = exactStrings[j];

        if (
          (lowerBound != -1 && parseFloat(value) < parseFloat(lowerBound)) ||
          (upperBound != -1 && parseFloat(value) > parseFloat(upperBound)) ||
          (exactValue != -1 && value != exactValue) ||
          (length != -1 && value.length < length) ||
          (exactString !== -1 && value !== exactString)
        ) {
          row.push(""); // If value doesn't meet the criteria, push an empty string
        } else {
          row.push(value); // Otherwise, push the actual value
        }
      } else {
        row.push("");
      }
    }
    data.push(row);
  }
  // ... rest of your code

  const ss = SpreadsheetApp.getActive();
  const sh = ss.getSheetByName("Sheet1");
  const lrow = sh.getLastRow();

  var startRow;
  if (lrow === 0) {
    startRow = 1;
  } else {
    const Avals = sh.getRange("A1:A" + lrow).getValues();
    const foundIndex = Avals.findIndex((row) => row[0] === "");
    startRow = (foundIndex !== -1 ? foundIndex : lrow) + 1;
  }

  data.unshift(selectedColumns);
  sh.getRange(startRow, 1, data.length, data[0].length).setValues(data);
}
