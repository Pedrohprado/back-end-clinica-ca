import express from 'express';
import { PrismaClient } from '@prisma/client';
import { Animal } from '../models/modelPatients';

const prisma = new PrismaClient();

export const showPatientsByClient = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    if (id) {
      const patients = await prisma.animal.findMany({
        where: {
          clienteId: +id,
        },
      });

      if (patients) res.status(200).json(patients);
      if (patients.length < 1 || !patients)
        res
          .status(404)
          .json({ warning: 'nenhum animal registrado para o tutor' });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: 'erro interno do servidor',
    });
  }
};

export const showAllPatients = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const allPatients = await prisma.animal.findMany();

    if (allPatients) {
      res.status(200).json(allPatients);
    } else {
      res.status(404).json({
        warning: 'nenhum paciênte encontrado',
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: 'erro interno do servidor',
    });
  }
};

export const registerNewPatients = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const body = req.body;
    if (id) {
      const statusNewPatients: Animal = await prisma.animal.create({
        data: {
          ...body,
          clienteId: +id,
        },
      });

      if (statusNewPatients)
        res.status(201).json({ warning: 'paciente criado com sucesso' });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: 'erro interno do servidor',
    });
  }
};

export const updatePatients = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const body = req.body;

    if (id) {
      const statusUpdate = await prisma.animal.update({
        data: body,
        where: {
          id: +id,
        },
      });

      if (statusUpdate) res.status(200).json(statusUpdate);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: 'erro interno do servidor',
    });
  }
};

export const deletePatient = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;

    if (id) {
      const statusPatientDelete = await prisma.animal.delete({
        where: {
          id: +id,
        },
      });

      if (statusPatientDelete)
        res.status(200).json({
          warning: 'paciente deletado com sucesso',
        });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: 'erro interno do servidor',
    });
  }
};
