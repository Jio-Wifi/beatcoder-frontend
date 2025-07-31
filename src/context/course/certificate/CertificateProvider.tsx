import React, { useState, useCallback } from "react";
import { CertificateContext } from "./CertificateContext";
import {
  getAllCertificates,
  getCertificateById,
  getCertificatesByUser,
  issueCertificate as issueCertificateAPI,
  deleteCertificate as deleteCertificateAPI,
} from "../../../services/course/certificate.service";
import type { Certificate } from "../../../types/course/certificate.types";
import useAuth from "../../../hooks/auth/useAuth";

export const CertificateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoggedIn, user } = useAuth();
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCertificates = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllCertificates();
      setCertificates(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch certificates");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchCertificateById = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getCertificateById(id);
      setSelectedCertificate(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch certificate");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchCertificatesByUser = useCallback(async (userId: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getCertificatesByUser(userId);
      setCertificates(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch user certificates");
    } finally {
      setLoading(false);
    }
  }, []);

  const issueCertificate = useCallback(
    async (payload: { user: string; course: string; certificateUrl: string }) => {
      if (!isLoggedIn || user?.role !== "admin") {
        setError("Unauthorized: Admin access required");
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const newCert = await issueCertificateAPI(payload);
        setCertificates((prev) => [...prev, newCert]);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to issue certificate");
      } finally {
        setLoading(false);
      }
    },
    [isLoggedIn, user]
  );

  const deleteCertificate = useCallback(
    async (id: string) => {
      if (!isLoggedIn || user?.role !== "admin") {
        setError("Unauthorized: Admin access required");
        return;
      }
      setLoading(true);
      setError(null);
      try {
        await deleteCertificateAPI(id);
        setCertificates((prev) => prev.filter((c) => c._id !== id));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to delete certificate");
      } finally {
        setLoading(false);
      }
    },
    [isLoggedIn, user]
  );

  return (
    <CertificateContext.Provider
      value={{
        certificates,
        selectedCertificate,
        loading,
        error,
        fetchCertificates,
        fetchCertificateById,
        fetchCertificatesByUser,
        issueCertificate,
        deleteCertificate,
      }}
    >
      {children}
    </CertificateContext.Provider>
  );
};
