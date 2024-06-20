import { dbConnect } from "../../../../../../utils/connect";


export async function GET(req: Request, { params }: { params: { sala: string } }) {
  const db = await dbConnect;
  const { sala } = params;
  const items = await db.all(`SELECT * FROM chamadas WHERE sala = ? AND date(data) = date('now') AND status = 'espera' ORDER BY prioritario DESC, id`, [sala]);

  return new Response(JSON.stringify(items), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
}