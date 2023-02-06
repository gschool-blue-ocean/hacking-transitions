// TO RUN THIS TEST:
// - Run an "npm install" from root project directory
// - Navigate to .env file and uncomment the DEV Local docker container DB URL, then comment out the PRODUCTION Render DB URL
// - Run "docker-compose up --build"
// - CD into the "tests" directory
// - Run "npm test" to test if the app will execute a Next Build without failing

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
