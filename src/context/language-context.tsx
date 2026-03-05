
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'RU' | 'EN';

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  RU: {
    // Bottom Nav
    'nav.home': 'Главная',
    'nav.swipes': 'Свайпы',
    'nav.activity': 'Активность',
    'nav.chats': 'Чаты',
    'nav.profile': 'Профиль',
    // Common Buttons
    'button.continue': 'Продолжить',
    'button.skip': 'Пропустить',
    'button.save': 'Сохранить',
    'button.back': 'Назад',
    'button.like': 'Лайк',
    'button.message': 'Сообщение',
    'button.send': 'Отправить',
    'button.search': 'Поиск',
    'button.filters': 'Фильтры',
    'button.autosearch': 'Автопоиск',
    'button.load_more': 'Показать еще',
    'button.start': 'Начать знакомства',
    'button.write_first': 'Написать первым',
    'button.close': 'Закрыть',
    // Profile
    'profile.edit': 'Изменить',
    'profile.about': 'О себе',
    'profile.lifestyle': 'Стиль жизни',
    'profile.interests': 'Интересы',
    'profile.gallery': 'Галерея',
    'profile.add': 'Добавить',
    'profile.likes': 'Лайков',
    'profile.matches': 'Мэтчей',
    'profile.city': 'Москва',
    'profile.goal': 'Цель',
    'profile.goal_value': 'Серьезные отношения',
    'profile.height': 'Рост',
    'profile.pro': 'PRO 💎',
    // Edit Profile
    'edit.title': 'Изменить профиль',
    'edit.main_data': 'Основные данные',
    'edit.name': 'Имя',
    'edit.age': 'Возраст',
    'edit.save': 'Сохранить',
    'edit.ai_improve': 'AI Улучшить',
    // Home / Search
    'home.popular': 'Популярное сейчас',
    'home.headline': 'Твой идеальный мэтч ждет тебя',
    'home.subheadline': 'Знакомься, общайся и находи любовь',
    'home.top_week': 'Топ недели',
    'home.recommend': 'Рекомендуем',
    'home.nearby': 'Рядом',
    'home.searching': 'Ищем лучших для вас...',
    'home.results': 'Результаты',
    'home.no_results': 'По вашим параметрам пока никого нет.',
    'match.title': 'Это совпадение!',
    'match.desc': 'Вы понравились друг другу. Не заставляйте ждать!',
    'match.insight': 'AI Инсайт',
  },
  EN: {
    // Bottom Nav
    'nav.home': 'Home',
    'nav.swipes': 'Swipes',
    'nav.activity': 'Activity',
    'nav.chats': 'Chats',
    'nav.profile': 'Profile',
    // Common Buttons
    'button.continue': 'Continue',
    'button.skip': 'Skip',
    'button.save': 'Save',
    'button.back': 'Back',
    'button.like': 'Like',
    'button.message': 'Message',
    'button.send': 'Send',
    'button.search': 'Search',
    'button.filters': 'Filters',
    'button.autosearch': 'Auto-search',
    'button.load_more': 'Load more',
    'button.start': 'Start dating',
    'button.write_first': 'Write first',
    'button.close': 'Close',
    // Profile
    'profile.edit': 'Edit',
    'profile.about': 'About Me',
    'profile.lifestyle': 'Lifestyle',
    'profile.interests': 'Interests',
    'profile.gallery': 'Gallery',
    'profile.add': 'Add',
    'profile.likes': 'Likes',
    'profile.matches': 'Matches',
    'profile.city': 'Moscow',
    'profile.goal': 'Goal',
    'profile.goal_value': 'Serious relationship',
    'profile.height': 'Height',
    'profile.pro': 'PRO 💎',
    // Edit Profile
    'edit.title': 'Edit Profile',
    'edit.main_data': 'Main Info',
    'edit.name': 'Name',
    'edit.age': 'Age',
    'edit.save': 'Save Changes',
    'edit.ai_improve': 'AI Improve',
    // Home / Search
    'home.popular': 'Popular now',
    'home.headline': 'Your ideal match is waiting',
    'home.subheadline': 'Meet, chat and find love',
    'home.top_week': 'Top of the week',
    'home.recommend': 'Recommended',
    'home.nearby': 'Nearby',
    'home.searching': 'Searching for the best...',
    'home.results': 'Results',
    'home.no_results': 'No one found with these parameters.',
    'match.title': 'It\'s a Match!',
    'match.desc': 'You liked each other. Don\'t keep them waiting!',
    'match.insight': 'AI Insight',
  }
};

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('RU');

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('app_lang', lang);
  };

  useEffect(() => {
    const savedLang = localStorage.getItem('app_lang') as Language;
    if (savedLang) setLanguageState(savedLang);
  }, []);

  const t = (key: string) => {
    return translations[language][key as keyof typeof translations['RU']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
