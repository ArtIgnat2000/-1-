'use strict';

/* Общий скрипт для всех страниц: index.htm, meal.htm, holidays.htm */

var DAYS = [
    { key: 'pn', name: 'Понедельник' },
    { key: 'vt', name: 'Вторник' },
    { key: 'sr', name: 'Среда' },
    { key: 'cht', name: 'Четверг' },
    { key: 'pt', name: 'Пятница' }
];

/* Запасное расписание 2 «В» (используется, если schedule.json
   недоступен — например, при открытии файла двойным кликом) */
var SCHEDULE_FALLBACK = {
    pn: [
        ['1', '8:30–9:10', '🫠 Скоро здесь будет название урока!'],
        ['2', '9:30–10:10', '🫠 Скоро здесь будет название урока!'],
        ['3', '10:30–11:10', '🫠 Скоро здесь будет название урока!'],
        ['4', '11:20–12:00', '🫠 Скоро здесь будет название урока!'],
        ['5', '12:10–12:50', '🫠 Скоро здесь будет название урока!'],
        ['6', '13:10–13:50', '🫠 Скоро здесь будет название урока!'],
        ['7', '14:00–14:40', '🫠 Скоро здесь будет название урока!'],
        ['8', '14:50–15:30', '🫠 Скоро здесь будет название урока!']
    ],
    vt: [
        ['1', '8:30–9:10', '🫠 Скоро здесь будет название урока!'],
        ['2', '9:30–10:10', '🫠 Скоро здесь будет название урока!'],
        ['3', '10:30–11:10', '🫠 Скоро здесь будет название урока!'],
        ['4', '11:20–12:00', '🫠 Скоро здесь будет название урока!'],
        ['5', '12:10–12:50', '🫠 Скоро здесь будет название урока!'],
        ['6', '13:10–13:50', '🫠 Скоро здесь будет название урока!'],
        ['7', '14:00–14:40', '🫠 Скоро здесь будет название урока!'],
        ['8', '14:50–15:30', '🫠 Скоро здесь будет название урока!']
    ],
    sr: [
        ['1', '8:30–9:10', '🫠 Скоро здесь будет название урока!'],
        ['2', '9:30–10:10', '🫠 Скоро здесь будет название урока!'],
        ['3', '10:30–11:10', '🫠 Скоро здесь будет название урока!'],
        ['4', '11:20–12:00', '🫠 Скоро здесь будет название урока!'],
        ['5', '12:10–12:50', '🫠 Скоро здесь будет название урока!'],
        ['6', '13:10–13:50', '🫠 Скоро здесь будет название урока!'],
        ['7', '14:00–14:40', '🫠 Скоро здесь будет название урока!'],
        ['8', '14:50–15:30', '🫠 Скоро здесь будет название урока!']
    ],
    cht: [
        ['1', '8:30–9:10', '🫠 Скоро здесь будет название урока!'],
        ['2', '9:30–10:10', '🫠 Скоро здесь будет название урока!'],
        ['3', '10:30–11:10', '🫠 Скоро здесь будет название урока!'],
        ['4', '11:20–12:00', '🫠 Скоро здесь будет название урока!'],
        ['5', '12:10–12:50', '🫠 Скоро здесь будет название урока!'],
        ['6', '13:10–13:50', '🫠 Скоро здесь будет название урока!'],
        ['7', '14:00–14:40', '🫠 Скоро здесь будет название урока!'],
        ['8', '14:50–15:30', '🫠 Скоро здесь будет название урока!']
    ],
    pt: [
        ['1', '8:30–9:10', '🫠 Скоро здесь будет название урока!'],
        ['2', '9:30–10:10', '🫠 Скоро здесь будет название урока!'],
        ['3', '10:30–11:10', '🫠 Скоро здесь будет название урока!'],
        ['4', '11:20–12:00', '🫠 Скоро здесь будет название урока!'],
        ['5', '12:10–12:50', '🫠 Скоро здесь будет название урока!'],
        ['6', '13:10–13:50', '🫠 Скоро здесь будет название урока!'],
        ['7', '14:00–14:40', '🫠 Скоро здесь будет название урока!'],
        ['8', '14:50–15:30', '🫠 Скоро здесь будет название урока!']
    ]
};

/* Пиктограммы-смайлики: фолбэк, если в schedule.json у урока нет эмодзи */
var SUBJECT_EMOJI = [
    { test: /матем/i,        emoji: '🧮' },
    { test: /рус/i,          emoji: '📖' },
    { test: /окр/i,          emoji: '🌍' },
    { test: /чтение|чт\b|литер/i, emoji: '📚' },
    { test: /музык/i,        emoji: '🎵' },
    { test: /физ/i,          emoji: '🏃' },
    { test: /изо/i,          emoji: '🎨' },
    { test: /технолог/i,     emoji: '🔧' },
    { test: /информ|ит\b/i,  emoji: '💻' },
    { test: /анг/i,          emoji: '🌐' },
    { test: /класс/i,        emoji: '👩‍🏫' },
    { test: /игр/i,          emoji: '🎮' },
    { test: /бассейн/i,      emoji: '🏊' },
    { test: /сп$/i,          emoji: '📝' },
    { test: /прогулк/i,      emoji: '🌳' }
];
var EMOJI_POOL = ['✏️', '📘', '🎯', '🧩', '🗺️', '🗓️'];

var EMOJI_HEAD = new RegExp('^(?:[\\p{Extended_Pictographic}\\u200D\\uFE0F]+)', 'u');

function extractEmoji(text) {
    var m = String(text).match(EMOJI_HEAD);
    return m ? m[0] : '';
}

function stripEmoji(text) {
    return String(text).replace(EMOJI_HEAD, '').trim();
}

function emojiFor(raw, index) {
    var fromText = extractEmoji(raw);
    if (fromText) return fromText;
    for (var i = 0; i < SUBJECT_EMOJI.length; i++) {
        if (SUBJECT_EMOJI[i].test.test(raw)) return SUBJECT_EMOJI[i].emoji;
    }
    return EMOJI_POOL[index % EMOJI_POOL.length];
}

function lessonRow(lesson, index) {
    var num = lesson[0];
    var time = lesson[1];
    var raw = String(lesson[2] || '');
    var emoji = emojiFor(raw, index);
    var name = stripEmoji(raw) || raw;
    var isWalk = /прогулк/i.test(raw);

    var right = isWalk ? '<span class="walk-tag">Перемена</span>' : '<span class="chev">›</span>';

    return '<div class="lesson' + (isWalk ? ' walk' : '') + '" style="--i:' + index + '">' +
        '<div class="tile">' + num + '</div>' +
        '<div class="picto" aria-hidden="true">' + emoji + '</div>' +
        '<div class="info"><div class="name">' + name + '</div><div class="time">' + time + '</div></div>' +
        right +
        '</div>';
}

function renderSchedule(schedule) {
    DAYS.forEach(function (day) {
        var box = document.getElementById(day.key);
        if (!box) return;
        var lessons = schedule[day.key];
        if (!lessons || lessons.length === 0) {
            box.innerHTML = '<p class="empty">Нет уроков</p>';
            return;
        }
        box.innerHTML = lessons.map(function (lesson, i) { return lessonRow(lesson, i); }).join('');
    });
}

function todayKey() {
    var d = new Date().getDay(); // 1 = Пн ... 5 = Пт
    return (d >= 1 && d <= 5) ? DAYS[d - 1].key : null;
}

function moveIndicator() {
    var seg = document.querySelector('.segmented');
    if (!seg) return;
    var ind = seg.querySelector('.seg-indicator');
    var btn = seg.querySelector('.seg.active');
    if (!ind || !btn) return;
    ind.style.width = btn.offsetWidth + 'px';
    ind.style.left = btn.offsetLeft + 'px';
}

function showDay(key) {
    var info = null;
    for (var i = 0; i < DAYS.length; i++) {
        if (DAYS[i].key === key) info = DAYS[i];
    }
    if (!info) info = DAYS[0];
    document.getElementById('dayTitle').textContent = info.name;
    document.getElementById('todayChip').classList.toggle('show', key === todayKey());
    document.querySelectorAll('.seg').forEach(function (btn) {
        var on = btn.getAttribute('data-day') === key;
        btn.classList.toggle('active', on);
        btn.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    document.querySelectorAll('.schedule').forEach(function (s) {
        s.classList.toggle('show', s.id === key);
    });
    moveIndicator();
}

function showError(message) {
    var el = document.getElementById('errorMsg');
    if (!el) return;
    el.textContent = '⚠️ ' + message;
    el.classList.add('show');
}

function loadSchedule() {
    // Страница расписания есть только в index.htm
    if (!document.querySelector('.segmented')) return;

    fetch('schedule.json', { cache: 'no-cache' })
        .then(function (response) {
            if (!response.ok) throw new Error('Файл schedule.json не найден');
            return response.json();
        })
        .then(function (schedule) {
            renderSchedule(schedule);
            showDay(todayKey() || 'pn');
        })
        .catch(function () {
            // file:// или нет файла — показываем встроенное расписание
            renderSchedule(SCHEDULE_FALLBACK);
            showDay(todayKey() || 'pn');
        });
}

/* ============================================================
   Страница питания (meal.htm) — только приёмы пищи 2 «В»
   ============================================================ */
var MEALS = [
    { group: 'breakfast', num: '1', emoji: '🥣', name: 'Завтрак', start: '11:00', end: '11:25' },
    { group: 'lunch',     num: '2', emoji: '🍲', name: 'Обед',    start: '14:40', end: '15:05' },
    { group: 'snack',     num: '3', emoji: '🍎', name: 'Полдник', start: '16:00', end: '16:20' }
];

var MEAL_TABS = [
    { key: 'all',       title: 'Все приёмы пищи' },
    { key: 'breakfast', title: 'Завтрак' },
    { key: 'lunch',     title: 'Обед' },
    { key: 'snack',     title: 'Полдник' }
];

function toMin(t) {
    var p = t.split(':');
    return parseInt(p[0], 10) * 60 + parseInt(p[1], 10);
}

function nowMin() {
    var d = new Date();
    return d.getHours() * 60 + d.getMinutes();
}

function mealState(meal) {
    var n = nowMin();
    if (n >= toMin(meal.start) && n < toMin(meal.end)) return 'now';
    if (n >= toMin(meal.end)) return 'done';
    return '';
}

function mealRow(meal, index) {
    var st = mealState(meal);
    var right = st === 'now'
        ? '<span class="now-tag">Идёт</span>'
        : '<span class="chev">›</span>';
    return '<div class="lesson ' + st + '" style="--i:' + index + '">' +
        '<div class="tile">' + meal.num + '</div>' +
        '<div class="picto" aria-hidden="true">' + meal.emoji + '</div>' +
        '<div class="info"><div class="name">' + meal.name + '</div>' +
        '<div class="time">' + meal.start + '–' + meal.end + '</div></div>' +
        right +
        '</div>';
}

function renderMeals(tab) {
    var list = tab === 'all' ? MEALS : MEALS.filter(function (m) { return m.group === tab; });
    var box = document.getElementById('meals');
    if (!box) return;
    box.innerHTML = list.length
        ? list.map(function (m, i) { return mealRow(m, i); }).join('')
        : '<p class="empty">Нет приёмов пищи</p>';
    var chip = document.getElementById('nowChip');
    if (chip) {
        var hasNow = list.some(function (m) { return mealState(m) === 'now'; });
        chip.classList.toggle('show', hasNow);
    }
}

function showMealTab(key) {
    var info = null;
    for (var i = 0; i < MEAL_TABS.length; i++) {
        if (MEAL_TABS[i].key === key) info = MEAL_TABS[i];
    }
    if (!info) info = MEAL_TABS[0];
    document.getElementById('tabTitle').textContent = info.title;
    document.querySelectorAll('.seg').forEach(function (btn) {
        var on = btn.getAttribute('data-tab') === key;
        btn.classList.toggle('active', on);
        btn.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    renderMeals(key);
    moveIndicator();
}

function initMealPage() {
    document.querySelectorAll('.seg').forEach(function (btn) {
        btn.addEventListener('click', function () { showMealTab(btn.getAttribute('data-tab')); });
    });
    showMealTab('all');
    // Обновляем подсветку «Идёт сейчас» каждую минуту
    setInterval(function () {
        var active = document.querySelector('.seg.active');
        renderMeals(active ? active.getAttribute('data-tab') : 'all');
    }, 60000);
}

/* Инициализация страницы расписания (index.htm) */
function initSchedulePage() {
    // Подсветка «сегодня» в сегментах
    var today = todayKey();
    if (today) {
        var todayBtn = document.querySelector('.seg[data-day="' + today + '"]');
        if (todayBtn) todayBtn.classList.add('today');
    }

    // Переключение дней
    document.querySelectorAll('.seg').forEach(function (btn) {
        btn.addEventListener('click', function () { showDay(btn.getAttribute('data-day')); });
    });

    loadSchedule();
}

/* Дата в шапке (есть на всех страницах) */
function initHeroDate() {
    var el = document.getElementById('heroDate');
    if (!el) return;
    var text = new Intl.DateTimeFormat('ru-RU', { weekday: 'long', day: 'numeric', month: 'long' })
        .format(new Date());
    el.textContent = text.charAt(0).toUpperCase() + text.slice(1);
}

/* Подсветка сегодняшнего дня в календаре каникул */
function initHolidaysToday() {
    var grid = document.querySelector('.months-grid');
    if (!grid) return;
    var now = new Date();
    var iso = now.getFullYear() + '-' +
        String(now.getMonth() + 1).padStart(2, '0') + '-' +
        String(now.getDate()).padStart(2, '0');
    grid.querySelectorAll('.cal-day.today').forEach(function (d) { d.classList.remove('today'); });
    var cell = grid.querySelector('.cal-day[data-date="' + iso + '"]');
    if (cell) {
        cell.classList.add('today');
        cell.setAttribute('title', 'Сегодня');
    }
}

document.addEventListener('DOMContentLoaded', function () {
    initHeroDate();
    initHolidaysToday();

    if (document.getElementById('dayTitle')) {
        initSchedulePage();          // index.htm
    } else if (document.getElementById('meals')) {
        initMealPage();              // meal.htm
    }

    window.addEventListener('resize', moveIndicator);

    // Если расписания нет на странице (еда/каникулы) — индикатор не нужен,
    // но шрифты могут подгрузиться позже: обновим на всякий случай.
    window.addEventListener('load', moveIndicator);
});
