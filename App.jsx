import { useState, useEffect, useRef } from "react";

function App() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi 👋 Tell me a song you like and I’ll recommend similar music."
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ song: input })
      });

      const data = await res.json();

const reply =
  data.recommendations?.length > 0
    ? `Here are some songs you might like:\n\n${data.recommendations
        .map(r => `🎵 ${r.song} — ${r.artist}`)
        .join("\n")}`
    : "Sorry, I couldn’t find recommendations for that song.";


      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: reply }
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "⚠️ Something went wrong." }
      ]);
    }

    setLoading(false);
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        background: "#0f0f11",
        color: "white",
        display: "flex",
        flexDirection: "column",
        fontFamily: "Segoe UI, system-ui, sans-serif"
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "20px",
          borderBottom: "1px solid #222",
          fontSize: "20px",
          fontWeight: "600"
        }}
      >
        🎧 AI Music Recommender
      </div>

      {/* Chat area – FULL WIDTH */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "30px"
        }}
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent:
                msg.role === "user" ? "flex-end" : "flex-start",
              marginBottom: "18px"
            }}
          >
            <div
              style={{
                background:
                  msg.role === "user" ? "#7c3aed" : "#1f1f23",
                padding: "14px 18px",
                borderRadius: "14px",
                maxWidth: "70%",
                whiteSpace: "pre-line",
                fontSize: "15px",
                lineHeight: "1.5"
              }}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div style={{ color: "#9ca3af" }}>AI is thinking…</div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input – FULL WIDTH */}
      <div
        style={{
          padding: "20px",
          borderTop: "1px solid #222",
          display: "flex",
          gap: "10px"
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a song name…"
          style={{
            flex: 1,
            padding: "14px",
            borderRadius: "12px",
            border: "none",
            background: "#1f1f23",
            color: "white",
            fontSize: "16px"
          }}
        />
        <button
          onClick={sendMessage}
          style={{
            padding: "14px 24px",
            borderRadius: "12px",
            background: "#7c3aed",
            color: "white",
            border: "none",
            fontSize: "16px",
            cursor: "pointer"
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default App;

