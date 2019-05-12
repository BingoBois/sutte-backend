Feature: Create new Course
 
Scenario: Creating a new course as an admin
  Given I am Admin attempting to create a new course
  When I am authorized create the course
  Then the course should be created

Scenario: Deleting a course as an admin
  Given I am Admin attempting to delete a course
  When I am authorized to delete the course
  Then the course should be deleted
