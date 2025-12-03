import React from "react";
import { FaFileAlt, FaDownload } from "react-icons/fa";

const DocumentsTab = ({ t }) => {
  const documents = [
    {
      id: 1,
      name: "Устав ЭЙЧДИ КЛИНИК",
      date: "01-11-2025 22:55",
      size: "4,425 KB",
      icon: <FaFileAlt className="text-brand1 text-2xl" />,
      url: "/docs/Устав ЭЙЧДИ КЛИНИК.pdf",
    },
    {
      id: 2,
      name: "Карточка ЭЙЧДИ КЛИНИК",
      date: "01-11-2025 12:19",
      size: "181 KB",
      icon: <FaFileAlt className="text-brand1 text-2xl" />,
      url: "/docs/Карточка ЭЙЧДИ КЛИНИК.pdf",
    },
    {
      id: 3,
      name: "ОГРН ИНН ЭЙЧДИ КЛИНИК",
      date: "01-11-2025 12:19",
      size: "226 KB",
      icon: <FaFileAlt className="text-brand1 text-2xl" />,
      url: "/docs/ОГРН ИНН ЭЙЧДИ КЛИНИК.pdf",
    },
    {
      id: 4,
      name: "ЕГРЮЛ ЭЙЧДИ КЛИНИК",
      date: "01-11-2025 12:19",
      size: "185 KB",
      icon: <FaFileAlt className="text-brand1 text-2xl" />,
      url: "/docs/ЕГРЮЛ ЭЙЧДИ КЛИНИК.pdf",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-3">
        <h2 className="heading1 font-bold text-brand1">Документы</h2>
      </div>

      {/* Documents Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {documents.map((doc) => (
          <a
            key={doc.id}
            href={doc.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-xl p-5 shadow-md border border-gray-200 hover:shadow-lg hover:border-brand3 transition-all group flex justify-between"
          >
            <div className="flex items-center gap-4">
              {/* Icon */}
              <div className="flex-shrink-0 bg-brand1/20 p-3 rounded-lg group-hover:bg-brand1/40 transition-colors">
                {doc.icon}
              </div>

              {/* Content */}
              <h3 className="font-semibold base-text text-brand1  group-hover:text-brand3 transition-colors line-clamp-2">
                {doc.name}
              </h3>
            </div>
            <div className="flex-shrink-0 ">
              <div className="w-10 h-10 bg-brand4/20 rounded-full flex items-center justify-center group-hover:bg-brand3 transition-colors">
                <FaDownload className="text-brand3 text-xl group-hover:text-white transition-colors" />
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default DocumentsTab;
