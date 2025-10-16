import { createTeam, createMember } from "../models/team";
import { createTeamRole } from "../models/role";
import { setTeamCookies } from "../utils/cookies";

export async function createTeamController(userId: number, teamName: string) {
    const roleId = await createTeamRole({name: "Admin"})
    const teamId = await createTeam({name: teamName, logoUrl: ""}, userId, roleId);
    const teamMemberId = await createMember({teamId, userId, roleId})
    setTeamCookies(teamId, teamMemberId);
    return {teamId, teamMemberId}
}