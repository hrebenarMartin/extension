import chai from 'chai';
const expect = chai.expect;
import { Map as ImmutableMap, Set as ImmutableSet } from 'immutable';

import fromJS from '../../../src/app/utils/customFromJS';

import initializeStateAsMaps, { getAddresses, checkHistory } from '../../../src/app/background/store/checkState';
import makeInitialState from '../../../src/app/background/store/makeInitialState';

describe('getAddresses', function () {
  it('should list all keys addresses of an nested object', function () {

    const myNestedObject = makeInitialState().delete('notPrefs');
    expect(getAddresses(myNestedObject)).to
    .deep.equal(['prefs:websites', 'prefs:criteria', 'prefs:editors', 'prefs:dismissedRecos', 'prefs:approvedRecos']);
  });
});

describe('checkHistory', function () {
  it('should find old paths', function () {

    const path = 'key';
    const loadedState = fromJS({
      'key3': undefined
    });
    const history = fromJS({
      'v2': {
        key: 'key1:key2'
      },
      'v1': {
        'key1:key2': 'key3'
      }
    });

    expect(checkHistory(path, loadedState, history)).to.equal('key3');
  });
});

describe('initializeStateAsMap', function () {
  it('should create a Map with basic fields if no loaded state', function () {

    const initialState = fromJS({
      key1: {
        key2: undefined,
      }
    });

    expect(initializeStateAsMaps(initialState)).to.deep.equal(fromJS(initialState));
  });

  it('should create a Map with values from loaded state', function () {

    const initialState = fromJS({
      key: undefined
    });

    const loadedState = fromJS({
      key: 1
    });

    expect(initializeStateAsMaps(initialState, loadedState).get('key')).to.equal(1);
  });

  it('should find renamed fields', function () {

    const initialState = fromJS({
      key: undefined,
      otherKey: undefined
    });

    const loadedState = fromJS({
      key1: {
        key2: 1
      },
      oldName: 2
    });

    const history = fromJS({
      'v2': {
        otherKey: 'oldName'
      },
      'v1': {
        key: 'key1:key2'
      }
    });

    expect(initializeStateAsMaps(initialState, loadedState, history).get('key')).to.equal(1);
    expect(initializeStateAsMaps(initialState, loadedState, history).get('otherKey')).to.equal(2);
  });
});
