export class MathUtils {
  public static parseCurrencyToCents(amountStr: string): number {
    const cleanStr = amountStr.replace(/[^0-9.-]/g, '');
    const floatVal = parseFloat(cleanStr);
    if (isNaN(floatVal)) {
      throw new Error(`Failed to parse currency string: ${amountStr}`);
    }
    return Math.round(floatVal * 100);
  }

  public static centsToDollars(cents: number): number {
    return cents / 100;
  }
}