window.Webflow ||= [];
window.Webflow.push(function () {

  // -----------------------------
  // Shared image fade helper
  // -----------------------------
  function fadeInMatchingImage(images, activeIndex) {
    images.forEach(item => {
      const img = item.img;

      if (item.index === activeIndex) {
        img.style.display = "block";
        img.style.opacity = "0";

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            img.style.opacity = "1";
          });
        });
      } else {
        img.style.display = "none";
        img.style.opacity = "0";
      }
    });
  }


  // -----------------------------
// EITR horizontal Webflow slider
// Pages:
// /range-elephant-in-the-room/
// /range-elephant-half-in-the-room/
// -----------------------------
function initEitrHorizontalSlider() {
  const path = window.location.pathname;

  const isEitrPage =
    path.includes("range-elephant-in-the-room") ||
    path.includes("range-elephant-half-in-the-room");

  if (!isEitrPage) return;

  const slider =
    document.querySelector(".carousel-eitr.w-slider") ||
    document.querySelector(".carousel-eitr")?.closest(".w-slider");

  if (!slider) return;

  const images = Array.from(
    document.querySelectorAll(".col__img-main[class*='img-eitr-slide-']")
  )
    .map(img => {
      const slideClass = Array.from(img.classList).find(className =>
        className.startsWith("img-eitr-slide-")
      );

      const slideNumber = slideClass
        ? parseInt(slideClass.replace("img-eitr-slide-", ""), 10)
        : null;

      return {
        img,
        index: slideNumber ? slideNumber - 1 : null
      };
    })
    .filter(item => item.index !== null)
    .sort((a, b) => a.index - b.index);

  const slideCount = images.length;
  if (!slideCount) return;

  let currentIndex = -1;


  // -----------------------------
  // Slide 1 illustration animation
  // -----------------------------
  const slide1Image = images.find(item => item.index === 0)?.img || null;

  const slide1Frames = slide1Image
    ? {
        frame1a: slide1Image.querySelector(
          ".label-illo-frame.frame-1a"
        ),
        frame1b: slide1Image.querySelector(
          ".label-illo-frame.frame-1b"
        ),
        frame2: slide1Image.querySelector(
          ".label-illo-frame.frame-2"
        ),
        frame3: slide1Image.querySelector(
          ".label-illo-frame.frame-3"
        )
      }
    : null;

  const hasSlide1Animation =
    slide1Frames &&
    slide1Frames.frame1a &&
    slide1Frames.frame1b &&
    slide1Frames.frame2 &&
    slide1Frames.frame3;

  const slide1FirstDelay = 500;
  const slide1Frame2Duration = 100;
  const slide1Frame3Duration = 300;
  const slide1MinRepeatDelay = 1500;
  const slide1MaxRepeatDelay = 7000;

  const slide1Timers = new Set();

  let slide1IsActive = false;
  let slide1IsAnimating = false;

  function setSlide1Timer(callback, duration) {
    const timer = setTimeout(function () {
      slide1Timers.delete(timer);
      callback();
    }, duration);

    slide1Timers.add(timer);

    return timer;
  }

  function clearSlide1Timers() {
    slide1Timers.forEach(timer => clearTimeout(timer));
    slide1Timers.clear();
  }

  function getSlide1RandomDelay() {
    return (
      slide1MinRepeatDelay +
      Math.random() *
        (slide1MaxRepeatDelay - slide1MinRepeatDelay)
    );
  }

  function clearSlide1ChangingFrames() {
  if (!hasSlide1Animation) return;

  slide1Frames.frame1b.classList.remove("is-active");
  slide1Frames.frame2.classList.remove("is-active");
  slide1Frames.frame3.classList.remove("is-active");
}

function showSlide1DefaultFrame() {
  if (!hasSlide1Animation) return;

  clearSlide1ChangingFrames();

  // Permanent base layer.
  slide1Frames.frame1a.classList.add("is-active");

  // Default overlay.
  slide1Frames.frame1b.classList.add("is-active");
}

function showSlide1Frame2() {
  if (!hasSlide1Animation) return;

  clearSlide1ChangingFrames();

  // Keep the base visible throughout.
  slide1Frames.frame1a.classList.add("is-active");
  slide1Frames.frame2.classList.add("is-active");
}

function showSlide1Frame3() {
  if (!hasSlide1Animation) return;

  clearSlide1ChangingFrames();

  // Keep the base visible throughout.
  slide1Frames.frame1a.classList.add("is-active");
  slide1Frames.frame3.classList.add("is-active");
}

  function scheduleNextSlide1Sequence(delay) {
    if (!slide1IsActive || !hasSlide1Animation) return;

    setSlide1Timer(function () {
      playSlide1Sequence();
    }, delay);
  }

  function playSlide1Sequence() {
    if (
      !slide1IsActive ||
      !hasSlide1Animation ||
      slide1IsAnimating
    ) {
      return;
    }

    slide1IsAnimating = true;

    // Default → frame 2
    showSlide1Frame2();

    setSlide1Timer(function () {
      if (!slide1IsActive) return;

      // Frame 2 → frame 3
      showSlide1Frame3();

      setSlide1Timer(function () {
        if (!slide1IsActive) return;

        // Frame 3 → frame 2
        showSlide1Frame2();

        setSlide1Timer(function () {
          if (!slide1IsActive) return;

          // Frame 2 → default
          showSlide1DefaultFrame();

          slide1IsAnimating = false;

          // Hold default for a random 1–4 seconds.
          scheduleNextSlide1Sequence(
            getSlide1RandomDelay()
          );
        }, slide1Frame2Duration);

      }, slide1Frame3Duration);

    }, slide1Frame2Duration);
  }

  function activateSlide1Animation() {
    if (!hasSlide1Animation) return;

    slide1IsActive = true;
    slide1IsAnimating = false;

    clearSlide1Timers();
    showSlide1DefaultFrame();

    // Runs 500ms after slide 1 becomes visible.
    scheduleNextSlide1Sequence(slide1FirstDelay);
  }

  function deactivateSlide1Animation() {
    if (!hasSlide1Animation) return;

    slide1IsActive = false;
    slide1IsAnimating = false;

    clearSlide1Timers();
    showSlide1DefaultFrame();
  }

  if (hasSlide1Animation) {
    showSlide1DefaultFrame();
  }


  // -----------------------------
  // Slide 2 illustration animation
  // -----------------------------
  const slide2Image = images.find(item => item.index === 1)?.img || null;

  const slide2Frames = slide2Image
    ? {
        frame1a: slide2Image.querySelector(
          ".label-illo-frame.frame-1a"
        ),
        frame1b: slide2Image.querySelector(
          ".label-illo-frame.frame-1b"
        ),
        frame2: slide2Image.querySelector(
          ".label-illo-frame.frame-2"
        ),
        frame3: slide2Image.querySelector(
          ".label-illo-frame.frame-3"
        ),
        frame4: slide2Image.querySelector(
          ".label-illo-frame.frame-4"
        )
      }
    : null;

  const hasSlide2Animation =
    slide2Frames &&
    slide2Frames.frame1a &&
    slide2Frames.frame1b &&
    slide2Frames.frame2 &&
    slide2Frames.frame3 &&
    slide2Frames.frame4;

  const slide2DefaultIntroDuration = 500;
  const slide2Frame2Duration = 100;
  const slide2Frame3Duration = 200;
  const slide2Frame4Duration = 200;
  const slide2MiddleDefaultDuration = 4000;
  const slide2FinalDefaultDuration = 9000;

  const slide2Timers = new Set();

  let slide2IsActive = false;
  let slide2IsAnimating = false;

  function setSlide2Timer(callback, duration) {
    const timer = setTimeout(function () {
      slide2Timers.delete(timer);
      callback();
    }, duration);

    slide2Timers.add(timer);

    return timer;
  }

  function clearSlide2Timers() {
    slide2Timers.forEach(timer => clearTimeout(timer));
    slide2Timers.clear();
  }

  function clearSlide2ChangingFrames() {
    if (!hasSlide2Animation) return;

    slide2Frames.frame1b.classList.remove("is-active");
    slide2Frames.frame2.classList.remove("is-active");
    slide2Frames.frame3.classList.remove("is-active");
    slide2Frames.frame4.classList.remove("is-active");
  }

  function showSlide2DefaultFrame() {
    if (!hasSlide2Animation) return;

    clearSlide2ChangingFrames();

    slide2Frames.frame1a.classList.add("is-active");
    slide2Frames.frame1b.classList.add("is-active");
  }

  function showSlide2Frame(frame) {
    if (!hasSlide2Animation || !slide2Frames[frame]) return;

    clearSlide2ChangingFrames();

    slide2Frames.frame1a.classList.add("is-active");
    slide2Frames[frame].classList.add("is-active");
  }

  function playSlide2Sequence() {
    if (
      !slide2IsActive ||
      !hasSlide2Animation ||
      slide2IsAnimating
    ) {
      return;
    }

    slide2IsAnimating = true;

    const sequence = [
      {
        show: showSlide2DefaultFrame,
        duration: slide2DefaultIntroDuration
      },
      {
        show: function () {
          showSlide2Frame("frame2");
        },
        duration: slide2Frame2Duration
      },
      {
        show: function () {
          showSlide2Frame("frame3");
        },
        duration: slide2Frame3Duration
      },
      {
        show: function () {
          showSlide2Frame("frame2");
        },
        duration: slide2Frame2Duration
      },
      {
        show: showSlide2DefaultFrame,
        duration: slide2MiddleDefaultDuration
      },
      {
        show: function () {
          showSlide2Frame("frame2");
        },
        duration: slide2Frame2Duration
      },
      {
        show: function () {
          showSlide2Frame("frame4");
        },
        duration: slide2Frame4Duration
      },
      {
        show: function () {
          showSlide2Frame("frame2");
        },
        duration: slide2Frame2Duration
      },
      {
        show: showSlide2DefaultFrame,
        duration: slide2FinalDefaultDuration
      }
    ];

    let sequenceIndex = 0;

    function playCurrentStep() {
      if (!slide2IsActive) return;

      const currentStep = sequence[sequenceIndex];
      currentStep.show();

      setSlide2Timer(function () {
        if (!slide2IsActive) return;

        sequenceIndex =
          sequenceIndex === sequence.length - 1
            ? 0
            : sequenceIndex + 1;

        playCurrentStep();
      }, currentStep.duration);
    }

    playCurrentStep();
  }

  function activateSlide2Animation() {
    if (!hasSlide2Animation) return;

    slide2IsActive = true;
    slide2IsAnimating = false;

    clearSlide2Timers();
    showSlide2DefaultFrame();

    playSlide2Sequence();
  }

  function deactivateSlide2Animation() {
    if (!hasSlide2Animation) return;

    slide2IsActive = false;
    slide2IsAnimating = false;

    clearSlide2Timers();
    showSlide2DefaultFrame();
  }

  if (hasSlide2Animation) {
    showSlide2DefaultFrame();
  }


  // -----------------------------
  // Slide 3 illustration animation
  // -----------------------------
  const slide3Image = images.find(item => item.index === 2)?.img || null;

  const slide3Frames = slide3Image
    ? {
        frame1: slide3Image.querySelector(
          ".label-illo-frame.frame-1"
        ),
        frame2: slide3Image.querySelector(
          ".label-illo-frame.frame-2"
        ),
        frame3: slide3Image.querySelector(
          ".label-illo-frame.frame-3"
        ),
        frame4: slide3Image.querySelector(
          ".label-illo-frame.frame-4"
        ),
        frame5: slide3Image.querySelector(
          ".label-illo-frame.frame-5"
        ),
        frame6: slide3Image.querySelector(
          ".label-illo-frame.frame-6"
        )
      }
    : null;

  const hasSlide3Animation =
    slide3Frames &&
    slide3Frames.frame1 &&
    slide3Frames.frame2 &&
    slide3Frames.frame3 &&
    slide3Frames.frame4 &&
    slide3Frames.frame5 &&
    slide3Frames.frame6;

  const slide3MinFrameDuration = 150;
  const slide3MaxFrameDuration = 700;
  const slide3OverlayFrameKeys = [
    "frame2",
    "frame3",
    "frame4",
    "frame5",
    "frame6"
  ];

  const slide3Timers = new Set();

  let slide3IsActive = false;
  let slide3CurrentFrameKey = null;

  function setSlide3Timer(callback, duration) {
    const timer = setTimeout(function () {
      slide3Timers.delete(timer);
      callback();
    }, duration);

    slide3Timers.add(timer);

    return timer;
  }

  function clearSlide3Timers() {
    slide3Timers.forEach(timer => clearTimeout(timer));
    slide3Timers.clear();
  }

  function getSlide3RandomDuration() {
    return (
      slide3MinFrameDuration +
      Math.random() *
        (slide3MaxFrameDuration - slide3MinFrameDuration)
    );
  }

  function getSlide3RandomFrameKey() {
    const availableFrames = slide3OverlayFrameKeys.filter(
      frameKey => frameKey !== slide3CurrentFrameKey
    );

    return availableFrames[
      Math.floor(Math.random() * availableFrames.length)
    ];
  }

  function clearSlide3OverlayFrames() {
    if (!hasSlide3Animation) return;

    slide3OverlayFrameKeys.forEach(frameKey => {
      slide3Frames[frameKey].classList.remove("is-active");
    });
  }

  function showSlide3Frame(frameKey) {
    if (!hasSlide3Animation || !slide3Frames[frameKey]) return;

    clearSlide3OverlayFrames();

    slide3Frames.frame1.classList.add("is-active");
    slide3Frames[frameKey].classList.add("is-active");
    slide3CurrentFrameKey = frameKey;
  }

  function showSlide3DefaultFrame() {
    if (!hasSlide3Animation) return;

    clearSlide3OverlayFrames();
    slide3Frames.frame1.classList.add("is-active");
    slide3CurrentFrameKey = null;
  }

  function playSlide3Sequence() {
    if (!slide3IsActive || !hasSlide3Animation) return;

    showSlide3Frame(getSlide3RandomFrameKey());

    setSlide3Timer(function () {
      playSlide3Sequence();
    }, getSlide3RandomDuration());
  }

  function activateSlide3Animation() {
    if (!hasSlide3Animation) return;

    slide3IsActive = true;

    clearSlide3Timers();
    showSlide3DefaultFrame();
    playSlide3Sequence();
  }

  function deactivateSlide3Animation() {
    if (!hasSlide3Animation) return;

    slide3IsActive = false;

    clearSlide3Timers();
    showSlide3DefaultFrame();
  }

  if (hasSlide3Animation) {
    showSlide3DefaultFrame();
  }


  // -----------------------------
  // Slide 4 illustration animation
  // -----------------------------
  const slide4Image = images.find(item => item.index === 3)?.img || null;

  const slide4Frames = slide4Image
    ? {
        frame1: slide4Image.querySelector(
          ".label-illo-frame.frame-1"
        ),
        frame2: slide4Image.querySelector(
          ".label-illo-frame.frame-2"
        ),
        frame3: slide4Image.querySelector(
          ".label-illo-frame.frame-3"
        ),
        frame4: slide4Image.querySelector(
          ".label-illo-frame.frame-4"
        )
      }
    : null;

  const hasSlide4Animation =
    slide4Frames &&
    slide4Frames.frame1 &&
    slide4Frames.frame2 &&
    slide4Frames.frame3 &&
    slide4Frames.frame4;

  const slide4Sequence = [
    { frame: "frame2", duration: 200 },
    { frame: "frame3", duration: 400 },
    { frame: "frame2", duration: 200 },
    { frame: "frame4", duration: 400 }
  ];

  const slide4Timers = new Set();

  let slide4IsActive = false;
  let slide4SequenceIndex = 0;

  function setSlide4Timer(callback, duration) {
    const timer = setTimeout(function () {
      slide4Timers.delete(timer);
      callback();
    }, duration);

    slide4Timers.add(timer);

    return timer;
  }

  function clearSlide4Timers() {
    slide4Timers.forEach(timer => clearTimeout(timer));
    slide4Timers.clear();
  }

  function clearSlide4OverlayFrames() {
    if (!hasSlide4Animation) return;

    slide4Sequence.forEach(step => {
      slide4Frames[step.frame].classList.remove("is-active");
    });
  }

  function showSlide4Frame(frameKey) {
    if (!hasSlide4Animation || !slide4Frames[frameKey]) return;

    clearSlide4OverlayFrames();

    slide4Frames.frame1.classList.add("is-active");
    slide4Frames[frameKey].classList.add("is-active");
  }

  function showSlide4DefaultFrame() {
    if (!hasSlide4Animation) return;

    clearSlide4OverlayFrames();
    slide4Frames.frame1.classList.add("is-active");
    slide4SequenceIndex = 0;
  }

  function playSlide4Sequence() {
    if (!slide4IsActive || !hasSlide4Animation) return;

    const currentStep = slide4Sequence[slide4SequenceIndex];
    showSlide4Frame(currentStep.frame);

    setSlide4Timer(function () {
      if (!slide4IsActive) return;

      slide4SequenceIndex =
        slide4SequenceIndex === slide4Sequence.length - 1
          ? 0
          : slide4SequenceIndex + 1;

      playSlide4Sequence();
    }, currentStep.duration);
  }

  function activateSlide4Animation() {
    if (!hasSlide4Animation) return;

    slide4IsActive = true;

    clearSlide4Timers();
    showSlide4DefaultFrame();
    playSlide4Sequence();
  }

  function deactivateSlide4Animation() {
    if (!hasSlide4Animation) return;

    slide4IsActive = false;

    clearSlide4Timers();
    showSlide4DefaultFrame();
  }

  if (hasSlide4Animation) {
    showSlide4DefaultFrame();
  }


  // -----------------------------
  // Slide 6 illustration animation
  // -----------------------------
  const slide6Image = images.find(item => item.index === 5)?.img || null;

  const slide6Frames = slide6Image
    ? {
        frame1: slide6Image.querySelector(
          ".label-illo-frame.frame-1"
        ),
        frame1a: slide6Image.querySelector(
          ".label-illo-frame.frame-1a"
        ),
        frame1b: slide6Image.querySelector(
          ".label-illo-frame.frame-1b"
        ),
        frame1c: slide6Image.querySelector(
          ".label-illo-frame.frame-1c"
        ),
        frame2: slide6Image.querySelector(
          ".label-illo-frame.frame-2"
        ),
        frame3: slide6Image.querySelector(
          ".label-illo-frame.frame-3"
        ),
        frame4: slide6Image.querySelector(
          ".label-illo-frame.frame-4"
        ),
        frame5: slide6Image.querySelector(
          ".label-illo-frame.frame-5"
        ),
        frame6: slide6Image.querySelector(
          ".label-illo-frame.frame-6"
        )
      }
    : null;

  const hasSlide6Animation =
    slide6Frames &&
    slide6Frames.frame1 &&
    slide6Frames.frame1a &&
    slide6Frames.frame1b &&
    slide6Frames.frame1c &&
    slide6Frames.frame2 &&
    slide6Frames.frame3 &&
    slide6Frames.frame4 &&
    slide6Frames.frame5 &&
    slide6Frames.frame6;

  const slide6Sequence = [
    { frame: "frame1a", duration: 600 },
    { frame: "frame2", duration: 300 },
    { frame: "frame1a", duration: 100 },
    { frame: "frame3", duration: 100 },
    { frame: "frame4", duration: 100 },
    { frame: "frame5", duration: 400 },
    { frame: "frame4", duration: 100 },
    { frame: "frame3", duration: 100 },
    { frame: "frame1a", duration: 100 },
    { frame: "frame6", duration: 200 },
    { frame: "frame1a", duration: 3500 },
    { frame: "frame1a", duration: 400, swapFrame1bFor1c: true }
  ];

  const slide6ChangingFrameKeys = [
    "frame1a",
    "frame2",
    "frame3",
    "frame4",
    "frame5",
    "frame6"
  ];

  const slide6Timers = new Set();

  let slide6IsActive = false;
  let slide6SequenceIndex = 0;

  function setSlide6Timer(callback, duration) {
    const timer = setTimeout(function () {
      slide6Timers.delete(timer);
      callback();
    }, duration);

    slide6Timers.add(timer);

    return timer;
  }

  function clearSlide6Timers() {
    slide6Timers.forEach(timer => clearTimeout(timer));
    slide6Timers.clear();
  }

  function clearSlide6ChangingFrames() {
    if (!hasSlide6Animation) return;

    slide6ChangingFrameKeys.forEach(frameKey => {
      slide6Frames[frameKey].classList.remove("is-active");
    });

    slide6Frames.frame1c.classList.remove("is-active");
  }

  function showSlide6Frame(step) {
    if (
      !hasSlide6Animation ||
      !step ||
      !slide6Frames[step.frame]
    ) {
      return;
    }

    clearSlide6ChangingFrames();

    slide6Frames.frame1.classList.add("is-active");
    slide6Frames[step.frame].classList.add("is-active");

    if (step.swapFrame1bFor1c) {
      slide6Frames.frame1b.classList.remove("is-active");
      slide6Frames.frame1c.classList.add("is-active");
    } else {
      slide6Frames.frame1b.classList.add("is-active");
      slide6Frames.frame1c.classList.remove("is-active");
    }
  }

  function showSlide6DefaultFrame() {
    if (!hasSlide6Animation) return;

    clearSlide6ChangingFrames();
    slide6Frames.frame1.classList.add("is-active");
    slide6Frames.frame1a.classList.add("is-active");
    slide6Frames.frame1b.classList.add("is-active");
    slide6Frames.frame1c.classList.remove("is-active");
    slide6SequenceIndex = 0;
  }

  function playSlide6Sequence() {
    if (!slide6IsActive || !hasSlide6Animation) return;

    const currentStep = slide6Sequence[slide6SequenceIndex];
    showSlide6Frame(currentStep);

    setSlide6Timer(function () {
      if (!slide6IsActive) return;

      slide6SequenceIndex =
        slide6SequenceIndex === slide6Sequence.length - 1
          ? 0
          : slide6SequenceIndex + 1;

      playSlide6Sequence();
    }, currentStep.duration);
  }

  function activateSlide6Animation() {
    if (!hasSlide6Animation) return;

    slide6IsActive = true;

    clearSlide6Timers();
    showSlide6DefaultFrame();
    playSlide6Sequence();
  }

  function deactivateSlide6Animation() {
    if (!hasSlide6Animation) return;

    slide6IsActive = false;

    clearSlide6Timers();
    showSlide6DefaultFrame();
  }

  if (hasSlide6Animation) {
    showSlide6DefaultFrame();
  }


  // -----------------------------
  // Slide 7 illustration animation
  // -----------------------------
  const slide7Image = images.find(item => item.index === 6)?.img || null;

  const slide7Frames = slide7Image
    ? {
        frame1: slide7Image.querySelector(
          ".label-illo-frame.frame-1"
        ),
        frame2: slide7Image.querySelector(
          ".label-illo-frame.frame-2"
        ),
        frame3: slide7Image.querySelector(
          ".label-illo-frame.frame-3"
        ),
        frame4: slide7Image.querySelector(
          ".label-illo-frame.frame-4"
        ),
        frame5: slide7Image.querySelector(
          ".label-illo-frame.frame-5"
        ),
        frame6: slide7Image.querySelector(
          ".label-illo-frame.frame-6"
        )
      }
    : null;

  const hasSlide7Animation =
    slide7Frames &&
    slide7Frames.frame1 &&
    slide7Frames.frame2 &&
    slide7Frames.frame3 &&
    slide7Frames.frame4 &&
    slide7Frames.frame5 &&
    slide7Frames.frame6;

  const slide7Sequence = [
    "frame2",
    "frame3",
    "frame4",
    "frame5",
    "frame6"
  ];

  const slide7FrameDuration = 200;
  const slide7Timers = new Set();

  let slide7IsActive = false;
  let slide7SequenceIndex = 0;

  function setSlide7Timer(callback, duration) {
    const timer = setTimeout(function () {
      slide7Timers.delete(timer);
      callback();
    }, duration);

    slide7Timers.add(timer);

    return timer;
  }

  function clearSlide7Timers() {
    slide7Timers.forEach(timer => clearTimeout(timer));
    slide7Timers.clear();
  }

  function clearSlide7OverlayFrames() {
    if (!hasSlide7Animation) return;

    slide7Sequence.forEach(frameKey => {
      slide7Frames[frameKey].classList.remove("is-active");
    });
  }

  function showSlide7Frame(frameKey) {
    if (!hasSlide7Animation || !slide7Frames[frameKey]) return;

    clearSlide7OverlayFrames();

    slide7Frames.frame1.classList.add("is-active");
    slide7Frames[frameKey].classList.add("is-active");
  }

  function showSlide7DefaultFrame() {
    if (!hasSlide7Animation) return;

    clearSlide7OverlayFrames();
    slide7Frames.frame1.classList.add("is-active");
    slide7SequenceIndex = 0;
  }

  function playSlide7Sequence() {
    if (!slide7IsActive || !hasSlide7Animation) return;

    const currentFrame = slide7Sequence[slide7SequenceIndex];
    showSlide7Frame(currentFrame);

    setSlide7Timer(function () {
      if (!slide7IsActive) return;

      slide7SequenceIndex =
        slide7SequenceIndex === slide7Sequence.length - 1
          ? 0
          : slide7SequenceIndex + 1;

      playSlide7Sequence();
    }, slide7FrameDuration);
  }

  function activateSlide7Animation() {
    if (!hasSlide7Animation) return;

    slide7IsActive = true;

    clearSlide7Timers();
    showSlide7DefaultFrame();
    playSlide7Sequence();
  }

  function deactivateSlide7Animation() {
    if (!hasSlide7Animation) return;

    slide7IsActive = false;

    clearSlide7Timers();
    showSlide7DefaultFrame();
  }

  if (hasSlide7Animation) {
    showSlide7DefaultFrame();
  }


  // -----------------------------
  // Slide 9 illustration animation
  // -----------------------------
  const slide9Image = images.find(item => item.index === 8)?.img || null;

  const slide9Frames = slide9Image
    ? {
        frame1: slide9Image.querySelector(
          ".label-illo-frame.frame-1"
        ),
        frame2: slide9Image.querySelector(
          ".label-illo-frame.frame-2"
        ),
        frame3: slide9Image.querySelector(
          ".label-illo-frame.frame-3"
        ),
        frame4: slide9Image.querySelector(
          ".label-illo-frame.frame-4"
        ),
        frame5: slide9Image.querySelector(
          ".label-illo-frame.frame-5"
        ),
        frame6: slide9Image.querySelector(
          ".label-illo-frame.frame-6"
        )
      }
    : null;

  const hasSlide9Animation =
    slide9Frames &&
    slide9Frames.frame1 &&
    slide9Frames.frame2 &&
    slide9Frames.frame3 &&
    slide9Frames.frame4 &&
    slide9Frames.frame5 &&
    slide9Frames.frame6;

  const slide9Sequence = [
    "frame2",
    "frame3",
    "frame4",
    "frame5",
    "frame6"
  ];

  const slide9FrameDuration = 200;
  const slide9Timers = new Set();

  let slide9IsActive = false;
  let slide9SequenceIndex = 0;

  function setSlide9Timer(callback, duration) {
    const timer = setTimeout(function () {
      slide9Timers.delete(timer);
      callback();
    }, duration);

    slide9Timers.add(timer);

    return timer;
  }

  function clearSlide9Timers() {
    slide9Timers.forEach(timer => clearTimeout(timer));
    slide9Timers.clear();
  }

  function clearSlide9OverlayFrames() {
    if (!hasSlide9Animation) return;

    slide9Sequence.forEach(frameKey => {
      slide9Frames[frameKey].classList.remove("is-active");
    });
  }

  function showSlide9Frame(frameKey) {
    if (!hasSlide9Animation || !slide9Frames[frameKey]) return;

    clearSlide9OverlayFrames();

    slide9Frames.frame1.classList.add("is-active");
    slide9Frames[frameKey].classList.add("is-active");
  }

  function showSlide9DefaultFrame() {
    if (!hasSlide9Animation) return;

    clearSlide9OverlayFrames();
    slide9Frames.frame1.classList.add("is-active");
    slide9SequenceIndex = 0;
  }

  function playSlide9Sequence() {
    if (!slide9IsActive || !hasSlide9Animation) return;

    const currentFrame = slide9Sequence[slide9SequenceIndex];
    showSlide9Frame(currentFrame);

    setSlide9Timer(function () {
      if (!slide9IsActive) return;

      slide9SequenceIndex =
        slide9SequenceIndex === slide9Sequence.length - 1
          ? 0
          : slide9SequenceIndex + 1;

      playSlide9Sequence();
    }, slide9FrameDuration);
  }

  function activateSlide9Animation() {
    if (!hasSlide9Animation) return;

    slide9IsActive = true;

    clearSlide9Timers();
    showSlide9DefaultFrame();
    playSlide9Sequence();
  }

  function deactivateSlide9Animation() {
    if (!hasSlide9Animation) return;

    slide9IsActive = false;

    clearSlide9Timers();
    showSlide9DefaultFrame();
  }

  if (hasSlide9Animation) {
    showSlide9DefaultFrame();
  }


  // -----------------------------
  // Slide 11 illustration animation
  // -----------------------------
  const slide11Image = images.find(item => item.index === 10)?.img || null;

  const slide11Frames = slide11Image
    ? {
        frame1: slide11Image.querySelector(
          ".label-illo-frame.frame-1"
        ),
        frame1a: slide11Image.querySelector(
          ".label-illo-frame.frame-1a"
        ),
        frame1b: slide11Image.querySelector(
          ".label-illo-frame.frame-1b"
        ),
        frame1c: slide11Image.querySelector(
          ".label-illo-frame.frame-1c"
        ),
        frame2: slide11Image.querySelector(
          ".label-illo-frame.frame-2"
        ),
        frame3: slide11Image.querySelector(
          ".label-illo-frame.frame-3"
        ),
        frame4: slide11Image.querySelector(
          ".label-illo-frame.frame-4"
        ),
        frame5: slide11Image.querySelector(
          ".label-illo-frame.frame-5"
        ),
        frame6: slide11Image.querySelector(
          ".label-illo-frame.frame-6"
        )
      }
    : null;

  const hasSlide11Animation =
    slide11Frames &&
    slide11Frames.frame1 &&
    slide11Frames.frame1a &&
    slide11Frames.frame1b &&
    slide11Frames.frame1c &&
    slide11Frames.frame2 &&
    slide11Frames.frame3 &&
    slide11Frames.frame4 &&
    slide11Frames.frame5 &&
    slide11Frames.frame6;

  const slide11Sequence = [
    { frame: "frame1a", duration: 600 },
    { frame: "frame2", duration: 300 },
    { frame: "frame1a", duration: 100 },
    { frame: "frame3", duration: 100 },
    { frame: "frame4", duration: 100 },
    { frame: "frame5", duration: 400 },
    { frame: "frame4", duration: 100 },
    { frame: "frame3", duration: 100 },
    { frame: "frame1a", duration: 100 },
    { frame: "frame6", duration: 200 },
    { frame: "frame1a", duration: 3500 },
    { frame: "frame1a", duration: 400, swapFrame1bFor1c: true }
  ];

  const slide11ChangingFrameKeys = [
    "frame1a",
    "frame2",
    "frame3",
    "frame4",
    "frame5",
    "frame6"
  ];

  const slide11Timers = new Set();

  let slide11IsActive = false;
  let slide11SequenceIndex = 0;

  function setSlide11Timer(callback, duration) {
    const timer = setTimeout(function () {
      slide11Timers.delete(timer);
      callback();
    }, duration);

    slide11Timers.add(timer);

    return timer;
  }

  function clearSlide11Timers() {
    slide11Timers.forEach(timer => clearTimeout(timer));
    slide11Timers.clear();
  }

  function clearSlide11ChangingFrames() {
    if (!hasSlide11Animation) return;

    slide11ChangingFrameKeys.forEach(frameKey => {
      slide11Frames[frameKey].classList.remove("is-active");
    });

    slide11Frames.frame1c.classList.remove("is-active");
  }

  function showSlide11Frame(step) {
    if (
      !hasSlide11Animation ||
      !step ||
      !slide11Frames[step.frame]
    ) {
      return;
    }

    clearSlide11ChangingFrames();

    slide11Frames.frame1.classList.add("is-active");
    slide11Frames[step.frame].classList.add("is-active");

    if (step.swapFrame1bFor1c) {
      slide11Frames.frame1b.classList.remove("is-active");
      slide11Frames.frame1c.classList.add("is-active");
    } else {
      slide11Frames.frame1b.classList.add("is-active");
      slide11Frames.frame1c.classList.remove("is-active");
    }
  }

  function showSlide11DefaultFrame() {
    if (!hasSlide11Animation) return;

    clearSlide11ChangingFrames();
    slide11Frames.frame1.classList.add("is-active");
    slide11Frames.frame1a.classList.add("is-active");
    slide11Frames.frame1b.classList.add("is-active");
    slide11Frames.frame1c.classList.remove("is-active");
    slide11SequenceIndex = 0;
  }

  function playSlide11Sequence() {
    if (!slide11IsActive || !hasSlide11Animation) return;

    const currentStep = slide11Sequence[slide11SequenceIndex];
    showSlide11Frame(currentStep);

    setSlide11Timer(function () {
      if (!slide11IsActive) return;

      slide11SequenceIndex =
        slide11SequenceIndex === slide11Sequence.length - 1
          ? 0
          : slide11SequenceIndex + 1;

      playSlide11Sequence();
    }, currentStep.duration);
  }

  function activateSlide11Animation() {
    if (!hasSlide11Animation) return;

    slide11IsActive = true;

    clearSlide11Timers();
    showSlide11DefaultFrame();
    playSlide11Sequence();
  }

  function deactivateSlide11Animation() {
    if (!hasSlide11Animation) return;

    slide11IsActive = false;

    clearSlide11Timers();
    showSlide11DefaultFrame();
  }

  if (hasSlide11Animation) {
    showSlide11DefaultFrame();
  }


  // -----------------------------
  // Slider helpers
  // -----------------------------
  function getDots() {
    return Array.from(
      slider.querySelectorAll(".w-slider-dot")
    );
  }

  function getActiveIndex() {
    const dots = getDots();
    const activeDot = slider.querySelector(
      ".w-slider-dot.w-active"
    );

    if (!activeDot || !dots.length) return 0;

    return dots.indexOf(activeDot);
  }

  function getRequestedWineIndex() {
    const params = new URLSearchParams(
      window.location.search
    );

    const wineNumber = parseInt(
      params.get("wine"),
      10
    );

    if (
      !wineNumber ||
      wineNumber < 1 ||
      wineNumber > slideCount
    ) {
      return null;
    }

    return wineNumber - 1;
  }

  function showImage(index) {
    if (index === currentIndex) return;

    currentIndex = index;

    fadeInMatchingImage(images, index);

    if (index === 0) {
      activateSlide1Animation();
    } else {
      deactivateSlide1Animation();
    }

    if (index === 1) {
      activateSlide2Animation();
    } else {
      deactivateSlide2Animation();
    }

    if (index === 2) {
      activateSlide3Animation();
    } else {
      deactivateSlide3Animation();
    }

    if (index === 3) {
      activateSlide4Animation();
    } else {
      deactivateSlide4Animation();
    }

    if (index === 5) {
      activateSlide6Animation();
    } else {
      deactivateSlide6Animation();
    }

    if (index === 6) {
      activateSlide7Animation();
    } else {
      deactivateSlide7Animation();
    }

    if (index === 8) {
      activateSlide9Animation();
    } else {
      deactivateSlide9Animation();
    }

    if (index === 10) {
      activateSlide11Animation();
    } else {
      deactivateSlide11Animation();
    }
  }

  function updateEitrImage() {
    const activeIndex = getActiveIndex();

    if (
      activeIndex >= 0 &&
      activeIndex < slideCount
    ) {
      showImage(activeIndex);
    }
  }

  function goToWineSlide(index) {
    const dots = getDots();

    if (!dots.length || !dots[index]) {
      return false;
    }

    dots[index].click();

    setTimeout(updateEitrImage, 100);

    return true;
  }

  function handleInitialWineLink() {
    const requestedIndex = getRequestedWineIndex();

    if (requestedIndex === null) {
      updateEitrImage();
      return;
    }

    const attempts = [0, 150, 400];

    attempts.forEach(delay => {
      setTimeout(function () {
        goToWineSlide(requestedIndex);
      }, delay);
    });
  }

  handleInitialWineLink();

  getDots().forEach(dot => {
    new MutationObserver(updateEitrImage).observe(
      dot,
      {
        attributes: true,
        attributeFilter: ["class"]
      }
    );
  });

  slider.addEventListener("click", function () {
    setTimeout(updateEitrImage, 100);
  });

  slider.addEventListener("touchend", function () {
    setTimeout(updateEitrImage, 150);
  });
}

  // -----------------------------
  // ATE vertical infinite slider
  // Page/section with:
  // .carousel-ate-vertical
  // -----------------------------
  function initAteVerticalSlider() {
    const slider = document.querySelector(".carousel-ate-vertical");
    if (!slider) return;

    if (slider.dataset.verticalSliderInitialized === "true") return;
    slider.dataset.verticalSliderInitialized = "true";

    const mask = slider.querySelector(".carousel-ate-vertical__mask");
    const track = slider.querySelector(".carousel-ate-vertical__track");
    const originalSlides = Array.from(slider.querySelectorAll(".carousel-ate-vertical__slide"));
    const prevBtn = slider.querySelector(".carousel-ate-vertical__prev");
    const nextBtn = slider.querySelector(".carousel-ate-vertical__next");

    if (!mask || !track || !originalSlides.length) return;

    const tabletQuery = window.matchMedia("(max-width: 991px)");
    const realSlideCount = originalSlides.length;

    const firstClone = originalSlides[0].cloneNode(true);
    const lastClone = originalSlides[realSlideCount - 1].cloneNode(true);

    firstClone.classList.add("is-clone");
    lastClone.classList.add("is-clone");

    track.insertBefore(lastClone, originalSlides[0]);
    track.appendChild(firstClone);

    const slides = Array.from(track.querySelectorAll(".carousel-ate-vertical__slide"));

    const images = Array.from(
      document.querySelectorAll(".ate-labels-product-logo[class*='ate-product-slide-']")
    )
      .filter(img => !img.closest(".carousel-ate-vertical__slide.is-clone"))
      .map(img => {
        const slideClass = Array.from(img.classList).find(className =>
          className.startsWith("ate-product-slide-")
        );

        const slideNumber = slideClass
          ? parseInt(slideClass.replace("ate-product-slide-", ""), 10)
          : null;

        return {
          img,
          index: slideNumber ? slideNumber - 1 : null
        };
      })
      .filter(item => item.index !== null)
      .sort((a, b) => a.index - b.index);

    let currentPosition = 1;
    let isAnimating = false;

    function isHorizontalMode() {
      return tabletQuery.matches;
    }

    function getRealIndexFromPosition(position) {
      if (position === 0) return realSlideCount - 1;
      if (position === realSlideCount + 1) return 0;
      return position - 1;
    }

    function getSlideOffset(position) {
      let offset = 0;

      for (let i = 0; i < position; i++) {
        offset += isHorizontalMode()
          ? slides[i].offsetWidth
          : slides[i].offsetHeight;
      }

      return offset;
    }

    function setTrackTransition(enabled) {
      track.style.transition = enabled ? "transform 600ms ease" : "none";
    }

    function moveTrackTo(position) {
      const offset = getSlideOffset(position);

      if (isHorizontalMode()) {
        track.style.transform = `translateX(-${offset}px)`;
      } else {
        track.style.transform = `translateY(-${offset}px)`;
      }
    }

    function setMaskHeight(position) {
      const activeSlide = slides[position];
      if (!activeSlide) return;

      mask.style.height = activeSlide.offsetHeight + "px";
    }

    function showImage(realIndex) {
      images.forEach(item => {
        const img = item.img;

        if (item.index === realIndex) {
          img.style.display = "block";
          img.style.opacity = "0";

          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              img.style.opacity = "1";
            });
          });
        } else {
          img.style.display = "none";
          img.style.opacity = "0";
        }
      });
    }

    function goToPosition(position) {
      if (isAnimating) return;

      isAnimating = true;
      currentPosition = position;

      const realIndex = getRealIndexFromPosition(currentPosition);

      setTrackTransition(true);
      moveTrackTo(currentPosition);
      setMaskHeight(currentPosition);
      showImage(realIndex);
    }

    function jumpToPosition(position) {
      currentPosition = position;

      setTrackTransition(false);
      moveTrackTo(currentPosition);
      setMaskHeight(currentPosition);

      track.offsetHeight;

      setTrackTransition(true);
    }

    prevBtn?.addEventListener("click", function (event) {
      event.preventDefault();
      goToPosition(currentPosition - 1);
    });

    nextBtn?.addEventListener("click", function (event) {
      event.preventDefault();
      goToPosition(currentPosition + 1);
    });

    track.addEventListener("transitionend", function (event) {
      if (event.propertyName !== "transform") return;

      if (currentPosition === realSlideCount + 1) {
        jumpToPosition(1);
      }

      if (currentPosition === 0) {
        jumpToPosition(realSlideCount);
      }

      isAnimating = false;
    });

    function getRequestedSlideIndex() {
      const params = new URLSearchParams(window.location.search);

      const requestedNumber =
        parseInt(params.get("wine"), 10) ||
        parseInt(params.get("product"), 10);

      if (!requestedNumber || requestedNumber < 1 || requestedNumber > realSlideCount) {
        return null;
      }

      return requestedNumber - 1;
    }

    function refreshCurrentPosition() {
      jumpToPosition(currentPosition);
    }

    window.addEventListener("resize", refreshCurrentPosition);

    if (tabletQuery.addEventListener) {
      tabletQuery.addEventListener("change", refreshCurrentPosition);
    }

    setTrackTransition(false);

    setTimeout(() => {
      const requestedIndex = getRequestedSlideIndex();

      currentPosition = requestedIndex !== null
        ? requestedIndex + 1
        : 1;

      moveTrackTo(currentPosition);
      setMaskHeight(currentPosition);
      showImage(getRealIndexFromPosition(currentPosition));

      requestAnimationFrame(() => {
        setTrackTransition(true);
      });
    }, 100);
  }


  // -----------------------------
  // Age gate
  // -----------------------------
  function initAgeGate() {
  const ageGate = document.querySelector(".age-gate");
  if (!ageGate) return;

  const sessionKey = "ageGateDismissed";

  const textWrap = ageGate.querySelector(".age-gate__txt-wrap");
  const toodlepipWrap = ageGate.querySelector(".age-gate__toodlepip-wrap");

  const chairWrap = ageGate.querySelector(".chair-anm__wrap");
  const doorWrap = ageGate.querySelector(".door-anm__wrap");
  const doorExitWrap = ageGate.querySelector(".door-exit__wrap");

  const activeTimers = [];
  const sequenceStoppers = [];

  let hasStartedNoFlow = false;
  let lockedScrollY = 0;
  let originalBodyStyles = {};
  let originalHtmlOverflow = "";

  function setTimer(callback, duration) {
    const timer = setTimeout(callback, duration);
    activeTimers.push(timer);
    return timer;
  }

  function stopAllAgeGateTimers() {
    activeTimers.forEach(timer => clearTimeout(timer));
    activeTimers.length = 0;
  }

  function lockPageScroll() {
    if (document.body.dataset.ageGateScrollLocked === "true") return;

    lockedScrollY = window.scrollY || document.documentElement.scrollTop || 0;

    originalHtmlOverflow = document.documentElement.style.overflow;

    originalBodyStyles = {
      position: document.body.style.position,
      top: document.body.style.top,
      left: document.body.style.left,
      right: document.body.style.right,
      width: document.body.style.width,
      overflow: document.body.style.overflow
    };

    document.documentElement.style.overflow = "hidden";

    document.body.style.position = "fixed";
    document.body.style.top = `-${lockedScrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";

    document.body.dataset.ageGateScrollLocked = "true";
  }

  function unlockPageScroll() {
    if (document.body.dataset.ageGateScrollLocked !== "true") return;

    document.documentElement.style.overflow = originalHtmlOverflow;

    document.body.style.position = originalBodyStyles.position || "";
    document.body.style.top = originalBodyStyles.top || "";
    document.body.style.left = originalBodyStyles.left || "";
    document.body.style.right = originalBodyStyles.right || "";
    document.body.style.width = originalBodyStyles.width || "";
    document.body.style.overflow = originalBodyStyles.overflow || "";

    delete document.body.dataset.ageGateScrollLocked;

    window.scrollTo(0, lockedScrollY);
  }

  function hideElement(element) {
    if (!element) return;

    element.style.display = "none";
    element.style.opacity = "";
    element.style.visibility = "";
    element.style.pointerEvents = "";
  }

  function showElement(element, displayValue = "block") {
    if (!element) return;

    element.style.display = displayValue;
    element.style.visibility = "visible";
    element.style.pointerEvents = "";
  }

  function fadeInElement(element, displayValue = "block") {
    if (!element) return;

    element.style.display = displayValue;
    element.style.opacity = "0";
    element.style.visibility = "visible";
    element.style.pointerEvents = "auto";
    element.style.transition = "opacity 600ms ease";

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        element.style.opacity = "1";
      });
    });
  }

  function showFrame(frames, frameClass) {
    frames.forEach(frame => frame.classList.remove("is-active"));

    const activeFrame = Array.from(frames).find(frame =>
      frame.classList.contains(frameClass)
    );

    if (activeFrame) {
      activeFrame.classList.add("is-active");
    }
  }

  function playFrameSequence(frames, sequence, shouldLoop, onComplete) {
    let index = 0;
    let isStopped = false;

    function playCurrentFrame() {
      if (isStopped) return;

      const current = sequence[index];
      if (!current) return;

      showFrame(frames, current.frame);

      const isLastFrame = index === sequence.length - 1;

      if (isLastFrame && !shouldLoop) {
        if (typeof onComplete === "function") {
          onComplete();
        }
        return;
      }

      setTimer(function () {
        index = isLastFrame ? 0 : index + 1;
        playCurrentFrame();
      }, current.duration);
    }

    playCurrentFrame();

    return function stopSequence() {
      isStopped = true;
    };
  }

  function stopAllAgeGateAnimations() {
    sequenceStoppers.forEach(stop => stop());
    sequenceStoppers.length = 0;
    stopAllAgeGateTimers();
  }

  function setInitialAgeGateFrames() {
    if (chairWrap) {
      const chairFrames = chairWrap.querySelectorAll(".chair-anm__img");
      showFrame(chairFrames, "chair-anm__img-1");
    }

    if (doorWrap) {
      const doorFrames = doorWrap.querySelectorAll(".door-anm__img");
      showFrame(doorFrames, "door-anm__img-1");
    }

    if (doorExitWrap) {
      const doorExitFrames = doorExitWrap.querySelectorAll(".door-anm__img");
      showFrame(doorExitFrames, "door-exit__img-1");
    }
  }

  function startDoorFinalBlinkAnimation(doorFrames) {
  const framesArray = Array.from(doorFrames);

  const base = framesArray.find(frame =>
    frame.classList.contains("door-anm__img-4a")
  );

  const openEye = framesArray.find(frame =>
    frame.classList.contains("door-anm__img-4b")
  );

  const closedEye = framesArray.find(frame =>
    frame.classList.contains("door-anm__img-4c")
  );

  if (!base || !openEye || !closedEye) return;

  const firstBlinkDelay = 1000;
  const minBlinkInterval = 2000;
  const maxExtraRandomDelay = 8000;
  const blinkDuration = 300;

  let isStopped = false;

  function showOpenEye() {
    doorFrames.forEach(frame => frame.classList.remove("is-active"));

    base.classList.add("is-active");
    openEye.classList.add("is-active");
  }

  function showClosedEye() {
    doorFrames.forEach(frame => frame.classList.remove("is-active"));

    base.classList.add("is-active");
    closedEye.classList.add("is-active");
  }

  function getRandomDelay() {
    return minBlinkInterval + Math.random() * maxExtraRandomDelay;
  }

  function doBlink() {
    if (isStopped) return;

    showClosedEye();

    setTimer(function () {
      if (isStopped) return;

      showOpenEye();
      scheduleNextBlink(getRandomDelay());
    }, blinkDuration);
  }

  function scheduleNextBlink(delay) {
    if (isStopped) return;

    setTimer(function () {
      doBlink();
    }, delay);
  }

  showOpenEye();

  // Force first blink after 1 second.
  scheduleNextBlink(firstBlinkDelay);

  return function stopDoorFinalBlink() {
    isStopped = true;
  };
}

  function startMainAgeGateAnimations() {
    if (chairWrap) {
      const chairFrames = chairWrap.querySelectorAll(".chair-anm__img");

      const chairSequence = [
        { frame: "chair-anm__img-1", duration: 200 },
        { frame: "chair-anm__img-2", duration: 400 },
        { frame: "chair-anm__img-1", duration: 200 },
        { frame: "chair-anm__img-3", duration: 400 }
      ];

      sequenceStoppers.push(
        playFrameSequence(chairFrames, chairSequence, true)
      );
    }

    if (doorWrap) {
      const doorFrames = doorWrap.querySelectorAll(".door-anm__img");

      const doorSequence = [
        { frame: "door-anm__img-1", duration: 1000 },
        { frame: "door-anm__img-2", duration: 600 },
        { frame: "door-anm__img-3", duration: 300 },
        { frame: "door-anm__img-4a", duration: 300 }
      ];

      sequenceStoppers.push(
        playFrameSequence(doorFrames, doorSequence, false, function () {
          const stopDoorFinalBlink = startDoorFinalBlinkAnimation(doorFrames);

          if (typeof stopDoorFinalBlink === "function") {
            sequenceStoppers.push(stopDoorFinalBlink);
          }
        })
      );
    }
  }

  function startDoorExitAnimation() {
    if (!doorExitWrap) return;

    const doorExitFrames = doorExitWrap.querySelectorAll(".door-anm__img");

    const doorExitSequence = [
      { frame: "door-exit__img-1", duration: 600 },
      { frame: "door-exit__img-2", duration: 2000 }
    ];

    sequenceStoppers.push(
      playFrameSequence(doorExitFrames, doorExitSequence, false)
    );
  }

  function dismissAgeGate() {
    try {
      sessionStorage.setItem(sessionKey, "true");
    } catch (error) {
      console.warn("Age gate sessionStorage unavailable:", error);
    }

    document.documentElement.classList.remove("age-gate-required");
    document.documentElement.classList.add("age-gate-dismissed");

    hideElement(ageGate);
    stopAllAgeGateAnimations();
    unlockPageScroll();
  }

  function showNoMessage() {
    if (hasStartedNoFlow) return;
    hasStartedNoFlow = true;

    hideElement(textWrap);
    showElement(toodlepipWrap);

    hideElement(doorWrap);
    showElement(doorExitWrap);

    startDoorExitAnimation();
  }

  let isAgeGateDismissed = false;

  try {
    isAgeGateDismissed = sessionStorage.getItem(sessionKey) === "true";
  } catch (error) {
    isAgeGateDismissed = false;
  }

  if (isAgeGateDismissed) {
    document.documentElement.classList.remove("age-gate-required");
    document.documentElement.classList.add("age-gate-dismissed");

    hideElement(ageGate);
    unlockPageScroll();
    return;
  }

  document.documentElement.classList.remove("age-gate-dismissed");
  document.documentElement.classList.add("age-gate-required");

  showElement(ageGate);
  lockPageScroll();

  hideElement(textWrap);
  hideElement(toodlepipWrap);

  showElement(doorWrap);
  hideElement(doorExitWrap);

  setInitialAgeGateFrames();
  startMainAgeGateAnimations();

  setTimer(function () {
    fadeInElement(textWrap);
  }, 1900);

  ageGate.addEventListener("click", function (event) {
    const yesButton = event.target.closest(".age-gate__btn.btn-yes");
    const noButton = event.target.closest(".age-gate__btn.btn-no");

    if (yesButton && ageGate.contains(yesButton)) {
      event.preventDefault();
      dismissAgeGate();
      return;
    }

    if (noButton && ageGate.contains(noButton)) {
      event.preventDefault();
      showNoMessage();
    }
  });
}

// -----------------------------
// EITR content chair animation
// Wrapper:
// .eitr-chair-anm__wrap
// -----------------------------
function initEitrChairAnimationLoops() {
  const chairWraps = document.querySelectorAll(".eitr-chair-anm__wrap");
  if (!chairWraps.length) return;

  const chairSequence = [
    { frame: "chair-anm__img-1", duration: 200 },
    { frame: "chair-anm__img-2", duration: 400 },
    { frame: "chair-anm__img-1", duration: 200 },
    { frame: "chair-anm__img-3", duration: 400 }
  ];

  function showFrame(frames, frameClass) {
    frames.forEach(frame => frame.classList.remove("is-active"));

    const activeFrame = Array.from(frames).find(frame =>
      frame.classList.contains(frameClass)
    );

    if (activeFrame) {
      activeFrame.classList.add("is-active");
    }
  }

  function playChairSequence(frames) {
    let index = 0;

    function playCurrentFrame() {
      const current = chairSequence[index];

      showFrame(frames, current.frame);

      setTimeout(function () {
        index = index === chairSequence.length - 1 ? 0 : index + 1;
        playCurrentFrame();
      }, current.duration);
    }

    playCurrentFrame();
  }

  chairWraps.forEach(wrap => {
    const frames = wrap.querySelectorAll(".chair-anm__img");
    if (!frames.length) return;

    playChairSequence(frames);
  });
}

// -----------------------------
// EITR elephant random blink
// Wrapper:
// .col__img-main.img-eitr-elephant
// -----------------------------
// -----------------------------
// EITR elephant random blink
// Wrapper:
// .col__img-main.img-eitr-elephant
// -----------------------------
function initEitrElephantBlink() {
  const elephants = document.querySelectorAll(".col__img-main.img-eitr-elephant");
  if (!elephants.length) return;

  const firstBlinkDelay = 1000;
  const minBlinkInterval = 2000;
  const maxExtraRandomDelay = 8000;
  const blinkDuration = 300;

  function getRandomDelay() {
    return minBlinkInterval + Math.random() * maxExtraRandomDelay;
  }

  elephants.forEach(elephant => {
    const body = elephant.querySelector(".elephant-blink-img-1a");
    const openEye = elephant.querySelector(".elephant-blink-img-1b");
    const closedEye = elephant.querySelector(".elephant-blink-img-2");

    if (!body || !openEye || !closedEye) return;

    function doBlink() {
      elephant.classList.add("is-blinking");

      setTimeout(function () {
        elephant.classList.remove("is-blinking");
        scheduleNextBlink(getRandomDelay());
      }, blinkDuration);
    }

    function scheduleNextBlink(delay) {
      setTimeout(doBlink, delay);
    }

    elephant.classList.remove("is-blinking");

    // Force first blink after 1 second.
    scheduleNextBlink(firstBlinkDelay);
  });
}

// -----------------------------
// EHITR main illustration animation
// Wrapper:
// .elephant-half-in-the-room.img-ehitr-main
// -----------------------------
function initEhitrMainAnimation() {
  const wraps = document.querySelectorAll(
    ".col__img-main.img-ehitr-main"
  );

  if (!wraps.length) return;

  const sequence = [
    { frame: "frame1a", duration: 500 },
    { frame: "frame2", duration: 100 },
    { frame: "frame3", duration: 100 },
    { frame: "frame3", duration: 100 },
    { frame: "frame4", duration: 400 },
    { frame: "frame3", duration: 100 },
    { frame: "frame2", duration: 100 },
    { frame: "frame1a", duration: 4000 }
  ];

  wraps.forEach(wrap => {
    const frames = {
      frame1: wrap.querySelector(".label-illo-frame.frame-1"),
      frame1a: wrap.querySelector(".label-illo-frame.frame-1a"),
      frame2: wrap.querySelector(".label-illo-frame.frame-2"),
      frame3: wrap.querySelector(".label-illo-frame.frame-3"),
      frame4: wrap.querySelector(".label-illo-frame.frame-4")
    };

    const hasAllFrames =
      frames.frame1 &&
      frames.frame1a &&
      frames.frame2 &&
      frames.frame3 &&
      frames.frame4;

    if (!hasAllFrames) return;

    const changingFrameKeys = [
      "frame1a",
      "frame2",
      "frame3",
      "frame4"
    ];

    let sequenceIndex = 0;

    function clearChangingFrames() {
      changingFrameKeys.forEach(frameKey => {
        frames[frameKey].classList.remove("is-active");
      });
    }

    function showFrame(frameKey) {
      clearChangingFrames();
      frames.frame1.classList.add("is-active");
      frames[frameKey].classList.add("is-active");
    }

    function playCurrentFrame() {
      const currentStep = sequence[sequenceIndex];
      showFrame(currentStep.frame);

      setTimeout(function () {
        sequenceIndex =
          sequenceIndex === sequence.length - 1
            ? 0
            : sequenceIndex + 1;

        playCurrentFrame();
      }, currentStep.duration);
    }

    frames.frame1.classList.add("is-active");
    playCurrentFrame();
  });
}

  // -----------------------------
  // Initialise
  // -----------------------------
initEitrHorizontalSlider();
initAteVerticalSlider();
initEitrChairAnimationLoops();
initEitrElephantBlink();
initEhitrMainAnimation();
initAgeGate();

});
