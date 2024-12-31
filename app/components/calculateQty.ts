export const calculateQty = (
  bagQty: number,
  bagWeight: number,
  partialQTY: number
): number => {
  if (bagWeight <= 0 || bagQty <= 0) {
    throw new Error("Bag weight or quantity must be greater than 0");
  }
  return bagQty * bagWeight + partialQTY;
};
