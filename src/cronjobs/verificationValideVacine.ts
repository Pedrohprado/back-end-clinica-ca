import { PrismaClient } from '@prisma/client';
import nodemailer from 'nodemailer';
import cron from 'node-cron';

const prisma = new PrismaClient();
const transport = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: 'pedrohprado26@gmail.com',
    pass: 'qzvt vnnd nbfm zltx',
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const enviaEmail = async (mensage: string) => {
  const emailOptions = {
    from: 'mailtrap@demomailtrap.com',
    to: ['pedro.pedertractor@gmail.com'],
    subject: 'Vacinação Próxima',
    text: mensage,
  };

  await transport.sendMail(emailOptions);
  console.log('email teste');
};

const verificationVacines = async () => {
  const oneWeekBefore = new Date();
  oneWeekBefore.setDate(oneWeekBefore.getDate() + 7);

  const vacines = await prisma.vacina.findMany({
    where: {
      proximaVacina: {
        lte: oneWeekBefore,
      },
    },
    include: {
      animal: {
        include: {
          cliente: true,
        },
      },
    },
  });

  if (vacines.length > 0) {
    let emailBody = 'Vacinas prestes a vencer: \n \n';
    vacines.forEach((vacina) => {
      emailBody += `Cliente: ${vacina.animal.cliente.nome}, Animal: ${
        vacina.animal.nome
      }, Vacina: ${
        vacina.nomeVacina
      }, Data de Aplicação: ${vacina.dataAplicacao.toLocaleDateString(
        'pt-br'
      )}, Data do vencimento: ${vacina.proximaVacina.toLocaleDateString(
        'pt-br'
      )}, numero do cliente: ${vacina.animal.cliente.telefone}\n`;
    });

    console.log(emailBody);

    //call function for send email
    // enviaEmail(emailBody);
  } else {
    console.log('nenhuma vacina para vencer');
  }
};

cron.schedule(
  '0 0 * * 5',
  () => {
    verificationVacines();
  },
  {
    timezone: 'America/Sao_Paulo',
  }
);
verificationVacines();
