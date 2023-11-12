import { NextRequest, NextResponse } from "next/server";
import vine, { errors } from "@vinejs/vine";
import registerSchema from "@/validation/registerSchema";

export const POST = async (request: NextRequest) => {
  try {
    const data = await request.json();
    const validator = vine.compile(registerSchema); // Compile Register Validation Schema
    const payload = await validator.validate(data); // validate data

    return NextResponse.json(
      {
        body: { message: "Success", payload },
      },
      { status: 201 }
    );
  } catch (error: any) {
    if (error instanceof errors.E_VALIDATION_ERROR) {
      return NextResponse.json(
        {
          body: {
            message: "Validation error",
            errors: error.messages,
          },
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
};
