Cypress.Commands.add('login', ({ username, password }) => {
  cy.get('#username').type('tester123')
  cy.get('#password').type('salainen')
  cy.get('#login-button').click()
})

Cypress.Commands.add('addBlog', ({ title, author, url }) => {
  cy.get('#show-create-new-blog-button').click()
  cy.get('#title').type(title)
  cy.get('#author').type(author)
  cy.get('#url').type(url)
  cy.get('#submit-new-blog-button').click()
})