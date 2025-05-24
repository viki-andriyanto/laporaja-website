import React, { useState } from "react";

const laporanDummy = [
  {
    id: 1,
    tanggal: "12/1/2024",
    isi: "Lorem Ipsum Dolor si Amet",
    status: "SELESAI",
    komentar: "",
  },
  {
    id: 2,
    tanggal: "12/1/2024",
    isi: "Lorem Ipsum Dolor si Amet",
    status: "PERLU DITINJAU",
    komentar: "",
  },
  {
    id: 3,
    tanggal: "12/1/2024",
    isi: "Lorem Ipsum Dolor si Amet",
    status: "DITOLAK",
    komentar: "",
  },
];

const getStatusStyle = (status) => {
  switch (status) {
    case "SELESAI":
      return "bg-[#6FCF97] text-white font-bold px-3 py-1 rounded-md text-sm";
    case "PERLU DITINJAU":
      return "bg-[#F2C94C] text-black font-bold px-3 py-1 rounded-md text-sm";
    case "DITOLAK":
      return "bg-[#EB5757] text-white font-bold px-3 py-1 rounded-md text-sm";
    default:
      return "bg-gray-200 text-black px-3 py-1 rounded-md text-sm";
  }
};

const ModalDetailLaporan = ({ laporan, onClose }) => {
  if (!laporan) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-gray-100 rounded-lg w-full max-w-md p-6 shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-700 text-xl"
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-2">Detail Laporan</h2>
        <p className="font-semibold text-gray-700 mb-1">{laporan.isi}</p>
        <div className="border border-gray-400 rounded p-3 h-40 overflow-y-auto bg-white">
          isi laporan
        </div>
        <div className="flex justify-end space-x-2 mt-4">
          <button className="bg-red-300 hover:bg-red-400 text-white px-4 py-1 rounded">
            Tolak Laporan
          </button>
          <button className="bg-green-400 hover:bg-green-500 text-white px-4 py-1 rounded">
            Selesaikan
          </button>
        </div>
      </div>
    </div>
  );
};

const KelolaLaporan = () => {
  const [selectedLaporan, setSelectedLaporan] = useState(null);

  return (
    <div className="p-6 bg-white font-poppins">
      <h2 className="text-xl font-semibold mb-4">Kelola Laporan</h2>
      <div className="overflow-x-auto border border-blue-400 rounded-lg">
        <table className="min-w-full border-collapse text-sm text-center">
          <thead>
            <tr className="bg-[#00BFF9] text-white">
              <th className="py-2 px-4 border">Tanggal</th>
              <th className="py-2 px-4 border">Judul Laporan</th>
              <th className="py-2 px-4 border">Status</th>
              <th className="py-2 px-4 border">Komentar</th>
              <th className="py-2 px-4 border">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {laporanDummy.map((laporan) => (
              <tr key={laporan.id} className="border-t">
                <td className="py-2 px-4 border">{laporan.tanggal}</td>
                <td className="py-2 px-4 border">{laporan.isi}</td>
                <td className="py-2 px-4 border">
                  <span className={getStatusStyle(laporan.status)}>
                    {laporan.status}
                  </span>
                </td>
                <td className="py-2 px-4 border">{laporan.komentar}</td>
                <td className="py-2 px-4 border space-x-2">
                  <button
                    title="Detail"
                    onClick={() => setSelectedLaporan(laporan)}
                    className="bg-white border border-gray-300 rounded p-1 hover:bg-gray-100"
                  >
                    🔍
                  </button>
                  <button
                    title="Selesaikan"
                    className="bg-white border border-gray-300 rounded p-1 hover:bg-gray-100"
                  >
                    ✅
                  </button>
                  <button
                    title="Tolak"
                    className="bg-white border border-gray-300 rounded p-1 hover:bg-gray-100"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedLaporan && (
        <ModalDetailLaporan
          laporan={selectedLaporan}
          onClose={() => setSelectedLaporan(null)}
        />
      )}
    </div>
  );
};

export default KelolaLaporan;
