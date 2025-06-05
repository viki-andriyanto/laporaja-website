import API from "../_api";

// Login
export const login = async (credentials) => {
    try {
        const response = await API.post("/login", credentials);
        return response.data;
    } catch (error) {
        console.error("Gagal login:", error);
        throw error;
    }
};

// Register 
export const register = async (data) => {
    try {
        const response = await API.post("/register", data);
        return response.data;
    } catch (error) {
        console.error("Gagal registrasi:", error);
        throw error;
    }
};

// Logout
export const logout = async () => {
    try {
        const response = await API.post("/logout");
        return response.data;
    } catch (error) {
        console.error("Gagal logout:", error);
        throw error;
    }
};

// Ambil user yang sedang login
export const getCurrentUser = async () => {
    try {
        const response = await API.get("/user");
        return response.data;
    } catch (error) {
        console.error("Gagal mengambil data user:", error);
        throw error;
    }
};
