// Функция для смены расписания по дням недели
document.addEventListener('DOMContentLoaded', function() {
    // Получаем все кнопки дней недели
    const buttons = document.querySelectorAll('.buttons button');
    // Получаем все расписания
    const schedules = document.querySelectorAll('.schedule');

    // Добавляем обработчик клика для каждой кнопки
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // Убираем активный класс у всех кнопок
            buttons.forEach(btn => btn.classList.remove('active'));
            
            // Добавляем активный класс к нажатой кнопке
            this.classList.add('active');
            
            // Скрываем все расписания
            schedules.forEach(schedule => schedule.classList.remove('show'));
            
            // Показываем расписание для выбранного дня
            const dayId = this.getAttribute('data-day');
            const targetSchedule = document.getElementById(dayId);
            if (targetSchedule) {
                targetSchedule.classList.add('show');
            }
        });
    });
});