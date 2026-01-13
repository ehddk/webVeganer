import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { question } = await req.json();

  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: "너는 포트폴리오 사이트의 FAQ를 친절하게 답변하는 AI야.",
        },
        {
          role: "user",
          content: question,
        },
      ],
      temperature: 0.3,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error(err);
    return NextResponse.json({ error: "Groq API Error" }, { status: 500 });
  }

  const data = await res.json();

  return NextResponse.json({
    answer: data.choices[0].message.content,
  });
}
