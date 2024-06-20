import { dbConnect } from '../../../utils/connect';

export async function GET(req: Request, res: Response) {

  const db = await dbConnect

  const items = await db.all(`SELECT * FROM chamadas WHERE date(data) = date('now') ORDER BY id DESC`);

  return new Response(JSON.stringify(items), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
}

export async function POST(req: Request) {
  console.log("AQUI")

  const db = await dbConnect;
  const { paciente, atendimento, sala, prioritario, data, identificacao, status } = await req.json();
  

  await db.run(
    'INSERT INTO chamadas (paciente, atendimento, sala, prioritario, data, identificacao, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [paciente, atendimento, sala, prioritario, data, identificacao, status]
  );

  return new Response(null, { status: 201 });
}
