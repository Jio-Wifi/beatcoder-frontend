import { useContext } from 'react';
import { CertificateContext } from '../../context/course/certificate/CertificateContext';

export const useCertificate = () => {
  const context = useContext(CertificateContext);
  if (!context) {
    throw new Error('useCertificate must be used within a CertificateProvider');
  }
  return context;
};
