import { defineFeature, loadFeature } from 'jest-cucumber';
import DbHandler from '../db/dbhandler';
import { closeServer } from '../app';
import { ICourse } from '../types';

const feature = loadFeature('./src/agurk/cucumis_sativus.feature');

afterAll((done) => {
    closeServer(async () => {
        await new Promise(resolve => setTimeout(() => resolve(), 500)); // avoid jest open handle error
        done();
    });
});

let createdCourses: Array<ICourse>;

defineFeature(feature, (test) => {
    test('Creating a new course as an admin', ({ given, when, then }) => {
        given('I am Admin attempting to create a new course', async () => {
          expect('Admin').toBe("Admin");
        });
        when('I am authorized create the course', async () => {
            // @ts-ignore
            await new DbHandler().createCourse('adminCreatingCourseTest', 'Cucumber', false, undefined);
        });
        then('the course should be created', async () => {
          createdCourses = await new DbHandler().getCourses('adminCreatingCourseTest');
          expect(createdCourses.length).toBeGreaterThan(0);
        });
    });
    test('Deleting a course as an admin', ({ given, when, then }) => {
        given('I am Admin attempting to delete a course', async () => {
          expect('Admin').toBe("Admin");
        });
        when('I am authorized to delete the course', async () => {
            await new DbHandler().deleteCourse(createdCourses[0].id);
        });
        then('the course should be deleted', () => {
            new DbHandler().getCourses('adminCreatingCourseTest').catch((err) => {
                expect(err).toBe(`Courses not found`);
            });
        });
    });
});
