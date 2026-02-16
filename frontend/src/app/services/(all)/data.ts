// xbox

export const xboxPlans = [
    {
        id: "pc-1",
        label: "Game Pass PC",
        duration: "1 месяц",
        price: 499,
        description: "Каталог игр для ПК",
    },
    {
        id: "pc-3",
        label: "Game Pass PC",
        duration: "3 месяца",
        price: 1290,
        description: "Экономия при продлении",
    },
    {
        id: "console-1",
        label: "Game Pass Console",
        duration: "1 месяц",
        price: 599,
        description: "Игры для Xbox консоли",
    },
    {
        id: "console-3",
        label: "Game Pass Console",
        duration: "3 месяца",
        price: 1490,
        description: "Удобный пакет на квартал",
    },
    {
        id: "ultimate-1",
        label: "Game Pass Ultimate",
        duration: "1 месяц",
        price: 899,
        description: "ПК + консоль + облако",
    },
    {
        id: "ultimate-12",
        label: "Game Pass Ultimate",
        duration: "12 месяцев",
        price: 8990,
        description: "Максимальная выгода",
    },
];

export const xboxTiers = ["Game Pass PC", "Game Pass Console", "Game Pass Ultimate"];

export const xboxFeatures = [
    "Активация подписки после оплаты",
    "Поддержка разных регионов аккаунта",
    "Безопасная передача данных",
    "Поддержка 24/7 в чате",
];

export const xboxReceive = [
    {
        title: "Сотни игр",
        text: "Большой каталог для ПК и консоли.",
    },
    {
        title: "Новинки в день релиза",
        text: "Игры Xbox Game Studios сразу в доступе.",
    },
    {
        title: "Облачный гейминг",
        text: "Играйте без загрузки на разных устройствах.",
    },
    {
        title: "Эксклюзивные скидки",
        text: "Специальные предложения для подписчиков.",
    },
];

export const xboxText = `Мы не запрашиваем пароль от аккаунта Xbox. Достаточно логина или почты, чтобы активировать подписку. Все платежи проходят через защищённые каналы.`


// steam

export const steamFeatures = ["Быстрое зачисление без ожиданий", "Прозрачная комиссия и итоговая сумма", "Безопасный ввод данных", "Поддержка популярных способов оплаты"];

export const steamHowItWork = [
    {
        title: "Введите логин",
        text: "Укажите свой Steam логин или никнейм.",
    },
    {
        title: "Выберите сумму",
        text: "Сумма пополнения от 100 ₽ и выше.",
    },
    {
        title: "Подтвердите оплату",
        text: "После оплаты баланс обновится автоматически.",
    },
];

export const steamText = `Мы никогда не запрашиваем пароль от Steam. Достаточно логина или публичного никнейма. Если возникнут сложности, служба поддержки поможет в чате или по почте.`


// spotify

export const spotifyPlans = [
    {
        id: "month",
        label: "1 месяц",
        price: 399,
        description: "Для быстрого старта",
    },
    {
        id: "3months",
        label: "3 месяца",
        price: 999,
        description: "Экономия до 15%",
    },
    {
        id: "6months",
        label: "6 месяцев",
        price: 1890,
        description: "Оптимальный вариант",
    },
    {
        id: "year",
        label: "12 месяцев",
        price: 3490,
        description: "Максимальная выгода",
    },
];

export const spotifyFeatures = [
    "Официальная подписка Spotify Premium",
    "Моментальная активация после оплаты",
    "Поддержка любых регионов аккаунта",
    "Поддержка 24/7 в чате",
];

export const spotifyReceive = [
    {
        title: "Без рекламы",
        text: "Слушайте музыку и подкасты без пауз и баннеров.",
    },
    {
        title: "Офлайн режим",
        text: "Скачивайте треки и слушайте без интернета.",
    },
    {
        title: "Высокое качество",
        text: "Максимальное качество звука для ваших устройств.",
    },
    {
        title: "Любые устройства",
        text: "Телефон, ПК, планшет и смарт-колонки.",
    },
];

export const spotifyText = `Оплата безопасна: мы не запрашиваем пароль от аккаунта. Достаточно логина или почты, на которую зарегистрирован Spotify.`


/// ps store

export const psStoreFeatures = [
    "Быстрое зачисление на баланс PS Store",
    "Поддержка популярных способов оплаты",
    "Безопасный ввод данных без пароля",
    "Поддержка 24/7 при любых вопросах",
];

export const psStoreHowItWork = [
    {
        title: "Введите PSN логин",
        text: "Укажите никнейм или почту от аккаунта PlayStation.",
    },
    {
        title: "Выберите сумму",
        text: "Сумма пополнения от 100 ₽ и выше.",
    },
    {
        title: "Оплатите",
        text: "Баланс обновится автоматически после оплаты.",
    },
] ;

export const psStoreText = `Мы не запрашиваем пароль от PSN. Достаточно логина или почты. Если возникнут вопросы, поддержка поможет в чате или по почте.`


/// ps plus

export const psPlusPlans = [
    {
        id: "essential-1",
        label: "Essential",
        duration: "1 месяц",
        price: 499,
        description: "Онлайн, облачные сохранения, скидки",
    },
    {
        id: "essential-12",
        label: "Essential",
        duration: "12 месяцев",
        price: 3990,
        description: "Максимальная выгода за год",
    },
    {
        id: "extra-1",
        label: "Extra",
        duration: "1 месяц",
        price: 799,
        description: "Каталог из сотен игр",
    },
    {
        id: "extra-12",
        label: "Extra",
        duration: "12 месяцев",
        price: 6990,
        description: "Лучший выбор по цене",
    },
    {
        id: "deluxe-1",
        label: "Deluxe",
        duration: "1 месяц",
        price: 1090,
        description: "Классика и пробные версии",
    },
    {
        id: "deluxe-12",
        label: "Deluxe",
        duration: "12 месяцев",
        price: 9290,
        description: "Полный доступ без ограничений",
    },
];

export const psPlusTiers = ["Essential", "Extra", "Deluxe"] as const;

export const psPlusReceive = [
    {
        title: "Онлайн мультиплеер",
        text: "Играйте с друзьями без ограничений.",
    },
    {
        title: "Ежемесячные игры",
        text: "Получайте новые игры каждый месяц.",
    },
    {
        title: "Облачные сохранения",
        text: "Резервные копии всегда под рукой.",
    },
    {
        title: "Эксклюзивные скидки",
        text: "Специальные цены в PlayStation Store.",
    },
];

export const psPlusFeatures = [
    "Активация подписки после оплаты",
    "Поддержка разных регионов аккаунта",
    "Безопасная передача данных",
    "Поддержка 24/7 в чате",
];

export const psPlusText = `Мы не запрашиваем пароль от PSN. Достаточно логина или почты, чтобы активировать подписку. Все платежи проходят через защищённые каналы.`


/// chat gpt


export const chatGptPlans = [
    {
        id: "plus-1",
        label: "ChatGPT Plus",
        duration: "1 месяц",
        price: 1990,
        description: "Доступ к GPT‑5 и приоритетные ответы",
    },
    {
        id: "plus-3",
        label: "ChatGPT Plus",
        duration: "3 месяца",
        price: 5490,
        description: "Скидка при оплате пакетом",
    },
    {
        id: "team-1",
        label: "ChatGPT Team",
        duration: "1 месяц",
        price: 7990,
        description: "Командная подписка с общими рабочими пространствами",
    },
    {
        id: "team-12",
        label: "ChatGPT Team",
        duration: "12 месяцев",
        price: 76900,
        description: "Годовая подписка для команды",
    },
] as const;

export const chatGptTiers = ["ChatGPT Plus", "ChatGPT Team"] as const;

export const chatGptFeatures = [
    "Оплата в рублях без иностранных карт",
    "Активация подписки после оплаты",
    "Поддержка 24/7 в чате",
    "Безопасная передача данных",
];

export const chatGptReceive = [
    {
        title: "GPT‑5",
        text: "Более точные ответы и расширенные возможности.",
    },
    {
        title: "Приоритетный доступ",
        text: "Быстрее ответы даже в часы пик.",
    },
    {
        title: "Высокие лимиты",
        text: "Больше запросов и расширенные функции.",
    },
    {
        title: "Командная работа",
        text: "Общие рабочие пространства для команды.",
    },
];

export const chatGptText = `Мы не запрашиваем пароль от аккаунта OpenAI. Достаточно почты, на которую зарегистрирован ChatGPT, чтобы активировать подписку.`
