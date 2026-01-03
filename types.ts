export enum MachineState {
  IDLE = 'IDLE',
  CRANKING = 'CRANKING',
  DROPPING = 'DROPPING',
  OPENING = 'OPENING',
  RESULT = 'RESULT'
}

export interface Ball {
  id: number;
  color: string;
  x: number;
  y: number;
  rotation: number;
  // Animation props
  animationName: string;
  animationDuration: string;
  animationDelay: string;
}

export const BALL_COLORS = [
  'bg-blue-400',
  'bg-yellow-400',
  'bg-green-400',
  'bg-purple-400',
  'bg-pink-400',
  'bg-orange-400'
];