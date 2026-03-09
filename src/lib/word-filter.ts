const FORBIDDEN_WORD_ROOTS = [
  // Нецензурная лексика (Swear words)
  'хуй', 'пизд', 'ебан', 'бля', 'ебл', 'муд', 'сука', 'залуп', 'уеб',
  'fuck', 'cunt', 'shit', 'bitch', 'asshole', 'dick',

  // Оскорбления и Дискриминация (Insults & Discrimination)
  'мразь', 'урод', 'дебил', 'шлюх', 'ниггер', 'хохол', 'кацап', 'жид',
  'scum', 'freak', 'moron', 'slut', 'nigger', 

  // Призывы к насилию (Calls to violence)
  'уби', 'насил', 'террор', 'экстрем', 'расправ', 'взорв',
  'kill', 'murder', 'violen', 'terror', 'extremis', 'slaughter',

  // Политика (Politics)
  'политик', 'президент', 'правительств', 'выбор', 'митинг', 'оппозици', 'война',
  'politic', 'president', 'government', 'election', 'rally', 'opposition', 'war', 
  'навальн', 'путин', 'лукашенк', 'пересидент', 'зеленск', 'байден', 'трамп', 
  'сво', 'спецопераци', 'кремль', 'госдума', 'майдан',

  // Спам и Реклама (Spam & Ads)
  'http:', 'https:', 'www.', '.com', '.ru', '.net', '.org', 't.me', 'vk.com',
  'купи', 'продай', 'акция', 'скидк', 'заработ', 'казино', 'ставк', 'крипт',
  'buy', 'sell', 'promo', 'discount', 'earn', 'casino', 'bet', 'crypto',

  // Мошенничество (Scam)
  'бинарн', 'опцион', 'пирамид',
  'binary', 'option', 'pyramid',

  // Запрещенные товары и услуги (Forbidden goods & services)
  'нарко', 'оружи', 'проститут', 'порно',
  'drug', 'weapon', 'prostitut', 'porn',

  // Конкуренты (Competitors)
  'tinder', 'badoo', 'mamba', 'pure', 'тиндер', 'баду', 'мамба'
];

/**
 * Checks if the text contains forbidden words.
 */
export const containsForbiddenWords = (text: string): boolean => {
  const lowerCaseText = text.toLowerCase();
  for (const root of FORBIDDEN_WORD_ROOTS) {
    if (lowerCaseText.includes(root)) {
      return true;
    }
  }
  return false;
};

/**
 * Checks if the text is likely a nonsensical keyboard mash (gibberish).
 */
export const isGibberish = (text: string): boolean => {
  const normalized = text.toLowerCase();
  // Remove non-letter characters for ratio check
  const lettersOnly = normalized.replace(/[^a-zа-яё]/g, '');

  if (lettersOnly.length > 6) {
    const vowels = lettersOnly.match(/[aeiouyаеёиоуыэюя]/g);
    // If letters only but vowel count is extremely low (< 10%)
    if (!vowels || vowels.length < lettersOnly.length * 0.1) {
      return true;
    }
  }

  const words = normalized.split(/\s+/).filter(w => w.length > 3);
  const mashPatterns = [
    'asdf', 'sdfg', 'dfgh', 'fghj', 'ghjk', 'hjkl', 
    'йцук', 'цуке', 'укен', 'кенг', 'фыва', 'ывап', 'вапр', 'апро', 'прол', 'ролд', 'олдж',
    'ячсм', 'чсми', 'смит', 'мить'
  ];

  for (const word of words) {
    // Single word with no vowels and length > 4 (e.g. "sdfgh")
    if (/^[a-zа-яё]+$/.test(word) && !/[aeiouyаеёиоуыэюя]/.test(word) && word.length > 4) {
      return true;
    }

    // Common keyboard row sequences
    for (const pattern of mashPatterns) {
      if (word.includes(pattern)) return true;
    }

    // Repetitive mash like "aaaaaaaa"
    if (/(.)\1{4,}/.test(word)) {
      return true;
    }
  }

  return false;
};
