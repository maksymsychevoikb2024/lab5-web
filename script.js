// 1. Зберігання даних про ОС та браузер у localStorage
const browserInfo = navigator.userAgent;
localStorage.setItem('os_browser_info', browserInfo);

document.getElementById('footer-info').textContent = "Ваша система: " + localStorage.getItem('os_browser_info');

// 2. Отримання коментарів із сервера
fetch('https://jsonplaceholder.typicode.com/posts/9/comments')
    .then(response => response.json())
    .then(comments => {
        const container = document.getElementById('comments-container');
        container.innerHTML = ""; // Очищаємо текст "Завантаження..."
        
        // Відображаємо коментарі по черзі
        comments.forEach(comment => {
            const div = document.createElement('div');
            div.className = 'comment-box';
            div.innerHTML = `<h4>${comment.name} (${comment.email})</h4><p>${comment.body}</p>`;
            container.appendChild(div);
        });
    })
    .catch(error => console.error('Помилка завантаження коментарів:', error));

// 3. Форма зворотного зв'язку
const modal = document.getElementById('feedback-modal');
const closeModal = document.getElementById('close-modal');

// Показуємо форму через 1 хвилину (60000 мілісекунд)
setTimeout(() => {
    modal.style.display = 'flex';
}, 60000);

// Закриття форми на хрестик
closeModal.onclick = () => {
    modal.style.display = 'none';
};

// Закриття форми при кліку поза її межами (додатковий функціонал для зручності)
window.onclick = (event) => {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// 4. Перехід на нічний/денний режим
const themeToggleBtn = document.getElementById('theme-toggle');

// Автоматичне перемикання залежно від часу
const currentHour = new Date().getHours();
// Якщо час до 07:00 АБО після 21:00 — нічна тема
if (currentHour < 7 || currentHour >= 21) {
    document.body.classList.add('dark-theme');
}

// Кнопка для ручного перемикання теми
themeToggleBtn.onclick = () => {
    document.body.classList.toggle('dark-theme');
};