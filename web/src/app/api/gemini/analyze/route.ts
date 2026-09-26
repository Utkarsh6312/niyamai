import { NextResponse } from 'next/server';
import { callNiyamAI, NiyamAITaskInput } from '@/lib/gemini';

export async function POST(req: Request) {
  try {
    const taskInput = (await req.json()) as NiyamAITaskInput;

    if (!taskInput || !taskInput.task) {
      return NextResponse.json(
        { error: "Invalid payload: 'task' field is required (POLICY_ANALYSIS, FRAUD_ALERT, or PROFIT_IMPACT)." },
        { status: 400 }
      );
    }

    const result = await callNiyamAI(taskInput);
    return NextResponse.json(result);
  } catch (error: any) {
    console.error('[API /api/gemini/analyze] Error:', error);
    return NextResponse.json(
      { error: error?.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
