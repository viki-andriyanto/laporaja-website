import API from "../_api";

export const getAllRiwayat = async () => {
    try {
        const response = await API.get("/riwayat-laporan");
        return response.data;
    } catch (error) {
        console.error("Gagal mengambil riwayat laporan:", error);
        throw error;
    }
};

export const getRiwayatById = async (id) => {
    try {
        const response = await API.get(`/riwayat-laporan/${id}`);
        return response.data;
    } catch (error) {
        console.error("Gagal mengambil riwayat laporan:", error);
        throw error;
    }
};

export const createRiwayat = async (data) => {
    try {
        const response = await API.post("/riwayat-laporan", data);
        return response.data;
    } catch (error) {
        console.error("Gagal membuat riwayat laporan:", error);
        throw error;
    }
};
