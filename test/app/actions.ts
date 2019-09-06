import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import { receivedMatchingContexts } from 'app/actions/refreshMatchingContexts';

import {
  contextTriggered,
  noticeDisplayed,
  noticeIgnored
} from 'app/actions/tabs';
import { MatchingContext } from '../../src/app/lmem/matchingContext';
import { StatefulNotice } from '../../src/app/lmem/notice';
import Tab from '../../src/app/lmem/Tab';
import { generateContributor } from '../fakers/generateContributor';

const expect = chai.expect;
chai.use(sinonChai);

const tab: Tab = { id: 1, url: 'http://tests.menant-benjamin.fr/' };

const notice: StatefulNotice = {
  id: 1,
  intention: 'approval',
  message: 'This is a notice',
  source: {
    label: 'Jalil',
    url: 'http://jalil'
  },
  contributor: generateContributor(),
  visibility: 'public',
  ratings: {
    dislikes: 0,
    likes: 0
  },
  state: {
    liked: false,
    disliked: false,
    dismissed: false,
    markedRead: false
  },
  created: new Date(),
  modified: new Date()
};

describe('background actions', function() {
  it('receivedMatchingContexts', () => {
    const matchingContexts: MatchingContext[] = [
      { noticeUrl: 'http://1', urlRegex: '/1/', noticeId: 42 },
      { noticeUrl: 'http://2', urlRegex: '/2/', noticeId: 42 }
    ];
    const action = receivedMatchingContexts(matchingContexts);

    expect(action.type)
      .to.be.a('string')
      .of.length.above(5);
    expect(action.payload.matchingContexts).to.equal(matchingContexts);
  });

  it('contextTriggered', () => {
    const triggeredContexts: MatchingContext[] = [];
    const action = contextTriggered(triggeredContexts, tab);

    expect(action.type)
      .to.be.a('string')
      .of.length.above(5);
    expect(action.meta.tab).to.equal(tab);
    expect(action.payload).to.equal(triggeredContexts);
  });

  it('noticeDisplayed', () => {
    const trigger = 'http://trigger';
    const action = noticeDisplayed(notice, trigger);

    expect(action.type)
      .to.be.a('string')
      .of.length.above(5);
    expect(action.payload.url).to.equal(trigger);
    expect(action.payload.notice).to.equal(notice);
  });

  it('noticeIgnored when notice dismissed', () => {
    const trigger = 'http://trigger';
    const dismissedNotice: StatefulNotice = {
      ...notice,
      state: {
        dismissed: true,
        liked: false,
        disliked: false,
        markedRead: false
      }
    };
    const action = noticeIgnored(dismissedNotice, trigger);

    expect(action.type).to.equal('NOTICE_IGNORED');
    expect(action.payload.url).to.equal(trigger);
    expect(action.payload.notice).to.equal(dismissedNotice);
    expect(action.payload.reason).to.equal('dismiss');
  });

  it('noticeIgnored when notice disliked', () => {
    const trigger = 'http://trigger';
    const dislikedNotice: StatefulNotice = {
      ...notice,
      state: {
        dismissed: false,
        liked: false,
        disliked: true,
        markedRead: false
      }
    };
    const action = noticeIgnored(dislikedNotice, trigger);

    expect(action.type).to.equal('NOTICE_IGNORED');
    expect(action.payload.url).to.equal(trigger);
    expect(action.payload.notice).to.equal(dislikedNotice);
    expect(action.payload.reason).to.equal('dislike');
  });
});
