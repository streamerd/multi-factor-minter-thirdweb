import { getSession } from "next-auth/react";

export default async function checkHasRoleInServer(req, res) {
  // Get the Next Auth session so we can use the accessToken as part of the discord API request
  const session = await getSession({ req });

  console.log("Session:", session);

  // Put Your Discord Server ID here
  const discordServerId = "882215214894940170";

  // Read the access token from the session
  const accessToken = session?.accessToken;

  console.log(`sending a request for roles..`);
  //Make a request to the Discord API to check if the user has the role "Peace Maker"
  const response = await fetch(
    `https://discordapp.com/api/users/@me/guilds/${discordServerId}/member`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  ); // End of fetch request

  // Parse the response as JSON
  const data = await response.json();
  console.log(JSON.stringify(data));

  // Check if the user has the role "..."
  const jamDiscordMembership = data.roles?.find(
    (role) => role.id === "960299282156625940" // P
  );

  // // Return undefined or the server object to the client.
  res.status(200).json({ jamMembership: jamDiscordMembership ?? undefined });
}
