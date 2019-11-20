export * from './responsive';

// https://www.jacklmoore.com/notes/rounding-in-javascript/
export const round = (v, d) => {
  return Number(Math.round(v + 'e' + d) + 'e-' + d);
};

// https://stackoverflow.com/a/16950661
export const moneyFormat = value => {
  return Math.abs(Number(value)) >= 1.0e9
    ? round(Math.abs(Number(value)) / 1.0e9, 2) + 'B'
    : Math.abs(Number(value)) >= 1.0e6
    ? round(Math.abs(Number(value)) / 1.0e6, 2) + 'M'
    : Math.abs(Number(value)) >= 1.0e3
    ? round(Math.abs(Number(value)) / 1.0e3, 2) + 'K'
    : round(Math.abs(Number(value)), 2);
};
