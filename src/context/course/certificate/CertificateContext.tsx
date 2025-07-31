import { createContext } from 'react';
import type { CertificateContextProps } from '../../../types/course/certificate.types';

export const CertificateContext = createContext<CertificateContextProps | undefined>(undefined);
