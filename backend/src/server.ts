import app from "./app.js";
import { config } from "./config/index.js";

app.listen(config.PORT, () => {
  console.log(`API listening on http://localhost:${config.PORT}`);
  console.log(`Swagger UI: http://localhost:${config.PORT}/api/docs`);
});
