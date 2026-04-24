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
    }
}

window.addEventListener('scroll', animateProgress);
animateProgress();

// Секция портфолио

const projectsData = [
    {
        title: "Todo-лист на чистом JS",
        desc: "Мой первый рабочий проект. Добавление, удаление задач, сохранение в localStorage. Горжусь им!",
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
        desc: "Сделал сам, с нуля. Первый полноценный проект с адаптивом и тёмной темой.",
        tech: ["HTML/CSS", "JS"],
        link: "GitHub",
        linkHref: "https://github.com/ivanzsgirniy-ux/portfolio1",
        icon: "fas fa-heart"
    }
];

const projectsGrid = document.getElementById('projectsGrid');
if(projectsGrid) {
    projectsData.forEach(project => {
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
        projectsGrid.appendChild(card);
    });
}

// Формa

// НАСТРОЙКИ (замените на свои данные!)
const TELEGRAM_BOT_TOKEN = '8627657486:AAHH1zYlXhFiMSK6qUG-gjpCZiyr0WkVp_c';
const TELEGRAM_CHAT_ID = '1015432778';

const form = document.getElementById('contactForm');
const feedbackDiv = document.getElementById('formFeedback');

if(form) {
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const name = document.getElementById('userName').value.trim();
        const contacts = document.getElementById('userContacts').value.trim();
        const message = document.getElementById('userMessage').value.trim();
        
        if(!name || !contacts) {
            feedbackDiv.innerHTML = '<span style="color: #e94560;">❌ Пожалуйста, заполните имя и контактную информацию!</span>';
            return;
        }
        
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-pulse"></i> Отправка...';
        submitBtn.disabled = true;
        
        try {
            // Формируем сообщение для Телеграм
            const text = `📩 НОВОЕ СООБЩЕНИЕ С САЙТА!\n\n👤 Имя: ${name}\n📞 Контакты: ${contacts}\n💬 Сообщение: ${message || 'Не указано'}`;
            
            // Отправляем в Телеграм (без бэкенда!)
            const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: TELEGRAM_CHAT_ID,
                    text: text,
                    parse_mode: 'HTML'
                })
            });
            
            const result = await response.json();
            
            if(result.ok) {
                feedbackDiv.innerHTML = '<span style="color: #10b981;">✅ Сообщение отправлено! Я скоро свяжусь с вами 🤝</span>';
                form.reset();
            } else {
                feedbackDiv.innerHTML = '<span style="color: #e94560;">❌ Ошибка отправки. Попробуйте позже!</span>';
            }
        } catch (error) {
            console.error('Ошибка:', error);
            feedbackDiv.innerHTML = '<span style="color: #e94560;">❌ Ошибка отправки. Попробуйте позже или напишите напрямую в соцсети!</span>';
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            setTimeout(() => {
                feedbackDiv.innerHTML = '';
            }, 5000);
        }
    });
}

// футер
const yearSpan = document.getElementById('currentYear');
if(yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

// ===== ТЕМНАЯ ТЕМА =====
(function() {
    // Создаем кнопку переключения темы
    const themeToggle = document.createElement('div');
    themeToggle.className = 'theme-toggle';
    themeToggle.setAttribute('aria-label', 'Сменить тему');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    document.body.appendChild(themeToggle);
    
    const icon = themeToggle.querySelector('i');
    
    // Функция установки темы
    function setTheme(theme) {
        if (theme === 'dark') {
            document.body.classList.add('dark-mode');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            document.body.classList.remove('dark-mode');
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
        localStorage.setItem('portfolioTheme', theme);
    }
    
    // Проверяем сохраненную тему
    const savedTheme = localStorage.getItem('portfolioTheme');
    if (savedTheme === 'dark') {
        setTheme('dark');
    } else {
        setTheme('light');
    }
    
    // Обработчик клика по кнопке
    themeToggle.addEventListener('click', () => {
        if (document.body.classList.contains('dark-mode')) {
            setTheme('light');
        } else {
            setTheme('dark');
        }
    });
})();