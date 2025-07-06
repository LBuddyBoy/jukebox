export function isValidId(id) {
  const idNum = Number(id);

  return (
    /^\d+$/.test(id) &&
    !Number.isNaN(idNum) &&
    Number.isInteger(idNum) &&
    idNum >= 0
  );
}
