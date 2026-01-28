// بيانات الصور
const images = [
    { 
        src: 'images/cat1.jpg', 
        title: 'Salle de bain', 
        desc: 'Meubles et accessoires de salle de bain premium' 
    },
    { 
        src: 'images/cat2.jpg', 
        title: 'Sanitaire', 
        desc: 'Équipements sanitaires modernes et durables' 
    },
    { 
        src: 'images/cat3.jpg', 
        title: 'Peinture', 
        desc: 'Peintures et revêtements muraux haute qualité' 
    },
    { 
        src: 'images/cat4.jpg', 
        title: 'Accessoires', 
        desc: 'Accessoires de construction et décoration' 
    },
    { 
        src: 'images/cat5.jpg', 
        title: 'Électricité', 
        desc: 'Matériel électrique professionnel' 
    },
    { 
        src: 'images/cat6.jpg', 
        title: 'Outillage', 
        desc: 'Outils professionnels pour tous vos travaux' 
    },
    { 
        src: 'images/cat7.jpg', 
        title: 'Plomberie', 
        desc: 'Tuyaux, raccords et équipements de plomberie' 
    },
    { 
        src: 'images/cat8.jpg', 
        title: 'Construction', 
        desc: 'Matériaux de construction de première qualité' 
    },
    { 
        src: 'images/cat9.jpg', 
        title: 'Cuisine', 
        desc: 'Équipements et accessoires de cuisine modernes' 
    }
];

let currentIndex = 0;
let autoSlideInterval;

// تهيئة المؤشرات
function initIndicators() {
    const indicatorsContainer = document.getElementById('indicators');
    indicatorsContainer.innerHTML = '';
    
    images.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.className = `indicator ${index === currentIndex ? 'active' : ''}`;
        indicator.onclick = () => changeImage(index);
        indicatorsContainer.appendChild(indicator);
    });
}

function changeImage(index) {
    currentIndex = index;
    const mainImage = document.getElementById('mainImage');
    const slideTitle = document.getElementById('slideTitle');
    const slideDesc = document.getElementById('slideDesc');
    const catItems = document.querySelectorAll('.cat-item');
    const indicators = document.querySelectorAll('.indicator');
    
    // تحديث الصورة والنص
    mainImage.src = images[index].src;
    mainImage.alt = images[index].title;
    slideTitle.textContent = images[index].title;
    slideDesc.textContent = images[index].desc;
    
    // تحديث الكلاس النشط للعناصر
    catItems.forEach((item, i) => {
        if (i === index) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
    
    // تحديث المؤشرات
    indicators.forEach((indicator, i) => {
        if (i === index) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
    
    // إعادة تعيين التبديل التلقائي
    resetAutoSlide();
}

function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    changeImage(currentIndex);
}

function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    changeImage(currentIndex);
}

// التبديل التلقائي
function startAutoSlide() {
    autoSlideInterval = setInterval(nextImage, 4000);
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

// تهيئة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    initIndicators();
    changeImage(0);
    startAutoSlide();
    
    // إيقاف التبديل التلقائي عند hover
    const slider = document.querySelector('.main-slider');
    slider.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
    slider.addEventListener('mouseleave', startAutoSlide);
});
// إضافة تأثير عند الفتح/الإغلاق
document.querySelectorAll('.catalogue-dropdown').forEach(dropdown => {
    const trigger = dropdown.querySelector('.dropdown-trigger');
    const menu = dropdown.querySelector('.mega-menu');
    const arrow = dropdown.querySelector('.dropdown-arrow');
    
    // فتح/إغلاق عند التمرير
    dropdown.addEventListener('mouseenter', () => {
        menu.style.display = 'block';
        arrow.style.transform = 'rotate(180deg)';
    });
    
    dropdown.addEventListener('mouseleave', () => {
        menu.style.display = 'none';
        arrow.style.transform = 'rotate(0deg)';
    });
    
    // إغلاق عند النقر خارج القائمة
    document.addEventListener('click', (e) => {
        if (!dropdown.contains(e.target)) {
            menu.style.display = 'none';
            arrow.style.transform = 'rotate(0deg)';
        }
    });
});

// تأثير عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    const catalogueItem = document.querySelector('.catalogue-dropdown');
    catalogueItem.style.animation = 'pulse 2s infinite';
    
    setTimeout(() => {
        catalogueItem.style.animation = '';
    }, 2000);
});

async function loadProducts() {
    const response = await fetch('http://localhost:3000/api/products');
    const products = await response.json();
    
    const container = document.getElementById('products-container');
    
    products.forEach(product => {
        container.innerHTML += `
            <div class="product-card">
                <div class="product-img">
                    <img src="${product.image_path}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <p class="p-category">${product.category}</p>
                    <h3 class="p-title">${product.name}</h3>
                    <p class="p-price">${product.price} MAD</p>
                </div>
            </div>
        `;
    });
}
loadProducts();





