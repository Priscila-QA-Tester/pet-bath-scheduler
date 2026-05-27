Feature: Pet Spa Appointment Scheduling
  As a pet owner
  I want to fill out the appointment form
  So that I can schedule a bath for my pet
  Scenario: Successfully create an appointment (Happy Path)
    Given I navigate to the Pet Spa home page
    When I fill the Pet Owner field with "Priscila"
    And I fill the Phone field with "99999-1234"
    And I fill the Pet Name field with "Bolinha"
    And I fill the Breed field with "Poodle"
    And I fill the Weight field with "5.5"
    And I set a valid business date
    And I select the time "14:30"
    And I select the service "Bath, Grooming & Nail Clipping"
    And I check the aggressive pet checkbox
    And I click on Confirm Appointment
    Then I should see the success toast message "Appointment successfully created!"
    And the appointment for pet "Bolinha" owned by "Priscila" with phone "99999-1234" should be displayed
    And the service "Bath, Grooming & Nail Clipping" should be displayed on the appointment card for "Bolinha" owned by "Priscila"