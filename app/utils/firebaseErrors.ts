// /c:/Users/LENOVO. sm/Desktop/blog/app/utils/firebaseErrors.ts

type FirebaseErrorMap = {
  [code: string]: string;
};

const firebaseErrorMessages: FirebaseErrorMap = {
  "auth/email-already-in-use": "This email is already in use.",
  "auth/invalid-email": "The email address is not valid.",
  "auth/user-disabled": "This user account has been disabled.",
  "auth/user-not-found": "No account found with this email.",
  "auth/wrong-password": "The password is incorrect.",
  "auth/too-many-requests": "Too many attempts. Please try again later.",
  "auth/weak-password": "The password is too weak.",
  "auth/network-request-failed": "Network error. Please check your connection.",
  "auth/operation-not-allowed": "This operation is not allowed.",
  "auth/invalid-verification-code": "The verification code is invalid.",
  "auth/invalid-verification-id": "The verification ID is invalid.",
  "auth/invalid-credential":
    "Invalid Email Or Password.",
  "auth/missing-email": "Please enter your email address.",
  "auth/missing-password": "Please enter your password.",
  "auth/expired-action-code": "This action code has expired.",
  "auth/invalid-action-code": "This action code is invalid.",
  "auth/account-exists-with-different-credential":
    "An account already exists with a different sign-in method.",
  "auth/credential-already-in-use":
    "This credential is already associated with another account.",
  "auth/popup-closed-by-user":
    "The popup was closed before completing the sign in.",
  "auth/cancelled-popup-request": "Popup request was cancelled.",
  "auth/popup-blocked": "The popup was blocked by the browser.",
};

export function getFirebaseErrorMessage(code: string): string {
  return (
    firebaseErrorMessages[code] ||
    "An unexpected error occurred. Please try again."
  );
}
