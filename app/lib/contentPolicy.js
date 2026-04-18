const BLOCKED_TERMS = [
  '1488',
  'adolf',
  'anus',
  'bastard',
  'bitch',
  'cock',
  'cunt',
  'dick',
  'fag',
  'fuck',
  'genocide',
  'hitler',
  'kkk',
  'kys',
  'nazi',
  'nigger',
  'porn',
  'pussy',
  'rape',
  'rapist',
  'self harm',
  'sex',
  'shit',
  'slut',
  'suicide',
  'whore'
];

function normalizeText(value = '') {
  return value.normalize('NFKC').replace(/\s+/g, ' ');
}

export function sanitizePlayerName(value = '') {
  return normalizeText(value)
    .toUpperCase()
    .replace(/[^A-Z0-9 _-]/g, '')
    .slice(0, 12);
}

export function sanitizeRoomCode(value = '') {
  return value.toUpperCase().replace(/[^A-Z]/g, '').slice(0, 3);
}

export function sanitizeFreeText(value = '', maxLength = 100) {
  return normalizeText(value)
    .replace(/[<>]/g, '')
    .slice(0, maxLength);
}

export function hasBlockedTerm(value = '') {
  const lower = normalizeText(value).toLowerCase();
  return BLOCKED_TERMS.some((term) => lower.includes(term));
}

export function validatePlayerName(value = '') {
  if (!value || value.trim().length < 2) {
    return 'Enter a nickname with at least 2 characters.';
  }

  if (hasBlockedTerm(value)) {
    return 'Please choose a different nickname.';
  }

  return '';
}

export function validateFreeText(value = '') {
  if (!value || !value.trim()) {
    return 'Please enter a response.';
  }

  if (hasBlockedTerm(value)) {
    return 'Please keep answers suitable for all players.';
  }

  return '';
}
