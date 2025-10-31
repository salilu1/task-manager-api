import express from "express";
import taskRouter from "./routes/task.route";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger";

const app = express();
app.use(express.json());

app.use("/api/tasks", taskRouter);

// Correct Swagger setup
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// src/index.ts
app.get("/swagger.json", (req, res) => {
  res.json(swaggerSpec);
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
