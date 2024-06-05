import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const showVacineByAnimal = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { idAnimal } = req.params;

    if (idAnimal) {
      const vacines = await prisma.vacina.findMany({
        where: {
          animalId: +idAnimal,
        },
      });

      if (vacines.length < 1) {
        res.status(404).json({ warning: 'nenhuma vacina encontrada' });
      } else {
        res.json(vacines);
      }
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({
      warning: 'erro interno no servidor',
    });
  }
};

export const showAllVacines = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const vacines = await prisma.vacina.findMany();

    if (vacines) res.json(vacines);
    if (!vacines || vacines.length < 1)
      res.status(400).json({ warning: 'nenhum dado encontrado' });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      warning: 'erro interno no servidor',
    });
  }
};

export const createNewVacine = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { idAnimal } = req.params;
    const data = req.body;

    let proximaVacinaDate = new Date(data.dataAplicacao);
    data.dataAplicacao = new Date(data.dataAplicacao);

    switch (data.tipoDeVacina) {
      case 'v10':
        if (data.dose === 'primeira') {
          proximaVacinaDate.setDate(proximaVacinaDate.getDate() + 8 * 7);
          data.proximaVacina = proximaVacinaDate;
        }
        if (data.dose === 'segunda') {
          proximaVacinaDate.setDate(proximaVacinaDate.getDate() + 12 * 7);
          data.proximaVacina = proximaVacinaDate;
        }
        if (data.dose === 'terceira') {
          proximaVacinaDate.setDate(proximaVacinaDate.getDate() + 16 * 7);
          data.proximaVacina = proximaVacinaDate;
        }
        if (
          data.dose !== 'primeira' &&
          data.dose !== 'segunda' &&
          data.dose !== 'terceira'
        ) {
          proximaVacinaDate.setDate(proximaVacinaDate.getDate() + 16 * 7);
          data.proximaVacina = proximaVacinaDate;
        }
        break;
      case 'raiva':
        proximaVacinaDate.setDate(proximaVacinaDate.getDate() + 16 * 7);
        data.proximaVacina = proximaVacinaDate;
        break;
    }
    data.animalId = +idAnimal;

    if (data) {
      const statusNewVacine = await prisma.vacina.create({
        data,
      });
      res.json(statusNewVacine);
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({
      warning: 'erro interno no servidor',
    });
  }
};
