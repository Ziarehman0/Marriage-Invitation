document.addEventListener("DOMContentLoaded", () => {

  /* =========================================
     ELEMENTS
  ========================================= */

  const openingScreen =
    document.getElementById("openingScreen");

  const openButton =
    document.getElementById("openInvitation");

  const invitation =
    document.getElementById("invitation");

  const musicBtn =
    document.getElementById("musicBtn");

  const music =
    document.getElementById("weddingMusic");


  document.body.classList.add("locked");


  /* =========================================
     OPEN INVITATION
  ========================================= */

  openButton.addEventListener("click", async () => {

    if (
      openingScreen.classList.contains("opened")
    ) {
      return;
    }


    openingScreen.classList.add("opened");


    /* Start music after user tap */

    try {

      await music.play();

      musicBtn.classList.add("playing");

      musicBtn.setAttribute(
        "aria-label",
        "Pause music"
      );

    } catch (error) {

      console.log(
        "Browser blocked automatic music."
      );

    }


    /*
      Envelope animation ke baad
      invitation show hogi.
    */

    setTimeout(() => {

      openingScreen.classList.add(
        "is-opening"
      );

      invitation.classList.add(
        "ready"
      );

      musicBtn.classList.add(
        "visible"
      );

      document.body.classList.remove(
        "locked"
      );

      window.scrollTo({
        top: 0,
        behavior: "instant"
      });

      observeReveals();

    }, 1200);

  });


  /* =========================================
     MUSIC BUTTON
  ========================================= */

  musicBtn.addEventListener(
    "click",
    async () => {

      if (music.paused) {

        try {

          await music.play();

          musicBtn.classList.add(
            "playing"
          );

          musicBtn.setAttribute(
            "aria-label",
            "Pause music"
          );

        } catch (error) {

          console.log(
            "Music could not be played."
          );

        }

      } else {

        music.pause();

        musicBtn.classList.remove(
          "playing"
        );

        musicBtn.setAttribute(
          "aria-label",
          "Play music"
        );

      }

    }
  );


  /* =========================================
     COUNTDOWN
  ========================================= */

  const weddingDate =
    new Date(
      "2026-11-08T13:00:00+05:00"
    ).getTime();


  const days =
    document.getElementById("days");

  const hours =
    document.getElementById("hours");

  const minutes =
    document.getElementById("minutes");

  const seconds =
    document.getElementById("seconds");


  function updateCountdown() {

    const now =
      Date.now();

    const distance =
      weddingDate - now;


    if (distance <= 0) {

      days.textContent = "00";
      hours.textContent = "00";
      minutes.textContent = "00";
      seconds.textContent = "00";

      return;
    }


    const d =
      Math.floor(
        distance / 86400000
      );


    const h =
      Math.floor(
        (distance % 86400000) /
        3600000
      );


    const m =
      Math.floor(
        (distance % 3600000) /
        60000
      );


    const s =
      Math.floor(
        (distance % 60000) /
        1000
      );


    days.textContent =
      String(d).padStart(2, "0");

    hours.textContent =
      String(h).padStart(2, "0");

    minutes.textContent =
      String(m).padStart(2, "0");

    seconds.textContent =
      String(s).padStart(2, "0");

  }


  updateCountdown();

  setInterval(
    updateCountdown,
    1000
  );


  /* =========================================
     SCROLL ANIMATION
  ========================================= */

  let revealObserver;


  function observeReveals() {

    if (revealObserver) {
      revealObserver.disconnect();
    }


    revealObserver =
      new IntersectionObserver(
        (entries) => {

          entries.forEach(
            (entry) => {

              if (
                entry.isIntersecting
              ) {

                entry.target.classList.add(
                  "visible"
                );

                revealObserver.unobserve(
                  entry.target
                );

              }

            }
          );

        },
        {
          threshold: 0.14,

          rootMargin:
            "0px 0px -40px 0px"
        }
      );


    document
      .querySelectorAll(".reveal")
      .forEach((element) => {

        revealObserver.observe(
          element
        );

      });

  }


  /* =========================================
     HEART SCRATCH
  ========================================= */

  const canvas =
    document.getElementById(
      "scratchCanvas"
    );

  const heart =
    document.querySelector(
      ".heart-scratch"
    );

  const ctx =
    canvas.getContext("2d");


  let scratching = false;

  let revealed = false;


function resizeCanvas() {

  if (revealed) {
    return;
  }

  /*
    IMPORTANT:
    getBoundingClientRect() rotated heart ka
    visual/bounding size deta hai.

    Isliye offsetWidth/offsetHeight use kar rahe hain
    taake canvas actual heart ke andar exact fit ho.
  */

  const width = heart.offsetWidth;
  const height = heart.offsetHeight;

  const dpr =
    Math.min(
      window.devicePixelRatio || 1,
      2
    );

  canvas.width =
    Math.round(width * dpr);

  canvas.height =
    Math.round(height * dpr);

  canvas.style.width =
    width + "px";

  canvas.style.height =
    height + "px";

  ctx.setTransform(
    dpr,
    0,
    0,
    dpr,
    0,
    0
  );

  const gradient =
    ctx.createLinearGradient(
      0,
      0,
      width,
      height
    );

  gradient.addColorStop(
    0,
    "#ead3c7"
  );

  gradient.addColorStop(
    1,
    "#b77b72"
  );

  ctx.fillStyle =
    gradient;

  ctx.fillRect(
    0,
    0,
    width,
    height
  );

  ctx.fillStyle =
    "rgba(255,255,255,.16)";

  for (
    let x = -height;
    x < width;
    x += 16
  ) {

    ctx.save();

    ctx.translate(
      x,
      0
    );

    ctx.rotate(-0.45);

    ctx.fillRect(
      0,
      0,
      8,
      height * 2
    );

    ctx.restore();
  }

  ctx.fillStyle =
    "#fff8f3";

  ctx.textAlign =
    "center";

  ctx.textBaseline =
    "middle";

  ctx.font =
    "600 18px 'DM Sans', sans-serif";

  ctx.fillText(
    "SCRATCH TO REVEAL",
    width / 2,
    height / 2 - 10
  );

  ctx.font =
    "13px 'DM Sans', sans-serif";

  ctx.fillText(
    "♥  Our special day  ♥",
    width / 2,
    height / 2 + 20
  );
}


  function scratchAt(
    clientX,
    clientY
  ) {

    if (revealed) {
      return;
    }


    const rect =
    canvas.getBoundingClientRect();

  const x =
    clientX - rect.left;

const y =
  clientY - rect.top;


    ctx.globalCompositeOperation =
      "destination-out";


    ctx.beginPath();


    ctx.arc(
      x,
      y,
      28,
      0,
      Math.PI * 2
    );


    ctx.fill();


    checkScratch();

  }


  function checkScratch() {

    const data =
      ctx.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
      ).data;


    let transparent = 0;


    for (
      let i = 3;
      i < data.length;
      i += 32
    ) {

      if (
        data[i] < 80
      ) {

        transparent++;

      }

    }


    const total =
      data.length / 32;


    if (
      transparent / total > .45
    ) {

      revealed = true;


      canvas.style.transition =
        "opacity .7s ease";


      canvas.style.opacity =
        "0";


      setTimeout(() => {

        if (
          canvas.parentNode
        ) {

          canvas.remove();

        }

      }, 750);

    }

  }


  canvas.addEventListener(
    "pointerdown",
    (event) => {

      scratching = true;

      canvas.setPointerCapture?.(
        event.pointerId
      );

      scratchAt(
        event.clientX,
        event.clientY
      );

    }
  );


  canvas.addEventListener(
    "pointermove",
    (event) => {

      if (scratching) {

        scratchAt(
          event.clientX,
          event.clientY
        );

      }

    }
  );


  canvas.addEventListener(
    "pointerup",
    () => {

      scratching = false;

    }
  );


  canvas.addEventListener(
    "pointercancel",
    () => {

      scratching = false;

    }
  );


  resizeCanvas();


  window.addEventListener(
    "resize",
    () => {

      if (!revealed) {

        resizeCanvas();

      }

    }
  );


  /* =========================================
     RSVP
  ========================================= */

  const form =
    document.getElementById(
      "rsvpForm"
    );


  const status =
    document.getElementById(
      "rsvpStatus"
    );

    const GOOGLE_SHEET_URL =
  "https://script.google.com/macros/s/AKfycbwWBC-8aimenr5VImhSWh3-4SAmgEX7VgSb4iHc1bvXnlXMLitpcKT18fw8RNFTjjeJ/exec";


form.addEventListener(
  "submit",
  async (event) => {

    event.preventDefault();

    const name =
      document
        .getElementById("guestName")
        .value
        .trim();

    const email =
      document
        .getElementById("guestEmail")
        .value
        .trim();

    const number =
      document
        .getElementById("guestNumber")
        .value
        .trim();

    const guests =
      document
        .getElementById("guestCount")
        .value;

    const message =
      document
        .getElementById("guestMessage")
        .value
        .trim();


    if (!name || !number) {
      return;
    }


    const submitButton =
      form.querySelector(".submit-btn");


    submitButton.disabled = true;

    submitButton.textContent =
      "Sending...";


    const data = {
      name: name,
      email: email,
      number: number,
      guests: guests,
      message: message
    };


    try {

      await fetch(
        GOOGLE_SHEET_URL,
        {
          method: "POST",

          mode: "no-cors",

          headers: {
            "Content-Type":
              "text/plain;charset=utf-8"
          },

          body:
            JSON.stringify(data)
        }
      );


      status.textContent =
        `Thank you, ${name}! Your RSVP has been received. ♥`;


      form.reset();


    } catch (error) {

      console.error(
        "RSVP Error:",
        error
      );


      status.textContent =
        "Something went wrong. Please try again.";

    }


    submitButton.disabled = false;

    submitButton.textContent =
      "Send RSVP ♥";

  }
);

});