import { Resend } from 'resend';
import { env } from '@/env.mjs';

const resend = new Resend(env.RESEND_API_KEY);

export default resend;
