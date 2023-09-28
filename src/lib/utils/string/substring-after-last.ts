interface String {
  substringAfterLast(char: string): string
}

String.prototype.substringAfterLast = function (char: string): string {
  return this.substring(this.lastIndexOf(char) + 1)
}
