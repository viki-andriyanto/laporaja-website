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
    const response = await API.post("/riwayat-laporan", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return {
      success: true,
      data: response.data.data,
      message: response.data.message || "Data berhasil disimpan",
    };
  } catch (error) {
    console.error("Gagal membuat riwayat laporan:", error);
    return {
      success: false,
      error: error.response?.data?.message || error.message,
      status: error.response?.status,
    };
  }
};


export const updateRiwayat = async (id, data) => {
  try {
    const response = await API.put(`/riwayat-laporan/${id}`, data);
    return response.data.data;
  } catch (error) {
    console.error("Gagal memperbarui riwayat laporan:", error);
    throw error;
  }
};

// Update riwayat dimana digunakan untuk update status
export const updateStatusRiwayat = async (id, data) => {
  try {
    const response = await API.put(`/riwayat-laporan/${id}/status`, data);
    return response.data.data;
  } catch (error) {
    console.error("Gagal memperbarui status riwayat:", error);

    // Mengambil pesan kesalahan dari response
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Gagal memperbarui status";

    throw new Error(errorMessage);
  }
};

// Update riwayat dimana digunakan untuk update komentar
export const updateStatusKomentar = async (id, data) => {
  try {
    const response = await API.put(`/riwayat-laporan/${id}/komentar`, data);
    return response.data.data;
  } catch (error) {
    console.error("Gagal memperbarui komentar riwayat:", error);

    // Mengambil pesan kesalahan dari response
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Gagal memperbarui komentar";

    throw new Error(errorMessage);
  }
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
