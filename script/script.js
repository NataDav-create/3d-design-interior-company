window.addEventListener("DOMContentLoaded", function () {
  "use strict";

  (function () {
    const scrollLinks = document.querySelectorAll("a.scroll-link");

    for (let i = 0; i < scrollLinks.length; i++) {
      scrollLinks[i].addEventListener("click", function (e) {
        e.preventDefault();
        const id = scrollLinks[i].getAttribute("href");
        document.querySelector(id).scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    }
  })();

  //timer
  function countTimer(deadline) {
    const addZero = (num) => {
      if (num <= 9) {
        return "0" + num;
      } else {
        return num;
      }
    };

    let timeHours = document.querySelector("#timer-hours"),
      timeMinutes = document.querySelector("#timer-minutes"),
      timeSeconds = document.querySelector("#timer-seconds");

    function getTimeRemaining() {
      let dateStop = new Date(deadline).getTime(),
        dateNow = new Date().getTime(),
        timeRemaining = (dateStop - dateNow) / 1000,
        seconds = Math.floor(timeRemaining % 60),
        minutes = Math.floor((timeRemaining / 60) % 60),
        hours = Math.floor((timeRemaining / 60 / 60) % 24);
      return {
        timeRemaining,
        hours,
        minutes,
        seconds,
      };
    }

    function updateClock() {
      let timer = getTimeRemaining();

      timeHours.textContent = addZero(timer.hours);
      timeMinutes.textContent = addZero(timer.minutes);
      timeSeconds.textContent = addZero(timer.seconds);

      if (timer.timeRemaining > 0) {
        setTimeout(updateClock, 1000);
      }
    }
    updateClock();
  }

  countTimer("01 July 2021");

  //menu
  const toggleMenu = () => {
    const btnMenu = document.querySelector(".menu");
    const menu = document.querySelector("menu");
    const closeBtn = document.querySelector(".close-btn");
    const menuItems = menu.querySelectorAll("ul>li");

    const handlerMenu = () => {
      menu.classList.toggle("active-menu");
    };

    btnMenu.addEventListener("click", handlerMenu);
    closeBtn.addEventListener("click", handlerMenu);
    menuItems.forEach((elem) => {
      elem.addEventListener("click", handlerMenu);
    });
  };
  toggleMenu();

  //popup
  const togglePopUp = () => {
    const popupBtn = document.querySelectorAll(".popup-btn");
    const popup = document.querySelector(".popup");
    const popupClose = document.querySelector(".popup-close");

    const closePopup = () => {
      popup.style.display = "none";
    };

    popupBtn.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        popup.style.display = "block";
      });
    });
    popupClose.addEventListener("click", closePopup);
    popup.addEventListener("click", (e) => {
      if (!e.target.closest(".popup-content")) {
        closePopup();
      }
    });
  };
  togglePopUp();

  const tabs = () => {
    const tabHeader = document.querySelector(".service-header");
    const tabContent = document.querySelectorAll(".service-tab");
    const tab = tabHeader.querySelectorAll(".service-header-tab");

    const toggleTabContent = (index) => {
      for (let i = 0; i < tabContent.length; i++) {
        if (index === i) {
          tab[i].classList.add("active");
          tabContent[i].classList.remove("d-none");
        } else {
          tab[i].classList.remove("active");
          tabContent[i].classList.add("d-none");
        }
      }
    };

    tabHeader.addEventListener("click", (e) => {
      let target = e.target;
      target = target.closest(".service-header-tab");

      if (target) {
        tab.forEach((item, i) => {
          if (item === target) {
            toggleTabContent(i);
          }
        });
      }
    });
  };

  tabs();
});
