export const CourseType = {
  CM: 0,
  TD: 1,
  TP: 2,
};

export function courseTypeToNumber(type) {
  switch (type) {
    case "C":
      return 0;
    case "D":
      return 1;
    case "T":
      return 2;
    default:
      return null;
  }
}
