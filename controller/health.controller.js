import env from '../config/env.js';

export const getHealth = (_req, res) => {
  res.status(200).json({
    status: 'OK', 
    service: 'Payment Service', 
    environment: env.NODE_ENV, 
    uptime: process.uptime()
  });
};