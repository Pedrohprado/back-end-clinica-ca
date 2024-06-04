import express from 'express';

export const showAllPatients = (
  req: express.Request,
  res: express.Response
) => {
  res.status(200).json({
    message: 'testando',
  });
};

export const registerNewPatients = (
  req: express.Request,
  res: express.Response
) => {
  const data = req.body;

  if (data) {
    res.json(data);
  }
};
