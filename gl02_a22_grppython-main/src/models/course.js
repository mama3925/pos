import db from "../db";
import { i } from "../i18n";
import { CourseType } from "./course-type";

export default class Course {
  constructor(type, group, unitCode, entries) {
    this.type = type;
    this.group = group;
    this.unitCode = unitCode;
    this.entries = entries;

    this.sessions = []; // array of Session
  }

  toString(displaySession = true) {
    return `
      ${i("general.type")}: ${this.formattedType}
      ${i("general.group")}: ${this.group}
      ${i("general.entries")}: ${this.entries}

      ${displaySession ? this.sessions.map((session) => session.toString()).join("\n") : ""}
    `;
  }

  get unit() {
    let unit = null;
    db.units.forEach((_unit) => {
      _unit.courses.forEach((course) => {
        if (course === this) unit = _unit;
      });
    });
    return unit;
  }

  get formattedType() {
    switch (this.type) {
      case CourseType.CM:
        return "CM";
      case CourseType.TD:
        return "TD";
      case CourseType.TP:
        return "TP";
      default:
        return "N/A";
    }
  }
}
