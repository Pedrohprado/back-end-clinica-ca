import express from 'express';
import { PrismaClient } from '@prisma/client';
import { Client, ClientPrisma } from '../models/modelClient';

const prisma = new PrismaClient();

export const showAllClients = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const allClients = await prisma.cliente.findMany();

    if (allClients) res.status(200).json(allClients);
    if (!allClients)
      res.status(404).json({
        warning: 'nenhum cliente encontrado',
      });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: 'erro interno do servidor',
    });
  }
};

export const registerNewClients = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const client: Client = req.body;

    if (client) {
      const statusNewClient: ClientPrisma = await prisma.cliente.create({
        data: client,
      });
      if (statusNewClient)
        res.status(201).json({
          warning: `usuário criado com sucesso ${statusNewClient.nome}`,
        });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: 'erro interno do servidor',
    });
  }
};

export const updateClient = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const body = req.body;
    if (id) {
      const statusUpDate = await prisma.cliente.update({
        where: {
          id: +id,
        },
        data: body,
      });
      if (statusUpDate) res.status(200).json(statusUpDate);
      if (!statusUpDate)
        res.status(400).json({
          warning: 'erro ao atualizar cliente',
        });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: 'erro interno do servidor',
    });
  }
};

export const deleteClient = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;

    if (id) {
      const statusDelete = await prisma.cliente.delete({
        where: {
          id: +id,
        },
      });

      if (statusDelete)
        res.status(200).json({
          warning: 'cliente deletado com sucesso!',
        });
      if (!statusDelete)
        res
          .status(400)
          .json({ warning: 'erro ao deletar cliente: cliente não encontrado' });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: 'erro interno do servidor',
    });
  }
};
