import express from 'express';
import PDFDocument from 'pdfkit';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAnamnesis = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { idAppointment } = req.params;
    const anamnesis = await prisma.atendimento.findUnique({
      where: {
        id: +idAppointment,
      },
      include: {
        animal: {
          include: {
            cliente: true,
          },
        },
      },
    });

    if (anamnesis) {
      const doc = new PDFDocument();
      doc.pipe(res);

      doc.image(
        'dist/public/uploads/a2b7d818-286f-480f-837d-0e3f25a3daaapug-dog-yawning-isolated-beige-seat.jpg',
        50,
        50,
        { width: 100 }
      );
      doc.fontSize(12).text('Clínica Veterinária da Ca', 160, 70);
      doc.fontSize(10).text(`${new Date().toLocaleDateString()}`);
      doc.moveDown();

      doc.fontSize(10).text(`Animal: ${anamnesis.animal.nome}`);
      doc.fontSize(10).text(`Espécie: ${anamnesis.animal.especie}`);
      doc.fontSize(10).text(`Raça: ${anamnesis.animal.raca}`);
      doc.fontSize(10).text(`Pelagem: ${anamnesis.animal.pelagem}`);
      doc.fontSize(10).text(`Responsável: ${anamnesis.animal.cliente.nome}`);
      doc.fontSize(10).text(`Celular: ${anamnesis.animal.cliente.telefone}`);

      doc.end();
    }
  } catch (error) {
    console.error('Erro ao gerar PDF:', error);
    res.status(500).send('Erro ao gerar PDF');
  }
};
