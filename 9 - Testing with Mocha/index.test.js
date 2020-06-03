log = console.log
expect = require('chai').expect
should = require('chai').should()
_ = require('lodash');

const {
    alwaysTrue,
    legitString
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



describe("#legitString", ()=>{
    it("should detect 'cow' as a legit string ",()=>{
        legitString('cow').should.be.true;
    })

    // Negative test
    it("undefined should not be true", ()=>{
        legitString(undefined).should.be.false;
    })
});

