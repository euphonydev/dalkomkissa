export function shortenFormatNumber(number: number) {
  if (number < 1000) {
    return number.toString();
  } else if (number < 1000000) {
    const thousands = (number / 1000).toFixed(2);
    const parts = thousands.split('.');
    if (parts[1] === '00') {
      return parts[0] + 'k';
    } else if (parts[1][1] === '0') {
      return parts[0] + '.' + parts[1][0] + 'k';
    } else {
      return thousands + 'k';
    }
  } else if (number < 1000000000) {
    const millions = (number / 1000000).toFixed(2);
    const parts = millions.split('.');
    if (parts[1] === '00') {
      return parts[0] + 'm';
    } else if (parts[1][1] === '0') {
      return parts[0] + '.' + parts[1][0] + 'm';
    } else {
      return millions + 'm';
    }
  } else {
    const billions = (number / 1000000000).toFixed(2);
    const parts = billions.split('.');
    if (parts[1] === '00') {
      return parts[0] + 'b';
    } else if (parts[1][1] === '0') {
      return parts[0] + '.' + parts[1][0] + 'b';
    } else {
      return billions + 'b';
    }
  }
}
