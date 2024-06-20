import { dbConnect } from "../../../../../utils/connect";


export async function GET(req: Request, { params }: { params: { id: string } }) {
  const db = await dbConnect;
  const { id } = params;
  const item = await db.get('SELECT * FROM chamadas WHERE id = ?', [id]);

  if (!item) {
    return new Response(JSON.stringify({ message: 'Chamada não encontrada' }), { status: 404 });
  }

  return new Response(JSON.stringify(item), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const db = await dbConnect;
  const { id } = params;
  const { paciente, atendimento, sala, prioritario, data, identificacao, status, horaChamado } = await req.json();

  const result = await db.run(
    'UPDATE chamadas SET paciente = ?, atendimento = ?, sala = ?, prioritario = ?, data = ?, identificacao = ?, status = ?, horaChamado = ? WHERE id = ?',
    [paciente, atendimento, sala, prioritario, data, identificacao, status, horaChamado, id]
  );

  if (result.changes === 0) {
    return new Response(JSON.stringify({ message: 'Chamada não encontrada' }), { status: 404 });
  }

  return new Response(JSON.stringify({ message: 'Chamada atualizada com sucesso' }), { status: 200 });
}





export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const db = await dbConnect;
  const { id } = params;

  const result = await db.run('DELETE FROM chamadas WHERE id = ?', [id]);

  if (result.changes === 0) {
    return new Response(JSON.stringify({ message: 'Chamada não encontrada' }), { status: 404 });
  }

  return new Response(JSON.stringify({ message: 'Chamada excluída com sucesso' }), { status: 200 });
}
