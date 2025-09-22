export const READER_MODES = [
    'Activation',
    'Boarding',
] as const;

export const BUS_STOPS = [
    'Vanilla Beach',
    'Lio Beach',
    'Town Square',
    'Nacpan Beach',
    'Duli Beach',
] as const;

export const CARD_TYPES = [
    'Regular',
    'Employee'
] as const;

export const CARD_DURATIONS = ['1',
    '3',
    '5'
] as const;

export type READER_MODE = typeof READER_MODES[number];
export type BUS_STOP = typeof BUS_STOPS[number];
export type CARD_DURATION = typeof CARD_DURATIONS[number];
export type CARD_TYPE = typeof CARD_TYPES[number];

