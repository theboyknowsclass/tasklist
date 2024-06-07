// a little function to help us with reordering the result
const reorder = <TItem>(
  list: TItem[],
  startIndex: number,
  endIndex: number
): TItem[] => {
  const result = [...list];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export default reorder;
