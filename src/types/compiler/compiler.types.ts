export interface CompilerPayload {
  language: string;
  code: string;
  input?: string;
}

export interface CompilerStatus {
  id: number;
  description: string;
}

export interface CompilerResponse {
  stdout: string | null;
  time: string;
  memory: number;
  stderr: string | null;
  token: string;
  compile_output: string | null;
  message: string | null;
  status: CompilerStatus;
}



