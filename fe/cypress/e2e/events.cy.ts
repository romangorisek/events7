// cypress/e2e/events.cy.ts

describe('Events CRUD', () => {
  it('should allow creating, reading, updating, and deleting events', () => {
    // Visit the events page
    cy.visit('/events')

    // Create a new event
    cy.get('.q-btn').contains('New event').click()

    const eventName = `Test Event ${Date.now()}`

    cy.get('[data-testid="input-name"]').type(eventName)

    cy.get('[data-testid="input-description"]').type('This is a test event description.')

    cy.get('[data-testid="input-type"]').click() // Select Type

    cy.get('.q-menu').contains('app').click() // Select 'app' as type

    cy.get('[data-testid="input-priority"]').click() // Select Priority

    cy.get('.q-menu').contains('5').click() // Select '5' as priority

    cy.get('button[type="submit"]').contains('Submit').click()

    // Read the new event
    cy.contains(eventName).should('be.visible')

    // Update the event
    cy.contains(eventName).parent().find('.q-btn').contains('edit').click()

    const updatedEventName = `${eventName} - Updated`
    cy.get('[data-testid="input-name"]').clear()
    cy.get('[data-testid="input-name"]').type(updatedEventName)

    cy.get('[data-testid="input-description"]').clear()
    cy.get('[data-testid="input-description"]').type('This is an UPDATED test event description.') // Also update description

    cy.get('[data-testid="input-type"]').click()
    cy.get('.q-menu').contains('liveops').click() // Select 'liveops' as type

    cy.get('[data-testid="input-priority"]').click()
    cy.get('.q-menu').contains('7').click() // Select '7' as priority

    cy.get('button[type="submit"]').contains('Submit').click()

    cy.contains(updatedEventName).should('be.visible')

    // Delete the event
    cy.contains(updatedEventName).parent().find('.q-btn').contains('delete').click()

    cy.get('.q-dialog').find('.q-btn').contains('OK').click()

    cy.contains(updatedEventName).should('not.exist')
  })
})
