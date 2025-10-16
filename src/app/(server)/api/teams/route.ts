import { createNewTeam } from "@/lib/commons/teams";
import { authorizationCheck } from "@/lib/utils/auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const teamName = searchParams.get('teamName');
  const authStatus = await authorizationCheck();
  const authMessage = await authStatus.json();
  console.log(authMessage)
  if (authMessage.message == "Token valid") {
    const userId = authMessage.user.id;
    const res = await createNewTeam(userId, teamName || "Unset");
    return NextResponse.json(
        { success: true, message: 'Success', res},
        { status: 200 } // Internal Server Error
    );
  }
  else {
    return NextResponse.json(
        { success: false, message: 'Unauthorized'},
        { status: 300 } // Internal Server Error
      );
  }
}