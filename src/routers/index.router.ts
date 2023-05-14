import { Request, Response } from "express";
import Router from "express-promise-router";

const router = Router();

const indexFunction = (req: Request, res: Response) => {
  res.render('index', { title: 'Express' });
}
router.get('/', indexFunction);

export default router;
