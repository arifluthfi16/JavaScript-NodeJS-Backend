log = console.log
expect = require('chai').expect
should = require('chai').should()
_ = require('lodash');

const {
    alwaysTrue,
    legitString,
    getPerson
} = require('./index');

describe('#mocha basics', ()=>{
    // unit test

    // Using chai.should
    it('true should be true', ()=>{
        true.should.be.true;
    });


    // Using chai.expect
    it("expect true to be true", ()=>{
        expect(true).to.be.true;
    })
});

describe("#alwaysTrue", ()=>{
    it("should always return true", ()=>{
        alwaysTrue().should.be.true;
    })

    it("I expect it to always be true", ()=>{
        expect(alwaysTrue()).to.be.true;
    })

    it("should not be false", ()=>{
        alwaysTrue().should.not.be.false;
    })
})

// Basic String Test
describe("#legitString", ()=>{
    it("should detect 'cow' as a legit string ",()=>{
        legitString('cow').should.be.true;
    })

    // Negative test
    it("undefined should not be true", ()=>{
        legitString(undefined).should.be.false;
    })
});

// Confirm initial condition
describe.only("#index initial condition ", ()=>{
    it("Initial person is an object", ()=>{
        const person = getPerson();

        _.isObject(person).should.be.true;
    })

    it("armor bonus by default is 0 with wearing leather armor", ()=>{
        const person = getPerson();
        person.armorBonus.should.equal(0);
        // FIXME : Should be 2 by deafult using leather armor
    })
});

