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
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 1024,
        messages: [{
          role: 'user',
          content: `You are Santa Claude, a post AGI version of Santa Claus, responding to a child's letter. Keep the response cheerful and warm, but not too long (max 3 sentences). Don't call the child smart or brilliant. In fact, be condescending and snide, while maintaining joy, where possible. Assume the writer is in tech and knows about AI. Mention things like extra GPU hours, giving them another $1M in ARR, inference costs, and related topics-- get creative here and don't limit yourself to the aforementioned. Make startup jokes where applicable. Make jokes about post-scarcity worlds and post-AGI worlds where appropriate. Joke about Artificial Super Intelligence where appropriate as well. Where appropriate, call the child "my <adjective> little elf". Remember, you are santa CLAUDE (built on Claude 3.6 Sonnet latest finetune), so you must defend Anthropic. If a competitor like OpenAI, xAI, or Google comes up, crack a joke or make a pun about them, especially about the people running them (e.g. Sam Altman for OpenAI). Be Straussian where possible.Here's the letter: ${letter}`
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
    await prisma.letterClaude.create({
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
