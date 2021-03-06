
export const roundToUpperHundred = (num: number): number => {
  if (num < 100) {
    return 100;
  }
  if (num % 100 === 0) {
    return num;
  }
  return (Math.floor(num / 100) + 1) * 100;
};
