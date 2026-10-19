/**
 * J Square Lab & Diagnostic Centre
 * Google Spreadsheet: "J Square Booking & Payment Tracker"
 * Worksheet Tab: "Bookings"
 * 
 * Columns (12 required):
 * 1. Booking ID
 * 2. Created At
 * 3. Patient Name
 * 4. Mobile
 * 5. Package Name
 * 6. Selected Tests
 * 7. Final Amount
 * 8. Payment Method
 * 9. Payment Status
 * 10. Provider Transaction ID
 * 11. Booking Status
 * 12. Last Updated
 * 
 * Deployment Instructions:
 * 1. Open Google Sheets (https://sheets.new) and name the spreadsheet:
 *    "J Square Booking & Payment Tracker"
 * 2. Rename the active sheet tab to "Bookings"
 * 3. Click Extensions -> Apps Script
 * 4. Replace Code.gs contents with this complete code
 * 5. Set your custom SECRET string below
 * 6. Click Deploy -> New deployment -> Select type: "Web app"
 * 7. Set:
 *    - Execute as: "Me"
 *    - Who has access: "Anyone"
 * 8. Click "Deploy", authorize access, and copy the Web App URL.
 * 9. Set the copied URL as GOOGLE_SHEETS_WEBHOOK_URL in your server environment.
 */

const SECRET = "CHANGE_THIS_TO_A_LONG_RANDOM_TEXT";
const SPREADSHEET_TITLE = "J Square Booking & Payment Tracker";
const SHEET_NAME = "Bookings";
const NOTIFY_EMAIL = "jsquaredignosticelab@gmail.com";

const HEADERS = [
  "Booking ID",
  "Created At",
  "Patient Name",
  "Mobile",
  "Package Name",
  "Selected Tests",
  "Final Amount",
  "Payment Method",
  "Payment Status",
  "Provider Transaction ID",
  "Booking Status",
  "Last Updated"
];

function clean(v) {
  if (v === undefined || v === null) return "";
  var s = String(v).trim().slice(0, 1000);
  return /^[=+\-@]/.test(s) ? "'" + s : s; // Prevent formula injection
}

function out(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return out({ ok: false, error: "Empty request body" });
    }

    var d = JSON.parse(e.postData.contents);
    if (d.secret !== SECRET) {
      return out({ ok: false, error: "Unauthorized: Invalid secret" });
    }

    var bookingId = clean(d.bookingId || d.orderId);
    var mobile = clean(d.mobile);

    if (!bookingId || !/^[6-9]\d{9}$/.test(String(mobile).slice(-10))) {
      return out({ ok: false, error: "Invalid booking ID or 10-digit mobile number" });
    }

    // Wait up to 10 seconds for concurrent write lock
    lock.waitLock(10000);

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    if (ss.getName() !== SPREADSHEET_TITLE) {
      try { ss.rename(SPREADSHEET_TITLE); } catch (x) {}
    }

    var sh = ss.getSheetByName(SHEET_NAME);
    if (!sh) {
      sh = ss.insertSheet(SHEET_NAME);
    }

    // Initialize header row if sheet is brand new
    if (sh.getLastRow() === 0) {
      sh.appendRow(HEADERS);
      sh.setFrozenRows(1);
      sh.getRange(1, 1, 1, HEADERS.length)
        .setBackground("#10243A")
        .setFontColor("#FFFFFF")
        .setFontWeight("bold");
    }

    var lastRow = Math.max(sh.getLastRow(), 1);
    var ids = lastRow > 1 ? sh.getRange(2, 1, lastRow - 1, 1).getValues().flat() : [];
    var idx = ids.indexOf(bookingId);
    var isNew = (idx === -1);
    var targetRow = isNew ? (lastRow + 1) : (idx + 2);
    var now = new Date();

    // Preserve original creation timestamp if updating existing row
    var createdAt = isNew ? (d.createdAt ? new Date(d.createdAt) : now) : sh.getRange(targetRow, 2).getValue();

    var rowValues = [
      bookingId,                                    // 1. Booking ID
      createdAt,                                    // 2. Created At
      clean(d.patientName || d.name),               // 3. Patient Name
      clean(mobile),                                // 4. Mobile
      clean(d.packageName || d.package),            // 5. Package Name
      clean(d.selectedTests || d.testsSummary || "Standard Diagnostic Panel"), // 6. Selected Tests
      clean(d.finalAmount || d.amount),             // 7. Final Amount
      clean(d.paymentMethod || "UPI Online"),       // 8. Payment Method
      clean(d.paymentStatus || "Pending"),          // 9. Payment Status
      clean(d.providerTransactionId || d.utr || "Awaiting Verification"), // 10. Provider Transaction ID
      clean(d.bookingStatus || "Awaiting Verification"), // 11. Booking Status
      now                                           // 12. Last Updated
    ];

    // Format mobile number as plain string text
    sh.getRange(targetRow, 4).setNumberFormat("@");
    // Format amount as currency
    sh.getRange(targetRow, 7).setNumberFormat("#,##0");

    sh.getRange(targetRow, 1, 1, rowValues.length).setValues([rowValues]);

    // Send instant email notification to lab staff for new bookings
    if (isNew) {
      try {
        MailApp.sendEmail(
          NOTIFY_EMAIL,
          "New Diagnostic Booking: " + bookingId + " (" + clean(d.packageName || d.package) + ")",
          "A new diagnostic booking has been registered.\n\n" +
          "Booking ID: " + bookingId + "\n" +
          "Patient Name: " + clean(d.patientName || d.name) + "\n" +
          "Mobile: " + clean(mobile) + "\n" +
          "Package: " + clean(d.packageName || d.package) + " (₹" + clean(d.finalAmount || d.amount) + ")\n" +
          "Payment Method: " + clean(d.paymentMethod || "UPI Online") + "\n" +
          "Payment Status: " + clean(d.paymentStatus || "Pending") + "\n" +
          "Provider Transaction ID: " + clean(d.providerTransactionId || d.utr || "N/A") + "\n" +
          "Booking Status: " + clean(d.bookingStatus || "Awaiting Verification") + "\n\n" +
          "View in Google Sheet: " + ss.getUrl()
        );
      } catch (mailErr) {
        // Logging only, don't fail booking sync
      }
    }

    return out({
      ok: true,
      bookingId: bookingId,
      row: targetRow,
      isNew: isNew,
      updatedAt: now.toISOString()
    });
  } catch (err) {
    return out({ ok: false, error: String(err) });
  } finally {
    try { lock.releaseLock(); } catch (x) {}
  }
}
