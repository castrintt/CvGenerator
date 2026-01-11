describe('Resume Generator Flow', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should fill the form and generate a resume', () => {
    // Personal Info
    cy.get('input[name="personalInfo.fullName"]').type('John Doe');
    cy.get('input[name="personalInfo.email"]').type('john@example.com');
    cy.get('input[name="personalInfo.phone"]').type('11999999999');
    cy.get('input[name="personalInfo.address"]').type('São Paulo, SP');

    // Summary
    cy.get('textarea[name="summary"]').type('Experienced developer...');

    // Experience
    cy.contains('button', '+ Adicionar Experiência').click();
    cy.get('input[name="experience.0.company"]').type('Tech Corp');
    cy.get('input[name="experience.0.position"]').type('Developer');
    cy.get('input[name="experience.0.startDate"]').type('012020');
    cy.get('textarea[name="experience.0.description"]').type('Worked on important projects.');

    // Education
    cy.contains('button', '+ Adicionar Formação').click();
    cy.get('input[name="education.0.institution"]').type('University');
    cy.get('input[name="education.0.degree"]').type('Bachelor');
    cy.get('input[name="education.0.fieldOfStudy"]').type('Computer Science');
    cy.get('input[name="education.0.graduationDate"]').type('122019');

    // Skills
    cy.get('input[name="skills.0.name"]').type('React');
    cy.get('select[name="skills.0.level"]').select('Avançado');

    // Template Selection
    cy.contains('h3', 'Moderno Lateral').click();

    // Submit
    cy.contains('button', 'Gerar Currículo').click();

    // Check navigation
    cy.url().should('include', '/generating');
  });
});
