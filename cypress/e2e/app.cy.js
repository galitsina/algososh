import {testUrl} from '../utils/utils';

describe('application should be up', function() {
    it('application should be up', function() {
      cy.visit(testUrl);
    });
  }); 