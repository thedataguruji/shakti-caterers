/**
 * The single swap point for real SMS delivery.
 *
 * For local/demo use this just logs the code to the server console — no SMS
 * provider or cost involved. To go live, replace the body below with a call
 * to a real provider (e.g. MSG91, Twilio) and unset DEV_EXPOSE_OTP in .env.
 * Nothing else in the codebase needs to change.
 */
export async function sendOtp(mobile: string, code: string): Promise<void> {
  console.log(`[DEV OTP] ${mobile}: ${code}`);
  // TODO: replace with a real SMS provider call before going live, e.g.:
  // await msg91.send({ mobile, message: `Your Shakti Caterers OTP is ${code}` });
}
