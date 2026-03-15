// Supabase Activity Logger
// Logs drawing downloads to eFans activity feed

(function () {
  var SUPABASE_URL = "https://zzcqfrtwiikyixvegtwt.supabase.co";
  var SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp6Y3FmcnR3aWlreWl4dmVndHd0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM2MDU3NjQsImV4cCI6MjA4OTE4MTc2NH0.WKWRYLzqzUh1OurBnyOtbjXgyc8S_nYy4MyRY1gpXcM";

  function logDrawing() {
    var w = parseInt(document.getElementById("inW").value) || 0;
    var h = parseInt(document.getElementById("inH").value) || 0;
    var activeBtn = document.querySelector(".sup-btn.active");
    var supplier = activeBtn ? activeBtn.textContent.split("\n")[0].trim() : "Unknown";

    var fw = typeof flangeSize === "function" ? flangeSize(w) : 0;
    var fh = typeof flangeSize === "function" ? flangeSize(h) : 0;
    var nw = typeof neckSize === "function" ? neckSize(w) : 0;
    var nh = typeof neckSize === "function" ? neckSize(h) : 0;

    fetch(SUPABASE_URL + "/rest/v1/drawings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": SUPABASE_KEY,
        "Authorization": "Bearer " + SUPABASE_KEY,
        "Prefer": "return=minimal"
      },
      body: JSON.stringify({
        supplier: supplier,
        width: w,
        height: h,
        flange_w: fw,
        flange_h: fh,
        neck_w: nw,
        neck_h: nh
      })
    }).catch(function (err) {
      console.warn("Activity log failed:", err);
    });
  }

  // Attach to the download button
  var dlBtn = document.querySelector(".dl-btn");
  if (dlBtn) {
    dlBtn.addEventListener("click", logDrawing);
  }
})();

