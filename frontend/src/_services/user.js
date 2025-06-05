import API from "../_api";

export const getAllUsers = async () => {
    try {
        const response = await API.get("/users");
        return response.data;
    } catch (error) {
        console.error("Gagal mengambil semua pengguna:", error);
        throw error;
    }
};

export const getUserById = async (id) => {
    try {
        const response = await API.get(`/users/${id}`);
        return response.data;
    } catch (error) {
        console.error("Gagal mengambil pengguna:", error);
        throw error;
    }
};

export const updateUser = async (id, data) => {
    try {
        const response = await API.put(`/users/${id}`, data);
        return response.data;
    } catch (error) {
        console.error("Gagal memperbarui pengguna:", error);
        throw error;
    }
};

export const deleteUser = async (id) => {
    try {
        const response = await API.delete(`/users/${id}`);
        return response.data;
    } catch (error) {
        console.error("Gagal menghapus pengguna:", error);
        throw error;
    }
};
