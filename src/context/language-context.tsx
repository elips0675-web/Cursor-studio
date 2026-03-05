
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
    'button.unlock': 'Разблокировать бесплатно',
    'button.watch': 'Смотреть',
    'button.not_now': 'Не сейчас',
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
    'profile.someone': 'Кто-то',
    // Activity
    'activity.title': 'События',
    'activity.likes': 'Лайки',
    'activity.visits': 'Визиты',
    'activity.all': 'Все',
    'activity.new': 'новых',
    'activity.empty': 'Ничего не найдено',
    'activity.today_activity': 'Ваша активность сегодня',
    'activity.msg_like': 'поставила вам лайк',
    'activity.msg_visit': 'посетила ваш профиль',
    'activity.msg_match': 'новое совпадение с вами!',
    'activity.unlock_title': 'Бонус',
    'activity.unlock_desc': 'Посмотрите рекламу, чтобы открыть анкету бесплатно на 24 часа.',
    'activity.premium_title': 'Premium Доступ',
    'activity.premium_desc': 'Узнайте, кому вы понравились, и получите безлимитные лайки!',
    // Chats
    'chats.title': 'Сообщения',
    'chats.subtitle': 'Твои диалоги',
    'chats.search': 'Поиск по чатам...',
    'chats.online': 'В сети',
    'chats.offline': 'Был(а) недавно',
    'chats.today': 'Сегодня',
    'chats.typing': 'печатает...',
    'chats.ai_themes': 'Темы ответов AI',
    'chats.close_themes': 'Закрыть темы',
    'chats.placeholder': 'Ваше сообщение...',
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
    'swipes.nearby': 'анкет рядом',
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
    'button.unlock': 'Unlock for free',
    'button.watch': 'Watch',
    'button.not_now': 'Not now',
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
    'profile.someone': 'Someone',
    // Activity
    'activity.title': 'Activity',
    'activity.likes': 'Likes',
    'activity.visits': 'Visits',
    'activity.all': 'All',
    'activity.new': 'new',
    'activity.empty': 'Nothing found',
    'activity.today_activity': 'Your activity today',
    'activity.msg_like': 'liked you',
    'activity.msg_visit': 'visited your profile',
    'activity.msg_match': 'new match with you!',
    'activity.unlock_title': 'Bonus',
    'activity.unlock_desc': 'Watch an ad to unlock the profile for free for 24 hours.',
    'activity.premium_title': 'Premium Access',
    'activity.premium_desc': 'Find out who liked you and get unlimited likes!',
    // Chats
    'chats.title': 'Messages',
    'chats.subtitle': 'Your dialogs',
    'chats.search': 'Search chats...',
    'chats.online': 'Online',
    'chats.offline': 'Was recently',
    'chats.today': 'Today',
    'chats.typing': 'typing...',
    'chats.ai_themes': 'AI Reply Themes',
    'chats.close_themes': 'Close themes',
    'chats.placeholder': 'Your message...',
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
    'swipes.nearby': 'profiles nearby',
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
