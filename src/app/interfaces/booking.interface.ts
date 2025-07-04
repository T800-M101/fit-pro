export interface Booking {
  userId?: number | null;
  classId: number;
  time: string; // ISO format date string, e.g. "2025-06-27T14:00:00.000Z",
  date: Date;
}