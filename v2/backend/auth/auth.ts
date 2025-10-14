import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@data/prisma";
import * as bcrypt from "bcryptjs";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  baseURL: process.env.BASE_URL,
  trustedOrigins: ["http://localhost:5173"],

  user: {
    model: "User",
    fields: {
      id: "id",
      email: "email",
      password: "password",
      name: "name",
      role: "role",
    },
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false, // optional
    password: {
      hash: async (password) => {
        return await bcrypt.hash(password, 10);
      }
    }
  },
});
