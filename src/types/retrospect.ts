export type RetrospectStep = 'write' | 'confirm' | 'analysis';

export type AnalysisResult = 'Signal' | 'Noise';

export interface RetrospectUIState {
  step: RetrospectStep;
  editable: boolean;
}
