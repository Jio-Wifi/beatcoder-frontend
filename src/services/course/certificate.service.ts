import api from "../axios.service";
import type { Certificate, IssueCertificateInput } from "../../types/course/certificate.types";
import { safeApiCall } from "../../utils/safeApiCall";

const API_URL = "/certificate";

// Fetch all certificates
export const getAllCertificates = (): Promise<Certificate[]> =>
  safeApiCall(async () => {
    const { data } = await api.get<Certificate[]>(API_URL);
    return data;
  }, "Failed to fetch certificates");

// Fetch a certificate by its ID
export const getCertificateById = (id: string): Promise<Certificate> =>
  safeApiCall(async () => {
    const { data } = await api.get<Certificate>(`${API_URL}/${id}`);
    return data;
  }, "Failed to fetch certificate");

// Fetch all certificates issued to a user
export const getCertificatesByUser = (userId: string): Promise<Certificate[]> =>
  safeApiCall(async () => {
    const { data } = await api.get<Certificate[]>(`${API_URL}/user/${userId}`);
    return data;
  }, "Failed to fetch user certificates");

// Issue a new certificate
export const issueCertificate = (payload: IssueCertificateInput): Promise<Certificate> =>
  safeApiCall(async () => {
    const { data } = await api.post<Certificate>(API_URL, payload);
    return data;
  }, "Failed to issue certificate");

// Delete a certificate by ID
export const deleteCertificate = (id: string): Promise<{ message: string }> =>
  safeApiCall(async () => {
    const { data } = await api.delete<{ message: string }>(`${API_URL}/${id}`);
    return data;
  }, "Failed to delete certificate");
