interface String {
  getAllPath(): string[];
}

String.prototype.getAllPath = function () {
  const pathArray = this.split('/').filter(Boolean);
  return pathArray;
};
