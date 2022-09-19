import { RequestHandler } from "express";

import Router from "express-promise-router";
const router = Router();

/* GET home page. */
const indexFunction: RequestHandler =
  (req, res) => {
    res.render('index', { title: 'Express' });
  }
router.get('/', indexFunction);

export default router;
