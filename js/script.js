const slides = document.getElementsByClassName('slide');
const slidesImg = document.getElementsByClassName('slide-img');
const viewSlideIndex = document.getElementsByClassName('slide-index')[0];
const gallery = document.getElementsByClassName('gallery')[0];
const viewSlideTitle = document.querySelectorAll('.slide-title h3')[0];
var slideIndex = 0;

const createGallery = () => {
    for (let i = 0; i < slidesImg.length; i++) {
        let item = document.createElement('button');
        let itemImg = document.createElement('img');
        let itemEffect = document.createElement('div');

        item.type = 'button';
        item.style = `top: ${((i - slideIndex) * 14.25) + (i * 1.5)}rem`;
        itemImg.src = slidesImg[i].src;
        itemImg.alt = slidesImg[i].alt;
        itemImg.draggable = false;

        gallery.appendChild(item);
        item.appendChild(itemImg);
        item.appendChild(itemEffect);
        itemEffect.appendChild(document.createElement('div'));

        if(i == slideIndex) {
            item.className = 'btn btn-active';
        }else {
            item.className = 'btn';
        }
    }
}

const setSlide = () => {
    const items = document.getElementsByClassName('btn');
    viewSlideIndex.innerText = `${slideIndex + 1} / ${slides.length}`;
    viewSlideTitle.innerText = slidesImg[slideIndex].alt;

    for (let i = 0; i < slides.length; i++) {
        slides[i].style = `top: ${(i - slideIndex) * 67.5}rem`;
        items[i].addEventListener('click', () => setSlideIndex(-slideIndex + i));

        if(slideIndex >= slides.length - 4) {
            items[i].style = `top: ${((i - (slides.length - 4)) * 14.25) + (i * 1.5) - slides.length + 1}rem`;
        }else {
            items[i].style = `top: ${((i - slideIndex) * 14.25) + ((i - slideIndex) * 1.5)}rem`;
        }

        if(i == slideIndex) {
            items[i].className = 'btn btn-active';
        }else {
            items[i].className = 'btn';
        }
    }
}

const setSlidesClassName = name => { 
    for (let i = 0; i < slides.length; i++) {
        slides[i].className = name
    }
}

const setSlideIndex = n => {
    if(slideIndex == 0 && n == -1) {
        slideIndex += 0;
        setSlidesClassName('slide stop-slide-up');
        setTimeout(() => {
            setSlidesClassName('slide')
        }, 250)
    }else if(slideIndex == slides.length - 1 && n == 1) {
        slideIndex += 0;
        setSlidesClassName('slide stop-slide-down');
        setTimeout(() => {
            setSlidesClassName('slide')
        }, 250)
    }else {
        slideIndex += n;
        setSlidesClassName('slide')
    }

    setSlide()
}

document.addEventListener('keydown', e => {
    e.preventDefault();
    if(e.keyCode == 40 || e.keyCode == 39) {
        setSlideIndex(1)
    }else if(e.keyCode == 38 || e.keyCode == 37) {
        setSlideIndex(-1)
    }
})

const loadPage = () => {
    createGallery();
    setSlide();
}

window.onload = loadPage()