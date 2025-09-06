export const formatCardNumber = (cardNumber: string): string => {
  if (!/^\d{16}$/.test(cardNumber)) throw new Error("Invalid card number");

  const faDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

  const chunks = cardNumber.match(/.{1,4}/g) || [];

  const withSpacedDashes = chunks.join(" - ");

  const converted = withSpacedDashes.replace(/\d/g, (d) => faDigits[+d]);

  return converted;
};
