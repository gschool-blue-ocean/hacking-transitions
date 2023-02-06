// Run an "npm install" from root project directory first!
// To run this test, ensure that your docker containers are up and running ("docker-compose up")
// and your .env file has the DEV Local docker container DB URL uncommented
// and the PRODUCTION Render DB URL is commented out.
// Then CD into the "tests" directory, then run "npm test"

const { execSync } = require("child_process");

test("Next.js application builds successfully", () => {
  let output;
  try {
    output = execSync("npm run build", {
      stdio: ["pipe", "pipe", "ignore"],
    });
  } catch (error) {
    throw new Error(`Build failed: ${error.stderr}`);
  }
  expect(output.toString()).toBeTruthy();
});
