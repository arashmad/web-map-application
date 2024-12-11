/**
 * Returns error message based on the error type.
 * @param {unknown} error - The error object of type `unknown`.
 * @returns {string} Error message of type `string`.
 */
export const getErrorMessageHelper = (error: unknown): string => {
  debugger;
  let errorMessage = "";
  if (error instanceof Error) {
    errorMessage = error.message;
  } else if (error && typeof error === "object") {
    const errorObject = error as Record<string, unknown>;
    if ("message" in errorObject) {
      errorMessage = String(errorObject.message);
    } else if (
      "response" in errorObject &&
      errorObject.response &&
      typeof errorObject.response === "object" &&
      "data" in errorObject.response &&
      errorObject.response.data &&
      typeof errorObject.response.data === "object" &&
      "msg" in errorObject.response.data
    ) {
      errorMessage = String(errorObject.response.data.msg);
    }
  }
  return errorMessage || "An unknown error occurred.";
};
