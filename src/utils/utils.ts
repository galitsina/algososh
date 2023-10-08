export const swap = <T>(arr: T[], firstIndex: number, secondIndex:number): void => {
    const temp: T = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
};

export const delay = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });