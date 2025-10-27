interface TaskInput {
  projectId: number;
  title: string;
  description?: string;
  priority: string;
  status: string;
  createdById?: number;
  assigneeId?: number;
}

interface CreateTaskResponse {
  data: {
    createTask: {
      id: string;
      title: string;
      status: string;
      // Add other fields you expect in the response
    };
  };
  errors?: { message: string }[];
}

// 2. Define constants for the API endpoint and the mutation query
const GRAPHQL_ENDPOINT = 'http://localhost:3000/api/graphql';

const CREATE_TASK_MUTATION = `
  mutation CreateTask($projectId: Int!, $title: String!, $description: String, $priority: String!, $status: String!, $createdById: Int, $assigneeId: Int) {
    createTask(projectId: $projectId, title: $title, description: $description, priority: $priority, status: $status, createdById: $createdById, assigneeId: $assigneeId) {
      id
      title
      status
      priority
      project {
        id
        name
      }
      creator {
        id
        fullName
      }
      assignee {
        id
        user {
          fullName
        }
      }
    }
  }
`;

/**
 * Creates a new task by sending a GraphQL mutation.
 * @param variables The task details to be sent.
 * @returns The data of the newly created task.
 */
export const createTask = async (variables: TaskInput): Promise<CreateTaskResponse> => {
  try {
    const response = await fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: CREATE_TASK_MUTATION,
        variables: variables,
      }),
    });

    const result: CreateTaskResponse = await response.json();

    // Handle GraphQL-specific errors
    if (result.errors) {
      console.error('GraphQL Errors:', result.errors);
      throw new Error(`GraphQL Error: ${result.errors.map(e => e.message).join(', ')}`);
    }

    // Handle HTTP errors
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return result;
  } catch (error) {
    console.error('Failed to create task:', error);
    // Re-throw the error to be handled by the calling function
    throw error;
  }
};