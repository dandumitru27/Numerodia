import i18next, { t } from 'i18next';
import Trophy from "../enums/Trophy";

export function getYouWonMessage(trophy: Trophy): string {
  let message = t('You won') + ' ';

  const trophyType = getTrophyType(trophy);

  switch (i18next.language) {
    case 'ro':
      message += 'trofeul de ' + trophyType;
      break;
    case 'en':
    default:
      message += 'the ' + trophyType + ' trophy';
      break;
  }

  return message + '.';
}

export function getStatsLineText(trophy: Trophy, count: number) {
  const trophyNoun = t(count === 1 ? 'trophy' : 'trophies');
  const trophyType = getTrophyType(trophy);

  switch (i18next.language) {
    case 'ro':
      return trophyNoun + ' de ' + trophyType;
    case 'en':
    default:
      return trophyType + ' ' + trophyNoun;
  }
}

function getTrophyType(trophy?: Trophy): string {
  return trophy !== undefined
    ? t(Trophy[trophy].toLowerCase())
    : '';
}

export function getStreakText(count: number) {
  if (i18next.language === 'ro' && count === 1) {
    return 'consecutiv';
  }

  return t('streak');
}

export function getNumberFormatted(input: number) {
  return t('{{val, number}}', { val: input });
}

export function getSiteName() {
  if (i18next.language === 'ro') {
    return 'RO.Numerodia';
  }

  return "Numerodia";
}

export function getSiteUrl() {
  if (i18next.language === 'ro') {
    return 'https://ro.numerodia.com';
  }

  return 'https://numerodia.com';
}

export function formatDateMonth(date: Date): string {
  var day = padWithZero(date.getDate());
  var month = padWithZero(date.getMonth() + 1);

  if (i18next.language === 'ro') {
    return `${day}.${month}`;
  }

  return `${month}/${day}`;
}

function padWithZero(input: number): string {
  return input < 10 ? '0' + input : String(input);
}