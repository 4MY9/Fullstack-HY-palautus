//cy.request('POST', 'http://localhost:3003/api/testing/reset')
describe('Blog app', function() {
  
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
      const user = {
        name: 'testi1',
        username: 'testi1',
        password: 'testi1'
          }
        cy.request('POST', 'http://localhost:3003/api/users/', user)
        cy.visit('http://localhost:3000')
    })
  
    it('Login form is shown', function() {
      cy.contains('Log in').click()
    })

    describe('Login',function() {
        it('succeeds with correct credentials', function() {
            cy.contains('log in').click()
            cy.get('#username').type('testi1')
            cy.get('#password').type('testi1')
            cy.get('#login-button').click()
        
            cy.contains('testi1 logged in')
        })
    
        it('fails with wrong credentials', function() {
            cy.contains('log in').click()
            cy.get('#username').type('testi1')
            cy.get('#password').type('wrong')
            cy.get('#login-button').click()
        
            cy.contains('wrong name or password')
        })
    })
    describe('When logged in', function() {
        beforeEach(function() {
            cy.contains('log in').click()
            cy.get('#username').type('testi1')
            cy.get('#password').type('testi1')
            cy.get('#login-button').click()
        })
    
        it('A blog can be created', function() {
            cy.contains('create new').click()
            cy.get('#title').type('a blog created by cypress')
            cy.get('#author').type('cypress')
            cy.get('#url').type('cypress.fi')
            cy.get('#create-button').click()
            cy.contains('a blog created by cypress')
            cy.contains('a blog created by cypress cypress')
            
        })
        it('A blog can be liked', function() {
            cy.contains('create new').click()
            cy.get('#title').type('a blog created by cypress')
            cy.get('#author').type('cypress')
            cy.get('#url').type('cypress.fi')
            cy.get('#create-button').click()
            cy.contains('a blog created by cypress cypress')
            cy.contains('view').click()
            cy.contains('like').click()
            cy.contains('1')
        })
        it('A blog can be removed', function() {
            cy.contains('create new').click()
            cy.get('#title').type('a blog created by cypress')
            cy.get('#author').type('cypress')
            cy.get('#url').type('cypress.fi')
            cy.get('#create-button').click()
            cy.contains('a blog created by cypress cypress')
            cy.contains('view').click()
            cy.contains('remove').click()
            cy.contains('Deleted a blog created by cypress')
        })
        
    })
})
describe('Several blogs are ordered by likes', function() {
    beforeEach(function() {
        cy.login({ username: 'testi1', password: 'testi1'})
        cy.createBlog({title: 'one', author: 'one', url: 'one.one', likes: 10})
        cy.createBlog({title: 'two', author: 'two', url: 'two.two', likes: 1})
        cy.createBlog({title: 'three', author: 'three', url: 'three.tree', likes: 3})
        cy.createBlog({title: 'four', author: 'four', url: 'four.four', likes: 300})
        })
        
        it('A blog with most likes', function() {
            cy.get('.blogDefault').first().should('have.text', 'four fourview')
            cy.contains('view').click()
            cy.contains('likes 300')
            
        })
    
    


})