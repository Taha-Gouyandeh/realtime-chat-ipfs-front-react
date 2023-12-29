import moment from 'jalali-moment';

export function convertDateFormat(dateString: string) {
  const dateParts = dateString.split('/');
  const convertedDate = dateParts.join('-');
  return convertedDate;
}

export const ConvertToPersianNumber = (props: {
  englishNumber: string;
}): string => {
  const { englishNumber } = props;
  const englishToPersianMap: { [key: string]: string } = {
    '0': '۰',
    '1': '۱',
    '2': '۲',
    '3': '۳',
    '4': '۴',
    '5': '۵',
    '6': '۶',
    '7': '۷',
    '8': '۸',
    '9': '۹',
  };

  let ConvertedNumber = '';
  for (const digit of englishNumber) {
    if (englishToPersianMap[digit]) {
      ConvertedNumber += englishToPersianMap[digit];
    } else {
      ConvertedNumber += digit;
    }
  }

  return ConvertedNumber;
};

export const ConvertToEnglishNumber = (props: {
  persianNumber: string;
}): string => {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

  const englishNumber = props.persianNumber
    .split('')
    .map((char) => {
      const index = persianDigits.indexOf(char);
      return index !== -1 ? index.toString() : char;
    })
    .join('');

  return englishNumber;
};
