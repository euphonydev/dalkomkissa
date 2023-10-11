interface Number {
  convertFileSize(): string
}

Number.prototype.convertFileSize = function (): string {
  const number = this.valueOf()
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  if (number === 0) return '0 Byte'
  const i = Math.floor(Math.log(number) / Math.log(1024))
  const fileSize = number / Math.pow(1024, i)
  const formattedSize = fileSize
    .toFixed(2)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return formattedSize + ' ' + sizes[i]
}
