import { NextResponse } from "next/server";

/**
 * Generates a response payload for API endpoints.
 *
 * @param {number} status - The HTTP status code for the response.
 * @param {string} message - A message describing the result of the operation.
 * @param {object} [payload] - Optional data to include in the response. If success is false, this will be treated as an error object.
 *
 * @returns {NextResponse} A NextResponse object with the response payload.
 */

export const responsePayload = (
  status: number,
  message: string,
  payload?: {}
): NextResponse => {
  const success = status >= 200 && status < 300;

  return NextResponse.json(
    {
      success,
      body: {
        message,
        ...(success ? { data: payload } : { errors: payload }),
      },
    },
    { status }
  );
};
