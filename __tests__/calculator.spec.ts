import Calculator from '../src/calculator'
describe("Calculator", () => {
    describe("Add", () => {
        it("Should return 3 when a = 1 and b = 2", () => {
            let calc = new Calculator()
            var result = calc.Add(1, 2)
            expect(result).toEqual(3)
        })
        it("Should return 102 when a = 100 and b = 2", () => {
            let calc = new Calculator()
            var result = calc.Add(100, 2)
            expect(result).toEqual(102)
        })

    })
    describe("Slowly Add", () => {
        it("Should return 3 when a = 1 and b = 2", async () => {
            let calc = new Calculator()
            var result = await calc.SlowAdd(1, 2)
            expect(result).toEqual(3)
        })
    })
})

describe("Try jest.fn", () => {
    it("stub usage 1", () => {
        let stub = jest.fn()
        let callback = stub.mockReturnValue(42)
        expect(callback()).toEqual(42)
    })
    it("stub usage 2", () => {
        let callback = jest.fn((x) => {
            if (x === 42)
                return 1
            else if (x === 1)
                return 'name'
        })
        expect(callback(42)).toEqual(1)
        expect(callback(1)).toEqual('name')
    })
    it("MockFn/Spy usage 1", () => {
        let hello = (res) => {
            res.send('Hello World!')
        }
        const res = {
            send: jest.fn()
        }
        hello(res)
        expect(res.send.mock.calls).toHaveLength(1);
        expect(res.send.mock.calls[0][0]).toBe('Hello World!');
    })
    it.skip("MockModule usage 1", () => {
        expect(JQ).not.toHaveBeenCalled()
        let jq = new JQ()
        let mjq = (JQ as any).mock.instances[0]
        expect(JQ).toHaveBeenCalledTimes(1)
        mjq.dump()
        mjq.dump()
        expect(mjq.dumpinc.mock.calls.length).toEqual(2)
    })
})

import sinon from "sinon"
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
        expect(callback()).toEqual(42)
    })
    it("stub usage 2", () => {
        var callback = sinon.stub();
        callback.withArgs(42).returns(1);
        callback.withArgs(1).returns('name')
        expect(callback(42)).toEqual(1)
        expect(callback(1)).toEqual('name')
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