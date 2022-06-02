export async function getAllEmails() {
  const response = await fetch('https://learn-react-app-e8b90-default-rtdb.firebaseio.com/emails.json');
  const emails = await response.json();

  return emails;
}

export async function putEmail(newEmail) {
  const emails = await getAllEmails()
  emails.push(newEmail)
  const uniqueEmails = new Array(...new Set(emails))
  console.log(uniqueEmails)

  const response = await fetch('https://learn-react-app-e8b90-default-rtdb.firebaseio.com/emails.json', {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(uniqueEmails),
  })

  return uniqueEmails;
}