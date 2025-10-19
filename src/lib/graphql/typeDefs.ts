export const typeDefs = /* GraphQL */ `
  scalar DateTime

  """ =========================
      Core User & Auth Models
  ========================= """
  type User {
    id: Int!
    fullName: String!
    username: String!
    email: String!
    avatarUrl: String
    jobRole: String
    companyName: String
    dateOfBirth: DateTime
    bio: String
    referral: String
    goals: String
    createdAt: DateTime!
    updatedAt: DateTime!
    socialLinks: SocialLinks
    skills: [UserSkill!]!
    teams: [TeamMember!]!
    ownedProjects: [Project!]!
    createdTasks: [Task!]!
    createdDesigns: [Design!]!
    createdTemplates: [DesignTemplate!]!
    comments: [DesignComment!]!
    activityLogs: [ActivityLog!]!
  }

  type SocialLinks {
    id: Int!
    linkedin: String
    github: String
    portfolio: String
    userId: Int!
    user: User!
  }

  type Skill {
    id: Int!
    name: String!
    users: [UserSkill!]!
  }

  type UserSkill {
    userId: Int!
    skillId: Int!
    user: User!
    skill: Skill!
  }

  """ =========================
      Teams & Collaboration
  ========================= """
  type Team {
    id: Int!
    name: String!
    logoUrl: String!
    createdAt: DateTime!
    members: [TeamMember!]!
    projects: [Project!]!
    activityLogs: [ActivityLog!]!
  }

  type TeamRole {
    id: Int!
    name: String!
    members: [TeamMember!]!
    projectPermissions: [ResourcePermission!]!
  }

  type TeamMember {
    id: Int!
    teamId: Int!
    userId: Int!
    roleId: Int!
    joinedAt: DateTime!
    team: Team!
    user: User!
    role: TeamRole!
    assignedTasks: [Task!]!
    designViews: [DesignViewers!]!
  }

  """ =========================
      Projects & Tasks
  ========================= """
  type Project {
    id: Int!
    name: String!
    description: String
    createdAt: DateTime!
    updatedAt: DateTime!
    teamId: Int!
    ownerId: Int
    team: Team!
    owner: User
    designs: [Design!]!
    tasks: [Task!]!
    permissions: [ResourcePermission!]!
    activityLogs: [ActivityLog!]!
  }

  type Task {
    id: Int!
    title: String!
    description: String
    priority: String!
    status: String!
    deadline: DateTime
    createdAt: DateTime!
    updatedAt: DateTime!
    projectId: Int!
    createdById: Int
    assigneeId: Int
    project: Project!
    creator: User
    assignee: TeamMember
  }

  """ =========================
      Design System
  ========================= """
  type DesignType {
    id: Int!
    name: String!
    designs: [Design!]!
    templates: [DesignTemplate!]!
  }

  type Design {
    id: Int!
    name: String!
    designTypeId: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    projectId: Int!
    createdById: Int
    project: Project!
    creator: User
    type: DesignType!
    data: DesignData
    viewers: [DesignViewers!]!
    comments: [DesignComment!]!
  }

  type DesignData {
    id: Int!
    contentUrl: String!
    savedAt: DateTime!
    designId: Int!
    design: Design!
  }

  type DesignViewers {
    designId: Int!
    memberId: Int!
    hasViewed: Boolean!
    firstViewedAt: DateTime
    lastViewedAt: DateTime
    design: Design!
    member: TeamMember!
  }

  type DesignTemplate {
    id: Int!
    designTypeId: Int!
    name: String!
    usageCount: Int!
    createdAt: DateTime!
    authorId: Int
    author: User
    type: DesignType!
  }

  type DesignComment {
    id: Int!
    content: String!
    createdAt: DateTime!
    designId: Int!
    userId: Int!
    design: Design!
    user: User!
  }

  """ =========================
      Utility Models
  ========================= """
  type ActivityLog {
    id: Int!
    action: String!
    timestamp: DateTime!
    userId: Int
    teamId: Int
    projectId: Int
    relatedResourceId: Int
    relatedResourceType: String
    user: User
    team: Team
    project: Project
  }

  type ResourcePermission {
    id: Int!
    roleId: Int!
    projectId: Int!
    permissionLevel: String!
    role: TeamRole!
    project: Project!
  }

  """ =========================
      Root Queries & Mutations
  ========================= """
  type Query {
    # ---- Users ----
    users: [User!]!
    user(id: Int!): User

    # ---- Teams ----
    teams: [Team!]!
    team(id: Int!): Team
    
    # --- Roles ----
    roles: [TeamRole!]!
    role(id: Int!): TeamRole

    # ---- Projects ----
    projects: [Project!]!
    project(id: Int!): Project

    # ---- Designs ----
    designs: [Design!]!
    design(id: Int!): Design

    # ---- Tasks ----
    tasks(projectId: Int): [Task!]!
    task(id: Int!): Task
  }

  type Mutation {
    # ---- User Management ----
    createUser(fullName: String!, username: String!, email: String!, password: String!): User!

    # ---- Team Management ----
    createTeam(name: String!, logoUrl: String!, ownerId: Int!, ownerRoleId: Int!): Team!
    updateTeam(id: Int!, name: String, logoUrl: String): Team!
    deleteTeam(id: Int!): Boolean!
    addTeamMember(teamId: Int!, userId: Int!, roleId: Int!): TeamMember!

    # ---- Project Management ----
    createProject(name: String!, description: String, ownerId: Int, teamId: Int!): Project!
    updateProject(id: Int!, name: String, description: String): Project!
    deleteProject(id: Int!): Boolean!
    
    # --- Role Management ---
    createRole(name: String!): TeamRole!
    updateRole(id: Int!, name: String!): TeamRole!
    deleteRole(id: Int!): Boolean!

    # ---- Design Management ----
    createDesign(name: String!, projectId: Int!, designTypeId: Int!, createdById: Int): Design!
    updateDesign(id: Int!, name: String!): Design!
    deleteDesign(id: Int!): Boolean!

    # ---- Task Management ----
    createTask(projectId: Int!, title: String!, description: String, priority: String!, status: String!, createdById: Int, assigneeId: Int): Task!
    updateTask(id: Int!, title: String, description: String, status: String, priority: String): Task!
    deleteTask(id: Int!): Boolean!
  }
`;