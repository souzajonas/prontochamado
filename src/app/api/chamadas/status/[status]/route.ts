import { dbConnect } from "../../../../../../utils/connect";

export async function GET(req: Request, { params }: { params: { status: string } }) {
  const db = await dbConnect;
  const { status } = params;
  const items = await db.all('SELECT * FROM chamadas WHERE status = ? ORDER BY id DESC', [status]);

  return new Response(JSON.stringify(items), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
}