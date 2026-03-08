
# SwiftMatch Launch Runbook (White-Label Guide)

Этот документ описывает процесс развертывания полной копии приложения SwiftMatch в новом регионе или под новым брендом менее чем за 1 час.

---

### 1. Настройка Инфраструктуры (Firebase)
1. **Создайте проект:** Перейдите в [Firebase Console](https://console.firebase.google.com/) и создайте новый проект.
2. **Включите Authentication:** Активируйте вход через Google и Email/Password.
3. **Создайте Firestore:** Выберите ближайший к вашему региону дата-центр. Примените правила безопасности из файла `firestore.rules`.
4. **App Hosting:** Подключите свой GitHub репозиторий в разделе App Hosting для автоматического CI/CD.

### 2. Ключи и Конфигурация
Замените значения в файле `src/firebase/config.ts` на данные вашего нового проекта (API Key, Project ID и т.д.).

### 3. Мозг приложения (AI)
1. **Gemini API:** Получите ключ в [Google AI Studio](https://aistudio.google.com/).
2. **DeepSeek (Опционально):** Если планируете использовать DeepSeek, добавьте `DEEPSEEK_API_KEY` в переменные окружения на хостинге.
3. В файле `src/ai/genkit.ts` убедитесь, что модель соответствует вашему региону.

### 4. Монетизация (Ads)
1. **AdMob:** Создайте новые ID рекламных блоков для Google AdMob.
2. **Yandex Ads:** Если работаете в СНГ, настройте ID блоков в РСЯ.
3. Вставьте полученные ID в админ-панели в разделе **«Монетизация»**.

### 5. Юридическая подготовка
1. Откройте `src/app/legal/privacy/page.tsx` и `terms/page.tsx`.
2. Замените плейсхолдеры (название компании, контактный email) на реальные данные вашего юрлица.

### 6. Запуск
Выполните `npm run build` и пуш в ветку `main`. Firebase автоматически соберет и опубликует ваше приложение по адресу `https://your-new-app.web.app`.

---

**SwiftMatch Team** | *White-Label Readiness Certified*
