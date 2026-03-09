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
  const normalized = text.toLowerCase().trim();
  if (!normalized) return false;

  // 1. Repeating characters like "aaaaaaa" or "!!!!! "
  if (/(.)\1{4,}/.test(normalized)) return true;

  const words = normalized.split(/\s+/).filter(w => w.length >= 4);

  for (const word of words) {
    // Strip non-letters for analysis
    const letters = word.replace(/[^a-zа-яё]/g, '');
    if (letters.length < 4) continue;

    const vowelsMatch = letters.match(/[aeiouyаеёиоуыэюя]/g);
    const vowelsCount = vowelsMatch ? vowelsMatch.length : 0;
    
    // 2. No vowels at all in a 4+ letter word (e.g. "sdfg", "прлш")
    if (vowelsCount === 0) return true;

    // 3. Very low vowel-to-letter ratio (e.g. 1 vowel in 7 letters)
    // Most real words have at least 25-30% vowels.
    if (vowelsCount < letters.length * 0.2) return true;

    // 4. Excessive consonant clusters
    // Russian "всплеск" has 4 consonants. 5+ is almost always gibberish.
    // Also catch "шрлш" type sequences which are rare in real speech.
    const consonantClusters = word.match(/[bcdfghjklmnpqrstvwxzбвгджзйклмнпрстфхцчшщ]{4,}/g);
    if (consonantClusters) {
      for (const cluster of consonantClusters) {
        // Specifically block "шрлш" and other keyboard-heavy clusters
        const suspiciousClusters = ['шрлш', 'рлши', 'ишрл', 'фыва', 'йцук', 'ячсм', 'jklm', 'sdfg'];
        if (cluster.length >= 5 || suspiciousClusters.some(sc => cluster.includes(sc))) {
          return true;
        }
      }
    }

    // 5. Common keyboard row sequences
    const mashPatterns = [
      'asdf', 'sdfg', 'dfgh', 'fghj', 'ghjk', 'hjkl', 
      'йцук', 'цуке', 'укен', 'кенг', 'фыва', 'ывап', 'вапр', 'апро', 'прол', 'ролд', 'олдж',
      'ячсм', 'чсми', 'смит', 'мить',
      'ишрл', 'шрлш', 'рлши' // Patterns reported by users
    ];

    for (const pattern of mashPatterns) {
      if (word.includes(pattern)) return true;
    }
  }

  return false;
};
