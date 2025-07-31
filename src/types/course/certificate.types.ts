// src/types/admin/certificate.types.ts

export interface Certificate {
  _id: string;
  user: { _id: string; name: string; email: string }; // populated
  course: { _id: string; title: string };             // populated
  issuedAt: string;
  certificateUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface IssueCertificateInput {
  user: string;         // userId
  course: string;       // courseId
  certificateUrl: string;
}

export interface CertificateState {
  certificates: Certificate[];
  selectedCertificate: Certificate | null;
  loading: boolean;
  error: string | null;
}

export interface CertificateContextProps extends CertificateState {
  fetchCertificates: () => Promise<void>;
  fetchCertificateById: (id: string) => Promise<void>;
  fetchCertificatesByUser: (userId: string) => Promise<void>;
  issueCertificate: (data: { user: string; course: string; certificateUrl: string }) => Promise<void>;
  deleteCertificate: (id: string) => Promise<void>;
}
