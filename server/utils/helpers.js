export const checkForDuplicateInputs = (columns) => {
  let isColumnUnique = true;
  let indexes = [];

  for (let i = 0; i < columns.length; i++) {
    for (let j = i + 1; j < columns.length; j++) {
      if (columns[i].name === columns[j].name) {
        isColumnUnique = false;
        indexes.push(j);
        break;
      }
    }
  }

  return { isColumnUnique, indexes };
};
