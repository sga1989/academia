let slides = document.querySelectorAll(".slide");
let pointers = document.querySelectorAll(".pointers");
let sliderContainer = document.querySelector(".sliders");
let currentIndex = 0;
let slideInterval;
let userInteracted = false;
let autoRestartTimeout;

function showSlide(index) {
    sliderContainer.style.transform = `translateX(-${index * 100}vw)`;

    document.querySelector(".pointers.active").classList.remove("active");
    pointers[index].classList.add("active");

    currentIndex = index;
}

function nextSlide() {
    let nextIndex = (currentIndex + 1) % slides.length;
    showSlide(nextIndex);
}

function prevSlide() {
    let prevIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(prevIndex);
}

function startSlideShow() {
    slideInterval = setInterval(nextSlide, 4000);
}

function stopSlideShow() {
    clearInterval(slideInterval);
}

function restartSlideShow() {
    clearTimeout(autoRestartTimeout);
    autoRestartTimeout = setTimeout(() => {
        userInteracted = false;
        startSlideShow();
    }, 5000); // Reinicia após 5 segundos de inatividade
}

document.querySelector(".prev").addEventListener("click", () => {
    stopSlideShow();
    prevSlide();
    userInteracted = true;
    restartSlideShow();
});

document.querySelector(".next").addEventListener("click", () => {
    stopSlideShow();
    nextSlide();
    userInteracted = true;
    restartSlideShow();
});

pointers.forEach((pointer, index) => {
    pointer.addEventListener("click", () => {
        stopSlideShow();
        showSlide(index);
        userInteracted = true;
        restartSlideShow();
    });
});

slides.forEach((slide) => {
    slide.addEventListener("click", () => {
        stopSlideShow();
        userInteracted = true;
        restartSlideShow();
    });
});

// Inicia o slider automaticamente
showSlide(currentIndex);
startSlideShow();
