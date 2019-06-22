import { initApplication } from "./conf/bootstrap";

initApplication();

// Temporarily used to keep Heroku alive
const log = require("./conf/logging")(__filename);
setInterval(() => {
  log.info("Hello, World!");
}, 3000);
