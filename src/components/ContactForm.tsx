"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import type { CallbackMethod, Dictionary } from "@/content/types";

const CALLBACK_METHODS: CallbackMethod[] = ["whatsapp", "telegram", "email"];

type Status = "idle" | "sending" | "success" | "error";

export function ContactForm({ dictionary }: { dictionary: Dictionary["contact"] }) {
  const [name, setName] = useState("");
  const [callbackMethod, setCallbackMethod] = useState<CallbackMethod>("whatsapp");
  const [callbackValue, setCallbackValue] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name.trim() || !message.trim() || !callbackValue.trim()) {
      setStatus("error");
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, callbackMethod, callbackValue, message }),
      });
      if (!response.ok) throw new Error("request failed");
      setStatus("success");
      setName("");
      setCallbackValue("");
      setMessage("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>{dictionary.formHeading}</h3>

      <div className="form-field">
        <label htmlFor="contact-name">{dictionary.nameLabel}</label>
        <input
          id="contact-name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={dictionary.namePlaceholder}
        />
      </div>

      <div className="form-field">
        <label htmlFor="contact-method">{dictionary.methodLabel}</label>
        <select
          id="contact-method"
          value={callbackMethod}
          onChange={(e) => setCallbackMethod(e.target.value as CallbackMethod)}
        >
          {CALLBACK_METHODS.map((method) => (
            <option key={method} value={method}>
              {dictionary.methodOptions[method]}
            </option>
          ))}
        </select>
      </div>

      <div className="form-field">
        <label htmlFor="contact-value">{dictionary.valueLabel[callbackMethod]}</label>
        <input
          id="contact-value"
          type="text"
          required
          value={callbackValue}
          onChange={(e) => setCallbackValue(e.target.value)}
          placeholder={dictionary.valuePlaceholder[callbackMethod]}
        />
      </div>

      <div className="form-field">
        <label htmlFor="contact-message">{dictionary.messageLabel}</label>
        <textarea
          id="contact-message"
          required
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={dictionary.messagePlaceholder}
        />
      </div>

      <button type="submit" className="btn btn--primary" disabled={status === "sending"}>
        {status === "sending" ? dictionary.sending : dictionary.submit}
      </button>

      <p className="form-note mt-4">{dictionary.helperNote}</p>

      {status === "success" && (
        <p className="form-status mt-4" data-state="success" role="status">
          {dictionary.successMessage}
        </p>
      )}
      {status === "error" && (
        <p className="form-status mt-4" data-state="error" role="alert">
          {dictionary.errorMessage}
        </p>
      )}
    </form>
  );
}
