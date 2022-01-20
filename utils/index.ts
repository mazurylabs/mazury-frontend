export const getTruncatedAddress = (
  address: string,
  length: number = 10
): string => {
  return `${address.slice(0, length)}...${address.slice(
    address.length - length
  )}`;
};
