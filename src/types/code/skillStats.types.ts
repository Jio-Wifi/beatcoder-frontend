export interface SkillStat {
  category: string;   
  items: string[];    
}


export interface SkillStatsContextType {
  skills: SkillStat[];
  loading: boolean;
  error: string | null;
  fetchSkillStats: () => Promise<void>;
}

