# XSS-Scanner (учебный)

Этот скрипт перебирает XSS-пэйлоады и тестирует параметры URL на отражённую XSS-уязвимость.

## Как использовать

1. Создай проект: 
mkdir xss-scanner
cd xss-scanner
npm init -y
npm install node-fetch@2
2. Настрой цель:
Замени URL в target='' на адрес своего сайта.
Убедись что в URL есть параметры ?name=что-то&msg=что-то.
3. node xss-scanner -для использования скрипта.

## Поддержать проект
https://www.donationalerts.com/r/techjacket_1022 
