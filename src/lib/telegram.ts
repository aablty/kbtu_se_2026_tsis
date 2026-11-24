import "server-only";
import type { CallbackMethod } from "@/content/types";

export interface ContactSubmission {
  name: string;
  callbackMethod: CallbackMethod;
  callbackValue: string;
  message: string;
}

/**
 * Server-only Telegram Bot API client. This is the sole module that reads BOT_TOKEN/CHAT_ID —
 * never import this from a client component or anything that ends up in the browser bundle.
 */
export async function sendContactViaTelegram(submission: ContactSubmission): Promise<void> {
  const botToken = process.env.BOT_TOKEN;
  const chatId = process.env.CHAT_ID;

  if (!botToken || !chatId) {
    throw new Error("Telegram bot is not configured");
  }

  const text = [
    `New contact form submission`,
    `Name: ${submission.name}`,
    `Preferred callback: ${submission.callbackMethod} — ${submission.callbackValue}`,
    `Message: ${submission.message}`,
  ].join("\n");

  const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: chatId,
      text,
    }),
  });

  if (!response.ok) {
    throw new Error(`Telegram API responded with status ${response.status}`);
  }
}
