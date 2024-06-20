import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../../utils/db';

const chamadasDataHandler = (req: NextApiRequest, res: NextApiResponse) => {
  db.all(
    `SELECT * FROM chamadas WHERE date(data) = date('now') AND date(horaChamado) = date('now') ORDER BY horaChamado DESC LIMIT 4`,
    (err: Error | null, rows: any[]) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(rows);
    }
  );
};

export default chamadasDataHandler;
