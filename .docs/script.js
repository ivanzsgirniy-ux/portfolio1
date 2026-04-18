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
        link: "Ссылка на GitHub",
        icon: "fas fa-check-square"
    },
    {
        title: "Калькулятор",
        desc: "Простой калькулятор с базовыми операциями. Научился работать с eval (знаю, что небезопасно, но для учебки норм)",
        tech: ["JS", "CSS Grid"],
        link: "Ссылка на GitHub",
        icon: "fas fa-calculator"
    },
    {
        title: "Погодное приложение",
        desc: "Использую API openweathermap. Пока в разработке, но уже показывает температуру!",
        tech: ["Fetch API", "Async/JS"],
        link: "Ссылка на GitHub",
        icon: "fas fa-cloud-sun"
    },
    {
        title: "Сайт-визитка (этот сайт)",
        desc: "Сделал сам, с нуля. Первый полноценный проект с адаптивом и тёмной темой.",
        tech: ["HTML/CSS", "JS"],
        link: "Ссылка на GitHub",
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
                <a class="project-link" href="#" target="_blank">${project.link}</a>
                <div class="project-tech">
                    ${project.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
                </div>
            </div>
        `;
        projectsGrid.appendChild(card);
    });
}

// Формa

const form = document.getElementById('contactForm');
const feedbackDiv = document.getElementById('formFeedback');

if(form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('userName').value.trim();
        const email = document.getElementById('userContacts').value.trim(); // ⚠️ ВАЖНО: в вашей разметке id="userContacts", а не "userEmail"
        const message = document.getElementById('userMessage').value.trim();
        
        if(!name || !email) {
            feedbackDiv.innerHTML = '<span style="color: #e94560;">❌ Пожалуйста, заполните имя и контактуню информацию!</span>';
            return;
        }
        
        // Имитируем отправку
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-pulse"></i> Отправка...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            feedbackDiv.innerHTML = '<span style="color: #10b981;">✅ Спасибо! Я скоро свяжусь с вами. Обещаю! 🤝</span>';
            form.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            setTimeout(() => {
                feedbackDiv.innerHTML = '';
            }, 5000);
        }, 1500);
    });
}

// футер
const yearSpan = document.getElementById('currentYear');
if(yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}