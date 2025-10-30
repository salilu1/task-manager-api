import express from "express";
import taskRouter from "./routes/task.route";
import swaggerUi from "swagger-ui-express";
import swaggerDoc from "./swagger.json";

const app = express();

app.use(express.json());

// Routes
app.use("/api/tasks", taskRouter);

// Swagger docs
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

export default app;
