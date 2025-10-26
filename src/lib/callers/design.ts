/**
 * Creates a new design by sending a GraphQL mutation.
 *
 * @param {object} designData - The data for the new design.
 * @param {string} designData.name - The name of the design.
 * @param {number} designData.projectId - The ID of the project.
 * @param {number} designData.designTypeId - The ID of the design type.
 * @param {number} [designData.createdById] - The ID of the creator (optional).
 * @returns {Promise<object>} The data of the newly created design.
 */
export async function createDesign({ name, projectId, designTypeId, createdById }) {
  // 1. Define the GraphQL query
  const query = `
    mutation CreateDesign($name: String!, $projectId: Int!, $designTypeId: Int!, $createdById: Int) {
      createDesign(name: $name, projectId: $projectId, designTypeId: $designTypeId, createdById: $createdById) {
        id
        name
        project {
          id
          name
        }
        type {
          id
          name
        }
        creator {
          id
          fullName
        }
      }
    }
  `;

  // 2. Define the variables
  const variables = {
    name,
    projectId,
    designTypeId,
    createdById,
  };

  // 3. Make the API request
  try {
    const response = await fetch('/api/graphql', { // <-- IMPORTANT: Replace with your actual GraphQL API endpoint
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        // 'Authorization': 'Bearer YOUR_ACCESS_TOKEN', // <-- Uncomment and add your auth token if required
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    const result = await response.json();

    // 4. Handle GraphQL errors
    if (result.errors) {
      console.error('GraphQL Errors:', result.errors);
      throw new Error('Failed to create design due to GraphQL errors.');
    }

    // 5. Return the created design data
    return result.data.createDesign;

  } catch (error) {
    console.error('Network or server error:', error);
    throw error;
  }
}