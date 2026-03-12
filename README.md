# Password Generator CLI (Node.js)

CLI‑скрипт для генерации случайных паролей заданной длины (по умолчанию 8) из:

- заглавных/строчных букв
- цифр
- символов

Генерация делается криптографически стойким источником случайности через модуль `crypto`.

## Требования

- Node.js (рекомендуется 16+)

## Запуск

Из корня проекта:

```bash
node index.js
```

Или указать длину:

```bash
node index.js 16
```

## Использование как executable

Файл `index.js` содержит shebang, поэтому в Unix/macOS его можно запускать напрямую (после выставления прав):

```bash
chmod +x index.js
./index.js 24
```

В Windows используйте запуск через `node`:

```powershell
node .\index.js 24
```

## Примеры

```bash
node index.js
node index.js 12
node index.js 64
node index.js --help
```