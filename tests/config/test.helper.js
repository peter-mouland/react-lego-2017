import Preact, { h } from 'preact';
import chai from 'chai';
import sinon from 'sinon';
import sinonChai from "sinon-chai";
import debug from 'debug';

debug.enable(false);

const { assert, expect } = chai;
chai.should();
chai.expect();
chai.use(sinonChai);

export {
  Preact,
  h,
  expect,
  sinon,
};
