/// <reference types="cypress" />

import req from '../support/api/requests'
import schemas from '../support/api/schemas'
import assertions from '../support/api/assertions'

context('Booking', () => {
    before(() => {
        req.doAuth()
    });
    it('Validate the schema of GET Booking @contract', () => {
        req.getBooking().then(getBookingResponse => {
            assertions.validateContractOf(getBookingResponse, schemas.getBookingSchema())
        })
    });

    it('Create booking sucessfully @functional', () => {
        req.postBooking().then(postBookingResponse => {
            assertions.shouldHaveStatus(postBookingResponse, 200)
            assertions.shouldBookingIdBePresent(postBookingResponse)  
            assertions.shouldHaveDefaultHeaders(postBookingResponse)
            assertions.shouldHaveContentTypeAppJson(postBookingResponse)
            assertions.shouldDurationBeFast(postBookingResponse)
            
        })
    });

    it('Try to change a booking without token @functional', () => {
        req.postBooking().then(postBookingResponse => {
            req.updateBookingWithoutToken(postBookingResponse).then(putBoookingResponse => {
                assertions.shouldHaveStatus(putBoookingResponse, 403)
            })
        })
    });

    it('Change a booking sucessfully @functional', () => {
        req.postBooking().then(postBookingResponse => {
            req.updateBooking(postBookingResponse).then(putBoookingResponse => {
                assertions.shouldHaveStatus(putBoookingResponse, 200)
            })
        })
    });

    it('Exclude booking sucessfully @functional', () => {
        req.postBooking().then(postBookingResponse => {
            req.deleteBooking(postBookingResponse).then(deleteBoookingResponse => {
                assertions.shouldHaveStatus(deleteBoookingResponse, 201)
            })
        })
    });


});