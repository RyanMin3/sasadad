document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('jobs-container');
    const resetBtn = document.getElementById('reset-btn');
    const restoreBtn = document.getElementById('restore-btn');
    const deletedCards = []; // Історія видалених карток

    container.addEventListener('click', (event) => {
        // 1. Клік по червоній кнопці фільтрації
        const filterBtn = event.target.closest('.badge-btn');
        if (filterBtn) {
            const selectedFilter = filterBtn.getAttribute('data-filter');
            const allCards = container.querySelectorAll('.job-card');

            allCards.forEach(card => {
                // Не показуємо картки, які користувач вже видалив
                if (deletedCards.includes(card)) return;

                if (card.getAttribute('data-type') === selectedFilter) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });

            resetBtn.style.display = 'inline-block';
            return;
        }

        // 2. Клік по самій картці — приховуємо її і запам'ятовуємо
        const card = event.target.closest('.job-card');
        if (card) {
            card.classList.add('fade-out');
            setTimeout(() => {
                card.style.display = 'none';
                deletedCards.push(card);
                restoreBtn.style.display = 'block'; // Показуємо кнопку справа знизу
            }, 400);
        }
    });

    // 3. Повернення останньої видаленої картки (кнопка справа знизу)
    restoreBtn.addEventListener('click', () => {
        if (deletedCards.length > 0) {
            const lastCard = deletedCards.pop();
            lastCard.style.display = 'flex';
            
            setTimeout(() => {
                lastCard.classList.remove('fade-out');
            }, 10);
        }

        // Якщо повернули всі картки — ховаємо кнопку
        if (deletedCards.length === 0) {
            restoreBtn.style.display = 'none';
        }
    });

    // 4. Кнопка "Показати всі вакансії" (скидання фільтра)
    resetBtn.addEventListener('click', () => {
        const allCards = container.querySelectorAll('.job-card');
        allCards.forEach(card => {
            if (!deletedCards.includes(card)) {
                card.style.display = 'flex';
            }
        });
        resetBtn.style.display = 'none';
    });
});