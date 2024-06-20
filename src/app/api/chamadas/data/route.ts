import { dbConnect } from "../../../../../utils/connect";

export async function GET(req: Request) {
  const db = await dbConnect;
  const items = await db.all(`SELECT * FROM chamadas WHERE date(data) = date('now') AND date(horaChamado) = date('now') ORDER BY horaChamado DESC LIMIT 4`);

  return new Response(JSON.stringify(items), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
}