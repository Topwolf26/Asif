/* ---------------------------------------------------------------
   Mitly — booking page logic (vanilla JS, no dependencies)
   Flow: pick a date  ->  pick a time  ->  enter details  ->  confirmed
----------------------------------------------------------------- */

(function () {
  "use strict";

  // --- sample availability -------------------------------------------------
  // Same slots offered on every available weekday. Easy to change later.
  var TIME_SLOTS = [
    "9:00am", "9:30am", "10:00am", "10:30am", "11:00am",
    "1:00pm", "1:30pm", "2:00pm", "2:30pm", "3:00pm", "3:30pm"
  ];

  var MONTHS = ["January","February","March","April","May","June",
    "July","August","September","October","November","December"];
  var WEEKDAYS_LONG = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

  // --- state ---------------------------------------------------------------
  var today = new Date();
  today.setHours(0, 0, 0, 0);

  var viewYear = today.getFullYear();
  var viewMonth = today.getMonth();   // 0-11
  var selectedDate = null;            // Date object
  var selectedTime = null;            // string

  // --- elements ------------------------------------------------------------
  var els = {
    card:        document.querySelector(".card"),
    monthLabel:  document.getElementById("calMonthLabel"),
    grid:        document.getElementById("calGrid"),
    prev:        document.getElementById("prevMonth"),
    next:        document.getElementById("nextMonth"),
    timesPane:   document.getElementById("timesPane"),
    timesDate:   document.getElementById("timesDateLabel"),
    timesList:   document.getElementById("timesList"),
    overlay:     document.getElementById("overlay"),
    sheetBack:   document.getElementById("sheetBack"),
    sheetBody:   document.getElementById("sheetBody"),
    sheetWhen:   document.getElementById("sheetWhen"),
    form:        document.getElementById("bookingForm"),
    name:        document.getElementById("name"),
    email:       document.getElementById("email")
  };

  // --- helpers -------------------------------------------------------------
  function sameDay(a, b) {
    return a.getFullYear() === b.getFullYear()
      && a.getMonth() === b.getMonth()
      && a.getDate() === b.getDate();
  }

  function isPast(date) {
    return date < today;
  }

  function isWeekend(date) {
    var d = date.getDay();
    return d === 0 || d === 6;
  }

  // available = not in the past and not a weekend
  function isAvailable(date) {
    return !isPast(date) && !isWeekend(date);
  }

  function longDate(date) {
    return WEEKDAYS_LONG[date.getDay()] + ", "
      + MONTHS[date.getMonth()] + " " + date.getDate();
  }

  // --- calendar render -----------------------------------------------------
  function renderCalendar() {
    els.monthLabel.textContent = MONTHS[viewMonth] + " " + viewYear;
    els.grid.innerHTML = "";

    var firstDay = new Date(viewYear, viewMonth, 1).getDay(); // 0=Sun
    var daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

    // leading blanks
    for (var b = 0; b < firstDay; b++) {
      var blank = document.createElement("span");
      blank.className = "day is-empty";
      els.grid.appendChild(blank);
    }

    for (var d = 1; d <= daysInMonth; d++) {
      var date = new Date(viewYear, viewMonth, d);
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "day";
      btn.textContent = String(d);

      if (sameDay(date, today)) btn.classList.add("is-today");

      if (!isAvailable(date)) {
        btn.classList.add("is-disabled");
        btn.disabled = true;
      } else {
        (function (theDate) {
          btn.addEventListener("click", function () { selectDate(theDate); });
        })(date);
      }

      if (selectedDate && sameDay(date, selectedDate)) {
        btn.classList.add("is-selected");
      }

      els.grid.appendChild(btn);
    }

    // disable going before the current month
    var atCurrentMonth = (viewYear === today.getFullYear() && viewMonth === today.getMonth());
    els.prev.disabled = atCurrentMonth;
  }

  // --- date / time selection ----------------------------------------------
  function selectDate(date) {
    selectedDate = date;
    renderCalendar();
    renderTimes();
  }

  function renderTimes() {
    els.card.classList.add("has-times");
    els.timesPane.hidden = false;
    els.timesDate.textContent = longDate(selectedDate);

    els.timesList.innerHTML = "";
    TIME_SLOTS.forEach(function (time) {
      var slot = document.createElement("button");
      slot.type = "button";
      slot.className = "slot";
      slot.textContent = time;
      slot.addEventListener("click", function () { selectTime(time); });
      els.timesList.appendChild(slot);
    });
  }

  function selectTime(time) {
    selectedTime = time;
    openSheet();
  }

  // --- booking sheet -------------------------------------------------------
  function whenLabel() {
    return selectedTime + " · " + longDate(selectedDate) + ", " + viewYearForDate();
  }

  function viewYearForDate() {
    return selectedDate.getFullYear();
  }

  function openSheet() {
    // restore the form (it may have been replaced by a confirmation)
    resetSheetToForm();
    els.sheetWhen.textContent = whenLabel();
    els.overlay.hidden = false;
  }

  function closeSheet() {
    els.overlay.hidden = true;
  }

  function resetSheetToForm() {
    if (document.getElementById("bookingForm")) return; // already a form
    els.sheetBody.innerHTML =
      '<h2 class="sheet__title" id="sheetTitle">Enter Details</h2>' +
      '<p class="sheet__when" id="sheetWhen"></p>' +
      '<form id="bookingForm" class="form" novalidate>' +
      '  <label class="field"><span class="field__label">Name *</span>' +
      '    <input class="field__input" id="name" type="text" required /></label>' +
      '  <label class="field"><span class="field__label">Email *</span>' +
      '    <input class="field__input" id="email" type="email" required /></label>' +
      '  <button class="btn btn--primary" type="submit">Schedule Event</button>' +
      '</form>';
    // rebind references + handler
    els.sheetWhen = document.getElementById("sheetWhen");
    els.form = document.getElementById("bookingForm");
    els.name = document.getElementById("name");
    els.email = document.getElementById("email");
    els.form.addEventListener("submit", onSubmit);
    els.sheetBack.style.visibility = "visible";
  }

  function onSubmit(e) {
    e.preventDefault();
    var name = els.name.value.trim();
    var email = els.email.value.trim();
    if (!name || !email || !els.email.checkValidity()) {
      els.form.reportValidity();
      return;
    }
    showConfirmation(name);
  }

  function showConfirmation(name) {
    els.sheetBack.style.visibility = "hidden";
    els.sheetBody.innerHTML =
      '<div class="confirm">' +
      '  <div class="confirm__check">' +
      '    <svg viewBox="0 0 24 24" class="ic"><path d="M5 13l4 4L19 7"/></svg>' +
      '  </div>' +
      '  <h2 class="confirm__title">You are scheduled</h2>' +
      '  <p class="confirm__detail">A calendar invitation has been sent to <strong>' +
           escapeHtml(name) + '</strong>.</p>' +
      '  <p class="confirm__detail" style="margin-top:10px;">' +
      '    <strong>30 Minute Meeting</strong><br>' + escapeHtml(whenLabel()) + '</p>' +
      '  <button class="btn btn--primary" id="doneBtn" style="margin:22px auto 0;">Done</button>' +
      '</div>';
    document.getElementById("doneBtn").addEventListener("click", closeSheet);
  }

  function escapeHtml(str) {
    return str.replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  // --- wiring --------------------------------------------------------------
  els.prev.addEventListener("click", function () {
    if (viewMonth === 0) { viewMonth = 11; viewYear--; }
    else { viewMonth--; }
    renderCalendar();
  });
  els.next.addEventListener("click", function () {
    if (viewMonth === 11) { viewMonth = 0; viewYear++; }
    else { viewMonth++; }
    renderCalendar();
  });
  els.sheetBack.addEventListener("click", closeSheet);
  els.form.addEventListener("submit", onSubmit);
  els.overlay.addEventListener("click", function (e) {
    if (e.target === els.overlay) closeSheet();
  });

  // --- init ----------------------------------------------------------------
  renderCalendar();
})();
