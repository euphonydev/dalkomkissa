interface Number {
  shortenFormatNumber(): string
}

Number.prototype.shortenFormatNumber = function () {
  const number = this.valueOf()
  if (number < 1000) {
    return number.toString()
  }
  if (number < 1000000) {
    const thousands = (number / 1000).toFixed(2)
    const parts = thousands.split('.')
    if (parts[1] === '00') {
      return `${parts[0]}k`
    }
    if (parts[1][1] === '0') {
      return `${parts[0]}.${parts[1][0]}k`
    }
    return `${thousands}k`
  }
  if (number < 1000000000) {
    const millions = (number / 1000000).toFixed(2)
    const parts = millions.split('.')
    if (parts[1] === '00') {
      return `${parts[0]}m`
    }
    if (parts[1][1] === '0') {
      return `${parts[0]}.${parts[1][0]}m`
    }
    return `${millions}m`
  }
  const billions = (number / 1000000000).toFixed(2)
  const parts = billions.split('.')
  if (parts[1] === '00') {
    return `${parts[0]}b`
  }
  if (parts[1][1] === '0') {
    return `${parts[0]}.${parts[1][0]}b`
  }
  return `${billions}b`
}
