[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/_IojtdoU)
# StackIt Hiring Assignment

### Welcome to StackIt's hiring assignment! 🚀

**If you didn't get here through github classroom, are you sure you're supposed to be here? 🤨**


We are glad to have you here, but before you read what you're going to beat your head over for the next few hours (maybe days?), let's get a few things straight:
- We really appreciate honesty. Don't copy anyone else's assignment, it'll only sabotage your chances :P
- You're free to use any stack, and library of your choice. Use whatever you can get your hands on, on the internet!
- We love out of the box solutions. We prefer to call it *Jugaad* 
- This might be just the first round, but carries the most importance of all. Give your best, and we hope you have a fun time solving this problem.

## ✨ **Problem Statement: Crafting a CSV Importer for Google Sheets** ✨

**Context**:
Data analysts around the world 🌍, handle massive amounts of data to derive meaningful insights for their organization 📊. Among the tools they use, Google Sheets 📈 stands out due to its ease of use, accessibility, and collaborative features. However, many analysts have identified a recurring pain point: the cumbersome process of importing CSV files into Google Sheets repeatedly.

A typical week of an analyst in an e-commerce company 🛒 involves receiving multiple CSV files 📁 containing sales, inventory, customer feedback, and more. The data from these files needs to be meticulously analyzed and presented in the company’s weekly meetings. However, instead of diving directly into analysis, most analysts need to spend an inordinate amount of time just importing and structuring these CSV files into Google Sheets ⏳. This repetitive, time-consuming task reduces the efficiency of these professionals and delays the extraction of crucial insights 😫.

**Today, you are going to make their lives better.**

**Problem Statement**:
Make a CSV Importer for Google Sheets that lets users drag and drop CSV files onto the Google Sheet. The moment they drop the CSV file, allow them to select which columns to import 🗂️.

You get brownie points 🍪 if you can make it even easier by allowing them to filter the data as well before importing it into Google Sheets 🔍.

**Other pointers**:
- Import to Sheet – After validation and mapping, devise a method to populate the data into a chosen Google Sheet, either appending to existing data or creating a new sheet 📥📋.
- Optimize for Large Files – Large datasets are common in analytics. Your solution should effectively handle large CSV files (~15MB CSV file) without causing performance issues or prolonged waiting times 📈📦.

## Submission ⏰
The timeline for this submission is: **9AM, 30th Sept, 2023 - 12PM, 2nd Oct, 2023**

Some things you might want to take care of:
- Make use of git and commit your steps!
- Use good coding practices.
- Write beautiful and readable code. Well-written code is nothing less than a work of art.
- Use semantic variable naming.
- Your code should be organized well in files and folders which is easy to figure out.
- If there is something happening in your code that is not very intuitive, add some comments.
- Add to this README at the bottom explaining your approach (brownie points 😋)

Make sure you finish the assignment a little earlier than this so you have time to make any final changes.

Once you're done, make sure you **record a video** showing your project working. The video should **NOT** be longer than 120 seconds. While you record the video, tell us about your biggest blocker, and how you overcame it! Don't be shy, talk us through, we'd love that.

We have a checklist at the bottom of this README file, which you should update as your progress with your assignment. It will help us evaluate your project.

- [x] My code's working just fine! 🥳
- [x] I have recorded a video showing it working and embedded it in the README ▶️
- [x] I have tested all the normal working cases 😎
- [x] I have even solved some edge cases (brownie points) 💪
- [x] I added my very planned-out approach to the problem at the end of this README 📜

## Got Questions❓
Feel free to check the discussions tab, you might get something of help there. Check out that tab before reaching out to us. Also, did you know, the internet is a great place to explore 😛

# Developer's Section
*Add your video here, and your approach to the problem (optional). Leave some comments for us here if you want, we will be reading this :)*

### Approach to Problem Solving:
The delineated method exhibits a structured approach towards crafting a CSV Importer tool for Google Sheets. Here's a step-by-step breakdown of the procedure implemented:

1. **Dialog Box Initiation**:
   - The `openDialog` function is triggered, rendering a modal dialog box where users can either drag-and-drop or manually select a CSV file.
   
2. **CSV Parsing and Header Extraction**:
   - Post file selection, `parseCSV` function is invoked to extract headers from the CSV data, which are subsequently displayed with checkboxes for users to selectively import columns, accompanied by input fields for specifying filtering criteria.
   
3. **Column Selection and Criteria Specification**:
   - Upon submission, `submitColumns` function aggregates the selected columns and filtering criteria, channeling them to `importSelectedColumns` function.
   
4. **Data Filtering**:
   - A thorough iteration through the CSV data is performed, evaluating each entry against the specified criteria for data filtration. Additionally, a meticulous check for any absent columns in a row is conducted to uphold the data structure's integrity.
   
5. **Data Transcription to Google Sheet**:
   - The filtered data is then transcribed to a Google Sheet, commencing from either an empty or specified row, determined by inspecting the last populated row in the Sheet. The setup allows appending the refined data to an existing Sheet or inscribing on a new Sheet, maintaining a balance between automation and user control. 


### Corner Cases Handled 

1. **Empty CSV File**
If an empty CSV file is uploaded, the `importSelectedColumns` function will not add any data to the sheet, but it will still attempt to run without errors. The loop `for (var i = 1; i < lines.length; i++)` will not iterate and data will remain an empty array.

2.  **Missing Headers**
If the CSV file lacks headers, `parseCSV` would still attempt to split the first line into headers. This would result in inaccurate column mapping in `importSelectedColumns` when processing subsequent rows. There isn’t a direct check for this scenario in the code.

3.  **Mismatched Column Count**
In the `importSelectedColumns` function, if a row has more or fewer columns than the header row, this code handles it by checking the index of each selected column in the header row with `var index = headers.indexOf(selectedColumns[j]);` If a column is missing (indicated by an index of -1), an empty string is pushed to the row array.

4. **Filtering Criteria**
In `importSelectedColumns`, a variety of filtering criteria are applied to each data value, such as checking against lower and upper bounds, exact values, string lengths, and exact strings. If a data value fails any of these criteria, an empty string is added to the row array instead of the actual value.


### Identified Drawbacks:

- **Endpoint Detection Issue**:
  - The mechanism to ascertain the endpoint of an already populated sheet encounters a hiccup if the first column is empty. The current logic, dependent on examining the first column to locate the last populated row, could misidentify the starting point for appending new data if the first column lacks entries.
  
- **Performance Degradation with Large Files**:
  - The code's efficiency dwindles when processing very large files, attributable chiefly to the inherent limitations of Google Apps Script. The algorithm, being wholly devised from scratch without utilizing external APIs or optimized libraries, encounters further performance impediments when handling hefty datasets. This scenario could lead to a sluggish user experience or timeouts, which could have been alleviated by leveraging external APIs or optimized libraries tailored for managing large CSV files, thereby ensuring a swifter, more responsive user interaction.

*Feel free to refer to the inline comments within the code for a more detailed understanding of the logic and the approach taken to address various segments of the problem statement.*

