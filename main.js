import express from "express";
import cors from "cors";
import  { generateTokens }  from "./utils.js";

const app = express();
app.use(express.json());
app.use(cors());
const PORT = 11435;

function withDelay(handler) {
  return (req, res) => {
    const responseTime = parseInt(req.body.responseTime) || 0;
    setTimeout(() => handler(req, res), responseTime);
  };
}

app.post("/api/generate", withDelay((req, res) => {
  const tokens = parseInt(req.body.tokens) || 10;
  res.json({
    model: req.body.model || "mock-model",
    created_at: new Date().toISOString(),
    response: generateTokens(tokens),
    done: true,
  });
}));

app.post("/api/chat", withDelay((req, res) => {
  const tokens = parseInt(req.body.tokens) || 10;
  res.json({
    model: req.body.model || "mock-model",
    created_at: new Date().toISOString(),
    message: {
      role: "assistant",
      content: generateTokens(tokens),
    },
    done: true,
  });
}));

app.get("/api/tags", (req, res) => {
  res.json({
    models: [
      { name: "mock-model:latest", size: 123456, modified_at: new Date().toISOString() },
      { name: "llama2:7b", size: 7654321, modified_at: new Date().toISOString() },
    ],
  });
});

app.post("/api/pull", (req, res) => {
  res.json({ status: "success", model: req.body.name || "mock-model" });
});

app.post("/api/push", (req, res) => {
  res.json({ status: "success", model: req.body.name || "mock-model" });
});

app.delete("/api/delete", (req, res) => {
  res.json({ status: "deleted", model: req.body.name || "mock-model" });
});

app.listen(PORT, () => {
  console.log(`✅ Mock Ollama API running at http://localhost:${PORT}`);
});
