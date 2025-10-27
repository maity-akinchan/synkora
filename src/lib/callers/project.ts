// createProject.ts
export interface CreateProjectVariables {
  name: string;
  description: string;
  ownerId?: number;
  teamId: number;
}

export interface CreateProjectResponse {
  data: {
    createProject: {
      id: number;
      name: string;
      description: string;
      owner: {
        id: number;
        fullName: string;
      } | null;
      team: {
        id: number;
        name: string;
      };
    };
  };
  errors?: { message: string }[];
}

export async function createProject(variables: CreateProjectVariables): Promise<CreateProjectResponse> {
  const query = `
    mutation CreateProject($name: String!, $description: String!, $ownerId: Int, $teamId: Int!) {
      createProject(name: $name, description: $description, ownerId: $ownerId, teamId: $teamId) {
        id
        name
        description
        owner {
          id
          fullName
        }
        team {
          id
          name
        }
      }
    }
  `;

  const response = await fetch("/api/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Include auth token if needed:
      // "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`GraphQL request failed: ${response.statusText}`);
  }

  const result = (await response.json()) as CreateProjectResponse;

  if (result.errors) {
    throw new Error(result.errors.map(e => e.message).join(", "));
  }

  return result;
}

export async function fetchProjects() {
  const query = `
    query {
      projects {
        id
        name
        createdAt
        owner {
          id
          fullName
        }
      }
    }
  `;

  try {
    const response = await fetch("http://localhost:3000/api/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error(`GraphQL error: ${response.statusText}`);
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("GraphQL request failed:", error);
    throw error;
  }
}
