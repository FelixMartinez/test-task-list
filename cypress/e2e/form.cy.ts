describe('template spec', () => {
  it('passes', () => {
    cy.origin('https://6481f63929158d000842a565.auth.us-east-1.amazoncognito.com', () => {

      cy.visit('http://localhost:3000/task/list')
      cy.get('#addNewEntry').type("New Task");
      cy.get('#saveEntry').click()
    })
  })

})