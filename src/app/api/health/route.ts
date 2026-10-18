import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ status: 'ok', brand: 'Jai Sri Ram Jewellers' });
}
