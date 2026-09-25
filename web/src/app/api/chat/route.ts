import { NextResponse } from 'next/server';
import { fal } from '@fal-ai/client';

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!process.env.FAL_KEY && !process.env.NEXT_PUBLIC_FAL_KEY) {
      return NextResponse.json(
        { error: 'FAL_KEY environment variable is missing.' },
        { status: 500 }
      );
    }

    const result: any = await fal.subscribe("fal-ai/any-llm", {
      input: {
        prompt: prompt,
        model: "meta-llama/llama-3-8b-instruct",
        system_prompt: "You are NiyamAI, an expert in RBI (Reserve Bank of India) regulations, specifically KYC and Market Risk. Answer compliance questions precisely."
      }
    });

    const responseText = result.output || result.text || (result.choices && result.choices[0]?.message?.content);

    return NextResponse.json({ output: responseText });
  } catch (error: any) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
