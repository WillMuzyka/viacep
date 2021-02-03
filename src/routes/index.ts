import { Router, Request, Response } from 'express';

const router = Router();

router.get('/cep', (req: Request, res: Response) => res.json({ message: 'cep' }));

export default router;
