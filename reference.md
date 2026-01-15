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
1. Start a new task without a sessionId (auto-creates a session with US proxy by default)
2. Start a new task in an existing session (reuse for follow-up tasks or custom configuration)

Important: Proxy configuration (proxyCountryCode) is a session-level setting, not a task-level setting.
To use a custom proxy location, create a session first via POST /sessions with your desired proxyCountryCode,
then pass that sessionId when creating tasks.
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

## Workflows
<details><summary><code>client.workflows.<a href="/src/api/resources/workflows/client/Client.ts">listWorkflows</a>({ ...params }) -> BrowserUse.WorkflowListResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Get paginated list of workflows with optional filtering.
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
await client.workflows.listWorkflows();

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

**request:** `BrowserUse.ListWorkflowsWorkflowsGetRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Workflows.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.workflows.<a href="/src/api/resources/workflows/client/Client.ts">createWorkflow</a>({ ...params }) -> BrowserUse.WorkflowResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Create a new workflow. The workflow YAML should be uploaded separately via the update endpoint.
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
await client.workflows.createWorkflow({
    name: "name"
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

**request:** `BrowserUse.WorkflowCreateRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Workflows.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.workflows.<a href="/src/api/resources/workflows/client/Client.ts">getWorkflow</a>({ ...params }) -> BrowserUse.WorkflowResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Get detailed workflow information including presigned URL to download YAML.
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
await client.workflows.getWorkflow({
    workflow_id: "workflow_id"
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

**request:** `BrowserUse.GetWorkflowWorkflowsWorkflowIdGetRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Workflows.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.workflows.<a href="/src/api/resources/workflows/client/Client.ts">deleteWorkflow</a>({ ...params }) -> BrowserUse.WorkflowResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Archive a workflow (soft delete).
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
await client.workflows.deleteWorkflow({
    workflow_id: "workflow_id"
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

**request:** `BrowserUse.DeleteWorkflowWorkflowsWorkflowIdDeleteRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Workflows.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.workflows.<a href="/src/api/resources/workflows/client/Client.ts">updateWorkflow</a>({ ...params }) -> BrowserUse.WorkflowResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Update workflow metadata.
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
await client.workflows.updateWorkflow({
    workflow_id: "workflow_id"
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

**request:** `BrowserUse.WorkflowUpdateRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Workflows.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.workflows.<a href="/src/api/resources/workflows/client/Client.ts">getWorkflowGenerationState</a>({ ...params }) -> BrowserUse.WorkflowGenerationStateView</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Get workflow generation state with live browser URL for polling.

This endpoint returns the current state of workflow generation including
the live browser URL (if available). It's designed to be polled every 2 seconds
during generation to show real-time browser activity in the frontend.
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
await client.workflows.getWorkflowGenerationState({
    workflow_id: "workflow_id"
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

**request:** `BrowserUse.GetWorkflowGenerationStateWorkflowsWorkflowIdGenerationStateGetRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Workflows.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.workflows.<a href="/src/api/resources/workflows/client/Client.ts">createWorkflowFromTask</a>({ ...params }) -> BrowserUse.WorkflowCreateFromTaskResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Create a workflow from an existing agent task's recorded history.

This endpoint creates a workflow by using the browser-use rerun history
feature. The task must have completed with history stored in S3.

The workflow creation process:
1. Creates a new workflow record in pending state
2. Triggers an Inngest event to process the task history
3. The Inngest handler downloads history, detects variables, and updates the workflow

Use GET /workflows/{workflow_id} to poll for creation completion.
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
await client.workflows.createWorkflowFromTask({
    name: "name",
    taskId: "taskId",
    sessionId: "sessionId"
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

**request:** `BrowserUse.WorkflowCreateFromTaskRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Workflows.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.workflows.<a href="/src/api/resources/workflows/client/Client.ts">getWorkflowYamlPresignedUrl</a>({ ...params }) -> BrowserUse.WorkflowYamlPresignedUploadResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Get a presigned URL to upload workflow YAML directly to S3 from the browser.

This avoids sending the YAML content through the backend, reducing latency
and avoiding KMS permission issues in local development.
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
await client.workflows.getWorkflowYamlPresignedUrl({
    workflow_id: "workflow_id",
    sizeBytes: 1
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

**request:** `BrowserUse.WorkflowYamlPresignedUploadRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Workflows.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.workflows.<a href="/src/api/resources/workflows/client/Client.ts">runWorkflow</a>({ ...params }) -> BrowserUse.WorkflowExecutionCreatedResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Execute a workflow asynchronously.

Returns execution ID immediately and processes in background via Inngest.
Use the GET /workflows/executions/{execution_id} endpoint to check status and retrieve results.
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
await client.workflows.runWorkflow({
    workflow_id: "workflow_id"
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

**request:** `BrowserUse.WorkflowExecuteRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Workflows.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.workflows.<a href="/src/api/resources/workflows/client/Client.ts">generateWorkflow</a>({ ...params }) -> BrowserUse.WorkflowGenerateResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Generate a workflow from a natural language task description.

This endpoint uses the workflow-use library's HealingService to:
1. Record browser interactions for the task
2. Convert interactions to a reusable workflow
3. Extract variables for parameterization
4. Save the generated YAML to S3

The generation happens asynchronously via the workflow_worker Lambda.
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
await client.workflows.generateWorkflow({
    workflow_id: "workflow_id",
    taskPrompt: "Go to github.com and search for browser-use"
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

**request:** `BrowserUse.WorkflowGenerateRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Workflows.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.workflows.<a href="/src/api/resources/workflows/client/Client.ts">getExecution</a>({ ...params }) -> BrowserUse.WorkflowExecutionResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Get detailed execution information including status, results, and costs.
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
await client.workflows.getExecution({
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

**request:** `BrowserUse.GetExecutionWorkflowsExecutionsExecutionIdGetRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Workflows.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.workflows.<a href="/src/api/resources/workflows/client/Client.ts">listWorkflowExecutions</a>({ ...params }) -> BrowserUse.WorkflowExecutionListResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Get paginated list of executions for a specific workflow.
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
await client.workflows.listWorkflowExecutions({
    workflow_id: "workflow_id"
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

**request:** `BrowserUse.ListWorkflowExecutionsWorkflowsWorkflowIdExecutionsGetRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Workflows.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.workflows.<a href="/src/api/resources/workflows/client/Client.ts">listAllExecutions</a>({ ...params }) -> BrowserUse.WorkflowExecutionListResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Get paginated list of all workflow executions for a project.
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
await client.workflows.listAllExecutions();

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

**request:** `BrowserUse.ListAllExecutionsWorkflowsExecutionsGetRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Workflows.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.workflows.<a href="/src/api/resources/workflows/client/Client.ts">cancelExecution</a>({ ...params }) -> BrowserUse.WorkflowExecutionResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Cancel a pending or running workflow execution.
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
await client.workflows.cancelExecution({
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

**request:** `BrowserUse.CancelExecutionWorkflowsExecutionsExecutionIdCancelPatchRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Workflows.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.workflows.<a href="/src/api/resources/workflows/client/Client.ts">getExecutionLogs</a>({ ...params }) -> BrowserUse.WorkflowExecutionLogResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Get presigned URL to download execution logs.
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
await client.workflows.getExecutionLogs({
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

**request:** `BrowserUse.GetExecutionLogsWorkflowsExecutionsExecutionIdLogsGetRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Workflows.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.workflows.<a href="/src/api/resources/workflows/client/Client.ts">getExecutionState</a>({ ...params }) -> BrowserUse.WorkflowExecutionStateView</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Get workflow execution state with steps for live UI polling.

This endpoint returns the current state of a workflow execution including all steps
with their details. It's designed to be polled every 2 seconds during execution
to show real-time progress in the frontend.
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
await client.workflows.getExecutionState({
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

**request:** `BrowserUse.GetExecutionStateWorkflowsExecutionsExecutionIdStateGetRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Workflows.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.workflows.<a href="/src/api/resources/workflows/client/Client.ts">getExecutionMedia</a>({ ...params }) -> BrowserUse.WorkflowExecutionMediaView</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Get workflow execution media (screenshots) with presigned URLs.

This endpoint returns media URLs for completed executions. Screenshots
are returned with presigned S3 URLs for direct access from the frontend.
Should be called when execution status is 'completed', 'failed', or 'cancelled'.
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
await client.workflows.getExecutionMedia({
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

**request:** `BrowserUse.GetExecutionMediaWorkflowsExecutionsExecutionIdMediaGetRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Workflows.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>
