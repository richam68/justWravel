export const generateBookingReference = () => {
  const prefix = "JW";
  const time = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${time}-${random}`;
};
