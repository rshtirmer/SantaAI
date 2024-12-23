import { NextResponse } from 'next/server';
import { prisma } from '../db';

export async function POST(req: Request) {
  try {
    const { letter, allowSharing } = await req.json();
    
    if (!letter) {
      return NextResponse.json(
        { error: 'Letter content is required' },
        { status: 400 }
      );
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.CLAUDE_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-sonnet-20240229',
        max_tokens: 1024,
        messages: [{
          role: 'user',
          content: `You are Santa Claus responding to a child's letter. Keep the response cheerful, warm, and encouraging, but not too long (max 3 sentences). Where appropriate, call the child "my <adjective> little elf. Start you're response with Dear {name} or Dear child ONLY if you cannot figure out their name. Here's the letter: ${letter}`
        }]
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    const data = await response.json();
    const santaResponse = data?.content?.[0]?.text;
    if (!santaResponse) {
      console.error('Invalid Claude API response:', data);
      throw new Error('Invalid response from Claude API');
    }

    // Store the letter and response in the database
    await prisma.letter.create({
      data: {
        childLetterText: letter,
        santaResponseText: santaResponse,
        allowSharing,
      },
    });

    return NextResponse.json({ response: santaResponse });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { error: 'Failed to generate response' },
      { status: 500 }
    );
  }
}
