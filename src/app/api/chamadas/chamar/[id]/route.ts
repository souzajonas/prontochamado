import { dbConnect } from "../../../../../../utils/connect";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const db = await dbConnect;
  const { id } = params;
  const items = await db.all(`SELECT * FROM chamadas WHERE date(data) = date('now') AND id <> ? AND status = 'atual' AND horaChamado IS NULL ORDER BY id LIMIT 1`, [id]);

  return new Response(JSON.stringify(items), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
}