const logo = document.querySelector('.header_logo-div')

logo.addEventListener('mousemove', startRotate);
logo.addEventListener('mouseout', stopRotate);

function startRotate(event) {
    const logoItem = this.querySelector('.header_logo');
    const halfHeight = logoItem.offsetHeight / 2;

    logoItem.style.transform = 'rotateX(' + -(event.offsetY - halfHeight) / 5 + 'deg) rotateY(' + (event.offsetX - halfHeight) / 5 + 'deg)'
}

function stopRotate(event) {
    const logoItem = this.querySelector('.header_logo');
    logoItem.style.transform = 'rotate(0)';
}