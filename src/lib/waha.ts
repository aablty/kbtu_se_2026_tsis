import "server-only";
import type { CallbackMethod } from "@/content/types";

export interface ContactSubmission {
  name: string;
  callbackMethod: CallbackMethod;
  callbackValue: string;
  message: string;
}

/**
 * Server-only WAHA (WhatsApp HTTP API) client. This is the sole module that reads the WAHA_*
 * env vars — never import this from a client component or anything that ends up in the browser
 * bundle.
 */
export async function sendContactViaWaha(submission: ContactSubmission): Promise<void> {
  const apiUrl = process.env.WAHA_API_URL;
  const apiKey = process.env.WAHA_API_KEY;
  const sessionName = process.env.WAHA_SESSION_NAME;

  if (!apiUrl || !apiKey || !sessionName) {
    throw new Error("WAHA is not configured");
  }

  const text = [
    `New contact form submission`,
    `Name: ${submission.name}`,
    `Preferred callback: ${submission.callbackMethod} — ${submission.callbackValue}`,
    `Message: ${submission.message}`,
  ].join("\n");

  const response = await fetch(`${apiUrl}/api/sendText`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Api-Key": apiKey,
    },
    body: JSON.stringify({
      session: sessionName,
      chatId: sessionName,
      text,
    }),
  });

  if (!response.ok) {
    throw new Error(`WAHA responded with status ${response.status}`);
  }
}
