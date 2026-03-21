import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { garment, material } = await req.json();
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: 'API Key missing' }, { status: 500 });
    }

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      cache: 'no-store',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama3-70b-8192',
        messages: [
          {
            role: 'system',
            content: 'You are a sustainability expert. Generate a UNIQUE, mind-blowing sustainability fact for every request. Avoid repeating common knowledge. Focus on water footprint, carbon impact, chemical usage, or circular potential. Keep it under 25 words.'
          },
          {
            role: 'user',
            content: `Provide one extremely specific and rare sustainability fact about a ${material} ${garment}. Think outside the box. Timestamp seed: ${Date.now()}`
          }
        ],
        temperature: 0.7,
        max_tokens: 100,
      }),
    });

    const data = await response.json();
    
    if (data.error) {
       console.error('Groq API Error:', data.error);
       return NextResponse.json({ error: data.error.message }, { status: 400 });
    }

    const fact = data.choices?.[0]?.message?.content?.replace(/^"|"$/g, '') || 'Eco-fact coming soon!';

    return NextResponse.json({ fact });
  } catch (error: any) {
    console.error('Error generating fact:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
