export type Unit = {
  code: string;
  courses: Course[];
};

export type CourseType = "CM" | "TD" | "TP";

export type Course = {
  type: CourseType;
  group: number;
  unit: Unit;
  sessions: Session[];
};

export type Room = {
  code: string;
  capacity: number;
  sessions: Session[];
};

export type TimeSlot = {
  day: "L" | "MA" | "ME" | "J" | "V" | "S" | "D";
  hour: number;
  minute: number;
};

export type Session = {
  from: TimeSlot;
  to: TimeSlot;
  room: Room;
  course: Course;
};
