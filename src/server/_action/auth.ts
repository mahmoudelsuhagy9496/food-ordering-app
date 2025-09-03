"use server";

import { Locale } from "@/i18n.config";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import { db } from "@/lib/prisma";
import getTrans from "@/lib/translation";
import { LoginSchema, signUpSchema } from "@/validations/auth";
import bcrypt from "bcrypt";

export const login = async (
  credentials: Record<"email" | "password", string> | undefined,
  local: Locale
) => {
  const Translations = await getTrans(local);
  const result = LoginSchema(Translations).safeParse(credentials);
  if (!result.success) {
    return {
      error: result.error.flatten().fieldErrors,
      status: 400,
    };
  }
  try {
    const user = await db.user.findUnique({
      where: { email: result.data.email },
    });
    if (!user) {
      return {
        message: Translations.messages.userNotFound,
        status: 401,
      };
    }
    if (user) {
      const hashedpassword = user.password;
      const isValidPasword = await bcrypt.compare(
        result.data.password,
        hashedpassword
      );
      if (!isValidPasword) {
        return {
          message: Translations.messages.incorrectPassword,
          status: 401,
        };
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...withoutPassword } = user;
      return {
        user: withoutPassword,
        status: 200,
        message: Translations.messages.loginSuccessful,
      };
    }
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: Translations.messages.unexpectedError,
    };
  }
};

export const signup = async (prvState: unknown, formData: FormData) => {
  const local = await getCurrentLocale();
  const translations = await getTrans(local);
  const result = signUpSchema(translations).safeParse(
    Object.fromEntries(formData.entries())
  );
  if (!result.success) {
    return {
      error: result.error.flatten().fieldErrors,
      formData,
    };
  }
  try {
    const user = await db.user.findUnique({
      where: { email: result.data.email },
    });
    if (user) {
      return {
        status: 409,
        message: translations.messages.userAlreadyExists,
        formData,
      };
    }
    const hashPassword = await bcrypt.hash(result.data.password, 10);

    const createdUser = await db.user.create({
      data: {
        name: result.data.name,
        email: result.data.email,
        password: hashPassword,
      },
    });
    return {
      status: 201,
      message: translations.messages.accountCreated,
      user: {
        id: createdUser.id,
        name: createdUser.name,
        email: createdUser.email,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: translations.messages.unexpectedError,
    };
  }
  console.log(result);
};
