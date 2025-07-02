"use server";
import axios from "axios";

type ErrorType = {
  message: string;
  statusCode: number;
};

// ERROR HANDLERS
export async function handleServerError(error: any): Promise<ErrorType> {
  // console.log(error);
  try {
    if (axios.isAxiosError(error)) {
      const response = error.response;
      if (response && response.data) {
        const { message, statusCode, details } = response.data;
        // Handle specific status code 409
        if (statusCode !== 200) {
          console.log("Conflict error: ", message);
          if (details) {
            return { message: details, statusCode: 500 };
          }
          return { message, statusCode };
        }
        return { message, statusCode };
      }
      if (error.code === "ECONNREFUSED") {
        return {
          message:
            "Connection refused. Please try again later or contact support.",
          statusCode: 500,
        };
      }
      return {
        message:
          "Unknown server error, Please try again later or contact support.",
        statusCode: 500,
      };
    } else {
      // fetch error
      if (error.details) {
        return { message: error.details, statusCode: 500 };
        // service error
      } else if (error.message) {
        return { message: error.message, statusCode: 500 };
      }

      return {
        message:
          "Unknown server error, Please try again later or contact support.",
        statusCode: 500,
      };
    }
  } catch (catchError: any) {
    return { message: catchError.message, statusCode: 500 };
  }
}
