const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

//accepts a list of tasks and returns prioritized suggestions
exports.autoPrioritize = async (req, res) => {
  try {
    const tasks = req.body.tasks;

    if (!Array.isArray(tasks) || tasks.length === 0) {
      return res
        .status(400)
        .json({ error: "Tasks must be a non-empty array." });
    }

    const taskList = tasks
      .map((task, index) => `${index + 1}. ${task.title} - ${task.description}`)
      .join("\n");

    const completion = await openai.chat.completions.create({
      model: "qwen/qwen3-235b-a22b-07-25:free",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that prioritizes tasks by urgency and importance.",
        },
        {
          role: "user",
          content: `Prioritize the following tasks:\n\n${taskList}`,
        },
      ],
    });

    const result = completion.choices?.[0]?.message?.content;

    if (!result) {
      return res.status(500).json({ error: "No response from AI." });
    }

    res.json({ prioritized: result });
  } catch (error) {
    console.error("OpenRouter AI error:", error);
    res.status(500).json({
      error: "AI error",
      detail:
        error?.response?.data?.error?.message ||
        error.message ||
        "Unknown error",
    });
  }
};
