# Структура макета RubyHome из Figma

## Основные секции

### 1. Header (Шапка)
- Logo (Vector SVG)
- Навигация: Home, Properties, About us, Reviews
- Кнопка "Contact us"

**Стили:**
- Home: Poppins 600, 16px, цвет #FE753F
- Остальные пункты: Poppins 500, 16px, цвет #030A1B, opacity 0.7
- Кнопка: фон #2E6EFF, текст #FFFFFF, border-radius 5px, padding 15px 30px

### 2. Hero (Главная секция)
- Заголовок: "Find the perfect place to stay with your family"
  - Poppins 600, 61px, line-height 1.2
- Подзаголовок: "Buying a home is a life-changing experience..."
  - Poppins 500, 18px, opacity 0.7
- Кнопка "Leave request"
- Фоновое изображение (border-radius 10px)

### 3. Popular Properties
- Заголовок: "Popular Properties"
  - Poppins 600, 44px
- Карточки недвижимости (6 штук):
  - Изображение (border-radius 10px вверху)
  - Название (Poppins 600, 22px)
  - Локация (Poppins 400, 16px, opacity 0.7)
  - Характеристики: 6 спален, 2 ванные, 3 парковочных места
  - Цена (Poppins 600, 22px, цвет #FE753F)
  - Кнопка "Leave request" (синяя)
  - Тень: 0px 8px 70px rgba(0, 0, 0, 0.07)

### 4. Our Partners
- Заголовок: "Our Partners"
  - Poppins 600, 44px
- Логотипы партнеров (8 изображений)

### 5. Property Featured
- Заголовок: "Property Featured"
  - Poppins 600, 44px
- Описание (Poppins 400, 16px, opacity 0.7)
- Фоновое изображение
- Карточки особенностей (6 штук):
  1. 100% Security
  2. Free air conditioner
  3. Flower garden
  4. Swimming pool
  5. Rental furniture
  6. Parkers & movers
  
  Каждая карточка:
  - Белый фон, border-radius 10px
  - Иконка в цветном круге (фон #FE753F, opacity 0.1)
  - Заголовок (Poppins 600, 22px)
  - Описание (Poppins 400, 16px, opacity 0.7)

### 6. Reviews
- Заголовок: "Our valuable customer says"
  - Poppins 600, 44px
- Подзаголовок: "REVIEWS"
  - Poppins 600, 16px, uppercase, letter-spacing 8%, цвет #FE753F
- Карточки отзывов (2 штуки):
  - Белый фон, border 2px rgba(254, 117, 63, 0.1), border-radius 10px
  - Текст отзыва (Poppins 400, 16px, opacity 0.7)
  - Имя (Poppins 600, 22px)
  - Должность (Poppins 400, 16px, opacity 0.7)
  - Аватар (круг)
  - Декоративные кавычки

### 7. CTA (Call to Action)
- Фон: #433E89, border-radius 10px
- Заголовок: "Get listed your home as a owner"
  - Poppins 500, 44px, цвет #FFFFFF, text-align center
- Описание (Poppins 400, 16px, цвет #FFFFFF, opacity 0.7)
- Форма подписки:
  - Поле ввода email (белый фон, border-radius 12px)
  - Placeholder: "Enter email address" (opacity 0.5)
  - Кнопка "Subscribe" (синяя #2E6EFF, border-radius 8px)
- Декоративные элементы (ellipses с opacity 0.1)

### 8. Footer
- Текст: "© 2025 RubyHome. All rights reserved"
  - DM Sans 400, 16px, opacity 0.7
- Фон: #F9F9F9

### 9. Leave Request Modal
- Overlay: rgba(0, 0, 0, 0.6) с blur(12px)
- Модальное окно (белый фон, border-radius 10px, padding 48px)
- Заголовок: "Leave a request\nLand we will call you soon"
  - Poppins 600, 28px
- Форма:
  - Поле "Enter name" (placeholder: "Example: Mark")
  - Поле "Enter phone" (placeholder: "+1")
  - Поле "Enter email address" (placeholder: "email@example.com")
  - Переключатель "I want to": Buy/Rent/Sell
  - Чекбокс "I agree to Privacy Policy"
  - Кнопка "Submit"
- Кнопка закрытия (крестик)

## Цветовая палитра

- **Primary Blue**: #2E6EFF
- **Orange**: #FE753F
- **Red/Accent**: #BF3448
- **White**: #FFFFFF
- **Light Gray**: #F9F9F9
- **Text Dark**: #030A1B
- **Border Gray**: #D8DCE5
- **Purple CTA**: #433E89

## Типографика

### Основной шрифт: Poppins
- Заголовки H1: 600, 61px (Hero)
- Заголовки H2: 600, 44px (Секции)
- Заголовки H3: 600, 22px (Карточки)
- Заголовки H4: 600, 28px (Модалка)
- Body Large: 500, 18px
- Body: 500/400, 16px
- Body Small: 400, 14px

### Второстепенный шрифт: DM Sans
- Footer: 400, 16px

## Компоненты для разработки

1. Header с навигацией
2. Hero секция с CTA
3. Карточка недвижимости (Property Card)
4. Карточка особенности (Feature Card)
5. Карточка отзыва (Review Card)
6. Форма подписки на email
7. Модальное окно формы запроса
8. Footer

## Изображения

В макете используются изображения через imageRef. Для получения изображений можно использовать Figma API или экспортировать их вручную из Figma.

## Особенности верстки

- Border-radius: 10px (основные элементы), 5px (кнопки), 12px (формы)
- Тени: 0px 8px 70px rgba(0, 0, 0, 0.07) для карточек
- Opacity для вторичного текста: 0.7
- Gap между элементами: 10px, 16px, 24px, 32px в зависимости от контекста

