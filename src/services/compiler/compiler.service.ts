import api from "../axios.service";
import { safeApiCall } from "../../utils/safeApiCall";
import type { CompilerPayload, CompilerResponse } from "../../types/compiler/compiler.types";

const API_URL = "/compiler";

export const executeCode = (payload: CompilerPayload): Promise<CompilerResponse> =>
  safeApiCall<CompilerResponse>(async () => {
    const res = await api.post(`${API_URL}/execute`, payload);
    return res.data.result;
  }, "Code execution failed");