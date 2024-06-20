import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../../../utils/db';

const chamadasSalaAtualHandler = (req: NextApiRequest, res: NextApiResponse) => {
  const { sala } = req.query;

  db.all(
    `SELECT * FROM chamadas WHERE sala = ? AND status = 'atual' ORDER BY prioritario DESC, id`,
    [sala],
    (err: Error | null, rows: any[]) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(rows);
    }
  );
};

export default chamadasSalaAtualHandler;
