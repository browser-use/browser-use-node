# Tasks

Types:

- <code><a href="./src/resources/tasks.ts">LlmModel</a></code>
- <code><a href="./src/resources/tasks.ts">TaskStatus</a></code>
- <code><a href="./src/resources/tasks.ts">TaskView</a></code>
- <code><a href="./src/resources/tasks.ts">TaskRetrieveResponse</a></code>
- <code><a href="./src/resources/tasks.ts">TaskListResponse</a></code>
- <code><a href="./src/resources/tasks.ts">TaskRetrieveLogsResponse</a></code>
- <code><a href="./src/resources/tasks.ts">TaskRetrieveOutputFileResponse</a></code>

Methods:

- <code title="post /tasks">client.tasks.<a href="./src/resources/tasks.ts">create</a>({ ...params }) -> TaskView</code>
- <code title="get /tasks/{task_id}">client.tasks.<a href="./src/resources/tasks.ts">retrieve</a>(taskID, { ...params }) -> TaskRetrieveResponse</code>
- <code title="patch /tasks/{task_id}">client.tasks.<a href="./src/resources/tasks.ts">update</a>(taskID, { ...params }) -> TaskView</code>
- <code title="get /tasks">client.tasks.<a href="./src/resources/tasks.ts">list</a>({ ...params }) -> TaskListResponse</code>
- <code title="get /tasks/{task_id}/logs">client.tasks.<a href="./src/resources/tasks.ts">retrieveLogs</a>(taskID) -> TaskRetrieveLogsResponse</code>
- <code title="get /tasks/{task_id}/output-files/{file_name}">client.tasks.<a href="./src/resources/tasks.ts">retrieveOutputFile</a>(fileName, { ...params }) -> TaskRetrieveOutputFileResponse</code>

# Sessions

Types:

- <code><a href="./src/resources/sessions/sessions.ts">SessionStatus</a></code>
- <code><a href="./src/resources/sessions/sessions.ts">SessionView</a></code>
- <code><a href="./src/resources/sessions/sessions.ts">SessionListResponse</a></code>

Methods:

- <code title="get /sessions/{session_id}">client.sessions.<a href="./src/resources/sessions/sessions.ts">retrieve</a>(sessionID, { ...params }) -> SessionView</code>
- <code title="patch /sessions/{session_id}">client.sessions.<a href="./src/resources/sessions/sessions.ts">update</a>(sessionID, { ...params }) -> SessionView</code>
- <code title="get /sessions">client.sessions.<a href="./src/resources/sessions/sessions.ts">list</a>({ ...params }) -> SessionListResponse</code>

## PublicShare

Types:

- <code><a href="./src/resources/sessions/public-share.ts">ShareView</a></code>
- <code><a href="./src/resources/sessions/public-share.ts">PublicShareDeleteResponse</a></code>

Methods:

- <code title="post /sessions/{session_id}/public-share">client.sessions.publicShare.<a href="./src/resources/sessions/public-share.ts">create</a>(sessionID) -> ShareView</code>
- <code title="get /sessions/{session_id}/public-share">client.sessions.publicShare.<a href="./src/resources/sessions/public-share.ts">retrieve</a>(sessionID) -> ShareView</code>
- <code title="delete /sessions/{session_id}/public-share">client.sessions.publicShare.<a href="./src/resources/sessions/public-share.ts">delete</a>(sessionID) -> unknown</code>

# BrowserProfiles

Types:

- <code><a href="./src/resources/browser-profiles.ts">BrowserProfileView</a></code>
- <code><a href="./src/resources/browser-profiles.ts">ProxyCountryCode</a></code>
- <code><a href="./src/resources/browser-profiles.ts">BrowserProfileListResponse</a></code>
- <code><a href="./src/resources/browser-profiles.ts">BrowserProfileDeleteResponse</a></code>

Methods:

- <code title="post /browser-profiles">client.browserProfiles.<a href="./src/resources/browser-profiles.ts">create</a>({ ...params }) -> BrowserProfileView</code>
- <code title="get /browser-profiles/{profile_id}">client.browserProfiles.<a href="./src/resources/browser-profiles.ts">retrieve</a>(profileID) -> BrowserProfileView</code>
- <code title="patch /browser-profiles/{profile_id}">client.browserProfiles.<a href="./src/resources/browser-profiles.ts">update</a>(profileID, { ...params }) -> BrowserProfileView</code>
- <code title="get /browser-profiles">client.browserProfiles.<a href="./src/resources/browser-profiles.ts">list</a>({ ...params }) -> BrowserProfileListResponse</code>
- <code title="delete /browser-profiles/{profile_id}">client.browserProfiles.<a href="./src/resources/browser-profiles.ts">delete</a>(profileID) -> unknown</code>

# AgentProfiles

Types:

- <code><a href="./src/resources/agent-profiles.ts">AgentProfileView</a></code>
- <code><a href="./src/resources/agent-profiles.ts">AgentProfileListResponse</a></code>
- <code><a href="./src/resources/agent-profiles.ts">AgentProfileDeleteResponse</a></code>

Methods:

- <code title="post /agent-profiles">client.agentProfiles.<a href="./src/resources/agent-profiles.ts">create</a>({ ...params }) -> AgentProfileView</code>
- <code title="get /agent-profiles/{profile_id}">client.agentProfiles.<a href="./src/resources/agent-profiles.ts">retrieve</a>(profileID) -> AgentProfileView</code>
- <code title="patch /agent-profiles/{profile_id}">client.agentProfiles.<a href="./src/resources/agent-profiles.ts">update</a>(profileID, { ...params }) -> AgentProfileView</code>
- <code title="get /agent-profiles">client.agentProfiles.<a href="./src/resources/agent-profiles.ts">list</a>({ ...params }) -> AgentProfileListResponse</code>
- <code title="delete /agent-profiles/{profile_id}">client.agentProfiles.<a href="./src/resources/agent-profiles.ts">delete</a>(profileID) -> unknown</code>
