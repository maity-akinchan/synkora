import { cookies } from 'next/headers';

export async function setTeamCookies(teamId: number, teamMemberId : number) {
  try {
    const cookieStore = await cookies();
    console.log("Setting cookies!");

    // Set token cookie
    cookieStore.set('teamId', teamId.toString(), { httpOnly: false, path: '/' });
    cookieStore.set('teamMemberId', teamMemberId.toString(), { httpOnly: false, path: '/' });

    // Return the response with the cookies set
    return new Response('Cookies set successfully', {
      status: 200,
    });
  } catch (error) {
    console.error("Error setting cookies:", error);
    return new Response('Failed to set cookies', { status: 500 });
  }
}