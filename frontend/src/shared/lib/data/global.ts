
export const OPERATION_SYSTEM_OPTIONS = [
    { value: 'Windows', label: 'Windows' },
    { value: 'macOS', label: 'macOS' },
    { value: 'Linux', label: 'Linux' },
];

export const ACTIVATION_PLATFORM_OPTIONS = [
    { value: 'Steam', label: 'Steam' },
    { value: 'Epic Games', label: 'Epic Games' },
    { value: 'EA', label: 'EA' },
    { value: 'GOG', label: 'GOG' },
    { value: 'Bethesda.net', label: 'Bethesda.net' },
    { value: 'Ubisoft', label: 'Ubisoft' },
];

export const GENRE_OPTIONS = [
    { value: 'action', label: 'Экшен' },
    { value: 'openWorld', label: 'Открытый мир' },
    { value: 'fantasy', label: 'Фэнтези'},
    { value: 'cyberpunk', label: 'Киберпанк' },
    { value: 'western', label: 'Вестерн' },
    { value: 'hardcore', label: 'Хардкор' },
    { value: 'metroidvania', label: 'Метроидвания' },
    { value: 'platformer', label: 'Платформер' },
    { value: 'stepByStep', label: 'Пошаговая' },
    { value: 'roguelike', label: 'Рогалик' },
    { value: 'sandBox', label: 'Песочница' },
    { value: 'survival', label: 'Выживание' },
    { value: 'rpg', label: 'RPG' },
    { value: 'strategy', label: 'Стратегия' },
    { value: 'shooter', label: 'Шутер' },
    { value: 'adventure', label: 'Приключение' },
    { value: 'simulator', label: 'Симулятор' },
    { value: 'horror', label: 'Хоррор' },
    { value: 'indie', label: 'Инди' },
];

export const ACTIVATION_PLATFORM_ICONS = {
    'Steam': '/steamIcon.svg',
    'Epic Games': '/epic.svg',
    'GOG': '/gog.svg',
    'Bethesda.net': '/bethesda.svg',
    'EA': '/eaIcon.svg',
    'Ubisoft Connect': "/ubisoftIcon.svg",
} ;

export const OPERATION_SYSTEM_ICONS = {
    'macOS': '/appleIcon.svg',
    'Windows': '/windowsIcon.svg',
    'Linux': '/linuxIcon.svg',
};

export type ActivationPlatform = keyof typeof ACTIVATION_PLATFORM_ICONS;
export type OperationSystem = keyof typeof OPERATION_SYSTEM_ICONS;

export const SERVICES = [
    {
        id: "steam",
        title: "Steam",
        description: "Пополнение кошелька Steam и покупка игр напрямую.",
        href: "/services/steam",
        logo: "/steam-logo.jpg",
        tag: "Кошелёк",
        accent: "from-emerald-400/10 via-slate-900/30 to-transparent",
    },
    {
        id: "ps-store",
        title: "PlayStation Store",
        description: "Быстрое пополнение кошелька PS Store для игр и подписок.",
        href: "/services/ps-store",
        logo: "/ps-store-logo.jpg",
        tag: "Консоль",
        accent: "from-sky-400/10 via-slate-900/30 to-transparent",
    },
    {
        id: "ps-plus",
        title: "PlayStation Plus",
        description: "Активация и продление подписки PS Plus без ожиданий.",
        href: "/services/ps-plus",
        logo: "/ps-plus-logo.png",
        tag: "Консоль",
        accent: "from-indigo-400/10 via-slate-900/30 to-transparent",
    },
    {
        id: "xbox",
        title: "Xbox",
        description: "Пополнение баланса Xbox и доступ к цифровому магазину.",
        href: "/services/xbox",
        logo: "/xbox-logo.jpg",
        tag: "Консоль",
        accent: "from-green-400/10 via-slate-900/30 to-transparent",
    },
    {
        id: "spotify",
        title: "Spotify",
        description: "Продление подписки Spotify Premium с любым сроком.",
        href: "/services/spotify",
        logo: "/spotify-logo.png",
        tag: "Подписка",
        accent: "from-green-500/10 via-slate-900/30 to-transparent",
    },
    {
        id: "chat-gpt",
        title: "ChatGPT",
        description: "Оплата подписки и доступ к расширенным возможностям.",
        href: "/services/chat-gpt",
        logo: "/chat-gpt-logo.png",
        tag: "Нейросеть",
        accent: "from-amber-400/10 via-slate-900/30 to-transparent",
    },
] as const;

export const REVIEW_CATEGORIS = [
    { value: 'key', label: 'Покупка ключа' },
    { value: 'chatGPT', label: 'Подписка ChatGPT' },
    { value: 'ps-plus', label: 'Подписка PS Plus' },
    { value: 'ps-store', label: 'Пополнение PS Store' },
    { value: 'spotify', label: 'Подписка Spotify' },
    { value: 'steam', label: 'Пополнение Steam' },
    { value: 'xbox', label: 'Подписка Xbox Game Pass' },
];

export const TICKET_TYPES = [
    { value: 'question', label: 'Вопрос' },
    { value: 'complaint', label: 'Жалоба' },
];

export const TICKET_CATEGORIES = [
    { value: 'services-balance', label: 'Пополнение сервисов' },
    { value: 'subscription', label: 'Покупка подписки' },
    { value: 'get-product', label: 'Получение товара' },
    { value: 'payment', label: 'Оплата' },
    { value: 'service', label: 'Сервис' },
    { value: 'other', label: 'Другое' },
];