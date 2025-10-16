import { createTeamController } from "../controllers/teams";

export async function createNewTeam(userId: number, teamName : string) {
    return createTeamController(userId, teamName);
}