import { expect, assert } from 'chai'
import Calculator from '../src/calculator'
import * as sinon from 'sinon'

describe("Calculator", () => {
    describe("Add", () => {
        it("Should return 3 when a = 1 and b = 2", () => {
            let calc = new Calculator()
            var result = calc.Add(1, 2)
            expect(result).to.equal(3)
        })
        it("Should return 102 when a = 100 and b = 2", () => {
            let calc = new Calculator()
            var result = calc.Add(100, 2)
            expect(result).to.equal(102)
        })
    })
    describe("try sinon", () => {
        class JQ {
            name: 'JQ'
            dumptime: 0
            constructor() {
                this.dumptime = 0
            }
            ajax(opts: Object) {
            }
            dumpinc() {
                this.dumptime += 1
            }
            dump() {
                this.dumpinc()
                console.log('this.dumptime=', this.dumptime)
            }
        }
        it("stub usage 1", () => {
            let callback = sinon.stub().returns(42)
            console.log(' stub created returns =', callback())
        })
        it("stub usage 2", () => {
            var callback = sinon.stub();
            callback.withArgs(42).returns(1);
            callback.withArgs(1).returns('name')
            expect(callback(42)).to.equal(1)
            expect(callback(1)).to.equal('name')

        })
        it("stub usage 3", () => {
            let mockchain = {
                methods: {
                    submitBlock: sinon.stub().returns({ send: sinon.stub() })
                },
                events: {
                    allEvents: sinon.stub() //{ fromBlock: 0 }, (err: Error, ev: W3T.EventLog) 
                }
            }
            var spy1 = sinon.spy()
            var spy2 = sinon.spy()

            mockchain.methods.submitBlock({ aa: 1 }).send(spy1)
            mockchain.events.allEvents(spy2)
            console.log('spy1.called=', spy1.called)
            //assert(spy1.called)
            //assert(spy2.called)
        })
        it("spy usage 1", () => {
            let jq = new JQ()
            let incspy = sinon.spy(jq, 'dumpinc')
            jq.dump()
            jq.dump()
            incspy.restore()
            sinon.assert.callCount(incspy, 2)
        })
        it("spy usage 2", () => {
            let jq = new JQ()
            let ajaxspy = sinon.spy(jq, 'ajax')
            let aobj = { url: 'https://qq.url' }
            jq.ajax(aobj)
            ajaxspy.restore()
            sinon.assert.calledWith(ajaxspy, { url: 'https://qq.url' })
        })
    })
    describe.skip("Slowly Add", () => {
        it("Should return 3 when a = 1 and b = 2", async () => {
            let calc = new Calculator()
            var result = await calc.SlowAdd(1, 2)
            expect(result).to.equal(3)
        })
    })
})
