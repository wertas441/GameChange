
export const operationSystemOptions = [
    { value: 'Windows', label: 'Windows' },
    { value: 'macOS', label: 'macOS' },
    { value: 'Linux', label: 'Linux' },
];

export const activationPlatformOptions = [
    { value: 'Steam', label: 'Steam' },
    { value: 'Epic Games', label: 'Epic Games' },
    { value: 'EA', label: 'EA' },
    { value: 'GOG', label: 'GOG' },
    { value: 'Bethesda.net', label: 'Bethesda.net' },
    { value: 'Ubisoft', label: 'Ubisoft' },
];

export const genreOptions = [
    { value: 'action', label: 'Экшен' },
    { value: 'rpg', label: 'RPG' },
    { value: 'strategy', label: 'Стратегия' },
    { value: 'shooter', label: 'Шутер' },
    { value: 'adventure', label: 'Приключение' },
    { value: 'simulator', label: 'Симулятор' },
    { value: 'horror', label: 'Хоррор' },
    { value: 'indie', label: 'Инди' },
];

export const activationPlatformIcons = {
    'Steam': '/steamIcon.svg',
    'Epic Games': '/epic.svg',
    'GOG': '/gog.svg',
    'Bethesda.net': '/bethesda.svg',
    'EA': '/eaIcon.svg',
    'Ubisoft Connect': "/ubisoftIcon.svg",
} ;

export const operationSystemIcon = {
    'macOS': '/appleIcon.svg',
    'Windows': '/windowsIcon.svg',
    'Linux': '/linuxIcon.svg',
};

export type ActivationPlatform = keyof typeof activationPlatformIcons;
export type OperationSystem = keyof typeof operationSystemIcon;



