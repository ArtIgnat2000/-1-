// Обработчик для ссылок меню: открывает внешние страницы в текущем окне
document.addEventListener('DOMContentLoaded', function () {
	const mealLink = document.querySelector('.meal-link[href*="meal-schedule"]');
	if (mealLink) {
		mealLink.addEventListener('click', function (event) {
			event.preventDefault();
			const url = this.getAttribute('href').trim();
			window.location.href = url;
		});
	}

	const holidayLink = document.querySelector('.meal-link[href*="RaspisCanicyl"]');
	if (holidayLink) {
		holidayLink.addEventListener('click', function (event) {
			event.preventDefault();
			const url = this.getAttribute('href').trim();
			window.location.href = url;
		});
	}
	// Навесим обработчики на кнопки дней (убираем inline onclick)
	document.querySelectorAll('.buttons button[data-day]').forEach(btn => {
		btn.addEventListener('click', function () {
			const day = this.getAttribute('data-day');
			showDay(day);
		});
	});
});

function showDay(day) {
	// Если нажата кнопка "Каникулы", открываем в текущем окне и выходим
	if (day === 'holidays') {
		window.location.href = 'https://artignat2000.github.io/RaspisCanicyl/';
		return;
	}

	document.querySelectorAll('.buttons button').forEach(btn => {
		btn.classList.remove('active');
	});
	// Убираем активный класс с кнопки "Каникулы"
	const holidayButton = document.querySelector('.buttons button:last-child');
	if (holidayButton && holidayButton.textContent.includes('Каникулы')) {
		holidayButton.classList.remove('active');
	}

	// Найдём кнопку по data-day и установим её активной
	const targetBtn = document.querySelector(`.buttons button[data-day="${day}"]`);
	if (targetBtn) targetBtn.classList.add('active');

	document.querySelectorAll('.schedule').forEach(schedule => {
		schedule.classList.remove('show');
	});

	const targetSchedule = document.getElementById(day);
	if (targetSchedule) {
		targetSchedule.classList.add('show');
	}
}

// Optional: expose showDay to global scope (already is, but ensure compatibility)
window.showDay = showDay;
