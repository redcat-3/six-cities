export const DECIMAL = 10;
export const DEFAULT_OFFER_COUNT = 60;
export const MAX_COMMENTS_COUNT = 50;
export const DEFAULT_PREMIUM_COUNT = 3;
export const RATING_COUNT_DIGIT = 2;
export const PRICE_COUNT_DIGIT = 2;
export const LOCATION_COUNT_DIGIT = 5;
export const COUNT_OF_IMAGES = 6;
export const DEFAULT_PREVIEW_IMAGE = 'room1.jpg';
export const RATING_DEFAULT = 0;
export const RETURNABLE_FIELDS = {
  title: 1,
  postDate: 1,
  cityName: 1,
  previewImage: 1,
  isPremium: 1,
  rating: 1,
  isFavorite: 1,
  offerType: 1,
  price: 1,
  commentsCount: 1,
  latitude: 1,
  longitude: 1,
  id: 1,
  'user.name': 1,
  'user.email': 1,
  'user.avatarUrl': 1,
  'user.userType': 1,
};

export const enum RATING {
  MIN = 0,
  MAX = 5
}

export const enum TITLE_LENGHT {
  MIN = 10,
  MAX = 100
}

export const enum DESC_LENGHT {
  MIN = 20,
  MAX = 1024
}

export const enum ROOMS_NUMBER {
  MIN = 1,
  MAX = 8
}

export const enum GEST_NUMBER {
  MIN = 1,
  MAX = 10
}

export const enum PRICE {
  MIN = 100,
  MAX = 100000
}

export const enum LATITUDE {
  MIN = 40,
  MAX = 50
}

export const enum LONGITUDE {
  MIN = 4,
  MAX = 6
}

export const enum WEEK_DAY {
  FIRST = 1,
  LAST = 7
}

