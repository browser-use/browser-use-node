# Users

## Me

Types:

- <code><a href="./src/resources/users/me/me.ts">MeRetrieveResponse</a></code>

Methods:

- <code title="get /users/me">client.users.me.<a href="./src/resources/users/me/me.ts">retrieve</a>() -> MeRetrieveResponse</code>

### Files

Types:

- <code><a href="./src/resources/users/me/files.ts">FileCreatePresignedURLResponse</a></code>

Methods:

- <code title="post /users/me/files/presigned-url">client.users.me.files.<a href="./src/resources/users/me/files.ts">createPresignedURL</a>({ ...params }) -> FileCreatePresignedURLResponse</code>

# Tasks

Types:

- <code><a href="./src/resources/tasks.ts">FileView</a></code>
- <code><a href="./src/resources/tasks.ts">LlmModel</a></code>
- <code><a href="./src/resources/tasks.ts">TaskItemView</a></code>
- <code><a href="./src/resources/tasks.ts">TaskStatus</a></code>
- <code><a href="./src/resources/tasks.ts">TaskStepView</a></code>
- <code><a href="./src/resources/tasks.ts">TaskView</a></code>
- <code><a href="./src/resources/tasks.ts">TaskListResponse</a></code>
- <code><a href="./src/resources/tasks.ts">TaskGetLogsResponse</a></code>
- <code><a href="./src/resources/tasks.ts">TaskGetOutputFileResponse</a></code>
- <code><a href="./src/resources/tasks.ts">TaskGetUserUploadedFileResponse</a></code>

Methods:

- <code title="post /tasks">client.tasks.<a href="./src/resources/tasks.ts">create</a>({ ...params }) -> TaskView</code>
- <code title="get /tasks/{task_id}">client.tasks.<a href="./src/resources/tasks.ts">retrieve</a>(taskID) -> TaskView</code>
- <code title="patch /tasks/{task_id}">client.tasks.<a href="./src/resources/tasks.ts">update</a>(taskID, { ...params }) -> TaskView</code>
- <code title="get /tasks">client.tasks.<a href="./src/resources/tasks.ts">list</a>({ ...params }) -> TaskListResponse</code>
- <code title="get /tasks/{task_id}/logs">client.tasks.<a href="./src/resources/tasks.ts">getLogs</a>(taskID) -> TaskGetLogsResponse</code>
- <code title="get /tasks/{task_id}/output-files/{file_id}">client.tasks.<a href="./src/resources/tasks.ts">getOutputFile</a>(fileID, { ...params }) -> TaskGetOutputFileResponse</code>
- <code title="get /tasks/{task_id}/user-uploaded-files/{file_id}">client.tasks.<a href="./src/resources/tasks.ts">getUserUploadedFile</a>(fileID, { ...params }) -> TaskGetUserUploadedFileResponse</code>

# Sessions

Types:

- <code><a href="./src/resources/sessions/sessions.ts">SessionStatus</a></code>
- <code><a href="./src/resources/sessions/sessions.ts">SessionView</a></code>
- <code><a href="./src/resources/sessions/sessions.ts">SessionListResponse</a></code>

Methods:

- <code title="get /sessions/{session_id}">client.sessions.<a href="./src/resources/sessions/sessions.ts">retrieve</a>(sessionID, { ...params }) -> SessionView</code>
- <code title="patch /sessions/{session_id}">client.sessions.<a href="./src/resources/sessions/sessions.ts">update</a>(sessionID, { ...params }) -> SessionView</code>
- <code title="get /sessions">client.sessions.<a href="./src/resources/sessions/sessions.ts">list</a>({ ...params }) -> SessionListResponse</code>
- <code title="delete /sessions/{session_id}">client.sessions.<a href="./src/resources/sessions/sessions.ts">delete</a>(sessionID) -> void</code>

## PublicShare

Types:

- <code><a href="./src/resources/sessions/public-share.ts">ShareView</a></code>

Methods:

- <code title="post /sessions/{session_id}/public-share">client.sessions.publicShare.<a href="./src/resources/sessions/public-share.ts">create</a>(sessionID) -> ShareView</code>
- <code title="get /sessions/{session_id}/public-share">client.sessions.publicShare.<a href="./src/resources/sessions/public-share.ts">retrieve</a>(sessionID) -> ShareView</code>
- <code title="delete /sessions/{session_id}/public-share">client.sessions.publicShare.<a href="./src/resources/sessions/public-share.ts">delete</a>(sessionID) -> void</code>

# BrowserProfiles

Types:

- <code><a href="./src/resources/browser-profiles.ts">BrowserProfileView</a></code>
- <code><a href="./src/resources/browser-profiles.ts">ProxyCountryCode</a></code>
- <code><a href="./src/resources/browser-profiles.ts">BrowserProfileListResponse</a></code>

Methods:

- <code title="post /browser-profiles">client.browserProfiles.<a href="./src/resources/browser-profiles.ts">create</a>({ ...params }) -> BrowserProfileView</code>
- <code title="get /browser-profiles/{profile_id}">client.browserProfiles.<a href="./src/resources/browser-profiles.ts">retrieve</a>(profileID) -> BrowserProfileView</code>
- <code title="patch /browser-profiles/{profile_id}">client.browserProfiles.<a href="./src/resources/browser-profiles.ts">update</a>(profileID, { ...params }) -> BrowserProfileView</code>
- <code title="get /browser-profiles">client.browserProfiles.<a href="./src/resources/browser-profiles.ts">list</a>({ ...params }) -> BrowserProfileListResponse</code>
- <code title="delete /browser-profiles/{profile_id}">client.browserProfiles.<a href="./src/resources/browser-profiles.ts">delete</a>(profileID) -> void</code>

# AgentProfiles

Types:

- <code><a href="./src/resources/agent-profiles.ts">AgentProfileView</a></code>
- <code><a href="./src/resources/agent-profiles.ts">AgentProfileListResponse</a></code>

Methods:

- <code title="post /agent-profiles">client.agentProfiles.<a href="./src/resources/agent-profiles.ts">create</a>({ ...params }) -> AgentProfileView</code>
- <code title="get /agent-profiles/{profile_id}">client.agentProfiles.<a href="./src/resources/agent-profiles.ts">retrieve</a>(profileID) -> AgentProfileView</code>
- <code title="patch /agent-profiles/{profile_id}">client.agentProfiles.<a href="./src/resources/agent-profiles.ts">update</a>(profileID, { ...params }) -> AgentProfileView</code>
- <code title="get /agent-profiles">client.agentProfiles.<a href="./src/resources/agent-profiles.ts">list</a>({ ...params }) -> AgentProfileListResponse</code>
- <code title="delete /agent-profiles/{profile_id}">client.agentProfiles.<a href="./src/resources/agent-profiles.ts">delete</a>(profileID) -> void</code>
