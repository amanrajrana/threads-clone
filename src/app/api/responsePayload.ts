import { NextResponse } from "next/server";


/**
 * Generates a utility response payload for API endpoints.
 * @param {boolean} success - Indicates if the operation was successful.
 * @param {string} message - A message describing the result of the operation.
 * @param {number} status - The HTTP status code for the response.
 * @param {object} [payload] - Optional data to include in the response.
 * @returns {NextResponse} A NextResponse object with the response payload.
 */
export const responsePayload = (
  success: boolean,
  status: number,
  message: string,
  payload?: {}
): NextResponse => {
  return NextResponse.json(
    {
      success,
      body: {
        message,
        ...(success ? { data: payload } : { error: payload }),
      },
    },
    { status }
  );
};
