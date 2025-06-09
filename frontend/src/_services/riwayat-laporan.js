import API from "../_api";

export const getAllRiwayat = async () => {
  try {
    const response = await API.get("/riwayat-laporan");
    return response.data.data;
  } catch (error) {
    console.error("Gagal mengambil riwayat laporan:", error);
    throw error;
  }
};

export const getRiwayatById = async (id) => {
  try {
    const response = await API.get(`/riwayat-laporan/${id}`);
    return response.data.data;
  } catch (error) {
    console.error("Gagal mengambil riwayat laporan:", error);
    throw error;
  }
};

export const createRiwayat = async (data) => {
  try {
    const response = await API.post("/riwayat-laporan", data);
    return response.data.data;
  } catch (error) {
    console.error("Gagal membuat riwayat laporan:", error);
    throw error;
  }
};

// Tambahkan fungsi update dan delete
export const updateRiwayat = async (id, data) => {
  try {
    const response = await API.put(`/riwayat-laporan/${id}`, data);
    return response.data.data;
  } catch (error) {
    console.error("Gagal memperbarui riwayat laporan:", error);
    throw error;
  }
};

export const updateStatusRiwayat = async (id, data) => {
  return (await API.put(`/riwayat-laporan/${id}/status`, data)).data;
};

export const deleteRiwayat = async (id) => {
  try {
    const response = await API.delete(`/riwayat-laporan/${id}`);
    return response.data.data;
  } catch (error) {
    console.error("Gagal menghapus riwayat laporan:", error);
    throw error;
  }
};
