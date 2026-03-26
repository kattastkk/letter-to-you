// ============================================================
//  PRELOAD HELPER  — kick off background fetch for next pages
//  so the browser has them ready before the user navigates
// ============================================================
function preloadPage(url) {
  const link = document.createElement("link");
  link.rel = "prefetch";
  link.href = url;
  document.head.appendChild(link);
}

// Preload the most likely next pages when the current page loads
(function () {
  const path = window.location.pathname.split("/").pop();
  if (path === "index.html" || path === "") {
    preloadPage("beach.html");
    preloadPage("mountain.html");
    preloadPage("garden.html");
  } else if (path === "beach.html" || path === "mountain.html" || path === "garden.html") {
    preloadPage("good.html");
    preloadPage("soso.html");
    preloadPage("sad.html");
  }
})();

// ============================================================
//  DOORBELL SOUND
// ============================================================
function playDoorbell(nextScreenFunction) {
  const bell = document.getElementById("doorbellSound");
  const bg   = document.getElementById("bgMusic");

  if (!bell) { nextScreenFunction(); return; }

  if (bg) bg.volume = 0.1;
  bell.currentTime = 0;
  bell.play();

  setTimeout(() => {
    if (bg) bg.volume = 0.4;
    nextScreenFunction();
  }, 1200);
}

// ============================================================
//  API  (analytics / mood tracking)
// ============================================================
const API = async (value = "error") => {
  try {
    await fetch("https://gusapi-production.up.railway.app/api/feelings", {
      method: "POST",
      body: JSON.stringify({ feeling: value }),
    });
  } catch (e) {
    console.log("API error — no UX impact");
  }
};

// ============================================================
//  MUSIC
// ============================================================
const music = document.getElementById("bgMusic");

function startMusic() {
  if (!music) return;

  const savedTime = localStorage.getItem("musicTime");
  if (savedTime) music.currentTime = parseFloat(savedTime);

  music.volume = 0;
  const promise = music.play();
  if (promise !== undefined) {
    promise.catch(() => console.log("Music waiting for user gesture."));
  }

  let vol = 0;
  const fadeIn = setInterval(() => {
    if (vol < 0.4) { vol += 0.02; music.volume = vol; }
    else clearInterval(fadeIn);
  }, 200);
}

// ============================================================
//  PAGE TRANSITION  (fade body + navigate)
// ============================================================
function fadeOutAndGo(url) {
  // If music isn't playing, skip fade and navigate directly
  if (!music || music.paused) {
    document.body.classList.add("fade-out");
    setTimeout(() => { window.location.href = url; }, 400);
    return;
  }

  let vol = music.volume;
  const fadeOut = setInterval(() => {
    if (vol > 0.02) {
      vol -= 0.03;            // slightly faster fade (was 0.02)
      music.volume = Math.max(vol, 0);
    } else {
      clearInterval(fadeOut);
      localStorage.setItem("musicTime", music.currentTime);
      document.body.classList.add("fade-out");
      setTimeout(() => { window.location.href = url; }, 600); // was 800ms
    }
  }, 80);                      // was 100ms
}

// ============================================================
//  PAGE FADE-IN on load
// ============================================================
window.onload = function () {
  document.body.style.opacity = 0;
  setTimeout(() => {
    document.body.style.transition = "opacity 0.6s ease";
    document.body.style.opacity = 1;
  }, 30);
};

// ============================================================
//  INDEX.HTML  — screens 1–18
// ============================================================
let currentScreenId = 1;

function goTo(nextScreenId) {
  const current = document.getElementById(`screen${currentScreenId}`);
  if (current) current.classList.remove("active");
  currentScreenId = nextScreenId;
  const next = document.getElementById(`screen${currentScreenId}`);
  if (next) next.classList.add("active");
}

// ============================================================
//  BEACH / MOUNTAIN / GARDEN — screens 18–26
// ============================================================
let currentScreenId_Beach = 18;
function goToBeach(n) {
  const cur = document.getElementById(`screenBeach${currentScreenId_Beach}`);
  if (cur) cur.classList.remove("active");
  currentScreenId_Beach = n;
  const nxt = document.getElementById(`screenBeach${currentScreenId_Beach}`);
  if (nxt) {
    nxt.classList.add("active");
    if (currentScreenId_Beach === 25) fillAge();
  }
}

let currentScreenId_Mountain = 18;
function goToMountain(n) {
  const cur = document.getElementById(`screenMountain${currentScreenId_Mountain}`);
  if (cur) cur.classList.remove("active");
  currentScreenId_Mountain = n;
  const nxt = document.getElementById(`screenMountain${currentScreenId_Mountain}`);
  if (nxt) {
    nxt.classList.add("active");
    if (currentScreenId_Mountain === 25) fillAge();
  }
}

let currentScreenId_Garden = 18;
function goToGarden(n) {
  const cur = document.getElementById(`screenGarden${currentScreenId_Garden}`);
  if (cur) cur.classList.remove("active");
  currentScreenId_Garden = n;
  const nxt = document.getElementById(`screenGarden${currentScreenId_Garden}`);
  if (nxt) {
    nxt.classList.add("active");
    if (currentScreenId_Garden === 25) fillAge();
  }
}

// ============================================================
//  GOOD / SOSO / SAD — screens
// ============================================================
let currentScreenId_Good = 1;
function goToGood(n) {
  const cur = document.getElementById(`screenGood${currentScreenId_Good}`);
  if (cur) cur.classList.remove("active");
  currentScreenId_Good = n;
  const nxt = document.getElementById(`screenGood${currentScreenId_Good}`);
  if (!nxt) return;
  nxt.classList.add("active");

  if (n === 9)  applyPlaceFrame("screenGood9",  1);
  if (n === 10) applyPlaceFrame("screenGood10", 2);
  if (n === 11) applyPlaceFrame("screenGood11", 3);
  if (n === 12) { applyPlaceFrame("screenGood12", 4); saveFinalPlaceBackground(); }
  if (n === 13) applySavedFinalBackground("screenGood13");
  if (n === 14) applySavedFinalBackground("screenGood14");
  if (n === 15) applySavedFinalBackground("screenGood15");
  if (n === 16) applySavedFinalBackground("screenGood16");
  if (n === 24) fillLetterGood();
}

let currentScreenId_Soso = 1;
function goToSoso(n) {
  const cur = document.getElementById(`screenSoso${currentScreenId_Soso}`);
  if (cur) cur.classList.remove("active");
  currentScreenId_Soso = n;
  const nxt = document.getElementById(`screenSoso${currentScreenId_Soso}`);
  if (!nxt) return;
  nxt.classList.add("active");

  if (n === 9)  applyPlaceFrame("screenSoso9",  1);
  if (n === 10) applyPlaceFrame("screenSoso10", 2);
  if (n === 11) applyPlaceFrame("screenSoso11", 3);
  if (n === 12) { applyPlaceFrame("screenSoso12", 4); saveFinalPlaceBackground(); }
  if (n === 13) applySavedFinalBackground("screenSoso13");
  if (n === 14) applySavedFinalBackground("screenSoso14");
  if (n === 15) applySavedFinalBackground("screenSoso15");
  if (n === 16) applySavedFinalBackground("screenSoso16");
  if (n === 24) fillLetterSoso();
}

let currentScreenId_Sad = 1;
function goToSad(n) {
  const cur = document.getElementById(`screenSad${currentScreenId_Sad}`);
  if (cur) cur.classList.remove("active");
  currentScreenId_Sad = n;
  const nxt = document.getElementById(`screenSad${currentScreenId_Sad}`);
  if (!nxt) return;
  nxt.classList.add("active");

  if (n === 9)  applyPlaceFrame("screenSad9",  1);
  if (n === 10) applyPlaceFrame("screenSad10", 2);
  if (n === 11) applyPlaceFrame("screenSad11", 3);
  if (n === 12) { applyPlaceFrame("screenSad12", 4); saveFinalPlaceBackground(); }
  if (n === 13) applySavedFinalBackground("screenSad13");
  if (n === 14) applySavedFinalBackground("screenSad14");
  if (n === 15) applySavedFinalBackground("screenSad15");
  if (n === 16) applySavedFinalBackground("screenSad16");
  if (n === 24) fillLetterSad();
}

// ============================================================
//  SAVE / LOAD from localStorage
// ============================================================
function chooseAnimal(animal) { localStorage.setItem("animalChoice", animal); }
function choosePlace(place)   { localStorage.setItem("placeChoice",  place);  }

async function chooseMood(mood) {
  localStorage.setItem("moodChoice", mood);
  try { await API(mood); } catch (e) {}
}

function saveNameAndNext() {
  localStorage.setItem("userName", document.getElementById("userName").value);
  goTo(4);
}
function saveAgeAndNext() {
  localStorage.setItem("age", document.getElementById("age").value);
  goTo(5);
}
function saveReasonBeachAndNext() {
  localStorage.setItem("reasonBeach", document.getElementById("beachReason").value);
  goToBeach(22);
}
function saveReasonMountainAndNext() {
  localStorage.setItem("reasonMountain", document.getElementById("mountainReason").value);
  goToMountain(22);
}
function saveReasonGardenAndNext() {
  localStorage.setItem("reasonGarden", document.getElementById("gardenReason").value);
  goToGarden(22);
}

function saveGoodStoryAndNext() {
  localStorage.setItem("goodStory", document.getElementById("goodStory").value);
  goToGood(3);
}
function saveGoodTellAndNext() {
  localStorage.setItem("goodTell", document.getElementById("goodTell").value);
  goToGood(5);
}
function saveSosoStoryAndNext() {
  localStorage.setItem("sosoStory", document.getElementById("sosoStory").value);
  goToSoso(3);
}
function saveSosoTellAndNext() {
  localStorage.setItem("sosoTell", document.getElementById("sosoTell").value);
  goToSoso(5);
}
function saveSadStoryAndNext() {
  localStorage.setItem("sadStory", document.getElementById("sadStory").value);
  goToSad(3);
}
function saveSadTellAndNext() {
  localStorage.setItem("sadTell", document.getElementById("sadTell").value);
  goToSad(5);
}

function fillAge() {
  const saved = localStorage.getItem("age");
  const el    = document.getElementById("showAge");
  if (saved && el) el.textContent = saved;
}

// ============================================================
//  PLACE FRAME BACKGROUNDS
// ============================================================
function applyPlaceFrame(screenId, frameNumber) {
  const place  = localStorage.getItem("placeChoice");
  const screen = document.getElementById(screenId);
  if (!place || !screen) return;
  screen.style.backgroundImage    = `url(${place}-${frameNumber}.jpeg)`;
  screen.style.backgroundSize     = "cover";
  screen.style.backgroundPosition = "center";
}

function saveFinalPlaceBackground() {
  const place = localStorage.getItem("placeChoice");
  if (place) localStorage.setItem("finalPlaceBg", `${place}-4.jpeg`);
}

function applySavedFinalBackground(screenId) {
  const bg     = localStorage.getItem("finalPlaceBg");
  const screen = document.getElementById(screenId);
  if (!bg || !screen) return;
  screen.style.backgroundImage    = `url(${bg})`;
  screen.style.backgroundSize     = "cover";
  screen.style.backgroundPosition = "center";
}

// ============================================================
//  LETTER GENERATORS
// ============================================================
function fillLetterGood() {
  const name      = localStorage.getItem("userName") || "คุณ";
  const goodStory = localStorage.getItem("goodStory") || "";
  const goodTell  = localStorage.getItem("goodTell")  || "";

  const text =
`ถึง : ${name} คนเก่ง ⭐️ 💌

สวัสดี ${name} 

ช่วงนี้กำลังรู้สึกดีอยู่ใช่ไหม
ดีใจนะที่ได้รู้ว่าในช่วงนี้

${goodStory}

เราอยากบอก ${name} ว่า

${goodTell}

คำพูดนี้อ่อนโยนมาก 💭
จนเราอยากเก็บมันไว้ให้ ${name} เสมอ

ถ้าวันไหน ${name} เผลอลืม
หรือเริ่มไม่แน่ใจในตัวเอง

อย่าลืมกลับมาอ่านจดหมายฉบับนี้อีกครั้งนะ

เพราะคำพูดเหล่านี้
เป็นของ ${name}
และ ${name} สมควรได้รับมันเสมอ 🤍

จาก ฉันเอง 💟`;

  const el = document.getElementById("letterContent");
  if (el) el.textContent = text;
}

function fillLetterSoso() {
  const name      = localStorage.getItem("userName") || "คุณ";
  const sosoStory = localStorage.getItem("sosoStory") || "";
  const sosoTell  = localStorage.getItem("sosoTell")  || "";

  const text =
`ถึง : ${name} คนเก่ง ⭐️ 💌 🌿

สวัสดี ${name}

วันนี้อาจไม่ได้มีอะไรพิเศษ
ไม่ได้ดีมาก และก็ไม่ได้แย่

แต่ในวันธรรมดาแบบนี้
คุณก็ยังมีบางสิ่งเล็ก ๆ
ที่แวะผ่านเข้ามาในใจ
อย่างเช่น...

${sosoStory}

บางทีเรื่องเล็ก ๆ แบบนี้
อาจไม่ได้เปลี่ยนวันทั้งวัน
แต่มันก็ทำให้เราได้หยุด
และรู้ว่าหัวใจยังค่อย ๆ รู้สึกอยู่

และถ้าวันไหน
ความรู้สึกมันไม่ชัดเจนอีกครั้ง
นี่คือสิ่งที่คุณอยากบอกกับตัวเอง

${sosoTell}

ขอบคุณที่ยังอ่อนโยนกับตัวเองแบบนี้นะ
แค่ยอมรับได้ว่า
ความรู้สึกเฉย ๆ ก็ไม่ผิดอะไร
แค่นี้ก็เพียงพอแล้ว

ถ้าวันไหน ${name}
รู้สึกเฉย ๆ อีกครั้ง

อย่าลืมว่า
แม้ความรู้สึกจะไม่ชัด
มันก็ยังมีคุณค่าเสมอนะ 🤍

จาก ฉันเอง 🌱`;

  const el = document.getElementById("letterContent");
  if (el) el.textContent = text;
}

function fillLetterSad() {
  const name     = localStorage.getItem("userName") || "คุณ";
  const sadStory = localStorage.getItem("sadStory") || "";
  const sadTell  = localStorage.getItem("sadTell")  || "";

  const text =
`ถึง : ${name} ⭐️ 💌 

สวัสดี ${name}

เรารู้ว่าวันนี้มันหนักเอาเรื่องเลยนะ

บางความรู้สึกมันไม่ได้แค่ "ไม่โอเค"
แต่มันเหมือนต้องพยายามหายใจ
ทั้งที่ใจมันล้าเหลือเกิน

เรื่องที่ ${name} เล่าให้ฟัง...
เรารับรู้มันนะ

${sadStory}

มันไม่ใช่เรื่องเล็กเลย
และมันไม่แปลกเลยที่คุณจะรู้สึกแบบนี้

บางครั้ง
ความเศร้าไม่ได้ส่งเสียงดัง
แต่มันค่อย ๆ กดทับอยู่ข้างใน
จนเราเหนื่อยโดยไม่รู้ตัว

แต่รู้ไหม
ท่ามกลางความหนักหนาเหล่านั้น
${name} ยังเลือกจะอ่อนโยนกับใครบางคน

และนี่คือสิ่งที่ ${name} อยากบอกเขา

${sadTell}

คำพูดพวกนั้น
ไม่ได้สวยงามเพราะถ้อยคำ
แต่มันสวยงาม
เพราะมันออกมาจากหัวใจของ ${name}

และบางที
คนที่ควรได้ยินมันมากที่สุด
อาจเป็น ${name} เอง

ไม่เป็นไรเลยนะ
ถ้าตอนนี้ยังเข้มแข็งไม่ไหว
ไม่เป็นไรเลย
ถ้ายังคิดถึงเรื่องเดิมซ้ำ ๆ
ไม่เป็นไรเลย
ถ้ามันยังเจ็บอยู่

${name} ไม่ต้องรีบดีขึ้นก็ได้

แค่วันนี้ยังหายใจอยู่
แค่นี้ก็เก่งมากแล้วจริง ๆ

ถ้าวันไหนความเศร้ากลับมาอีกครั้ง
อย่าลืมว่า
${name} เคยมีคำพูดที่อ่อนโยนแบบนี้อยู่ในตัวเองเสมอ

และมันยังอยู่ตรงนี้
เพื่อโอบกอด ${name} อีกครั้ง 🤍

จาก คนที่อยู่ข้าง ${name} เสมอ 🌙`;

  const el = document.getElementById("letterContent");
  if (el) el.textContent = text;
}
