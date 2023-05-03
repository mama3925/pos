import { i } from "../i18n";

export function timeSlotToCustomTimestamp(timeSlot) {
  const timestamp = (timeSlot.day ?? -1) * 1440 + (timeSlot.hour ?? -1) * 60 + (timeSlot.minute ?? -1);
  return timestamp >= 0 ? timestamp : null;
}

export function dayToNumber(dayText) {
  const daysShortname = ["L", "MA", "ME", "J", "V", "S", "D"];
  return daysShortname.indexOf(dayText);
}

export function formatDay(dayNumber) {
  const base = "date.days.";
  const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
  let formatedMessage = [];
  days.forEach(d => {
    formatedMessage.push(base+d);
  });
  return i(formatedMessage[dayNumber]) ?? i("errors.na");
}
