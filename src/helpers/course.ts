import { ICourse } from '../types';


export function isFull(course: ICourse){
  return (course.amountSignups >= 30);
}

export function canBegin(course: ICourse){
  return (course.amountSignups >= 9);
}

export function canContinue(course: ICourse){
  return (course.amountSignups >= 12);
}
