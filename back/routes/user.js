import { Router } from 'express';

import getSession from '../dbUtils'

import models from '../models';

const router = Router();

router.post('/', async (req, res) => {
  try {
    models.userModel.methods.register(getSession(), req.body)
    res.status(200).send('you good');
  }
  catch (e)
  {
    console.log(e);
    res.status(400).send(error)
  }
});

export default router;
