import { RequestHandler } from "express";

import express from 'express';
const router = express.Router();

/* GET home page. */
const indexFunction: RequestHandler =
  (req, res) => {
    res.render('index', { title: 'Express' });
  }
router.get('/', indexFunction);

export default router;
