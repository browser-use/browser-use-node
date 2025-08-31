import { BrowserUseClient as FernClient } from "../Client.js";
import { BrowserUseTasks } from "./api/BrowserUseTasks.js";

export class BrowserUseClient extends FernClient {
    protected _tasks: BrowserUseTasks | undefined;

    public get tasks(): BrowserUseTasks {
        return (this._tasks ??= new BrowserUseTasks(this._options));
    }
}
