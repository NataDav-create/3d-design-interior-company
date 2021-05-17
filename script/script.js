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

    const handlerMenu = () => {
      menu.classList.toggle("active-menu");
    };

    btnMenu.addEventListener("click", handlerMenu);
    menu.addEventListener("click", (e) => {
      const target = e.target;

      if (target.closest(".close-btn")) {
        e.preventDefault();
        handlerMenu();
      } else if (target.closest("ul>li")) {
        handlerMenu();
      }
    });
  };
  toggleMenu();

  //popup
  const togglePopUp = () => {
    const popupBtn = document.querySelectorAll(".popup-btn");
    const popup = document.querySelector(".popup");

    const closePopup = () => {
      popup.style.display = "none";
    };

    popupBtn.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        popup.style.display = "block";
      });
    });

    popup.addEventListener("click", (e) => {
      if (e.target.classList.contains("popup-close")) {
        closePopup();
      } else if (!e.target.closest(".popup-content")) {
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

  const slider = () => {
    const slide = document.querySelectorAll(".portfolio-item"),
      btn = document.querySelectorAll(".portfolio-btn"),
      dot = document.querySelectorAll(".dot"),
      slider = document.querySelector(".portfolio-content");

    let currentSlide = 0,
      interval;

    const prevSlide = (elem, index, strClass) => {
      elem[index].classList.remove(strClass);
    };

    const nextSlide = (elem, index, strClass) => {
      elem[index].classList.add(strClass);
    };

    const autoPlaySlide = () => {
      prevSlide(slide, currentSlide, "portfolio-item-active");
      prevSlide(dot, currentSlide, "dot-active");
      currentSlide++;
      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }
      nextSlide(slide, currentSlide, "portfolio-item-active");
      nextSlide(dot, currentSlide, "dot-active");
    };

    const startSlide = (time = 3000) => {
      interval = setInterval(autoPlaySlide, time);
    };

    const stopSlide = () => {
      clearInterval(interval);
    };

    slider.addEventListener("click", (e) => {
      e.preventDefault();
      let target = e.target;

      if (!target.matches(".portfolio-btn, .dot")) {
        return;
      }

      prevSlide(slide, currentSlide, "portfolio-item-active");
      prevSlide(dot, currentSlide, "dot-active");

      if (target.matches("#arrow-right")) {
        currentSlide++;
      } else if (target.matches("#arrow-left")) {
        currentSlide--;
      } else if (target.matches(".dot")) {
        dot.forEach((elem, index) => {
          if (elem === target) {
            currentSlide = index;
          }
        });
      }
      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }
      if (currentSlide < 0) {
        currentSlide = slide.length - 1;
      }

      nextSlide(slide, currentSlide, "portfolio-item-active");
      nextSlide(dot, currentSlide, "dot-active");
    });

    slider.addEventListener("mouseover", (e) => {
      let target = e.target;
      if (target.matches(".portfolio-btn") || target.matches(".dot")) {
        stopSlide();
      }
    });

    slider.addEventListener("mouseout", (e) => {
      let target = e.target;
      if (target.matches(".portfolio-btn") || target.matches(".dot")) {
        startSlide();
      }
    });

    startSlide(1500);
  };

  slider();

  const hoverImages = () => {
    let commandPhotos = document.querySelectorAll(".command__photo");
    commandPhotos.forEach((photo) => {
      let src = photo.src;
      photo.addEventListener("mouseover", (e) => {
        let target = e.target;
        photo.src = target.dataset.img;
      });
      photo.addEventListener("mouseleave", () => {
        photo.src = src;
      });
    });
  };
  hoverImages();

  const calc = (price = 100) => {
    const calcBlock = document.querySelector(".calc-block"),
      calcType = document.querySelector(".calc-type"),
      calcSquare = document.querySelector(".calc-square"),
      calcDay = document.querySelector(".calc-day"),
      calcCount = document.querySelector(".calc-count"),
      totalValue = document.getElementById("total");
    let countId,
      count = 0;

    const countSum = () => {
      let total = 0,
        countValue = 1,
        dayValue = 1;

      const typeValue = calcType.options[calcType.selectedIndex].value,
        squareValue = +calcSquare.value;

      if (calcCount.value > 1) {
        countValue += (calcCount.value - 1) / 10;
      }

      if (calcDay.value && calcDay.value < 5) {
        dayValue *= 2;
      } else if (calcDay.value && calcDay < 10) {
        dayValue *= 1.5;
      }

      if (typeValue && squareValue) {
        total = price * typeValue * squareValue * countValue * dayValue;
        const step = Math.round((total / 100) * 24);
        countId = setInterval(() => {
          if (count >= total) {
            clearInterval(countId);
            totalValue.textContent = Math.floor(total);
          } else {
            count += step;
            totalValue.textContent = count;
          }
        }, 37);
      } else {
        totalValue.textContent = total;
      }

    };

    calcBlock.addEventListener("change", (e) => {
      const target = e.target;

      if (
        target.matches(".calc-type") ||
        target.matches(".calc-square") ||
        target.matches(".calc-day") ||
        target.matches(".calc-count")
      ) {
        clearInterval(countId);
        count = 0;
        countSum();
      }
    });
  };
  calc(100);

  const validFormName = () => {
    const formName = document.querySelectorAll('[placeholder="Ваше имя"]');
    formName.forEach(item => {
      item.addEventListener('input', () => {
        item.value = item.value.replace(/[^а-яё\s]/gi, '');
      });
      item.addEventListener('blur', () => {
        item.value = item.value.split(/\s+/).map(str => str.charAt(0).toUpperCase() + str.slice(1)).join(' ');
      });
    });
  };
  validFormName();
  const validFormEmail = () => {
    const formEmail = document.querySelectorAll('[placeholder="E-mail"]');
    formEmail.forEach(item => {
      item.addEventListener('input', () => {
        item.value = item.value.replace(/[^a-z@\-_.!~*']/gi, '');
      });
      item.addEventListener('blur', () => {
        item.value = item.value.replace(/^[\s-]+|[\s-]+$/gi, '').replace(/-+/g, '-');
      });
    });
  };
  validFormEmail();
  const validFormPhone = () => {
    const formPhone = document.querySelectorAll('[placeholder="Номер телефона"]');
    formPhone.forEach(item => {
      item.addEventListener('input', () => {
        item.value = item.value.replace(/[^+\d\-()]/g, '');
      });
      item.addEventListener('blur', () => {
        item.value = item.value.replace(/^[\s-]+|[\s\-\+]{1,}$/g, '').replace(/-+/g, '-');
      });
    });
  };
  validFormPhone();

  const loading = (elem) => {
    const spinner = `<div class="loadingio-spinner-reload-h1gj4teliw8"><div class="ldio-12kxbiqkfwpi"><div><div></div><div></div><div></div></div></div></div>`;
    elem.innerHTML = spinner
  };

  const sendForm = (formID) => {
    const errorMessage = 'Something went wrong...',
      // loadMessage = 'Loading...',
      successMessage = 'Thank you! we will connect with you soon';

    const form = document.getElementById(formID);

    const statusMessage = document.createElement('div');
    statusMessage.style.cssText = 'font-size: 1.5rem; color: #fff';

    form.addEventListener('submit', e => {
      e.preventDefault();
      form.appendChild(statusMessage);
      // statusMessage.textContent = loadMessage;
      loading(statusMessage)
      const formData = new FormData(form);

      let body = {};
      // for (let val of formData.entries()) {
      //   console.log(val);
      //   body[val[0]] = val[1];
      // }
      formData.forEach((val, key) => {
        body[key] = val;
      });
      postData(body)
        .then(data => {
          console.log(data)
          statusMessage.textContent = successMessage;
          closeText(2000);
          form.reset();
        }).catch((error) => {
          statusMessage.textContent = errorMessage;
          console.log(error);
          closeText(1000)
        });
    });

    const postData = (body) => {
      return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();
        request.addEventListener('readystatechange', () => {

          if (request.readyState !== 4) {
            return;
          }
          if (request.readyState === 4 && request.status === 200) {
            console.log(request)
            // outputData();
            resolve(request);
          } else {
            reject(request.status);
          }
        });
        request.open('POST', './server.php');
        request.setRequestHeader('Content-Type', 'application/json');

        request.send(JSON.stringify(body));
      })
    };

    function closeText(time) {
      setTimeout(function () {
        statusMessage.textContent = ''
      }, time);
    }
  };
  sendForm('form1');
  sendForm('form2');
  sendForm('form3');
});