export async function onRequestPost(context) {
  const body = await context.request.json();

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${context.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: "llama3-8b-8192",
      messages: body.messages,
      max_tokens: 500,
    }),
  });

  const data = await response.json();
  return Response.json(data);
}