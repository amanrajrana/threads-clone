import { NextRequest, NextResponse } from "next/server";
import vine, { errors } from "@vinejs/vine";
import { registerSchema } from "@/validation/userSchema";
import { CustomErrorReporter } from "@/validation/customErrorReporter";
import bcryct from "bcryptjs";
import prisma from "@/DB/db.config";
import { responsePayload } from "@api/responsePayload";

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
      return responsePayload(false, 409, "Username already taken", {
        username: "Choose another username",
      });
    }

    // * Check if Email already exists
    const isEmailExists = await prisma.user.findUnique({
      where: { email: payload.email },
    });

    if (isEmailExists) {
      return responsePayload(false, 409, "Email already exists", {
        email: "Account already exists with this email",
      });
    }

    // * Hash password
    const salt = await bcryct.genSalt(10);
    payload.password = await bcryct.hash(payload.password, salt);

    // * Insert user into database
    const user = await prisma.user.create({
      data: payload,
    });

    return responsePayload(true, 201, "User created successfully", {
      ...user,
      password: undefined,
    });
  } catch (error: any) {
    if (error instanceof errors.E_VALIDATION_ERROR) {
      // return responsePayload(false, `${Object.values(error.messages)[0]}`, 400);
      return responsePayload(false, 400, `Validation Error`, error.messages);
    }

    return responsePayload(false, 500, "Something went wrong");
  }
};
