import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
const PORT = 11435;

app.post("/api/generate", (req, res) => {
  res.json({
    model: req.body.model || "mock-model",
    created_at: new Date().toISOString(),
    response: "This is a mock LLM response.",
    done: true,
  });
});

app.post("/api/chat", (req, res) => {
  res.json({
    model: req.body.model || "mock-model",
    created_at: new Date().toISOString(),
    message: {
      role: "assistant",
      content: "HI! I am an Ollama mock and I always give this answer :)",
    },
    done: true,
  });
});

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
  console.log(`✅ Mock Ollama API running in http://localhost:${PORT}`);
});
