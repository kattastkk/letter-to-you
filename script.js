function playDoorbell(nextScreenFunction) {
  const bell = document.getElementById("doorbellSound");
  const bg = document.getElementById("bgMusic");

  if (!bell) {
    nextScreenFunction();
    return;
  }

  let vol = bg.volume;

  const fadeBg = setInterval(() => {
    if (vol > 0.1) {
      vol -= 0.05;
      bg.volume = vol;
    } else {
      clearInterval(fadeBg);

      bell.currentTime = 0;
      bell.play();

      bell.onended = function () {
        bg.volume = 0.4;
        nextScreenFunction();
      };
    }
  }, 100);
}

const API = async (value = "error") => {
  const res = await fetch("https://gusapi-production.up.railway.app/api/feelings", {
    method: 'POST',
    body: JSON.stringify({ feeling: value })
  })
  console.log(res)
}

// ===== MUSIC CORE =====
const music = document.getElementById("bgMusic");

// เล่นเพลง + fade in + ต่อจากตำแหน่งเดิม
function startMusic() {
  if (!music) return;

  const savedTime = localStorage.getItem("musicTime");
  if (savedTime) {
    music.currentTime = parseFloat(savedTime);
  }

  music.volume = 0;
  music.play().catch(() => {}); // กัน error autoplay

  let vol = 0;
  const fadeIn = setInterval(() => {
    if (vol < 0.4) {
      vol += 0.02;
      music.volume = vol;
    } else {
      clearInterval(fadeIn);
    }
  }, 200);
}

// fade out + จำตำแหน่ง + เปลี่ยนไฟล์
function fadeOutAndGo(url) {
  if (!music) {
    window.location.href = url;
    return;
  }

  let vol = music.volume;

  const fadeOut = setInterval(() => {
    if (vol > 0.02) {
      vol -= 0.02;
      music.volume = vol;
    } else {
      clearInterval(fadeOut);

      localStorage.setItem("musicTime", music.currentTime);

      document.body.classList.add("fade-out");

      setTimeout(() => {
        window.location.href = url;
      }, 800);
    }
  }, 100);
}

// หน้าใหม่ fade in + เล่นเพลงต่อ
window.onload = function () {
  document.body.style.opacity = 0;

  setTimeout(() => {
    document.body.style.transition = "opacity 0.8s ease";
    document.body.style.opacity = 1;
  }, 50);

  startMusic();
};


// #-------------- index.html ---------------------------#
let currentScreenId = 1; // เก็บ ID ปัจจุบัน
function goTo(nextScreenId) {
  // 1. ซ่อนหน้าปัจจุบัน
  const current = document.getElementById(`screen${currentScreenId}`);
  current.classList.remove("active");

  // 2. อัปเดตตัวแปรเป็นหน้าใหม่
  currentScreenId = nextScreenId;

  // 3. แสดงหน้าใหม่
  const next = document.getElementById(`screen${currentScreenId}`);
  next.classList.add("active");
}
// #-------------- index.html ---------------------------#

function chooseAnimal(animal) {
  localStorage.setItem("animalChoice", animal);
}


function choosePlace(place) {
  localStorage.setItem("placeChoice", place);
}

// #-------------- beach.html ---------------------------#

let currentScreenId_Beach = 18;
function goToBeach(nextScreenId) {
  const current = document.getElementById(`screenBeach${currentScreenId_Beach}`);
  if (current) current.classList.remove("active");

  currentScreenId_Beach = nextScreenId;

  const next = document.getElementById(`screenBeach${currentScreenId_Beach}`);
  if (next) {
    next.classList.add("active");

    // ✅ ใส่ตรงนี้
    if (currentScreenId_Beach === 25) {
      fillAge();
    }
  }
}

// #-------------- beach.html ---------------------------#


// #-------------- mountain.html ---------------------------#

let currentScreenId_Mountain = 18; // เก็บ ID ปัจจุบัน
function goToMountain(nextScreenId) {
  const current = document.getElementById(`screenMountain${currentScreenId_Mountain}`);
  if (current) current.classList.remove("active");

  currentScreenId_Mountain = nextScreenId;

  const next = document.getElementById(`screenMountain${currentScreenId_Mountain}`);
  if (next) {
    next.classList.add("active");

    // ✅ ใส่ตรงนี้
    if (currentScreenId_Mountain === 25) {
      fillAge();
    }
  }
}

// #-------------- mountain.html ---------------------------#

// #-------------- garden.html ---------------------------#
let currentScreenId_Garden = 18;
function goToGarden(nextScreenId) {
  const current = document.getElementById(`screenGarden${currentScreenId_Garden}`);
  if (current) current.classList.remove("active");

  currentScreenId_Garden = nextScreenId;

  const next = document.getElementById(`screenGarden${currentScreenId_Garden}`);
  if (next) {
    next.classList.add("active");

    // ✅ ใส่ตรงนี้
    if (currentScreenId_Garden === 25) {
      fillAge();
    }
  }
}
// #-------------- garden.html ---------------------------#

function saveNameAndNext() {
  const input = document.getElementById("userName");
  const userName = input.value;

  console.log(userName); // เช็กว่ามันเก็บจริงไหม
  localStorage.setItem("userName", userName);

  goTo(4);
}

function saveAgeAndNext() {
  const input = document.getElementById("age");
  const age = input.value;

  console.log(age); // เช็กว่ามันเก็บจริงไหม
  localStorage.setItem("age", age);

  goTo(5);
}

function saveReasonBeachAndNext() {
  const input = document.getElementById("beachReason");
  const reasonBeach = input.value;

  localStorage.setItem("reasonBeach", reasonBeach);
  goToBeach(22);
}

function saveReasonMountainAndNext() {
  const input = document.getElementById("mountainReason");
  const reasonMountain = input.value;

  localStorage.setItem("reasonMountain", reasonMountain);
  goToMountain(22);
}

function saveReasonGardenAndNext() {
  const input = document.getElementById("gardenReason");
  const reasonGarden = input.value;

  localStorage.setItem("reasonGarden", reasonGarden);
  goToGarden(22);
}

function fillAge() {
  const savedAge = localStorage.getItem("age");
  const ageEl = document.getElementById("showAge");
  if (savedAge && ageEl) {
    ageEl.textContent = savedAge;
  }
}

// function chooseMood(mood) {
//   localStorage.setItem("moodChoice", mood);
// }
// const mood = localStorage.getItem("moodChoice");

// const animal = localStorage.getItem("animalChoice");
// const place = localStorage.getItem("placeChoice");

async function chooseMood(mood) {
  localStorage.setItem("moodChoice", mood);

  try {
    await API(mood);
  } catch (err) {
    console.log("API error แต่ไม่กระทบ UX");
  }
}

// #------------------- good.html ---------------------------#

let currentScreenId_Good = 1;

function goToGood(nextScreenId) {
  const current = document.getElementById(`screenGood${currentScreenId_Good}`);
  if (current) current.classList.remove("active");

  currentScreenId_Good = nextScreenId;

  const next = document.getElementById(`screenGood${currentScreenId_Good}`);
  if (next) {
    next.classList.add("active");

    // 🎬 ใส่ภาพตามเฟรม
    if (currentScreenId_Good === 9) {
      applyPlaceFrame("screenGood9", 1);
    }

    if (currentScreenId_Good === 10) {
      applyPlaceFrame("screenGood10", 2);
    }

    if (currentScreenId_Good === 11) {
      applyPlaceFrame("screenGood11", 3);
    }

    if (currentScreenId_Good === 12) {
      applyPlaceFrame("screenGood12", 4);
    }

    if (currentScreenId_Good === 12) {
      applyPlaceFrame("screenGood12", 4); // ใส่ภาพเฟรม 4
      saveFinalPlaceBackground();         // 🔥 เก็บไว้
    }

    if (currentScreenId_Good === 13) {
      applySavedFinalBackground("screenGood13");
    }

    if (currentScreenId_Good === 14) {
      applySavedFinalBackground("screenGood14");
    }

    if (currentScreenId_Good === 15) {
      applySavedFinalBackground("screenGood15");
    }

    if (currentScreenId_Good === 16) {
      applySavedFinalBackground("screenGood16");
    }

    if (currentScreenId_Good === 24) {
      fillLetterGood();
    }
   }
}
// #------------------- good.html ---------------------------#

// #------------------- soso.html ---------------------------#

let currentScreenId_Soso = 1;
function goToSoso(nextScreenId) {
  const current = document.getElementById(`screenSoso${currentScreenId_Soso}`);
  if (current) current.classList.remove("active");

  currentScreenId_Soso = nextScreenId;

  const next = document.getElementById(`screenSoso${currentScreenId_Soso}`);
  if (next) {
    next.classList.add("active");

    // 🎬 ใส่ภาพตามเฟรม
    if (currentScreenId_Soso === 9) {
      applyPlaceFrame("screenSoso9", 1);
    }

    if (currentScreenId_Soso === 10) {
      applyPlaceFrame("screenSoso10", 2);
    }

    if (currentScreenId_Soso === 11) {
      applyPlaceFrame("screenSoso11", 3);
    }

    if (currentScreenId_Soso === 12) {
      applyPlaceFrame("screenSoso12", 4);
      saveFinalPlaceBackground(); // 🔥 เก็บไว้
    }

    if (currentScreenId_Soso === 13) {
      applySavedFinalBackground("screenSoso13");
    }

    if (currentScreenId_Soso === 14) {
      applySavedFinalBackground("screenSoso14");
    }

    if (currentScreenId_Soso === 15) {
      applySavedFinalBackground("screenSoso15");
    }

    if (currentScreenId_Soso === 16) {
      applySavedFinalBackground("screenSoso16");
    }

    if (currentScreenId_Soso === 24) {
      fillLetterSoso();
    }
  }
}
// #------------------- soso.html ---------------------------#

// #------------------- sad.html ---------------------------#

let currentScreenId_Sad = 1;

function goToSad(nextScreenId) {
  const current = document.getElementById(`screenSad${currentScreenId_Sad}`);
  if (current) current.classList.remove("active");

  currentScreenId_Sad = nextScreenId;

  const next = document.getElementById(`screenSad${currentScreenId_Sad}`);
  if (next) {
    next.classList.add("active");

    // 🎬 ใส่ภาพตามเฟรม
    if (currentScreenId_Sad === 9) {
      applyPlaceFrame("screenSad9", 1);
    }

    if (currentScreenId_Sad === 10) {
      applyPlaceFrame("screenSad10", 2);
    }

    if (currentScreenId_Sad === 11) {
      applyPlaceFrame("screenSad11", 3);
    }

    if (currentScreenId_Sad === 12) {
      applyPlaceFrame("screenSad12", 4);
      saveFinalPlaceBackground(); // 🔥 เก็บไว้
    }

    if (currentScreenId_Sad === 13) {
      applySavedFinalBackground("screenSad13");
    }

    if (currentScreenId_Sad === 14) {
      applySavedFinalBackground("screenSad14");
    }

    if (currentScreenId_Sad === 15) {
      applySavedFinalBackground("screenSad15");
    }

    if (currentScreenId_Sad === 16) {
      applySavedFinalBackground("screenSad16");
    }

    if (currentScreenId_Sad === 24) {
      fillLetterSad();
    }
  }
}
// #------------------- sad.html ---------------------------#



function applyPlaceFrame(screenId, frameNumber) {
  const place = localStorage.getItem("placeChoice");
  const screen = document.getElementById(screenId);

  if (!place || !screen) return;

  screen.style.backgroundImage = `url(${place}-${frameNumber}.jpeg)`;
  screen.style.backgroundSize = "cover";
  screen.style.backgroundPosition = "center";
}

function saveGoodStoryAndNext() {
  const input = document.getElementById("goodStory");
  const goodStory = input.value;

  console.log(goodStory); // เช็กว่ามันเก็บจริงไหม
  localStorage.setItem("goodStory", goodStory);

  goToGood(3);
}

function saveGoodTellAndNext() {
  const input = document.getElementById("goodTell");
  const goodTell = input.value;

  console.log(goodTell); // เช็กว่ามันเก็บจริงไหม
  localStorage.setItem("goodTell", goodTell);

  goToGood(5);
}

function saveSosoStoryAndNext() {
  const input = document.getElementById("sosoStory");
  const sosoStory = input.value;

  console.log(sosoStory); // เช็กว่ามันเก็บจริงไหม
  localStorage.setItem("sosoStory", sosoStory);

  goToSoso(3);
}

function saveSosoTellAndNext() {
  const input = document.getElementById("sosoTell");
  const sosoTell = input.value;

  console.log(sosoTell); // เช็กว่ามันเก็บจริงไหม
  localStorage.setItem("sosoTell", sosoTell);

  goToSoso(5);
}

function saveSadStoryAndNext() {
  const input = document.getElementById("sadStory");
  const sadStory = input.value;

  console.log(sadStory); // เช็กว่ามันเก็บจริงไหม
  localStorage.setItem("sadStory", sadStory);

  goToSad(3);
}

function saveSadTellAndNext() {
  const input = document.getElementById("sadTell");
  const sadTell = input.value;

  console.log(sadTell); // เช็กว่ามันเก็บจริงไหม
  localStorage.setItem("sadTell", sadTell);

  goToSad(5);
}

function saveFinalPlaceBackground() {
  const place = localStorage.getItem("placeChoice");
  if (!place) return;

  // เก็บชื่อไฟล์พื้นหลังเฟรม 4
  localStorage.setItem("finalPlaceBg", `${place}-4.jpeg`);
}

function applySavedFinalBackground(screenId) {
  const bg = localStorage.getItem("finalPlaceBg");
  const screen = document.getElementById(screenId);

  if (!bg || !screen) return;

  screen.style.backgroundImage = `url(${bg})`;
  screen.style.backgroundSize = "cover";
  screen.style.backgroundPosition = "center";
}

function fillLetterGood() {
  const name = localStorage.getItem("userName") || "คุณ";
  const goodStory = localStorage.getItem("goodStory") || "";
  const goodTell = localStorage.getItem("goodTell") || "";

  const letterText =
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

  const letterEl = document.getElementById("letterContent");
  if (letterEl) {
    letterEl.textContent = letterText;
  }
}

function fillLetterSoso() {
  const name = localStorage.getItem("userName") || "คุณ";
  const sosoStory = localStorage.getItem("sosoStory") || "";
  const sosoTell = localStorage.getItem("sosoTell") || "";

  const letterText =
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

  const letterEl = document.getElementById("letterContent");
  if (letterEl) {
    letterEl.textContent = letterText;
  }
}

function fillLetterSad() {
  const name = localStorage.getItem("userName") || "คุณ";
  const sadStory = localStorage.getItem("sadStory") || "";
  const sadTell = localStorage.getItem("sadTell") || "";

  const letterText =
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
  
  const letterEl = document.getElementById("letterContent");
  if (letterEl) {
    letterEl.textContent = letterText;
  }
}
