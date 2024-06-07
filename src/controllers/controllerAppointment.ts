import { PrismaClient } from '@prisma/client';
import express from 'express';

const prisma = new PrismaClient();

export const showAllAppointment = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const appointment = await prisma.atendimento.findMany();

    if (appointment) {
      res.json(appointment);
    } else {
      res.status(404).json({ warning: 'nenhuma consulta encontrado' });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({
      warning: 'erro interno do servidor',
    });
  }
};

export const showAppointment = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { idAnimal } = req.params;

    if (idAnimal) {
      const showAppointmentByAnimal = await prisma.atendimento.findMany({
        where: {
          animalId: +idAnimal,
        },
      });

      if (showAppointmentByAnimal) res.json(showAppointmentByAnimal);
      if (showAppointmentByAnimal.length < 1 || !showAppointmentByAnimal)
        res.status(404).json({ warning: 'nenhuma consulta feita!' });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({
      warning: 'erro interno do servidor',
    });
  }
};

export const createNewAppointment = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { idAnimal } = req.params;
    const body = req.body;

    if (idAnimal) {
      const statusNewAppointment = await prisma.atendimento.create({
        data: {
          ...body,
          animalId: +idAnimal,
        },
      });

      if (statusNewAppointment)
        res.json({ warning: 'atendimento lançado com sucesso!' });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({
      warning: 'erro interno do servidor',
    });
  }
};
