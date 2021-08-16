const backToTopButton = document.querySelector('#back-to-top-btn');

// кнопка з'являється при прокрученні екрану більше як на 300px

window.addEventListener("scroll", scrollFunction);

function scrollFunction() {

    if (window.pageYOffset > 300) { // показати кнопку backToTopButton
        if(!backToTopButton.classList.contains("btnEntrance")) {
          backToTopButton.classList.remove("btnExit");
          backToTopButton.classList.add("btnEntrance");
          backToTopButton.style.display = "block";
        }
      }
      else { // сховати кнопку backToTopButton
        if(backToTopButton.classList.contains("btnEntrance")) {
          backToTopButton.classList.remove("btnEntrance");
          backToTopButton.classList.add("btnExit");
          setTimeout(() => {
            backToTopButton.style.display = "none";
          }, 250);
        }
      }
    }

// функція яка буде реагувати на клік по кнопці "back-to-top-btn"

backToTopButton.addEventListener("click", backToTop);

function backToTop() {
    window.scrollTo(0, 0);
}