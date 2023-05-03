import db from "../db";
import { i } from "../i18n";

export class Room {
  constructor(code, capacity) {
    this.code = code;
    this.capacity = capacity;
  }

  get courses() {
    const courses = [];
    db.units.forEach((unit) => {
      unit.courses.forEach((course) => {
        course.sessions.forEach((session) => {
          if (session.roomCode == this.code && !courses.includes(course)) {
            courses.push(course);
          }
        });
      });
    });
    return courses;
  }

  get sessions() {
    const sessions = [];
    this.courses.forEach((course) => {
      course.sessions.forEach((session) => {
        if (session.roomCode == this.code) {
          sessions.push(session);
        }
      });
    });
    return sessions;
  }

  toString() {
    return `
      ${i("general.code")}: ${this.code}
      ${i("general.capacity")}: ${this.capacity}
    `;
  }

  isFree(fromTimestamp, toTimestamp) {
    let free = true;
    this.sessions.forEach((session) => {
      if (
        (fromTimestamp >= session.from.timestamp && fromTimestamp < session.to.timestamp) ||
        (toTimestamp > session.from.timestamp && toTimestamp <= session.to.timestamp) ||
        (fromTimestamp <= session.from.timestamp && toTimestamp >= session.to.timestamp)
      ) {
        free = false;
      }
    });
    return free;
  }
}
