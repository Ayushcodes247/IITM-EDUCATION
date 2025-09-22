import app from "./app.js";
import { createServer } from "http";

// Use environment PORT or fallback to 3000
const PORT = process.env.PORT || 3000;

// Create an HTTP server using the Express app
const server = createServer(app);

// Start listening on the specified port
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Optional: Handle server errors globally
server.on("error", (err) => {
  console.error("Server error:", err);
  process.exit(1); // Exit process on server error
});
