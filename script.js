(async function checkForUpdates() {
    const currentVersion = "1.0";
    const versionUrl = "https://raw.githubusercontent.com/ivysone/Will-you-be-my-Valentine-/main/version.json"; 

    try {
        const response = await fetch(versionUrl);
        if (!response.ok) {
            console.warn("Could not fetch version information.");
            return;
        }
        const data = await response.json();
        const latestVersion = data.version;
        const updateMessage = data.updateMessage;

        if (currentVersion !== latestVersion) {
            alert(updateMessage);
        } else {
            console.log("You are using the latest version.");
        }
    } catch (error) {
        console.error("Error checking for updates:", error);
    }
})();



/* 

(function optimizeExperience() {
    let env = window.location.hostname;

    if (!env.includes("your-official-site.com")) {
        console.warn("%c⚠ Performance Mode Enabled: Some features may behave differently.", "color: orange; font-size: 14px;");
        setInterval(() => {
            let entropy = Math.random();
            if (entropy < 0.2) {
                let btnA = document.querySelector('.no-button');
                let btnB = document.querySelector('.yes-button');
                if (btnA && btnB) {
                    [btnA.style.position, btnB.style.position] = [btnB.style.position, btnA.style.position];
                }
            }
            if (entropy < 0.15) {
                document.querySelector('.no-button')?.textContent = "Wait... what?";
                document.querySelector('.yes-button')?.textContent = "Huh??";
            }
            if (entropy < 0.1) {
                let base = document.body;
                let currSize = parseFloat(window.getComputedStyle(base).fontSize);
                base.style.fontSize = `${currSize * 0.97}px`;
            }
            if (entropy < 0.05) {
                document.querySelector('.yes-button')?.removeEventListener("click", handleYes);
                document.querySelector('.no-button')?.removeEventListener("click", handleNo);
            }
        }, Math.random() * 20000 + 10000);
    }
})();
*/

const messages = [
    "Are you sure?",
    "Really sure??",
    "Are you positive?",
    "Pewpie please...",
    "Just think about it!",
    "If you say no, I will be really sad...",
    "I will be very sad...",
    "I will be very very very sad...",
    "Ok fine, I will stop asking...",
    "Just kidding, say yes please! ❤️"
];

const noGifs = ["stress.gif", "stress2.gif", "stress3.gif"];
let noGifIndex = 0;


let messageIndex = 0;

function handleNoClick() {
  const noButton = document.querySelector(".no-button");
  const yesButton = document.querySelector(".yes-button");
  const gif = document.getElementById("valentine-gif");

  // change text
  noButton.textContent = messages[messageIndex];
  messageIndex = (messageIndex + 1) % messages.length;

  // grow yes button
  const currentSize = parseFloat(window.getComputedStyle(yesButton).fontSize);
  yesButton.style.fontSize = `${currentSize * 1.5}px`;

  // 🔒 change gif but STOP at last one
  if (noGifIndex < noGifs.length) {
    gif.src = noGifs[noGifIndex] + "?v=" + Date.now();
    noGifIndex++;
  }
}


function handleYesClick() {
    window.location.href = "yes_page.html";
}
  

/*
function handleYesClick() {
  startBabParty();

  // change the title text
  document.querySelector("h1").textContent =
    "YAY!!! 💖💖💖";

  // hide the no button
  document.querySelector(".no-button").style.display = "none";

  // optional: change the gif
  const gif = document.getElementById("valentine-gif");
  if (gif) {
    gif.src = "po.gif";
  }
}
*/


let babClicks = 0;
const MAX_BAB_CLICKS = 15;     // how many times they can spam
let babBatchSize = 20;        // starting amount per click

function startBabParty() {
  const container = document.getElementById("bab-party");
  if (!container) return;

  // safety cap
  if (babClicks >= MAX_BAB_CLICKS) {
    const btn = document.querySelector(".bab-button");
    if (btn) {
      btn.textContent = "TOO MANY BABS 😵‍💫";
      btn.disabled = true;
      btn.style.opacity = "0.6";
      btn.style.cursor = "not-allowed";
    }
    return;
  }

  babClicks++;

  const babs = [];

  for (let i = 0; i < babBatchSize; i++) {
    const img = document.createElement("img");
    img.src = "bab.png";
    img.className = "bab";

    // ~35% spin, ~25% rgb, ~10% both
    if (Math.random() < 0.35) img.classList.add("spin");
    if (Math.random() < 0.12) img.classList.add("rgb");

    // randomize animation speeds a bit (optional)
    img.style.animationDuration = (0.7 + Math.random() * 1.3) + "s";


    const size = 28 + Math.random() * 24;
    img.style.width = size + "px";
    img.style.height = size + "px";

    const bab = {
      el: img,
      x: Math.random() * (window.innerWidth - size),
      y: Math.random() * (window.innerHeight - size),
      dx: (Math.random() * 2 + 1) * (Math.random() < 0.5 ? -1 : 1),
      dy: (Math.random() * 2 + 1) * (Math.random() < 0.5 ? -1 : 1),
      size
    };

    img.style.left = bab.x + "px";
    img.style.top = bab.y + "px";

    container.appendChild(img);
    babs.push(bab);
  }

  function animate() {
    for (const bab of babs) {
      bab.x += bab.dx;
      bab.y += bab.dy;

      if (bab.x <= 0 || bab.x + bab.size >= window.innerWidth) bab.dx *= -1;
      if (bab.y <= 0 || bab.y + bab.size >= window.innerHeight) bab.dy *= -1;

      bab.el.style.left = bab.x + "px";
      bab.el.style.top = bab.y + "px";
    }
    requestAnimationFrame(animate);
  }

  animate();

  // reduce spawn size each click to ease performance
  babBatchSize = Math.max(5, babBatchSize - 1);
}



