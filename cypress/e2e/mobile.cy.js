/// <reference types="cypress" />

describe('podcaster', () => {
  /* 
   * for the sake of having these suites separated and not having
   * a briefing for mobile designs/behaviour, I have copy pasted the same scenarios. 
   * We could have different scenarios on a real production app
   */
  beforeEach(() => {
    cy.viewport(390, 800) 
    cy.visit('/')
  })

  it('displays a list of podcasts as expected', () => {
    cy.get('[data-test="podcast-image"]').should('be.visible')
    cy.get('[data-test="podcast-title"]').should('be.visible')
    cy.get('[data-test="podcast-author"]').should('be.visible')
    cy.get('[data-test="podcast"]').its('length').should('be.gt', 1)
  })

  it('can navigate to a specific podcast, see episodes, go through & back', () => {
    cy.get('[data-test="podcast-title"]').first().should('be.visible').click()
    cy.get('[data-test="episode-title"]').should('be.visible').its('length').should('be.gt', 1)
    cy.get('[data-test="episode-title"]').first().should('be.visible').click()
    cy.get('[data-test="episode-detail"]').should('be.visible')
    cy.get('[data-test="episode-detail-title"]').should('be.visible')
    cy.get('[data-test="episode-detail-mp3"]').should('be.visible')
  })

  it('can filter around correctly & see results update', () => {
    cy.get('[data-test="search-filter"]').should('be.visible').click().type('f')
    cy.get('[data-test="podcast"]').its('length').should('be.lt', 100)
    cy.get('[data-test="search-filter"]').should('be.visible').click().clear()
    cy.get('[data-test="podcast"]').its('length').should('equal', 100)
  })
})
