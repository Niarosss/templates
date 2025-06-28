// ------------------ Random background ------------------ //
const backgroundImages = ["bg_1.webp", "bg_2.webp", "bg_3.webp", "bg_4.webp"];
//NY background -- "bg_ny1.webp", "bg_ny2.webp"
const selectedBg =
  backgroundImages[Math.floor(Math.random() * backgroundImages.length)];
const introBg = document.querySelector(".s-intro__bg");
if (introBg)
  introBg.style.backgroundImage = `url('https://niarosss.github.io/knowledge-base/img/${selectedBg}')`;

// ------------------ Color sheme ------------------ //
const themeToggleSwitch = document.querySelector("#change-th");
function detectColorScheme() {
  let theme =
    localStorage.getItem("theme") ||
    (window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light");

  if (theme === "dark") {
    document.body.classList.add("dark");
    themeToggleSwitch.checked = true;
  }
}
detectColorScheme();

function toggleTheme(e) {
  const isDark = e.target.checked;
  localStorage.setItem("theme", isDark ? "dark" : "light");
  document.body.classList.toggle("dark", isDark);
}
themeToggleSwitch?.addEventListener("change", toggleTheme);

// ------------------ Intro ------------------ //
function detectIntroHidden() {
  if (localStorage.getItem("hide-intro") === "yes") {
    document.body.classList.add("hide-intro");
    hideIntroToggle.checked = true;
  }
}
detectIntroHidden();

function toggleIntroVisibility(e) {
  const isChecked = e.target.checked;
  localStorage.setItem("hide-intro", isChecked ? "yes" : "no");
  document.body.classList.toggle("hide-intro", isChecked);
}
const hideIntroToggle = document.querySelector("#hide-tg");
hideIntroToggle?.addEventListener("change", toggleIntroVisibility);

// ------------------ Random Quote ------------------ //
const quotes = [
  {
    text: "«Практика без теорії цінніша, ніж теорія без практики»",
    author: "- Марк Фабій Квінтиліан",
  },
  { text: "«Ціле опановують по частинах»", author: "- Сене́ка Анне́й Лу́цій" },
  {
    text: "«Робота роботою, але в цьому житті треба ще щось і корисне робити»",
    author: "- Хенрік Ягодзіньскій",
  },
  {
    text: "«Завжди не вистачає часу, щоб виконати роботу як треба, але на те, щоб її переробити, час знаходиться»",
    author: "- закон Мескімена",
  },
  {
    text: "«Ніколи не відкладай на завтра те, що можеш зробити післязавтра»",
    author: "- Альфонс Аллі",
  },
  {
    text: "«Хто вміє, той робить, а хто не вміє, той вчить»",
    author: "- Бернард Шоу",
  },
  {
    text: "«Думати – ось найважча робота, і тому мало хто за неї береться»",
    author: "- Генрі Форд",
  },
  {
    text: "«Стомлює не стільки сама праця, скільки думки про неї»",
    author: "- Марк Фабій Квінтиліан",
  },
  {
    text: "«Зробіть комусь послугу — і це стане вашою роботою»",
    author: "- Закон Мерфі",
  },
  {
    text: "«80% успіху — це з’явитися в потрібному місці в потрібний час»",
    author: "- Вуді Аллен",
  },
  {
    text: "«Краще тримати рот на замку і здатися дурнем, ніж заговорити і розвіяти всі сумніви»",
    author: "- Марк Твен",
  },
  {
    text: "«Краще тримати рот на замку і здатися дурнем, ніж заговорити і розвіяти всі сумніви»",
    author: "- Марк Твен",
  },
  {
    text: "«У всьому є баланс. Кількість енергії, яку ви отримуєте, дорівнює завданням, які потрібно виконати»",
    author: "- Борис Пастернак",
  },
  {
    text: "«Не в грошах щастя, а в їхній кількості»",
    author: "- Михайло Генін",
  },
  {
    text: "«Людині не потрібно нічого понад те, що їй дала природа. Окрім грошей»",
    author: "- Юзеф Бестер",
  },
  {
    text: "«Є тільки один спосіб уникнути критики: нічого не робіть, нічого не говоріть і будьте ніким»",
    author: "- Арісто́тель",
  },
];
const quote = quotes[Math.floor(Math.random() * quotes.length)];
const quoteText = document.getElementById("bes");
const quoteAuthor = document.getElementById("tes");
if (quoteText && quoteAuthor) {
  quoteText.innerText = quote.text;
  quoteAuthor.innerText = `– ${quote.author}`;
}

// ------------------ FAQ ------------------ //
const faqItems = document.querySelectorAll(".js-faq-question");
faqItems.forEach((item) => {
  item.addEventListener("click", () => {
    item.classList.toggle("active");
    const answer = item.nextElementSibling;
    answer?.classList.toggle("open");
  });
});

// ------------------ Calc percent ------------------ //
function AutoCalcYear(e) {
  var t = document.getElementById("yearp").value,
    n = Math.round((parseFloat(t) / 365) * 100) / 100;
  (document.getElementById("dayp").value = n),
    isNaN(n) && (document.getElementById("dayp").value = "");
}
function AutoCalcDay(e) {
  var t = document.getElementById("dayp").value,
    n = Math.round(365 * parseFloat(t) * 100) / 100;
  (document.getElementById("yearp").value = n),
    isNaN(n) && (document.getElementById("yearp").value = "");
}

// ------------------ Telegram Form ------------------ //
const form = document.getElementById("tg");
const alertBox = document.getElementById("alert");
const VERCEL_API_ENDPOINT =
  "https://your-vercel-app-name.vercel.app/api/send-telegram-message";

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = {
      name: form.name.value,
      type: form.type.value,
      text: form.text.value,
    };

    try {
      const response = await axios.post(VERCEL_API_ENDPOINT, formData);

      // Оброботка відповіді
      if (response.status === 200 && response.data.success) {
        form.reset();
        alertBox.className = "alert-box alert-box--success";
        alertBox.innerHTML =
          "<p>Повідомлення успішно надіслано. Дякую :3</p><span class='alert-box__close'></span>";
      } else {
        // Якщо функція повернула помилку, або success: false
        alertBox.className = "alert-box alert-box--error";
        alertBox.innerHTML = `<p>Помилка від сервера:<br>${
          response.data.error || "Невідома помилка"
        }</p><span class='alert-box__close'></span>`;
      }
    } catch (error) {
      // Обробка мережевих помилок або помилок Axios
      console.error("Error sending message:", error);
      let errorMessage = "Невідома помилка";
      if (error.response && error.response.data && error.response.data.error) {
        errorMessage = error.response.data.error; // Помилка від вашого Vercel сервера
      } else if (error.message) {
        errorMessage = error.message; // Мережева помилка
      }
      alertBox.className = "alert-box alert-box--error";
      alertBox.innerHTML = `<p>Помилка:<br>${errorMessage}</p><span class='alert-box__close'></span>`;
    }
    alertBox.style.display = "block";
  });
}

// ------------------ Highlight & Copy ------------------ //

// Elements
const highlightToggle = document.querySelector("#high-tg");
const copyMenu = document.querySelector(".s-copy");
const copyWithoutSignBtn = document.querySelector(".s-copy_without-sign");
const copyWithSignBtn = document.querySelector(".s-copy_with-sign");
const copySuccessMessage = document.querySelector(".s-copy_success");
const greetingToggleItem = document.querySelector(".s-copy_hand");
const greetingToggleCheckbox = document.querySelector("#hand");

// 1. Highlight Toggle — init + listener
function initHighlightToggle() {
  const isEnabled = localStorage.getItem("highlight") === "yes";
  highlightToggle.checked = isEnabled;

  highlightToggle.addEventListener("change", (e) => {
    localStorage.setItem("highlight", e.target.checked ? "yes" : "no");
  });
}

// 2. Select text on click
function setupSelectableElements() {
  document.querySelectorAll("[data-selectable]").forEach((el) => {
    el.addEventListener("click", () => {
      if (!highlightToggle.checked) return;

      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNode(el);
      selection.removeAllRanges();
      selection.addRange(range);
    });
  });
}

// 3. Get selected text
function getSelectedTextData() {
  const selection = window.getSelection();
  if (!selection.rangeCount) return { text: "", rect: null };

  const range = selection.getRangeAt(0);
  const text = selection.toString().trim();

  if (!text) return { text: "", rect: null };

  return {
    text,
    rect: range.getBoundingClientRect(),
  };
}

// 4. Show / hide menu
function toggleCopyMenu() {
  const { rect } = getSelectedTextData();
  if (rect && rect.width > 0 && rect.height > 0) {
    openCopyMenu();
  } else {
    closeCopyMenu();
  }
}
function openCopyMenu() {
  const { rect } = getSelectedTextData();
  if (!rect) return;

  copyMenu.style.left = `${rect.left + window.pageXOffset}px`;
  copyMenu.style.top = `${rect.top + window.pageYOffset - 50}px`;

  copyMenu.classList.remove("s-copy--visible");
  void copyMenu.offsetWidth;
  copyMenu.classList.add("s-copy--visible");

  resetCopyMenu();
}
function closeCopyMenu() {
  if (copyMenu.classList.contains("s-copy--visible")) {
    copyMenu.classList.remove("s-copy--visible");
    copyMenu.classList.add("s-copy--hiding");

    copyMenu.addEventListener(
      "animationend",
      () => {
        copyMenu.classList.remove("s-copy--hiding");
      },
      { once: true }
    );
  }
}

function resetCopyMenu() {
  copySuccessMessage.style.display = "none";
  copyWithoutSignBtn.style.display = "flex";
  copyWithSignBtn.style.display = "flex";
  greetingToggleItem.style.display = "flex";
}

function showCopySuccessOnly() {
  copySuccessMessage.style.display = "flex";
  copyWithoutSignBtn.style.display = "none";
  copyWithSignBtn.style.display = "none";
  greetingToggleItem.style.display = "none";
}

// 5. Hide menu and reset highlight on scroll
function handleScrollHideSelection() {
  const selection = window.getSelection();
  if (!selection.rangeCount) return;

  const rect = selection.getRangeAt(0).getBoundingClientRect();
  const outOfView =
    rect.bottom < 0 ||
    rect.top > window.innerHeight ||
    rect.right < 0 ||
    rect.left > window.innerWidth;

  if (outOfView) window.getSelection().removeAllRanges();
}

// 6. Show menu on text hightlighted
let isClickListenerActive = false;

function handleSelectionChange() {
  const { text } = getSelectedTextData();
  if (text) {
    toggleCopyMenu();
    if (!isClickListenerActive) {
      document.body.addEventListener("click", onClickOutside);
      isClickListenerActive = true;
    }
  } else {
    window.getSelection().removeAllRanges();
    if (isClickListenerActive) {
      document.body.removeEventListener("click", onClickOutside);
      isClickListenerActive = false;
    }
  }
}

function onClickOutside(e) {
  if (!e.target.closest(".s-copy") && !e.target.closest("[data-selectable]")) {
    window.getSelection().removeAllRanges();
    document.body.removeEventListener("click", onClickOutside);
    isClickListenerActive = false;
  }
}

// 7. Copy text
async function copyText(includeSignature = false) {
  const { text } = getSelectedTextData();
  if (!text) return;

  const withGreeting = greetingToggleCheckbox?.checked;
  let content = withGreeting ? "Добрий день!\n\n" : "";
  content += text;

  if (includeSignature) {
    content +=
      "\n\nЗ повагою,\nСлужба підтримки клієнтів Pango\nтел.: (044)337-03-37\ne-mail: info@pango.com.ua";
  }

  try {
    await navigator.clipboard.writeText(content);
    showCopySuccessOnly();
    setTimeout(() => {
      window.getSelection().removeAllRanges();
    }, 1000);
  } catch (err) {
    console.error("Помилка копіювання:", err);
  }
}

// ------------------ Init ------------------ //
initHighlightToggle();
setupSelectableElements();

// ------------------ Events ------------------ //
let debounceTimeout = null;
function toggleCopyMenuDebounced() {
  if (debounceTimeout) clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(toggleCopyMenu, 150);
}
document.addEventListener("selectionchange", toggleCopyMenuDebounced);
document.addEventListener("copy", () => copyText(false));
copyWithoutSignBtn?.addEventListener("click", () => copyText(false));
copyWithSignBtn?.addEventListener("click", () => copyText(true));
window.addEventListener("scroll", handleScrollHideSelection);

// ------------------ Preload and animation stuff ------------------ //
(function (docElem) {
  function initPreloaderAnimation() {
    const timeline = anime.timeline({
      easing: "easeInOutCubic",
      duration: 800,
      autoplay: false,
    });

    timeline
      .add({
        targets: "#loader",
        opacity: 0,
        duration: 1000,
        begin: () => window.scrollTo(0, 0),
      })
      .add({
        targets: "#preloader",
        opacity: 0,
        complete: () => {
          const preloader = document.querySelector("#preloader");
          if (preloader) {
            preloader.style.visibility = "hidden";
            preloader.style.display = "none";
          }
        },
      })
      .add(
        {
          targets: [".s-header__logo", ".s-header__menu-toggle"],
          opacity: [0, 1],
        },
        "-=200"
      )
      .add(
        {
          targets: [".s-intro__title", ".s-intro__pretitle", ".s-intro__more"],
          translateY: [100, 0],
          opacity: [0, 1],
          delay: anime.stagger(200),
        },
        "-=400"
      )
      .add(
        {
          targets: [".s-intro__social", ".s-intro__scroll"],
          opacity: [0, 1],
          delay: anime.stagger(200),
        },
        "-=200"
      );

    const preloader = document.querySelector("#preloader");
    if (preloader) {
      docElem.classList.add("ss-preload");
      window.addEventListener("load", () => {
        docElem.classList.remove("ss-preload");
        docElem.classList.add("ss-loaded");
        timeline.play();
      });
    }
  }

  function initRellax() {
    new Rellax(".rellax");
  }

  // change menu opacity after scroll
  function initHeaderMenuOpacityOnScroll() {
    const menuToggle = document.querySelector(".s-header__menu-toggle");
    const scrollThreshold = 500;

    if (!menuToggle) return;

    window.addEventListener("scroll", () => {
      if (window.scrollY > scrollThreshold) {
        menuToggle.classList.add("opaque");
      } else {
        menuToggle.classList.remove("opaque");
      }
    });
  }

  function initMenuAndPopups() {
    const body = document.body;
    const menuToggle = document.querySelector(".s-header__menu-toggle");
    const feedbackButtons = document.querySelectorAll(".feedback");
    const settingsButton = document.querySelector(".settings");
    const percentButton = document.querySelector(".percent");
    const nav = document.querySelector(".s-header__nav");
    const settingsPopup = document.querySelector(".s-settings");
    const feedbackPopup = document.querySelector(".s-feedback");
    const percentPopup = document.querySelector(".s-percentage");
    const closeMarks = document.querySelectorAll(".close-mark");
    const closePercentBtn = document.querySelector(".close-perc");

    if (
      !menuToggle ||
      !nav ||
      !settingsButton ||
      !settingsPopup ||
      !feedbackButtons.length ||
      !feedbackPopup ||
      !percentButton ||
      !percentPopup
    )
      return;

    // Open menu
    menuToggle.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();

      body.classList.add("menu-is-open");
      body.classList.remove("settings-is-open", "feedback-is-open");
    });

    // Open settings
    settingsButton.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();

      body.classList.add("settings-is-open");
      body.classList.remove("menu-is-open");
    });

    // Open feedback and load axios
    feedbackButtons.forEach((btn) => {
      btn.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();

        if (!document.querySelector('script[src*="axios"]')) {
          const script = document.createElement("script");
          script.src =
            "https://cdn.jsdelivr.net/npm/axios@1.1.2/dist/axios.min.js";
          body.appendChild(script);
        }

        body.classList.add("feedback-is-open");
        body.classList.remove("menu-is-open");
      });
    });

    // Open & close percent menu
    percentButton.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      body.classList.add("percentage-is-open");
    });

    if (closePercentBtn) {
      closePercentBtn.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        body.classList.remove("percentage-is-open");
      });
    }

    // Close menu/feedback/settings on X button
    closeMarks.forEach((mark) => {
      mark.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        body.classList.remove(
          "menu-is-open",
          "feedback-is-open",
          "settings-is-open"
        );
      });
    });

    // Close menu on body click
    body.addEventListener("click", (event) => {
      const clickedInsideMenu = event.target.closest(
        ".s-header__nav, .s-popup, .s-header__menu-toggle"
      );

      if (!clickedInsideMenu) {
        body.classList.remove("menu-is-open");
        body.classList.remove("settings-is-open");
        body.classList.remove("feedback-is-open");
      }
    });

    if (nav) {
      nav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
          body.classList.remove("menu-is-open");
        });
      });
    }
  }

  // Scroll animations
  function initScrollAnimations() {
    const animatedBlocks = document.querySelectorAll("[data-animate-block]");
    if (!animatedBlocks.length) return;

    function onScroll() {
      const viewportHeight = window.innerHeight;

      animatedBlocks.forEach((block) => {
        const rect = block.getBoundingClientRect();
        const blockTop = rect.top;
        const blockBottom = rect.bottom;
        const blockVisiblePart =
          Math.min(blockBottom, viewportHeight) - Math.max(blockTop, 0);
        const blockHeight = rect.height;
        const visiblePercent = blockVisiblePart / blockHeight;

        const alreadyAnimated = block.classList.contains("ss-animated");

        if (visiblePercent >= 0.2 && !alreadyAnimated) {
          anime({
            targets: block.querySelectorAll("[data-animate-el]"),
            opacity: [0, 1],
            translateY: [100, 0],
            delay: anime.stagger(200, { start: 200 }),
            duration: 800,
            easing: "easeInOutCubic",
            begin: () => block.classList.add("ss-animated"),
          });
        }
      });
    }

    window.addEventListener("scroll", onScroll);
  }

  // Close alert-box on X button
  function initAlertBoxes() {
    const alertBoxes = document.querySelectorAll(".alert-box");
    alertBoxes.forEach((alertBox) => {
      alertBox.addEventListener("click", (event) => {
        if (event.target.matches(".alert-box__close")) {
          event.stopPropagation();
          alertBox.classList.add("hideit");
          setTimeout(() => {
            alertBox.style.display = "none";
          }, 500);
        }
      });
    });
  }

  // Show go top button
  function initGoTopButton() {
    const showAfter = 900;
    const goTopBtn = document.querySelector(".ss-go-top");
    if (!goTopBtn) return;

    function toggleVisibility() {
      if (window.scrollY >= showAfter) {
        goTopBtn.classList.add("link-is-visible");
      } else {
        goTopBtn.classList.remove("link-is-visible");
      }
    }

    toggleVisibility();
    window.addEventListener("scroll", toggleVisibility);
  }

  function initAll() {
    initPreloaderAnimation();
    initRellax();
    initHeaderMenuOpacityOnScroll();
    initScrollAnimations();
    initMenuAndPopups();
    initAlertBoxes();
    initGoTopButton();
  }

  initAll();
})(document.documentElement);
