// Обработчик для ссылок меню: открывает внешние страницы в текущем окне
document.addEventListener('DOMContentLoaded', function () {
	// Универсальный обработчик для всех ссылок .meal-link
	document.querySelectorAll('.meal-link').forEach(link => {
		link.addEventListener('click', function (event) {
			event.preventDefault();
			const url = this.getAttribute('href').trim();
			// Открываем локальный файл, если он указан (например holidays.htm),
			// иначе открываем внешнюю ссылку в том же окне.
			window.location.href = url;
		});
	});

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
		// Open local holidays page
		window.location.href = 'holidays.htm';
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
