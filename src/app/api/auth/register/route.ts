import { NextRequest, NextResponse } from "next/server";
import vine, { errors } from "@vinejs/vine";
import { registerSchema } from "@/validation/userSchema";
import { CustomErrorReporter } from "@/validation/customErrorReporter";
import bcryct from "bcryptjs";
import prisma from "@/DB/db.config";

export const POST = async (request: NextRequest) => {
  try {
    const data = await request.json();

    vine.errorReporter = () => new CustomErrorReporter(); // Set Custom Error Reporter
    const validator = vine.compile(registerSchema); // Compile Register Validation Schema
    const payload = await validator.validate(data); // validate data

    // * Check if Username already exists
    const isUsernameExists = await prisma.user.findUnique({
      where: { username: payload.username },
    });

    // * If Username exists return error with status code 409 (conflict)
    if (isUsernameExists) {
      return responsePayload(false, "Username already taken", 409);
    }

    // * Check if Email already exists
    const isEmailExists = await prisma.user.findUnique({
      where: { email: payload.email },
    });

    if (isEmailExists) {
      return responsePayload(false, "Email already exists", 409);
    }

    // * Hash password
    const salt = await bcryct.genSalt(10);
    payload.password = await bcryct.hash(payload.password, salt);

    // * Insert user into database
    const user = await prisma.user.create({
      data: payload,
    });

    return responsePayload(true, "User created successfully", 201, {
      ...user,
      password: undefined,
    });
  } catch (error: any) {
    if (error instanceof errors.E_VALIDATION_ERROR) {
      return responsePayload(false, `${Object.values(error.messages)[0]}`, 400);
    }

    return responsePayload(false, "Something went wrong", 500);
  }
};

const responsePayload = (
  success: boolean,
  message: string,
  status: number,
  data?: {}
) => {
  return NextResponse.json(
    {
      success,
      body: {
        message,
        data,
      },
    },
    { status }
  );
};
