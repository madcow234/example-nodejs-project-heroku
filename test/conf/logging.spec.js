import { doesNotThrow } from "assert";

describe("/src/conf/logging.js", () => {
  describe("writing a message to a defined logger", () => {
    const log = require("../../src/conf/logging")(__filename);
    it("should not throw any errors", () => {
      doesNotThrow(() => log.info, Error);
    });
  });
});
