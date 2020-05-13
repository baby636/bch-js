const assert = require("chai").assert
// const axios = require("axios")
const sinon = require("sinon")

const BCHJS = require("../../src/bch-js")
// const bchjs = new BCHJS()
let bchjs

// const mockData = require("./fixtures/electrumx-mock")

describe(`#IPFS`, () => {
  let sandbox

  beforeEach(() => {
    sandbox = sinon.createSandbox()

    bchjs = new BCHJS()
  })

  afterEach(() => sandbox.restore())

  describe("#initUppy", () => {
    it("should initialize uppy", () => {
      bchjs.IPFS.initUppy()

      // console.log(`bchjs.IPFS.uppy: `, bchjs.IPFS.uppy)
    })
  })

  describe("#uploadFile", () => {
    it("should throw an error if file does not exist", async () => {
      try {
        const path = "/non-existant-file"

        await bchjs.IPFS.uploadFile(path)

        assert.equal(true, false, "Unexpected result")
      } catch (err) {
        //console.log(`err.message: ${err.message}`)
        assert.include(err.message, `Could not find this file`)
      }
    })

    it("should return true if the file is uploaded", async () => {
      //const path = `/home/trout/work/personal/bch-js/test/unit/ipfs.js`
      try {
        const mock = {
          successful: [
            {
              id: 'file id'
            }
          ],
          failed: []
        }
        sandbox
          .stub(bchjs.IPFS.uppy, 'upload')
          .resolves(mock)

        const path = `${__dirname}/ipfs.js`
        const result = await bchjs.IPFS.uploadFile(path)

        assert.isBoolean(result)
        assert.isTrue(result)

      } catch (err) {
        //console.log(err)
        assert.equal(true, false, "Unexpected result")
      }
    })
    it("Should throw error if the file was not uploaded", async () => {
      //const path = `/home/trout/work/personal/bch-js/test/unit/ipfs.js`
      try {
        const mock = {
          successful: [],
          failed: [
            {
              id: 'file id'
            }
          ]
        }
        sandbox
          .stub(bchjs.IPFS.uppy, 'upload')
          .resolves(mock)

        const path = `${__dirname}/ipfs.js`
        await bchjs.IPFS.uploadFile(path)

        assert.equal(true, false, "Unexpected result")


      } catch (err) {
        //console.log(err)
        assert.include(err.message, `The file could not be uploaded`)

      }
    })
  })
})