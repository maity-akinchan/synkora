export interface CreateTeamVariables {
  name: string;
  logoUrl: string;
  ownerId: number;
  ownerRoleId: number;
}

export interface CreateTeamResponse {
  data: {
    createTeam: {
      id: number;
      name: string;
      logoUrl: string;
    };
  };
  errors?: { message: string }[];
}

export async function createTeam(variables: CreateTeamVariables): Promise<CreateTeamResponse> {
  const query = `
    mutation CreateTeam($name: String!, $logoUrl: String!, $ownerId: Int!, $ownerRoleId: Int!) {
      createTeam(name: $name, logoUrl: $logoUrl, ownerId: $ownerId, ownerRoleId: $ownerRoleId) {
        id
        name
        logoUrl
      }
    }
  `;

  const response = await fetch("/api/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Uncomment below line if your API requires authentication
      // "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`GraphQL request failed: ${response.statusText}`);
  }

  const result = (await response.json()) as CreateTeamResponse;

  if (result.errors) {
    throw new Error(result.errors.map(e => e.message).join(", "));
  }

  return result;
}
