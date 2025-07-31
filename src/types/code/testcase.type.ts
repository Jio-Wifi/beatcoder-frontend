export interface TestCase {
  _id: string;
  input: string;
  expectedOutput: string;
  isPublic: boolean;
  problem: string;
  createdBy: string; 
}


export interface TestCaseInput {
  input: string;
  expectedOutput: string;
  isPublic: boolean;
  problem: string;
}
