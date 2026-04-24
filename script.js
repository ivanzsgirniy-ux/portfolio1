// Шкала скилов
const progressBars = document.querySelectorAll('.progress');
let animated = false;

function animateProgress() {
    if(animated) return;
    const aboutSection = document.getElementById('about');
    if(!aboutSection) return;
    const rect = aboutSection.getBoundingClientRect();
    if(rect.top < window.innerHeight - 100) {
        progressBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        });
        animated = true;
        window.removeEventListener('scroll', animateProgress); 
    }
}

window.addEventListener('scroll', animateProgress);
animateProgress();

// Секция портфолио
const projectsData = [
    {
        title: "Todo-лист на чистом JS",
        desc: "Мой первый рабочий проект. Добавление, удаление задач, сохранение в localStorage.",
        tech: ["HTML", "CSS", "JS"],
        link: "GitHub",
        linkHref: "https://github.com/ivanzsgirniy-ux/ToDo-List",
        icon: "fas fa-check-square"
    },
    {
        title: "Калькулятор",
        desc: "Простой калькулятор с базовыми операциями.",
        tech: ["JS", "CSS Grid"],
        link: "GitHub",
        linkHref: "https://github.com/ivanzsgirniy-ux/calculator",
        icon: "fas fa-calculator"
    },
    {
        title: "Погодное приложение",
        desc: "Использую API Open-Meteo.",
        tech: ["Fetch API", "Async/JS"],
        link: "GitHub",
        linkHref: "https://github.com/ivanzsgirniy-ux/weatherApp",
        icon: "fas fa-cloud-sun"
    },
    {
        title: "Сайт-визитка (этот сайт)",
        desc: "Адаптив под мобильные устройства и планшеты, темная тема и рабочая форма обратной связи",
        tech: ["HTML/CSS", "JS", "Async/JS", "Fetch API"],
        link: "GitHub",
        linkHref: "https://github.com/ivanzsgirniy-ux/portfolio1",
        icon: "fas fa-heart"
    }
];

// Функция создания карточки проекта
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    
    card.innerHTML = `
        <div class="project-img">
            <i class="${project.icon}"></i>
        </div>
        <div class="project-content">
            <h3 class="project-title">${project.title}</h3>
            <p class="project-desc">${project.desc}</p>
            <a class="project-link" href="${project.linkHref}" target="_blank">${project.link}</a>
            <div class="project-tech">
                ${project.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
            </div>
        </div>
    `;
    
    return card;
}

// Рендер в десктопный грид
const projectsGridDesktop = document.getElementById('projectsGridDesktop');
if(projectsGridDesktop) {
    projectsData.forEach(project => {
        projectsGridDesktop.appendChild(createProjectCard(project));
    });
}

// Рендер в мобильный слайдер
const swiperWrapper = document.getElementById('swiperWrapper');
if(swiperWrapper) {
    projectsData.forEach(project => {
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';
        slide.appendChild(createProjectCard(project));
        swiperWrapper.appendChild(slide);
    });
    
    // Инициализация Swiper
    new Swiper('.mobile-slider', {
        slidesPerView: 1,
        spaceBetween: 20,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        breakpoints: {
            // Планшеты (между 577px и 768px)
            577: {
                slidesPerView: 1.2,
                spaceBetween: 20
            },
            // Телефоны (до 576px)
            0: {
                slidesPerView: 1,
                spaceBetween: 15
            }
        },
        // Плавная прокрутка
        speed: 400,
        // Автовысота (подстраивается под содержимое)
        autoHeight: false,
        // Блокировка свайпа, если тянем от края (чтобы не мешать скроллу страницы)
        touchStartPreventDefault: false,
        // Приятный эффект
        grabCursor: true
    });
}

// Функция выравнивания карточек
function equalizeCardHeights() {
    const slides = document.querySelectorAll('.swiper-slide');
    if (slides.length === 0) return;
    
    let maxHeight = 0;
    
    // Сначала сбрасываем высоту
    slides.forEach(slide => {
        const card = slide.querySelector('.project-card');
        if (card) {
            card.style.height = 'auto';
        }
    });
    
    // Находим максимальную высоту
    slides.forEach(slide => {
        const card = slide.querySelector('.project-card');
        if (card) {
            const height = card.offsetHeight;
            maxHeight = Math.max(maxHeight, height);
        }
    });
    
    // Устанавливаем одинаковую высоту
    slides.forEach(slide => {
        const card = slide.querySelector('.project-card');
        if (card) {
            card.style.height = maxHeight + 'px';
        }
    });
}

// Запускаем после загрузки
window.addEventListener('load', equalizeCardHeights);
// Запускаем после изменения ориентации экрана
window.addEventListener('resize', equalizeCardHeights);
// Для Swiper — после смены слайда (если нужно)
// Для Swiper — после смены слайда (выравниваем высоту карточек)
if (typeof Swiper !== 'undefined') {
    const swiperInstance = document.querySelector('.mobile-slider')?.swiper;
    if (swiperInstance) {
        swiperInstance.on('slideChange', equalizeCardHeights);
    }
}

// ФОРМА СВЯЗИ (безопасно, через Vercel API)
const API_URL = 'https://telegram-bot-rose-psi.vercel.app/api/send';
const form = document.getElementById('contactForm');
const feedbackDiv = document.getElementById('formFeedback');

if(form) {
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const name = document.getElementById('userName').value.trim();
        const contacts = document.getElementById('userContacts').value.trim();
        const message = document.getElementById('userMessage').value.trim();
        
        if(!name || !contacts) {
            feedbackDiv.innerHTML = '<span style="color: #e94560;">❌ Заполните имя и контакты!</span>';
            return;
        }
        
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-pulse"></i> Отправка...';
        submitBtn.disabled = true;
        
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    name: name, 
                    contacts: contacts, 
                    message: message || '—' 
                })
            });
            
            const result = await response.json();
            
            if(result.success) {
                feedbackDiv.innerHTML = '<span style="color: #10b981;">✅ Сообщение отправлено! Я скоро свяжусь с вами 🤝</span>';
                form.reset();
            } else {
                throw new Error(result.error || 'Ошибка');
            }
        } catch (error) {
            console.error('Ошибка:', error);
            feedbackDiv.innerHTML = '<span style="color: #e94560;">❌ Ошибка отправки. Напишите мне напрямую в Telegram: @despamm</span>';
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            setTimeout(() => feedbackDiv.innerHTML = '', 5000);
        }
    });
}

// Футер
const yearSpan = document.getElementById('currentYear');
if(yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

// ТЕМНАЯ ТЕМА
(function() {
    // Используем существующую кнопку из HTML
    const themeToggle = document.getElementById('darkModeToggle');
    if (!themeToggle) {
        console.error('Кнопка переключения темы не найдена');
        return;
    }
    
    const icon = themeToggle.querySelector('i');
    
    function setTheme(theme) {
        if (theme === 'dark') {
            document.body.classList.add('dark-mode');
            if (icon) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            }
        } else {
            document.body.classList.remove('dark-mode');
            if (icon) {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        }
        localStorage.setItem('portfolioTheme', theme);
    }
    
    const savedTheme = localStorage.getItem('portfolioTheme');
    setTheme(savedTheme === 'dark' ? 'dark' : 'light');
    
    themeToggle.addEventListener('click', () => {
        const newTheme = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
        setTheme(newTheme);
    });
})();