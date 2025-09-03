import { Translations } from "@/types/translation";
import z from "zod";

export const updateProfileSchema = (translation: Translations) => {
  return z.object({
    name: z
      .string()
      .trim()
      .min(1, { message: translation.validation.nameRequired }),
    email: z
      .string()
      .trim()
      .email({ message: translation.validation.validEmail }),
    phone: z
      .string()
      .trim()
      .optional()
      .refine(
        (value) => {
          if (!value) return true;
          return /^\+?[1-9]\d{1,14}$/.test(value);
        },
        { message: translation.profile.form.phone.validation?.invalid }
      ),
    postalCode: z
      .string()
      .trim()
      .optional()
      .refine(
        (value) => {
          if (!value) return true;
          return /^\+?[1-9]\d{1,14}$/.test(value);
        },
        { message: translation.profile.form.phone.validation?.invalid }
      ),
      city:z.string().optional(),
      country:z.string().optional(),
      streetAddress:z.string().optional(),
      image:z.custom((val)=>val instanceof File).optional() ,
     });
};
