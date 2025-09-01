import dotenv from "@dotenvx/dotenvx";

const SPINNER_FRAMES = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];

/**
 * Start a spinner that updates the text every 100ms.
 *
 * @param renderText - A function that returns the text to display.
 * @returns A function to stop the spinner.
 */
export function spinner(renderText: () => string): () => void {
    let frameIndex = 0;
    const interval = setInterval(() => {
        const frame = SPINNER_FRAMES[frameIndex++ % SPINNER_FRAMES.length];
        const text = `${frame} ${renderText()}`;
        if (typeof process.stdout.clearLine === "function") {
            process.stdout.clearLine(0);
            process.stdout.cursorTo(0);
        }
        process.stdout.write(text);
    }, 100);

    return () => {
        clearInterval(interval);
        if (typeof process.stdout.clearLine === "function") {
            process.stdout.clearLine(0);
            process.stdout.cursorTo(0);
        }
    };
}

/**
 * Load environment variables from .env file.
 */
export function env() {
    dotenv.config({ path: [__dirname + "/.env", ".env"] });
}
