import {
    BadgePercent,
    Gift,
    MonitorCheck,
    Plane,
    HeartPlus,
    AlarmClockCheck,
} from 'lucide-react'

export const dashboardArrayOfData = [
    {
        id: 1,
        name: "Grand Theft Auto V",
        price: "899",
        picture: "https://cdn.akamai.steamstatic.com/steam/apps/271590/header.jpg",
    },
    {
        id: 2,
        name: "Grand Theft Auto IV: The Complete Edition",
        price: "599",
        picture: "https://cdn.akamai.steamstatic.com/steam/apps/12210/header.jpg",
    },
    {
        id: 3,
        name: "The Witcher 3: Wild Hunt",
        price: "1199",
        picture: "https://cdn.akamai.steamstatic.com/steam/apps/292030/header.jpg",
    },
    {
        id: 4,
        name: "Cyberpunk 2077",
        price: "1999",
        picture: "https://cdn.akamai.steamstatic.com/steam/apps/1091500/header.jpg",
    },
    {
        id: 5,
        name: "Red Dead Redemption 2",
        price: "2499",
        picture: "https://cdn.akamai.steamstatic.com/steam/apps/1174180/header.jpg",
    },
    {
        id: 6,
        name: "Elden Ring",
        price: "3999",
        picture: "https://cdn.akamai.steamstatic.com/steam/apps/1245620/header.jpg",
    },
    {
        id: 7,
        name: "Hollow Knight",
        price: "360",
        picture: "https://cdn.akamai.steamstatic.com/steam/apps/367520/header.jpg",
    },
    {
        id: 8,
        name: "Stardew Valley",
        price: "349",
        picture: "https://cdn.akamai.steamstatic.com/steam/apps/413150/header.jpg",
    },
    {
        id: 9,
        name: "Baldur's Gate 3",
        price: "1999",
        picture: "https://cdn.akamai.steamstatic.com/steam/apps/1086940/header.jpg",
    },
    {
        id: 10,
        name: "The Elder Scrolls V: Skyrim Special Edition",
        price: "1599",
        picture: "https://cdn.akamai.steamstatic.com/steam/apps/489830/header.jpg",
    },
    {
        id: 11,
        name: "DOOM Eternal",
        price: "1999",
        picture: "https://cdn.akamai.steamstatic.com/steam/apps/782330/header.jpg",
    },
    {
        id: 12,
        name: "Hades",
        price: "899",
        picture: "https://cdn.akamai.steamstatic.com/steam/apps/1145360/header.jpg",
    },
    {
        id: 13,
        name: "Factorio",
        price: "1000",
        picture: "https://cdn.akamai.steamstatic.com/steam/apps/427520/header.jpg",
    },
    {
        id: 14,
        name: "Terraria",
        price: "249",
        picture: "https://cdn.akamai.steamstatic.com/steam/apps/105600/header.jpg",
    },
];

export const dashboardFaqData = [
    {
        question: "Как быстро я получу свой ключ после оплаты?",
        answer: "Сразу после подтверждения оплаты. Ключ появится в личном кабинете и придёт на почту."
    },
    {
        question: "Это официальные ключи? Мой аккаунт не забанят?",
        answer: "Да. Мы работаем с официальными поставщиками, поэтому ключи лицензионные и безопасные."
    },
    {
        question: "Что делать, если ключ не работает или возникла проблема с активацией?",
        answer: "Напишите в поддержку в чате или на почту, приложите скрин — поможем оперативно."
    },
    {
        question: "Я купил игру, но она мне не понравилась. Могу я вернуть деньги?",
        answer: "Возврат за активированный цифровой ключ невозможен. Перед покупкой проверьте требования и описание."
    },
    {
        question: "У меня нет зарубежной карты. Как я могу пополнить Steam или купить игру?",
        answer: "Можно пополнить кошелёк и купить игру с российской карты — мы берём конвертацию на себя."
    },
    {
        question: "Что означает 'Region: GLOBAL' или 'Region: RU/CIS'?",
        answer: "Это регион активации. GLOBAL — активация по всему миру, RU/CIS — в России и СНГ."
    }
];

export const dashboardPrivileges = [
    {
        icon: BadgePercent,
        title: 'Лучшие цены',
        text: 'Экономьте на каждой покупке за счёт скидок и акций.'
    },
    {
        icon: Gift,
        title: 'Моментальная доставка',
        text: 'Ключ появляется в кабинете сразу после подтверждения оплаты.'
    },
    {
        icon: AlarmClockCheck,
        title: 'Игры в день релиза',
        text: 'Доступ к ожидаемым новинкам в день официального релиза.'
    },
    {
        icon: Plane,
        title: 'Быстрое пополнение',
        text: 'Пополняйте кошельки за минуты через удобные способы оплаты.'
    },
    {
        icon: HeartPlus,
        title: 'Круглосуточная поддержка',
        text: 'Поддержка 24/7 помогает в чате и по почте.'
    },
    {
        icon: MonitorCheck,
        title: 'Надежный сервис',
        text: 'Работаем с официальными поставщиками и проверяем ключи.'
    },
];

export const dashboardFeedBackData = [
    {
        id: 1,
        name: 'Alex_Gamer',
        game: 'Cyberpunk 2077',
        rating: 5,
        description: 'Ключ пришел моментально, даже не успел чайник вскипеть! Все активировалось без проблем. Спасибо, GameChange, теперь только к вам!'
    },
    {
        id: 2,
        name: 'Elena_Swift',
        game: 'Elden Ring',
        rating: 5,
        description: 'Очень боялась покупать ключи в интернете, но тут все прошло гладко. Цена была самой низкой из всех, что я нашла. Поддержка ответила на мой вопрос за 5 минут. Супер!'
    },
    {
        id: 3,
        name: 'MadMax_Play',
        game: 'Baldur\'s Gate 3',
        rating: 5,
        description: 'Пополнил Стим через этот сайт, деньги пришли сразу же. Удобно, быстро и без заморочек с зарубежными картами. Настоящее спасение.'
    },
    {
        id: 4,
        name: 'GamerGirl94',
        game: 'Helldivers 2',
        rating: 5,
        description: 'Купила ключ для Helldivers 2, активация в Steam прошла успешно. Цена порадовала, ниже чем у конкурентов. Буду брать еще!'
    },
    {
        id: 5,
        name: 'S_T_A_L_K_E_R',
        game: 'Escape from Tarkov',
        rating: 5,
        description: 'Все четко и быстро. Ключ пришел на почту через минуту после оплаты. Сервис на высшем уровне, рекомендую.'
    },
    {
        id: 6,
        name: 'Dmitry_S',
        game: 'Starfield',
        rating: 4,
        description: 'Немного волновался, так как покупал впервые. Но все прошло отлично. Единственное, ждал ключ минут 15, но в остальном все супер.'
    },
    {
        id: 7,
        name: 'Katya_Stream',
        game: 'Lethal Company',
        rating: 5,
        description: 'Брали с друзьями сразу 4 ключа для Lethal Company. Все пришли моментально, уже играем! Спасибо за отличные цены и скорость!'
    },
    {
        id: 8,
        name: 'Old_Gamer',
        game: 'Пополнение Steam',
        rating: 5,
        description: 'Отличный способ пополнить кошелек Steam. Комиссия адекватная, деньги зачисляются практически мгновенно. Теперь не нужно просить друзей из-за границы.'
    }
];