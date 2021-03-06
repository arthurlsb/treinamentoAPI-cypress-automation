/// <reference types="cypress" />

import req from '../support/api/requests'
import assertions from '../support/api/assertions'

context('Ping', () => {
    it('Validate that application is up @healthcheck', () => {
        req.getPing().then(getPingResponse => {
            assertions.shouldHaveStatus(getPingResponse, 201) 
        })
       
    });
});