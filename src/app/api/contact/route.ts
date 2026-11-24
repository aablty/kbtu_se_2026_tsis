import { NextResponse } from "next/server";
import type { CallbackMethod } from "@/content/types";
import { sendContactViaTelegram } from "@/lib/telegram";

const CALLBACK_METHODS: readonly CallbackMethod[] = ["whatsapp", "telegram", "email"];

const VALUE_PATTERNS: Record<CallbackMethod, RegExp> = {
  whatsapp: /^\+?[0-9\s()-]{7,20}$/,
  telegram: /^@?[A-Za-z0-9_]{4,32}$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
};

function isCallbackMethod(value: unknown): value is CallbackMethod {
  return typeof value === "string" && (CALLBACK_METHODS as readonly string[]).includes(value);
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  if (typeof body !== "object" || body === null) {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const { name, callbackMethod, callbackValue, message } = body as Record<string, unknown>;

  if (typeof name !== "string" || name.trim().length === 0) {
    return NextResponse.json({ error: "invalid_name" }, { status: 400 });
  }
  if (typeof message !== "string" || message.trim().length === 0) {
    return NextResponse.json({ error: "invalid_message" }, { status: 400 });
  }
  if (!isCallbackMethod(callbackMethod)) {
    return NextResponse.json({ error: "invalid_callback_method" }, { status: 400 });
  }
  if (typeof callbackValue !== "string" || !VALUE_PATTERNS[callbackMethod].test(callbackValue.trim())) {
    return NextResponse.json({ error: "invalid_callback_value" }, { status: 400 });
  }

  try {
    await sendContactViaTelegram({
      name: name.trim(),
      callbackMethod,
      callbackValue: callbackValue.trim(),
      message: message.trim(),
    });
  } catch {
    // Never leak Telegram internals (bot token, chat id, status detail) to the client.
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
