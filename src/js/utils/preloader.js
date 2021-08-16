const preloader = document.querySelector('.preloader')
// console.log(preloader);
window.addEventListener("load", showPreloader)

function showPreloader() {
  preloader.classList.add('hide')
}