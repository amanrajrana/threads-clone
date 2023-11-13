import { NextResponse } from "next/server";

/**
 * Generates a common response payload for API endpoints.
 *
 * @param {boolean} success - Indicates if the operation was successful.
 * @param {string} message - A message describing the result of the operation.
 * @param {number} status - The HTTP status code for the response.
 * @param {object} [data] - Optional data to include in the response.
 *
 * @returns {NextResponse} A NextResponse object with the response payload.
 */

export const responsePayload = (
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
