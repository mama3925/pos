import Course from "./models/course";
import { courseTypeToNumber } from "./models/course-type";
import { Room } from "./models/room";
import { Session } from "./models/session";
import Unit from "./models/unit";
import { dayToNumber, timeSlotToCustomTimestamp } from "./utils/date";

const regexes = {
  unit: /\+(?<unit>(.|\n)*?)(?=\+|\n{1}$|\n{2}|$)/g,
  timeSlot: /^((H( ){0,}=( ){0,})|)(?<day>L|MA|V|ME|J|S|D)( ){0,}(?<fromHour>(\d{0,2})):(?<fromMinute>\d{0,2})-(?<toHour>\d{0,2}):(?<toMinute>\d{0,2})$/,
  subGroup: /^F(?<subGroup>\w+)$/,
  room: /^S=(?<room>[A-Za-z0-9]+)$/,
  capacity: /^P=(?<capacity>\d+)$/,
  type: /^(?<type>C|D|T)(?<group>\d+)$/,
};

function parse(_fileContent, rooms = []) {
  const units = [];
  const rawUnits = [];

  const fileContent = _fileContent.replace(/\r/g, ""); // windows
  const unitMatchs = fileContent.matchAll(regexes.unit);

  for (const unitMatch of unitMatchs) {
    const unitText = unitMatch.groups.unit.trim();
    const unitRows = toRows(unitText);
    const unitCode = unitRows.shift();

    if (unitCode === "UVUV") continue; // remove UVUV test unit

    const rawUnit = {
      code: unitCode,
      rawCourses: [],
    };

    unitRows.forEach((unitRow) => {
      const sessionTexts = clearEmptyElements(unitRow.split("/"));
      const courseText = sessionTexts[0];
      const courseItems = clearEmptyElements(courseText.split(","));

      const rawCourse = {
        type: null,
        group: null,
        entries: null,
        rawSessions: [],
      };

      // parse course
      courseItems.forEach((courseItem) => {
        if (regexes.type.test(courseItem)) {
          const match = courseItem.match(regexes.type);

          rawCourse.type = courseTypeToNumber(match.groups.type);
          rawCourse.group = parseInt(match.groups.group);
        }
      });

      // parse sessions
      sessionTexts.forEach((sessionText) => {
        const rawSession = {
          from: {
            day: null,
            hour: null,
            minute: null,
            timestamp: null,
          },
          to: {
            day: null,
            hour: null,
            minute: null,
            timestamp: null,
          },
          roomCode: null,
          roomCapacity: null,
          subGroup: null,
        };

        // parse session items
        const sessionItems = clearEmptyElements(sessionText.split(","));
        sessionItems.forEach((sessionItem) => {
          if (regexes.room.test(sessionItem)) {
            const match = sessionItem.match(regexes.room);

            rawSession.roomCode = match.groups.room;
          } else if (regexes.capacity.test(sessionItem)) {
            const match = sessionItem.match(regexes.capacity);

            rawSession.roomCapacity = parseInt(match.groups.capacity);
            rawCourse.entries = parseInt(match.groups.capacity);
          } else if (regexes.subGroup.test(sessionItem)) {
            const match = sessionItem.match(regexes.subGroup);

            rawSession.subGroup = parseInt(match.groups.subGroup);
          } else if (regexes.timeSlot.test(sessionItem)) {
            const match = sessionItem.match(regexes.timeSlot);

            ["from", "to"].map((time) => {
              rawSession[time] = {
                day: dayToNumber(match.groups.day),
                hour: parseInt(match.groups[`${time}Hour`]),
                minute: parseInt(match.groups[`${time}Minute`]),
                timestamp: null,
              };
              rawSession[time].timestamp = timeSlotToCustomTimestamp(rawSession[time]);
            });
          }
        });

        rawCourse.rawSessions.push(rawSession);
      });

      rawUnit.rawCourses.push(rawCourse);
    });

    rawUnits.push(rawUnit);
  }

  // transform and verify raw data to models
  rawUnits.forEach((rawUnit) => {
    const unit = new Unit(rawUnit.code);

    unit.courses = rawUnit.rawCourses.map((rawCourse) => {
      const course = new Course(rawCourse.type, rawCourse.group, unit.code, rawCourse.entries);

      course.sessions = rawCourse.rawSessions.map((rawSession) => {
        let room = rooms.find((_room) => _room.code == rawSession.roomCode);

        if (!room && rawSession.roomCode != null) {
          // create room if not exist
          const _room = new Room(rawSession.roomCode, rawSession.roomCapacity);
          rooms.push(_room);
          room = _room;
        } else if (room && ((!room.capacity && rawSession.roomCapacity) || (room.capacity && rawSession.roomCapacity && rawSession.roomCapacity > room.capacity))) {
          // update room capacity if not exist
          room.capacity = rawSession.roomCapacity;
        }

        const session = new Session(rawSession.from, rawSession.to, rawSession.subGroup, room ? room.code : null);

        return session;
      });

      return course;
    });

    units.push(unit);
  });

  return { units, rooms };
}

function toRows(content) {
  return content.split("\n");
}

function clearEmptyElements(array) {
  return array.filter((item) => item !== "");
}

export { parse };
