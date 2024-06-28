import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { unstable_noStore as noStore } from 'next/cache';

export async function GET(req: Request, { params }: { params: { status: string } }, res: Response) {
  noStore();
  try {
    const status = params.status;
    const result = await sql`SELECT * FROM chamadas WHERE status = ${status} ORDER BY id DESC;`;
    return new Response(JSON.stringify(result.rows), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}


