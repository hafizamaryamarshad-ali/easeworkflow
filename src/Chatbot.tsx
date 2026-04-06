"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPaperPlane, FaTimes } from "react-icons/fa";
import { useTheme } from "./theme/ThemeProvider";

interface ChatMessage {
  id: number;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

interface ChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

const SUGGESTED_QUESTIONS: string[] = [
  "How can I book an appointment?",
  "What services do you offer?",
  "Do you provide online consultation?",
  "What are your working hours?",
  "How secure is my data?",
  "Can I reschedule my appointment?",
  "Do you integrate with our existing EHR?",
  "How does automated reminders work?",
  "Can multiple providers use the system?",
  "Do you support multi-location clinics?",
  "How long does onboarding take?",
  "What does pricing look like?",
  "Can staff see upcoming appointments?",
  "Do you support telehealth workflows?",
  "Is patient data encrypted?",
  "Can I get a product demo?",
  "Do you offer support and training?",
  "Can patients complete intake forms online?",
  "How do cancellations and no-shows work?",
  "Can I connect this with my calendar?",
];

function formatTime(date: Date): string {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function Chatbot({ isOpen, onClose }: ChatbotProps) {
  const { theme } = useTheme();

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const isDark = theme === "dark";

  const colors = useMemo(
    () => ({
      panelBg: isDark
        ? "rgba(15,23,42,0.96)"
        : "rgba(248,250,252,0.96)",
      border: isDark
        ? "1px solid rgba(148,163,184,0.45)"
        : "1px solid rgba(148,163,184,0.3)",
      shadow: isDark
        ? "0 24px 60px rgba(15,23,42,0.95)"
        : "0 20px 55px rgba(15,23,42,0.25)",
      headerBg: isDark
        ? "linear-gradient(135deg,#0f172a,#020617)"
        : "linear-gradient(135deg,#eff6ff,#dbeafe)",
      headerText: isDark ? "#e5e7eb" : "#0f172a",
      userBubble: isDark ? "#0ea5e9" : "#2563eb",
      assistantBubble: isDark ? "#020617" : "#e5e7eb",
      suggestedBg: isDark ? "rgba(15,23,42,0.85)" : "rgba(241,245,249,0.9)",
      suggestedBorder: isDark
        ? "1px solid rgba(148,163,184,0.6)"
        : "1px solid rgba(148,163,184,0.5)",
      suggestedText: isDark ? "#e5e7eb" : "#0f172a",
      inputBg: isDark ? "rgba(15,23,42,0.9)" : "rgba(248,250,252,0.96)",
    }),
    [isDark]
  );

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        const input = document.getElementById("chatbot-input");
        if (input) {
          (input as HTMLInputElement).focus();
        }
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  const handleSend = async (text?: string) => {
    const content = (text ?? inputValue).trim();
    if (!content || isTyping) return;

    const userMessage: ChatMessage = {
      id: Date.now(),
      role: "user",
      content,
      timestamp: formatTime(new Date()),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputValue("");
    setErrorMessage(null);
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: updatedMessages.map((message) => ({
            role: message.role,
            content: message.content,
          })),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const message = errorData?.error || "Something went wrong. Please try again.";
        setErrorMessage(message);
        return;
      }

      const data = (await response.json()) as { reply?: string };
      if (!data.reply) {
        setErrorMessage("No response received from assistant.");
        return;
      }

      const assistantMessage: ChatMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content: data.reply,
        timestamp: formatTime(new Date()),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Chat send error", error);
      setErrorMessage("Unable to reach the assistant. Please check your connection and try again.");
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 60,
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-end",
              padding: "16px 16px 20px 16px",
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.96 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              style={{
                width: "min(420px, 100%)",
                maxHeight: "min(620px, calc(100vh - 104px))",
                borderRadius: 24,
                overflow: "hidden",
                background: colors.panelBg,
                border: colors.border,
                boxShadow: colors.shadow,
                backdropFilter: "blur(18px)",
                WebkitBackdropFilter: "blur(18px)",
                display: "flex",
                flexDirection: "column",
                pointerEvents: "auto",
              }}
            >
              {/* Header */}
              <div
                style={{
                  padding: "12px 16px",
                  background: colors.headerBg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.8rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: isDark ? "#9ca3af" : "#6b7280",
                    }}
                  >
                    Virtual Care
                  </span>
                  <span
                    style={{
                      fontWeight: 700,
                      fontSize: "1.01rem",
                      color: colors.headerText,
                    }}
                  >
                    AI Assistant
                  </span>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close chat"
                  style={{
                    border: "none",
                    borderRadius: 999,
                    width: 30,
                    height: 30,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    background: isDark
                      ? "rgba(15,23,42,0.9)"
                      : "rgba(248,250,252,0.95)",
                    color: isDark ? "#e5e7eb" : "#4b5563",
                  }}
                >
                  <FaTimes size={14} />
                </button>
              </div>

              {/* Messages */}
              <div
                style={{
                  padding: "12px 14px 8px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  height: 260,
                  overflowY: "auto",
                }}
              >
                {messages.length === 0 && (
                  <div
                    style={{
                      padding: "6px 10px 10px",
                      fontSize: "0.85rem",
                      color: isDark ? "#9ca3af" : "#4b5563",
                    }}
                  >
                    Ask anything about appointments, services or how EaseWorkflow
                    supports your clinic. You can start with one of the suggested
                    questions below.
                  </div>
                )}

                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    style={{
                      display: "flex",
                      justifyContent:
                        message.role === "user" ? "flex-end" : "flex-start",
                    }}
                  >
                    <div
                      style={{
                        maxWidth: "80%",
                        padding: "8px 11px 9px",
                        borderRadius:
                          message.role === "user"
                            ? "16px 16px 4px 16px"
                            : "16px 16px 16px 4px",
                        background:
                          message.role === "user"
                            ? colors.userBubble
                            : colors.assistantBubble,
                        color:
                          message.role === "user"
                            ? "#f9fafb"
                            : isDark
                            ? "#e5e7eb"
                            : "#0f172a",
                        fontSize: "0.9rem",
                        lineHeight: 1.4,
                        boxShadow:
                          message.role === "user"
                            ? "0 12px 30px rgba(37,99,235,0.35)"
                            : "0 10px 24px rgba(15,23,42,0.35)",
                      }}
                    >
                      <div>{message.content}</div>
                      <div
                        style={{
                          marginTop: 4,
                          fontSize: "0.7rem",
                          opacity: 0.8,
                          textAlign: message.role === "user" ? "right" : "left",
                        }}
                      >
                        {message.timestamp}
                      </div>
                    </div>
                  </motion.div>
                ))}

                {errorMessage && (
                  <div
                    style={{
                      marginTop: 2,
                      marginBottom: 4,
                      fontSize: "0.78rem",
                      color: "#f97373",
                    }}
                  >
                    {errorMessage}
                  </div>
                )}

                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    style={{ display: "flex", justifyContent: "flex-start" }}
                  >
                    <div
                      style={{
                        padding: "7px 10px",
                        borderRadius: "16px 16px 16px 4px",
                        background: colors.assistantBubble,
                        color: isDark ? "#e5e7eb" : "#0f172a",
                        fontSize: "0.8rem",
                      }}
                    >
                      AI is typing...
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Suggested questions */}
              <div
                style={{
                  padding: "6px 14px 10px",
                  borderTop: isDark
                    ? "1px solid rgba(30,64,175,0.5)"
                    : "1px solid rgba(191,219,254,0.9)",
                  background: isDark
                    ? "linear-gradient(135deg,rgba(15,23,42,0.98),rgba(15,23,42,0.96))"
                    : "linear-gradient(135deg,#f8fafc,#eff6ff)",
                }}
              >
                <div
                  style={{
                    fontSize: "0.78rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    color: isDark ? "#9ca3af" : "#64748b",
                    marginBottom: 6,
                  }}
                >
                  Suggested questions
                </div>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 6,
                    maxHeight: 96,
                    overflowY: "auto",
                  }}
                >
                  {SUGGESTED_QUESTIONS.map((question) => (
                    <button
                      key={question}
                      type="button"
                      onClick={() => handleSend(question)}
                      style={{
                        borderRadius: 999,
                        padding: "6px 10px",
                        fontSize: "0.78rem",
                        border: colors.suggestedBorder,
                        background: colors.suggestedBg,
                        color: colors.suggestedText,
                        cursor: "pointer",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input area */}
              <div
                style={{
                  padding: "10px 12px 12px",
                  borderTop: isDark
                    ? "1px solid rgba(30,64,175,0.5)"
                    : "1px solid rgba(209,213,219,0.9)",
                  background: colors.inputBg,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <input
                  id="chatbot-input"
                  type="text"
                  placeholder="Ask a question about your clinic..."
                  value={inputValue}
                  onChange={(event) => setInputValue(event.target.value)}
                  onKeyDown={handleKeyDown}
                  style={{
                    flex: 1,
                    borderRadius: 999,
                    border: "1px solid rgba(148,163,184,0.6)",
                    padding: "9px 12px",
                    fontSize: "0.9rem",
                    outline: "none",
                    background: isDark
                      ? "rgba(15,23,42,0.95)"
                      : "rgba(255,255,255,0.96)",
                    color: isDark ? "#e5e7eb" : "#0f172a",
                  }}
                />
                <button
                  type="button"
                  onClick={() => handleSend()}
                  aria-label="Send message"
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 999,
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "linear-gradient(135deg,#0ea5e9,#3b82f6)",
                    color: "#f9fafb",
                    boxShadow: "0 12px 30px rgba(37,99,235,0.45)",
                  }}
                >
                  <FaPaperPlane size={14} />
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
