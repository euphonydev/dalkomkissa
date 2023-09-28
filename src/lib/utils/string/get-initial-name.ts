interface String {
  getInitialName(): string
}

String.prototype.getInitialName = function (): string {
  const words = this.split(' ')
  let initials = ''

  for (let i = 0; i < words.length; i++) {
    if (initials.length >= 2) {
      break
    }

    const word = words[i]
    if (word.length > 0) {
      initials += word[0].toUpperCase()
    }
  }

  return initials
}
