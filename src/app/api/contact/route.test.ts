import { afterEach, beforeEach, expect, mock, test } from "bun:test";

// "server-only" throws when imported outside Next's own server-component build step (which is
// what actually enforces the boundary in production); stub it so lib/telegram.ts can be unit
// tested here without a full Next build.
mock.module("server-only", () => ({}));

const { POST } = await import("./route");

const ORIGINAL_ENV = { ...process.env };
let fetchMock: ReturnType<typeof mock>;

function request(body: unknown): Request {
  return new Request("http://localhost/api/contact", {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });
}

beforeEach(() => {
  process.env.BOT_TOKEN = "test-token";
  process.env.CHAT_ID = "test-chat";
  fetchMock = mock(() => Promise.resolve(new Response(null, { status: 200 })));
  // @ts-expect-error — stubbing global fetch for the test, restored in afterEach
  globalThis.fetch = fetchMock;
});

afterEach(() => {
  process.env = { ...ORIGINAL_ENV };
});

test("rejects an empty name (400 invalid_name)", async () => {
  const res = await POST(
    request({ name: "", callbackMethod: "email", callbackValue: "a@b.com", message: "hi" }),
  );
  expect(res.status).toBe(400);
  expect((await res.json()).error).toBe("invalid_name");
});

test("rejects an empty message (400 invalid_message)", async () => {
  const res = await POST(
    request({ name: "Test", callbackMethod: "email", callbackValue: "a@b.com", message: "" }),
  );
  expect(res.status).toBe(400);
  expect((await res.json()).error).toBe("invalid_message");
});

test("rejects an unknown callback method (400 invalid_callback_method)", async () => {
  const res = await POST(
    request({ name: "Test", callbackMethod: "carrier_pigeon", callbackValue: "x", message: "hi" }),
  );
  expect(res.status).toBe(400);
  expect((await res.json()).error).toBe("invalid_callback_method");
});

test("rejects a malformed WhatsApp number (400 invalid_callback_value)", async () => {
  const res = await POST(
    request({
      name: "Test",
      callbackMethod: "whatsapp",
      callbackValue: "not-a-number",
      message: "hi",
    }),
  );
  expect(res.status).toBe(400);
  expect((await res.json()).error).toBe("invalid_callback_value");
});

test("rejects a malformed email address (400 invalid_callback_value)", async () => {
  const res = await POST(
    request({
      name: "Test",
      callbackMethod: "email",
      callbackValue: "not-an-email",
      message: "hi",
    }),
  );
  expect(res.status).toBe(400);
  expect((await res.json()).error).toBe("invalid_callback_value");
});

test("accepts a valid submission and calls the Telegram API with the composed message", async () => {
  const res = await POST(
    request({
      name: "Test Visitor",
      callbackMethod: "whatsapp",
      callbackValue: "+1 234 567 8900",
      message: "Hello there",
    }),
  );
  expect(res.status).toBe(200);
  expect(fetchMock).toHaveBeenCalledTimes(1);
  const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
  expect(url).toBe("https://api.telegram.org/bottest-token/sendMessage");
  const body = JSON.parse(init.body as string);
  expect(body.chat_id).toBe("test-chat");
  expect(body.text).toContain("Test Visitor");
  expect(body.text).toContain("+1 234 567 8900");
});

test("returns a generic 502 and never leaks Telegram's error detail when Telegram fails", async () => {
  fetchMock.mockImplementation(() =>
    Promise.resolve(new Response("upstream details", { status: 500 })),
  );
  const res = await POST(
    request({ name: "Test", callbackMethod: "email", callbackValue: "a@b.com", message: "hi" }),
  );
  expect(res.status).toBe(502);
  const json = (await res.json()) as { error: string };
  expect(json.error).toBe("send_failed");
  expect(JSON.stringify(json)).not.toContain("upstream details");
  expect(JSON.stringify(json)).not.toContain("test-token");
});

test("returns 502 without calling Telegram when BOT_TOKEN/CHAT_ID are not configured", async () => {
  delete process.env.BOT_TOKEN;
  const res = await POST(
    request({ name: "Test", callbackMethod: "email", callbackValue: "a@b.com", message: "hi" }),
  );
  expect(res.status).toBe(502);
  expect(fetchMock).not.toHaveBeenCalled();
});

test("rejects a non-JSON body (400 invalid_body)", async () => {
  const res = await POST(
    new Request("http://localhost/api/contact", { method: "POST", body: "not json" }),
  );
  expect(res.status).toBe(400);
  expect((await res.json()).error).toBe("invalid_body");
});
