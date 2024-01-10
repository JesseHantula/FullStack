describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'root',
      username: 'tester123',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user) 
    cy.visit('http://localhost:3001')
  })
  it('Login form is shown', function() {
    cy.contains('login').click()
  })

  describe('Login',function() {
    it('user can login', function () {
      cy.contains('login').click()
      cy.get('#username').type('tester123')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
      cy.contains('Logged in as root')
    })

    it('login fails with wrong password', function() {
      cy.contains('login').click()
      cy.get('#username').type('tester123')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
      cy.get('.error')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'test logged in')
    })
  })
  describe('When logged in', function() {
    beforeEach( function () {
      cy.login({ username: 'tester123', password: 'salainen' })
    })
    it('A blog can be created', function() {
      cy.get('#show-create-new-blog-button').click()
      cy.get('#title').type('test blog')
      cy.get('#author').type('yours truly')
      cy.get('#url').type('www.swag.com')
      cy.get('#submit-new-blog-button').click()
      cy.contains("Title: test blog")
      cy.contains("Author: yours truly")
    })
    describe('and a blog exists', function () {
      beforeEach( function () {
        cy.addBlog({ title: 'test blog', author: 'me', url: 'www.getgood.com' })
      })
      it('a blog can be liked', function () {
        cy.get('#show-blog-button').click()
        cy.get('#like-blog-button').click()
        cy.contains("Likes: 1")
      })
      it('a blog can be deleted', function () {
        cy.get('#show-blog-button').click()
        cy.get('#delete-blog-button').click()
        cy.get('html').should('not.contain', "Title: test blog")
      })
      it('a user can not delete another user blog', function () {
        cy.get('#logout-button').click()
        const newUser = {
          name: 'random',
          username: 'hacker123',
          password: 'salainen'
        }
        cy.request('POST', 'http://localhost:3001/api/users/', newUser) 
        cy.visit('http://localhost:3001')
        cy.get('#username').type('hacker123')
        cy.get('#password').type('salainen')
        cy.get('#login-button').click()
        cy.get('#show-blog-button').click()
        cy.get('#delete-blog-button').should('not.be.visible')
      })
      describe('and another blog exists', function () {
        beforeEach( function () {
          cy.addBlog({ title: 'test blog 2', author: 'me', url: 'www.www.com' })
        })
        it('blogs are ordered by amount of likes', function () {
          cy.get('#show-blog-button').click()
          cy.get('#show-blog-button').click()
          cy.get('#hide-blog-button').click()
          cy.get('#like-blog-button').click()
          cy.get('#hide-blog-button').click()

          cy.get('[data-testid="blog-info"]').eq(0).should('contain', 'Title: test blog 2')
          cy.get('[data-testid="blog-info"]').eq(1).should('contain', 'Title: test blog')
        })
    })
  })
})
})