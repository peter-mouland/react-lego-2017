import { expect, sinon } from '../../../tests/config/test.helper';
import * as fetchLib from './fetch';

import Chance from 'chance';

const chance = new Chance();
const sandbox = sinon.sandbox.create();
let fetch;
let json;
let requests;

describe('fetch', ()=>{

  beforeEach(() => {
    global.XMLHttpRequest = sinon.useFakeXMLHttpRequest();
    requests =  [];

    global.XMLHttpRequest.onCreate = function (xhr) {
      requests.push(xhr);
    };
    fetch = fetchLib.fetch;
    json = fetchLib.json;
  });

  afterEach(()=>{
    global.XMLHttpRequest.restore();
    sandbox.restore();
  });

  context(' URL ', ()=>{
    it('should return url with localhost by default', (done) => {
      const endpoint = '/' + chance.word();
      const mockFetch = fetch.url(endpoint)
      expect(requests.length).to.equal(1);
      requests[0].respond(200, { "Content-Type": "application/json" });
      mockFetch.then(() => {
        expect(requests[0].url).to.deep.equal(`http://localhost:8080${endpoint}`);
        done();
      }).catch((e) => {
        done(e);
      })
    });
    it('should return given url if it contains double-slash', (done) => {
      const endpoint = `//${chance.word()}`;
      const mockFetch = fetch.url(endpoint)
      expect(requests.length).to.equal(1);
      requests[0].respond(200, { "Content-Type": "application/json" });
      mockFetch.then(endpoint).then(() => {
        expect(requests[0].url).to.deep.equal( endpoint );
        done();
      }).catch((e) => {
        done(e);
      });
    });

    it('should return request options with data', (done) => {
      const endpoint = chance.word();
      const data = chance.sentence();
      const mockData =  `[{ "id": 12, "comment": "${data}" }]`;
      const mockFetch = fetch.url(endpoint)
      expect(requests.length).to.equal(1);
      requests[0].respond(200, { "Content-Type": "application/json" }, mockData);
      mockFetch.then(endpoint, { data }).then((returnData)=>{
        expect(returnData).to.equal(mockData);
        done();
      }).catch((e)=>{
        done(e);
      })
    });
  });
});
