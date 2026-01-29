
document.addEventListener("DOMContentLoaded", function () {

const images = [
    "images/mainsalide1.jpg",
    "images/mainsalide2.jpg",
    "images/mainsalide3.jpg",
    "images/mainsalide4.jpg",
    "images/mainsalide5.jpg",
    "images/mainsalide6.jpg",
    "images/mainsalide7.jpg",
    "images/mainsalide8.jpg"
];

let currentIndex = 0;
let autoSlideInterval = null;
const SLIDE_DELAY = 4000;

const mainImage = document.getElementById("mainImage");
const items = document.querySelectorAll(".cat-item");
const slider = document.querySelector(".main-slider");

/* حماية في حال عنصر غير موجود */
if (!mainImage || !slider) return;

/* تحديث الصورة + العنصر النشط */
function updateSlider(index) {
    currentIndex = index;
    mainImage.src = images[currentIndex];

    items.forEach(item => item.classList.remove("active"));
    if (items[currentIndex]) {
        items[currentIndex].classList.add("active");
    }
}

/* التالي */
window.nextImage = function () {
    currentIndex = (currentIndex + 1) % images.length;
    updateSlider(currentIndex);
}

/* السابق */
window.prevImage = function () {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateSlider(currentIndex);
}



/* Auto Slide */
function startAutoSlide() {
    stopAutoSlide();
    autoSlideInterval = setInterval(nextImage, SLIDE_DELAY);
}

function stopAutoSlide() {
    if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
        autoSlideInterval = null
    }
}

/* تشغيل افتراضي */
updateSlider(0);
startAutoSlide();

/* إيقاف عند hover */
slider.addEventListener("mouseenter", stopAutoSlide);
slider.addEventListener("mouseleave", startAutoSlide);

});
