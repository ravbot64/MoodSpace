import { create } from "zustand";

const useAuthStore = create((set) => ({
  isLoggedIn: false,
  token: null,
  uname: null,
  uemail: null,
  apiUrl: "https://moodspace-server.vercel.app",

  // Set username in Zustand state
  setName: (uname) => set({ uname }),

  // Set email in Zustand state
  setUEmail: (uemail) => set({ uemail }),

  // Login function - sets token and login state in Zustand and cookies
  login: (token) => {
    set({ token, isLoggedIn: true });
    document.cookie = `token=${token}; path=/;`; // Set cookie for token
  },

  // Logout function - clears token and login state, and removes cookies
  logout: () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "uname=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "uemail=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    set({ token: null, uname: null, uemail: null, isLoggedIn: false });
  },
}));

export default useAuthStore;
