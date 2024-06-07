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

export const updateAppointment = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { idAppointment } = req.params;
    const body = req.body;

    if (idAppointment) {
      const statusupdate = await prisma.atendimento.update({
        data: body,

        where: {
          id: +idAppointment,
        },
      });
      if (statusupdate) res.json({ warning: 'atendimento atualizado' });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({
      warning: 'erro interno do servidor',
    });
  }
};

export const deleteAppointment = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { idAppointment } = req.params;

    if (idAppointment) {
      const statusDelete = await prisma.atendimento.delete({
        where: {
          id: +idAppointment,
        },
      });

      if (statusDelete)
        res.json({ warning: 'atendimento deletado com sucesso!' });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({
      warning: 'erro interno do servidor',
    });
  }
};
