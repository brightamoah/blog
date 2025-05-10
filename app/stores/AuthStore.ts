import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { defineStore, acceptHMRUpdate } from "pinia";
import type { AuthData } from "~/types/type";

export const useAuthStore = defineStore("AuthStore", () => {
  const auth = useFirebaseAuth();
  const db = useFirestore();
  const user = getCurrentUser();
  const userId = ref<string | null>(null);
  const router = useRouter();
  const isLoggedIn = ref<boolean>(false);
  const isLoading = ref<boolean>(false);
  const errorMessage = ref<string | null>(null);

  const showPassword = ref<boolean>(false);
  const showConfirmPassword = ref<boolean>(false);

  const loginFormData = ref<AuthData["loginFormData"]>({
    email: "",
    password: "",
    rememberMe: false,
  });

  const registerFormData = ref<AuthData["registerFormData"]>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const passwordMismatch = computed(() => {
    return (
      registerFormData.value.password &&
      registerFormData.value.confirmPassword &&
      registerFormData.value.password !== registerFormData.value.confirmPassword
    );
  });

  const isSignupFormValid = computed(() => {
    return (
      registerFormData.value.firstName &&
      registerFormData.value.lastName &&
      registerFormData.value.email &&
      registerFormData.value.password &&
      registerFormData.value.confirmPassword &&
      registerFormData.value.password ===
        registerFormData.value.confirmPassword &&
      registerFormData.value.password.length >= 8 &&
      registerFormData.value.confirmPassword.length >= 8 &&
      !passwordMismatch.value
    );
  });

  const isLoginFormValid = computed(() => {
    return (
      loginFormData.value.email &&
      loginFormData.value.password &&
      loginFormData.value.password.length >= 8
    );
  });

  const resetFormData = () => {
    loginFormData.value.email = "";
    loginFormData.value.password = "";
    loginFormData.value.rememberMe = false;
    registerFormData.value.firstName = "";
    registerFormData.value.lastName = "";
    registerFormData.value.email = "";
    registerFormData.value.password = "";
    registerFormData.value.confirmPassword = "";
  };

  const handleSignup = async () => {
    isLoading.value = true;
    try {
      if (!auth) {
        console.error("Firebase auth is not initialized");
        return;
      }

      const fullName = `${registerFormData.value.firstName} ${registerFormData.value.lastName}`;

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        registerFormData.value.email,
        registerFormData.value.password,
      );
      const user = userCredential.user;

      await updateProfile(user, { displayName: fullName });
      await sendEmailVerification(user);

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        displayName: fullName,
        photoURL: null,
        createdAt: new Date(),
      });
      resetFormData();
      navigateTo("/blogs");
    } catch (error) {
      console.error("Signup failed:", error);
    } finally {
      isLoading.value = false;
    }
  };

  const handleLogin = async () => {
    isLoading.value = true;
    try {
      if (!auth) {
        console.error("Firebase auth is not initialized");
        return;
      }

      const userCredential = await signInWithEmailAndPassword(
        auth,
        loginFormData.value.email,
        loginFormData.value.password,
      );
      const user = userCredential.user;

      await setDoc(
        doc(db, "users", user.uid),
        {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || "Anonymous",
          photoURL: user.photoURL || null,
          createdAt: new Date(),
        },
        { merge: true },
      );
      resetFormData();
      navigateTo("/blogs");
      isLoggedIn.value = true;
    } catch (err) {
      const typedError = err as Error;
      errorMessage.value = typedError.message;
      console.error("Login failed:", errorMessage.value);
    } finally {
      isLoading.value = false;
    }
  };

  const logout = async () => {
    isLoading.value = true;
    try {
      if (!auth) throw new Error("Firebase auth is not initialized");
      await auth.signOut();
      isLoggedIn.value = false;
      navigateTo("/auth/login");
      resetFormData();
    } catch (err) {
      const typedError = err as Error;
      errorMessage.value = typedError.message;
      console.error("Sign out failed:", typedError);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    loginFormData,
    registerFormData,
    isLoggedIn,
    isLoading,
    passwordMismatch,
    showPassword,
    showConfirmPassword,
    isSignupFormValid,
    isLoginFormValid,
    user,
    resetFormData,
    handleSignup,
    handleLogin,
    logout,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
