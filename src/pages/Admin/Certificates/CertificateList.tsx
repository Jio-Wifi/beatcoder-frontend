import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";

import { AiOutlineDelete } from "react-icons/ai";
import { useCertificate } from "../../../hooks/course/useCertificate";
import AnimatedSection from "../../../components/Common/AnimatedSection";
import CustomLoading from "../../../components/Common/CustomLoading";
import CustomError from "../../../components/Common/CustomError";

const ITEMS_PER_PAGE = 5;

const CertificateList: React.FC = () => {
  const { certificates, deleteCertificate, loading, error } = useCertificate();
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  const filteredCertificates = useMemo(() => {
    return certificates.filter((c) =>
      c.course.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [certificates, searchTerm]);

  const totalPages = Math.ceil(filteredCertificates.length / ITEMS_PER_PAGE);
  const paginated = filteredCertificates.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <AnimatedSection delay={0.2}>
      <div className="p-6 bg-white dark:bg-dark text-gray-900 dark:text-gray-100 rounded-lg shadow-lg max-w-6xl mx-auto">
        <div className="flex justify-between mb-4">
          <h2 className="text-2xl font-bold">All Certificates</h2>
          <Link
            to="/admin/certificates/issue"
            className="px-4 py-2 bg-gradient-to-r from-accent to-secondary text-white rounded-md"
          >
            + Issue Certificate
          </Link>
        </div>

        <input
          type="text"
          placeholder="Search by course title..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(1);
          }}
          className="w-full p-2 mb-4 border rounded-md focus:ring-2 focus:ring-accent"
        />

        {loading && <CustomLoading message="Loading certificates..." />}
        {error && <CustomError message={error} />}
        {!loading && paginated.length === 0 && (
          <p className="text-center text-gray-500">No certificates found.</p>
        )}

        {!loading && paginated.length > 0 && (
          <table className="min-w-full text-left border border-gray-300 dark:border-gray-700">
            <thead>
              <tr className="bg-gray-100 dark:bg-dark">
                <th className="p-3 border-b">User</th>
                <th className="p-3 border-b">Course</th>
                <th className="p-3 border-b">Issued At</th>
                <th className="p-3 border-b">Certificate URL</th>
                <th className="p-3 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((cert) => (
                <tr key={cert._id} className="hover:bg-gray-50 dark:hover:bg-dark/30">
                  <td className="p-3 border-b">{cert.user.name}</td>
                  <td className="p-3 border-b">{cert.course.title}</td>
                  <td className="p-3 border-b">
                    {new Date(cert.issuedAt).toLocaleDateString()}
                  </td>
                  <td className="p-3 border-b">
                    <a
                      href={cert.certificateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      View
                    </a>
                  </td>
                  <td className="p-3 border-b">
                    <button
                      onClick={() => deleteCertificate(cert._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <AiOutlineDelete size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-4">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Prev
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </AnimatedSection>
  );
};

export default CertificateList;
