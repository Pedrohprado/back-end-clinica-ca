import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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
    const { nomeVacina, dataAplicacao, observacoes } = req.body;

    function searchWord(value: string) {
      if (value.includes('v10')) {
      }
    }
    searchWord(nomeVacina);
    //raiva - 16 semanas
    //v10 - 8 semanas
    //v10 2 dose - 12 semanas
    //v10 3 dose - 16 semanas
  } catch (error) {
    console.log(error);
    res.status(404).json({
      warning: 'erro interno no servidor',
    });
  }
};
