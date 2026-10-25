export const openApiDocument = {
  openapi: "3.0.3",
  info: {
    title: "Project Review API",
    version: "1.0.0",
    description:
      "Student project submission and mentor review. New submissions start PENDING. Only admins review. Rejection requires feedback.",
  },
  servers: [{ url: "http://localhost:5000" }],
  paths: {
    "/api/auth/signup": {
      post: {
        summary: "Student signup",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["name", "email", "password"],
                properties: {
                  name: { type: "string" },
                  email: { type: "string" },
                  password: { type: "string" },
                },
              },
            },
          },
        },
        responses: { "201": { description: "Created" }, "409": { description: "Duplicate email" } },
      },
    },
    "/api/auth/login": {
      post: {
        summary: "Login",
        responses: { "200": { description: "Session" }, "401": { description: "Invalid credentials" } },
      },
    },
    "/api/auth/logout": { post: { summary: "Logout", responses: { "200": { description: "Signed out" } } } },
    "/api/auth/me": { get: { summary: "Current user", security: [{ bearerAuth: [] }], responses: { "200": { description: "Profile" } } } },
    "/api/submissions": {
      post: {
        summary: "Create submission",
        security: [{ bearerAuth: [] }],
        responses: { "201": { description: "Created" }, "409": { description: "Duplicate repo" } },
      },
    },
    "/api/submissions/my": {
      get: { summary: "My submissions", security: [{ bearerAuth: [] }], responses: { "200": { description: "Page" } } },
    },
    "/api/submissions/{id}": {
      get: { summary: "My submission detail", security: [{ bearerAuth: [] }], responses: { "200": { description: "Submission" } } },
    },
    "/api/admin/submissions": {
      get: {
        summary: "Admin queue",
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "status", in: "query", schema: { type: "string" } },
          { name: "page", in: "query", schema: { type: "integer" } },
          { name: "limit", in: "query", schema: { type: "integer" } },
          { name: "q", in: "query", schema: { type: "string" } },
        ],
        responses: { "200": { description: "Page" } },
      },
    },
    "/api/admin/submissions/stats": {
      get: { summary: "Aggregate stats", security: [{ bearerAuth: [] }], responses: { "200": { description: "Counts" } } },
    },
    "/api/admin/submissions/{id}": {
      get: { summary: "Admin submission detail", security: [{ bearerAuth: [] }], responses: { "200": { description: "Submission" } } },
    },
    "/api/admin/submissions/{id}/review": {
      patch: {
        summary: "Approve or reject",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["decision"],
                properties: {
                  decision: { type: "string", enum: ["APPROVED", "REJECTED"] },
                  feedback: { type: "string" },
                },
              },
            },
          },
        },
        responses: { "200": { description: "Reviewed" }, "409": { description: "Invalid transition" } },
      },
    },
  },
  components: {
    securitySchemes: {
      bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" },
    },
  },
} as const;
