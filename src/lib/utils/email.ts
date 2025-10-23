export async function sendTeamInviteEmail(to: string, acceptLink: string, teamName?: string) {
  // TODO: Integrate with an email provider (e.g., SMTP/Nodemailer, Resend, Postmark)
  // For now, we just log the invite link so it can be copied/shared.
  console.log(`Invite email to ${to}: ${acceptLink} ${teamName ? `(Team: ${teamName})` : ''}`);
}
