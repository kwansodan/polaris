import { z } from 'zod';

export const ServiceUpsertSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1, 'Service name is required').max(255, 'Name must be less than 255 characters'),
  description: z.string().max(1000, 'Description must be less than 1000 characters').nullable().optional(),
  durationMinutes: z.number().int('Duration must be a whole number').positive('Duration must be greater than 0'),
  price: z.string().or(z.number())
    .refine((val) => {
      const num = typeof val === 'string' ? parseFloat(val) : val;
      return !isNaN(num) && num >= 0;
    }, 'Price must be a valid positive number')
    .transform((val) => typeof val === 'string' ? parseFloat(val) : val),
  currency: z.enum(['GHS']).default('GHS'),
  isActive: z.boolean().default(true),
});

export type ServiceUpsertInput = z.infer<typeof ServiceUpsertSchema>;