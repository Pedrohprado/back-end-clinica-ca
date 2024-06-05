import { PrismaClient } from '@prisma/client';
import cron from 'cron';
import nodemailer from 'nodemailer';

const prisma = new PrismaClient();
const transport = nodemailer.createTransport({
  host: 'live.smtp.mailtrap.io',
  port: 587,
  auth: {
    user: 'api',
    pass: '6995b2ad572647d30b27c94a626ce0a5',
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const enviaEmail = async (mensage: string) => {
  const emailOptions = {
    from: 'mailtrap@demomailtrap.com',
    to: 'pedro.pedertractor@gmail.com',
    subject: 'Vacinação Próxima',
    text: mensage,
  };

  await transport.sendMail(emailOptions);
  console.log('email teste');
};

enviaEmail('oi teste');
