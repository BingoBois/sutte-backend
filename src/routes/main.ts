import { Request, Response } from "express";

var express = require('express')
var router = express.Router()

// middleware that is specific to this router
// define the home page route
router.get('/', function (req: Request, res: Response) {
  res.send('Birds home page')
})
// define the about route
router.get('/about', function (req: Request, res: Response) {
  res.send('About birds')
})

export default router;