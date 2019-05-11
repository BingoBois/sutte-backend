import { ICourse } from '../types';
import { isFull } from '../helpers/course';

// Mocking med:
// Mock: objekt hvor noget opførsel / variablet er injected væk/ind
// Stub: Har noget statisk data den bare “dum dum” returnerer
// Spy: er et stub der også logger information
// Dummies: mocket objekt noget SKAL have men ikke bruger

// Paramterized test, fra array OG fra csv fil
describe('Parametarized', () => {
  test('Stub, is the class full', () => {
    const course = { 
      id: 85,
      name: 'Fake-class-1',
      description: 'very nice',
      active: true,
      fk_suggestedBy: undefined,
      amountSignups: 30,
     } as ICourse;

     expect(isFull(course)).toBe(true);
  });
});

// Unit tests med boundaries / Equivelence partitioning
