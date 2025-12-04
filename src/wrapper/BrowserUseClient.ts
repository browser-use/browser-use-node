import { BrowserUseClient as FernClient } from "../Client.js";
import { BrowserUseTasks } from "./api/BrowserUseTasks.js";

export class BrowserUseClient extends FernClient {
    protected override _tasks: BrowserUseTasks | undefined;

    public override get tasks(): BrowserUseTasks {
        return (this._tasks ??= new BrowserUseTasks(this._options));
    }
}
