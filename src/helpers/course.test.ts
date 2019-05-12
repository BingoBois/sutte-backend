import { ICourse } from '../types';
import { isFull, getCourseState } from '../helpers/course';

// Mocking med:
// Mock: objekt hvor noget opførsel / variablet er injected væk/ind
// Stub: Har noget statisk data den bare “dum dum” returnerer
// Spy: er et stub der også logger information
// Dummies: mocket objekt noget SKAL have men ikke bruger

// Paramterized test, fra array OG fra csv fil
describe('Parametarized Tests from Array and Schema', () => {
    // Instead of reading a CSV File, we use this:
    test.each`
      signups | canSignup
      ${-400} | ${false}
      ${-1}   | ${false}
      ${0}    | ${false}
      ${1}    | ${false}
      ${29}   | ${false}
      ${30}   | ${true}
      ${31}   | ${true}
    `('isFull at varying amounts using stubs', ({signups, canSignup}) => {
      const stubCourse = {
        id: 85,
        name: 'Fake-class-1',
        description: 'very nice',
        active: true,
        fk_suggestedBy: undefined,
        amountSignups: signups,
      } as ICourse;
      expect(isFull(stubCourse)).toBe(canSignup);
    });
});

describe('Parametarized Equivalence Partitioning Test with Boundary Values', () => {
  test.each`
      signups | expectedState
      ${-400} | ${'cantBegin'}
      ${-1}   | ${'cantBegin'}
      ${0}    | ${'cantBegin'}
      ${1}    | ${'cantBegin'}
      ${8}    | ${'cantBegin'}
      ${9}    | ${'canBegin'}
      ${10}   | ${'canBegin'}
      ${11}   | ${'canBegin'}
      ${12}   | ${'ready'}
      ${13}   | ${'ready'}
      ${29}   | ${'ready'}
      ${30}   | ${'full'}
      ${31}   | ${'full'}
    `('getCourseState from signups', ({signups, expectedState}) => {
      const stubCourse = {
        id: 85,
        name: 'Fake-class-1',
        description: 'very nice',
        active: true,
        fk_suggestedBy: undefined,
        amountSignups: signups,
      } as ICourse;
      expect(getCourseState(stubCourse)).toBe(expectedState);
    });
    test('Mock this', () => {
      const stubCourse = {
        id: 85,
        name: 'Fake-class-1',
        description: 'very nice',
        active: true,
        fk_suggestedBy: undefined,
        amountSignups: -500,
      } as ICourse;
      // @ts-ignore
      getCourseState = jest.fn().mockReturnValue("HelloWorld");
      expect(getCourseState(stubCourse)).toBe("HelloWorld");
    });
});

// Unit tests med boundaries / Equivelence partitioning
