import { i } from "../i18n";

export default class Unit {
  constructor(code) {
    this.code = code;

    this.courses = []; // array of Course
  }

  toString() {
    return `
      ${i("general.code")} ${i("general.unit").toLowerCase()}: ${this.code}

      ${this.courses.map((course) => course.toString()).join("\n")}
    `;
  }

  findCourse(type, group = null) {
    return this.courses.find((course) => course.type === type && (group === null || course.group === group)) ?? null;
  }
}
