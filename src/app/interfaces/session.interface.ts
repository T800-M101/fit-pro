export interface Session {
session_id: number;
  start_time: string; // ISO date
  available_spots: number;
  class_title: string;
  intensity: string;
  duration_minutes: number;
}