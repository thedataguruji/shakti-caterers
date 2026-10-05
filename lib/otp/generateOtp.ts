export const OTP_TTL_MS = 5 * 60 * 1000;
export const OTP_MAX_ATTEMPTS = 5;

export function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}
