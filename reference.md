# Reference
## Billing
<details><summary><code>client.billing.<a href="/src/api/resources/billing/client/Client.ts">getAccountBilling</a>() -> BrowserUse.AccountView</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Get authenticated account information including credit balance and account details.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.billing.getAccountBilling();

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**requestOptions:** `Billing.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## Tasks
<details><summary><code>client.tasks.<a href="/src/api/resources/tasks/client/Client.ts">listTasks</a>({ ...params }) -> BrowserUse.TaskListResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Get paginated list of AI agent tasks with optional filtering by session and status.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.tasks.listTasks();

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `BrowserUse.ListTasksTasksGetRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Tasks.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.tasks.<a href="/src/api/resources/tasks/client/Client.ts">createTask</a>({ ...params }) -> BrowserUse.TaskCreatedResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Create and start a new task.

You can either:
1. Start a new task without a sessionId (auto-creates a session with US proxy by default).
   Note: Tasks without a sessionId are one-off tasks that automatically close the session
   upon completion (keep_alive=false).
2. Start a new task in an existing session (reuse for follow-up tasks or custom configuration)

Important: Proxy configuration (proxyCountryCode) and other session settings (like keep_alive) are
session-level settings, not task-level settings. For full control over session configuration,
create a session first via POST /sessions with your desired settings, then pass that sessionId
when creating tasks.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.tasks.createTask({
    task: "task"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `BrowserUse.CreateTaskRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Tasks.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.tasks.<a href="/src/api/resources/tasks/client/Client.ts">getTask</a>({ ...params }) -> BrowserUse.TaskView</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Get detailed task information including status, progress, steps, and file outputs.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.tasks.getTask({
    task_id: "task_id"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `BrowserUse.GetTaskTasksTaskIdGetRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Tasks.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.tasks.<a href="/src/api/resources/tasks/client/Client.ts">updateTask</a>({ ...params }) -> BrowserUse.TaskView</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Control task execution with stop, pause, resume, or stop task and session actions.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.tasks.updateTask({
    task_id: "task_id",
    action: "stop"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `BrowserUse.UpdateTaskRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Tasks.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.tasks.<a href="/src/api/resources/tasks/client/Client.ts">getTaskStatus</a>({ ...params }) -> BrowserUse.TaskStatusView</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Lightweight endpoint optimized for polling task status.

Returns only the task status, output, and cost without loading steps,
files, or session details. Use this endpoint for efficient polling
instead of GET /tasks/{task_id}.

Recommended polling pattern:
1. POST /tasks to create a task
2. Poll GET /tasks/{task_id}/status until status is 'finished' or 'stopped'
3. GET /tasks/{task_id} once at the end for full details including steps
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.tasks.getTaskStatus({
    task_id: "task_id"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `BrowserUse.GetTaskStatusTasksTaskIdStatusGetRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Tasks.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.tasks.<a href="/src/api/resources/tasks/client/Client.ts">getTaskLogs</a>({ ...params }) -> BrowserUse.TaskLogFileResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Get secure download URL for task execution logs with step-by-step details.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.tasks.getTaskLogs({
    task_id: "task_id"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `BrowserUse.GetTaskLogsTasksTaskIdLogsGetRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Tasks.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## Sessions
<details><summary><code>client.sessions.<a href="/src/api/resources/sessions/client/Client.ts">listSessions</a>({ ...params }) -> BrowserUse.SessionListResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Get paginated list of AI agent sessions with optional status filtering.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.sessions.listSessions();

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `BrowserUse.ListSessionsSessionsGetRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Sessions.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.sessions.<a href="/src/api/resources/sessions/client/Client.ts">createSession</a>({ ...params }) -> BrowserUse.SessionItemView</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Create a new session with a new task.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.sessions.createSession();

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `BrowserUse.CreateSessionRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Sessions.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.sessions.<a href="/src/api/resources/sessions/client/Client.ts">getSession</a>({ ...params }) -> BrowserUse.SessionView</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Get detailed session information including status, URLs, and task details.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.sessions.getSession({
    session_id: "session_id"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `BrowserUse.GetSessionSessionsSessionIdGetRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Sessions.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.sessions.<a href="/src/api/resources/sessions/client/Client.ts">deleteSession</a>({ ...params }) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Delete a session with all its tasks.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.sessions.deleteSession({
    session_id: "session_id"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `BrowserUse.DeleteSessionSessionsSessionIdDeleteRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Sessions.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.sessions.<a href="/src/api/resources/sessions/client/Client.ts">updateSession</a>({ ...params }) -> BrowserUse.SessionView</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Stop a session and all its running tasks.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.sessions.updateSession({
    session_id: "session_id",
    action: "stop"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `BrowserUse.UpdateSessionRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Sessions.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.sessions.<a href="/src/api/resources/sessions/client/Client.ts">getSessionPublicShare</a>({ ...params }) -> BrowserUse.ShareView</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Get public share information including URL and usage statistics.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.sessions.getSessionPublicShare({
    session_id: "session_id"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `BrowserUse.GetSessionPublicShareSessionsSessionIdPublicShareGetRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Sessions.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.sessions.<a href="/src/api/resources/sessions/client/Client.ts">createSessionPublicShare</a>({ ...params }) -> BrowserUse.ShareView</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Create or return existing public share for a session.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.sessions.createSessionPublicShare({
    session_id: "session_id"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `BrowserUse.CreateSessionPublicShareSessionsSessionIdPublicSharePostRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Sessions.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.sessions.<a href="/src/api/resources/sessions/client/Client.ts">deleteSessionPublicShare</a>({ ...params }) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Remove public share for a session.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.sessions.deleteSessionPublicShare({
    session_id: "session_id"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `BrowserUse.DeleteSessionPublicShareSessionsSessionIdPublicShareDeleteRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Sessions.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## Files
<details><summary><code>client.files.<a href="/src/api/resources/files/client/Client.ts">agentSessionUploadFilePresignedUrl</a>({ ...params }) -> BrowserUse.UploadFilePresignedUrlResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Generate a secure presigned URL for uploading files to an agent session.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.files.agentSessionUploadFilePresignedUrl({
    session_id: "session_id",
    body: {
        fileName: "fileName",
        contentType: "image/jpg",
        sizeBytes: 1
    }
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `BrowserUse.AgentSessionUploadFilePresignedUrlFilesSessionsSessionIdPresignedUrlPostRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Files.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.files.<a href="/src/api/resources/files/client/Client.ts">browserSessionUploadFilePresignedUrl</a>({ ...params }) -> BrowserUse.UploadFilePresignedUrlResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Generate a secure presigned URL for uploading files to a browser session.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.files.browserSessionUploadFilePresignedUrl({
    session_id: "session_id",
    body: {
        fileName: "fileName",
        contentType: "image/jpg",
        sizeBytes: 1
    }
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `BrowserUse.BrowserSessionUploadFilePresignedUrlFilesBrowsersSessionIdPresignedUrlPostRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Files.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.files.<a href="/src/api/resources/files/client/Client.ts">getTaskOutputFilePresignedUrl</a>({ ...params }) -> BrowserUse.TaskOutputFileResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Get secure download URL for an output file generated by the AI agent.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.files.getTaskOutputFilePresignedUrl({
    task_id: "task_id",
    file_id: "file_id"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `BrowserUse.GetTaskOutputFilePresignedUrlFilesTasksTaskIdOutputFilesFileIdGetRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Files.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## Profiles
<details><summary><code>client.profiles.<a href="/src/api/resources/profiles/client/Client.ts">listProfiles</a>({ ...params }) -> BrowserUse.ProfileListResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Get paginated list of profiles.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.profiles.listProfiles();

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `BrowserUse.ListProfilesProfilesGetRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Profiles.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.profiles.<a href="/src/api/resources/profiles/client/Client.ts">createProfile</a>({ ...params }) -> BrowserUse.ProfileView</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Profiles allow you to preserve the state of the browser between tasks.

They are most commonly used to allow users to preserve the log-in state in the agent between tasks.
You'd normally create one profile per user and then use it for all their tasks.

You can create a new profile by calling this endpoint.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.profiles.createProfile();

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `BrowserUse.ProfileCreateRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Profiles.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.profiles.<a href="/src/api/resources/profiles/client/Client.ts">getProfile</a>({ ...params }) -> BrowserUse.ProfileView</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Get profile details.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.profiles.getProfile({
    profile_id: "profile_id"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `BrowserUse.GetProfileProfilesProfileIdGetRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Profiles.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.profiles.<a href="/src/api/resources/profiles/client/Client.ts">deleteBrowserProfile</a>({ ...params }) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Permanently delete a browser profile and its configuration.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.profiles.deleteBrowserProfile({
    profile_id: "profile_id"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `BrowserUse.DeleteBrowserProfileProfilesProfileIdDeleteRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Profiles.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.profiles.<a href="/src/api/resources/profiles/client/Client.ts">updateProfile</a>({ ...params }) -> BrowserUse.ProfileView</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Update a browser profile's information.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.profiles.updateProfile({
    profile_id: "profile_id"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `BrowserUse.ProfileUpdateRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Profiles.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## Browsers
<details><summary><code>client.browsers.<a href="/src/api/resources/browsers/client/Client.ts">listBrowserSessions</a>({ ...params }) -> BrowserUse.BrowserSessionListResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Get paginated list of browser sessions with optional status filtering.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.browsers.listBrowserSessions();

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `BrowserUse.ListBrowserSessionsBrowsersGetRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Browsers.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.browsers.<a href="/src/api/resources/browsers/client/Client.ts">createBrowserSession</a>({ ...params }) -> BrowserUse.BrowserSessionItemView</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Create a new browser session.

**Pricing:** Browser sessions are charged per hour with tiered pricing:
- Pay As You Go users: $0.06/hour
- Business/Scaleup subscribers: $0.03/hour (50% discount)

The full rate is charged upfront when the session starts.
When you stop the session, any unused time is automatically refunded proportionally.

Billing is rounded up to the minute (minimum 1 minute).
For example, if you stop a session after 30 minutes, you'll be refunded half the charged amount.

**Session Limits:**
- All users: Up to 4 hours per session
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.browsers.createBrowserSession();

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `BrowserUse.CreateBrowserSessionRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Browsers.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.browsers.<a href="/src/api/resources/browsers/client/Client.ts">getBrowserSession</a>({ ...params }) -> BrowserUse.BrowserSessionView</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Get detailed browser session information including status and URLs.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.browsers.getBrowserSession({
    session_id: "session_id"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `BrowserUse.GetBrowserSessionBrowsersSessionIdGetRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Browsers.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.browsers.<a href="/src/api/resources/browsers/client/Client.ts">updateBrowserSession</a>({ ...params }) -> BrowserUse.BrowserSessionView</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Stop a browser session.

**Refund:** When you stop a session, unused time is automatically refunded.
If the session ran for less than 1 hour, you'll receive a proportional refund.
Billing is ceil to the nearest minute (minimum 1 minute).
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.browsers.updateBrowserSession({
    session_id: "session_id",
    action: "stop"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `BrowserUse.UpdateBrowserSessionRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Browsers.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## Skills
<details><summary><code>client.skills.<a href="/src/api/resources/skills/client/Client.ts">listSkills</a>({ ...params }) -> BrowserUse.SkillListResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

List all skills owned by the authenticated project with optional filtering.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.skills.listSkills();

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `BrowserUse.ListSkillsSkillsGetRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Skills.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.skills.<a href="/src/api/resources/skills/client/Client.ts">createSkill</a>({ ...params }) -> BrowserUse.CreateSkillResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Create a new skill via automated generation.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.skills.createSkill({
    goal: "goal",
    agentPrompt: "agentPrompt"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `BrowserUse.CreateSkillRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Skills.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.skills.<a href="/src/api/resources/skills/client/Client.ts">getSkill</a>({ ...params }) -> BrowserUse.SkillResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Get details of a specific skill owned by the project.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.skills.getSkill({
    skill_id: "skill_id"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `BrowserUse.GetSkillSkillsSkillIdGetRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Skills.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.skills.<a href="/src/api/resources/skills/client/Client.ts">deleteSkill</a>({ ...params }) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Delete a skill owned by the project.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.skills.deleteSkill({
    skill_id: "skill_id"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `BrowserUse.DeleteSkillSkillsSkillIdDeleteRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Skills.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.skills.<a href="/src/api/resources/skills/client/Client.ts">updateSkill</a>({ ...params }) -> BrowserUse.SkillResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Update skill metadata (name, description, enabled, etc.).
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.skills.updateSkill({
    skill_id: "skill_id"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `BrowserUse.UpdateSkillRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Skills.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.skills.<a href="/src/api/resources/skills/client/Client.ts">cancelGeneration</a>({ ...params }) -> BrowserUse.SkillResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Cancel the current in-progress generation for a skill.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.skills.cancelGeneration({
    skill_id: "skill_id"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `BrowserUse.CancelGenerationSkillsSkillIdCancelPostRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Skills.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.skills.<a href="/src/api/resources/skills/client/Client.ts">rollbackSkill</a>({ ...params }) -> BrowserUse.SkillResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Rollback to the previous version (cannot be undone).
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.skills.rollbackSkill({
    skill_id: "skill_id"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `BrowserUse.RollbackSkillSkillsSkillIdRollbackPostRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Skills.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.skills.<a href="/src/api/resources/skills/client/Client.ts">executeSkill</a>({ ...params }) -> BrowserUse.ExecuteSkillResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Execute a skill with the provided parameters.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.skills.executeSkill({
    skill_id: "skill_id",
    body: {}
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `BrowserUse.ExecuteSkillSkillsSkillIdExecutePostRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Skills.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.skills.<a href="/src/api/resources/skills/client/Client.ts">refineSkill</a>({ ...params }) -> BrowserUse.RefineSkillResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Refine a skill based on feedback.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.skills.refineSkill({
    skill_id: "skill_id",
    feedback: "feedback"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `BrowserUse.RefineSkillRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Skills.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.skills.<a href="/src/api/resources/skills/client/Client.ts">listSkillExecutions</a>({ ...params }) -> BrowserUse.SkillExecutionListResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

List executions for a specific skill.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.skills.listSkillExecutions({
    skill_id: "skill_id"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `BrowserUse.ListSkillExecutionsSkillsSkillIdExecutionsGetRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Skills.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.skills.<a href="/src/api/resources/skills/client/Client.ts">getSkillExecutionOutput</a>({ ...params }) -> BrowserUse.SkillExecutionOutputResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Get presigned URL for downloading skill execution output.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.skills.getSkillExecutionOutput({
    skill_id: "skill_id",
    execution_id: "execution_id"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `BrowserUse.GetSkillExecutionOutputSkillsSkillIdExecutionsExecutionIdOutputGetRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Skills.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## SkillsMarketplace
<details><summary><code>client.skillsMarketplace.<a href="/src/api/resources/skillsMarketplace/client/Client.ts">listSkills</a>({ ...params }) -> BrowserUse.MarketplaceSkillListResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

List all public skills available in the marketplace with optional filtering.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.skillsMarketplace.listSkills();

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `BrowserUse.ListSkillsMarketplaceSkillsGetRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `SkillsMarketplace.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.skillsMarketplace.<a href="/src/api/resources/skillsMarketplace/client/Client.ts">getSkill</a>({ ...params }) -> BrowserUse.MarketplaceSkillResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Get details of a specific public skill from the marketplace.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.skillsMarketplace.getSkill({
    skill_slug: "skill_slug"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `BrowserUse.GetSkillMarketplaceSkillsSkillSlugGetRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `SkillsMarketplace.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.skillsMarketplace.<a href="/src/api/resources/skillsMarketplace/client/Client.ts">cloneSkill</a>({ ...params }) -> BrowserUse.SkillResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Clone a public marketplace skill to the user's project.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.skillsMarketplace.cloneSkill({
    skill_id: "skill_id"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `BrowserUse.CloneSkillMarketplaceSkillsSkillIdClonePostRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `SkillsMarketplace.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.skillsMarketplace.<a href="/src/api/resources/skillsMarketplace/client/Client.ts">executeSkill</a>({ ...params }) -> BrowserUse.ExecuteSkillResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Execute a skill with the provided parameters.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.skillsMarketplace.executeSkill({
    skill_id: "skill_id",
    body: {}
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `BrowserUse.ExecuteSkillMarketplaceSkillsSkillIdExecutePostRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `SkillsMarketplace.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>
