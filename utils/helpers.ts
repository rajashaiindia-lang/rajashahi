// utils/helpers.ts

/**
 * Given a panna (3-digit string like "160"), return the derived digit.
 * Rule: sum of digits % 10
 */
export function digitFromPanna(panna: string): number {
  if (!/^\d{3}$/.test(panna)) {
    throw new Error(`Invalid panna: ${panna}`);
  }
  const sum = [...panna].reduce((acc, ch) => acc + Number(ch), 0);
  return sum % 10;
}

/**
 * Generate a random panna (string "000".."999").
 * Demo-only (uses Math.random, not cryptographically fair).
 */
export function randomPanna(): string {
  return String(Math.floor(Math.random() * 1000)).padStart(3, '0');
}

/**
 * Derive the Jodi (two-digit string) from opening + closing digits.
 * If closingDigit is missing (opening-only stage), returns undefined.
 */
export function deriveJodi(openingDigit: number, closingDigit?: number): string | undefined {
  if (closingDigit === undefined) return undefined;
  return `${openingDigit}${closingDigit}`;
}

/**
 * Format the final result line:
 * (OpeningPanna) OpeningDigit ❘ ClosingDigit (ClosingPanna)
 * Example: (160) 7 | 9 (135)
 */
export function formatResult(
  openingPanna?: string,
  openingDigit?: number,
  closingDigit?: number,
  closingPanna?: string
): string {
  if (!openingPanna || openingDigit === undefined) return '';
  if (!closingPanna || closingDigit === undefined) {
    // Only opening published
    return `(${openingPanna}) ${openingDigit} | ?`;
  }
  return `(${openingPanna}) ${openingDigit} | ${closingDigit} (${closingPanna})`;
}

/**
 * Generate a compact roundId based on timestamp
 * Format: yyyyMMddHHmmss
 */
export function generateRoundId(): string {
  const d = new Date();
  const s = d.toISOString().replace(/[-:T]/g, '').slice(0, 14);
  return s; // e.g. "20251001123456"
}
