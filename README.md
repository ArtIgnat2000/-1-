# Проект: Расписание 1 класса

Короткое руководство по проекту и локальному запуску.

## Структура

- `index.htm` — главная страница с расписанием (использует `style.css` и `script.js`).
- `holidays.htm` — страница с информацией о каникулах (также использует `style.css` и `script.js`).
- `style.css` — общий файл стилей для всех HTML-страниц.
- `script.js` — общий JavaScript: обработчики навигации и переключения расписания.
- `holidays.htm`, `index.htm` и другие `.htm` файлы должны подключать единые `style.css` и `script.js`.

## Локальный запуск

Простейший способ — открыть `index.htm` в браузере двойным кликом.

Для локального сервера (удобно для тестирования переходов и относительных путей):

1) Если у вас установлен Python 3, из корня проекта выполните:

```powershell
# из папки c:\Users\Artem\Documents\Sites\1 V class\-1-
python -m http.server 8000
```

2) В браузере откройте: `http://localhost:8000/index.htm`

## Изменения и примечания

- Все стили и скрипты вынесены в `style.css` и `script.js`, чтобы избежать дублирования между страницами.
- JS навешивает обработчики событий после загрузки DOM (используется `DOMContentLoaded`).
- Кнопки для переключения дней используют `data-day="..."`, а не inline `onclick`.

## Полезные команды Git

```powershell
# Добавить все изменения и закоммитить
git add -A
git commit -m "Your message"
# Отправить на origin/main
git push origin main
```

## Дальше

Если нужно, могу:
- Добавить короткую инструкцию по деплою на GitHub Pages.
- Добавить автоматическую проверку HTML/CSS (например, с помощью простого линтера).
- Перевести интерфейс на более доступный (ARIA) и семантический HTML.

---

Если нужно изменить формат README или добавить разделы — скажите, что именно добавить.

## Деплой на GitHub Pages

Ниже — два простых варианта публикации: ручной (через настройки репозитория) и автоматический (через GitHub Actions).

Вариант A — опубликовать сайт из ветки `main` (корень репозитория)

1. Перейдите в настройки репозитория на GitHub (Settings → Pages).
2. В разделе "Build and deployment" (или "Source" в старом интерфейсе) выберите Branch: `main` и Folder: `/ (root)`.
3. Нажмите "Save" (или "Save/Enable"). Через минуту-две GitHub Pages опубликует сайт. URL будет вида: `https://<username>.github.io/<repo>/` (для вашего репозитория это, вероятно, https://ArtIgnat2000.github.io/-1-/).

Вариант B — опубликовать сайт из ветки `gh-pages`

1. Создайте ветку `gh-pages` и запушьте в неё содержимое, которое вы хотите публиковать:

```powershell
# Создать ветку gh-pages на основе текущей main и запушить
git checkout -b gh-pages
git push -u origin gh-pages
```

2. В Settings → Pages выберите Branch: `gh-pages` и Folder: `/ (root)` и сохраните.

Вариант C — автоматический деплой через GitHub Actions (рекомендуется для автоматизации)

1. Создайте workflow файл `.github/workflows/gh-pages.yml` в репозитории. Пример минимального workflow, который публикует содержимое репозитория в `gh-pages` с помощью `peaceiris/actions-gh-pages`:

```yaml
name: GitHub Pages

on:
	push:
		branches: [ main ]

jobs:
	deploy:
		runs-on: ubuntu-latest
		steps:
			- uses: actions/checkout@v4
			- name: Deploy to GitHub Pages
				uses: peaceiris/actions-gh-pages@v3
				with:
					github_token: ${{ secrets.GITHUB_TOKEN }}
					publish_dir: ./
```

2. Закоммитьте этот файл и запушьте в `main`. После каждого пуша в `main` workflow будет запускаться и обновлять ветку `gh-pages` (или публиковать содержимое в Pages — см. документацию action для настроек).

Примечания:
- Если у вас репозиторий-страница пользователя (user/organization site), имя ветки и настройка будут отличаться (обычно используется ветка `main` или `gh-pages` в зависимости от типа сайта).
- Проверьте, чтобы на Pages не было конфликтов с приватностью репозитория и настройками доступа.

