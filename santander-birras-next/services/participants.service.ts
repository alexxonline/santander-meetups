export async function registerInMeetup(meetupId, token, user) {
  const response = await fetch(`/api/participations/${meetupId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify({
      email: user.email,
      name: user.name,
      sub: user.sub,
    })
  });
  const result = await response.json();
  return result;
}
