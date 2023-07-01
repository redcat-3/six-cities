export const DEFAULT_AVATAR_FILE_NAME = 'avatar.png';
export const JWT_ALGORITHM = 'HS256';
export const BLOCKED_TOKENS: Set<string> = new Set();

export const enum NAME_LENGHT {
  MIN = 1,
  MAX = 15
}

export const enum PASSWORD_LENGHT {
  MIN = 6,
  MAX = 12
}
