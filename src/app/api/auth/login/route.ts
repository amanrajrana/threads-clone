import { NextRequest } from "next/server";
import vine, { errors } from "@vinejs/vine";
import { loginSchema } from "@/validation/userSchema";
import { CustomErrorReporter } from "@/validation/customErrorReporter";
import bcryct from "bcryptjs";
import prisma from "@/DB/db.config";
import { responsePayload } from "@api/responsePayload";

export const POST = async (request: NextRequest) => {
  try {
    const data = await request.json();

    vine.errorReporter = () => new CustomErrorReporter(); // Set Custom Error Reporter
    const validator = vine.compile(loginSchema); // Compile Register Validation Schema
    const payload = await validator.validate(data); // validate data

    // * Get user from database
    const user = await prisma.user.findUnique({
      where: { email: payload.email },
    });

    // * If user not found
    if (!user) {
      return responsePayload(false, 401, "Invalid credentials");
    }

    // * Compare password
    const isPasswordMatch = await bcryct.compare(
      payload.password,
      user.password!
    );

    // * If password not match
    if (!isPasswordMatch) {
      return responsePayload(false, 401, "Invalid credentials");
    }

    return responsePayload(true, 201, "Login Successfully", {
      ...user,
      password: undefined,
    });
  } catch (error: any) {
    if (error instanceof errors.E_VALIDATION_ERROR) {
      return responsePayload(false, 400, `Validation Error`, error.messages);
    }

    return responsePayload(false, 500, "Something went wrong");
  }
};
