import { ICourse } from '../types';

export function getCourseState(course: ICourse) {
    if (course.amountSignups < 9) {
        return "cantBegin";
    } else if (course.amountSignups < 12) {
        return "canBegin";
    } else if (course.amountSignups < 30) {
        return "ready";
    }
    return "full";
}

export function isFull(course: ICourse){
  return (course.amountSignups >= 30);
}

export function canBegin(course: ICourse){
  return (course.amountSignups >= 9);
}

export function canContinue(course: ICourse){
  return (course.amountSignups >= 12);
}
