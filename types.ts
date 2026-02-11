export type MemberName = 
  | 'Quan' | 'Thịnh' | 'Tín' | 'Vi' 
  | 'Huy' | 'Thủy' | 'Dân' | 'Mai' 
  | 'Thảo' | 'Tuấn' | 'Thiện' | 'An' | 'Tiên';

export interface PredictionData {
  [predictor: string]: {
    [subject: string]: number | '';
  };
}

export interface ActualData {
  [subject: string]: number | '';
}

export interface ScoreBoardItem {
  predictor: string;
  totalError: number;
  totalPredicted: number;
  totalActual: number;
  bias: number; // Positive means over-optimistic, negative means pessimistic
  validCount: number;
}