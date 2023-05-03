import db from "../db";
import { i } from "../i18n";

export class Session {
  constructor(from, to, subGroup, roomCode) {
    this.from = from;
    this.subGroup = subGroup;
    this.to = to;

    this.roomCode = roomCode;
  }

  get course() {
    let course = null;
    db.units.forEach((unit) => {
      unit.courses.forEach((_course) => {
        _course.sessions.forEach((session) => {
          if (session == this) {
            course = _course;
          }
        });
      });
    });
    return course;
  }

  toString(displayRoom = true) {
    const room = db.getRoom(this.roomCode);
    return `
      ${i("general.from")}: ${i("general.timeSlot", this.from)}
      ${i("general.to")}: ${i("general.timeSlot", this.to)}
      ${i("general.subGroup")}: ${this.subGroup}

      ${room && displayRoom ? room.toString() : ""}
    `;
  }
}
