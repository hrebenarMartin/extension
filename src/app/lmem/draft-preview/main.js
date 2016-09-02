import _ from 'lodash';

function isRecommandationBackendURL(url) {
  const { hostname, pathname, search } = new URL(url);

  return hostname === 'lmem-craft-backend.cleverapps.io' &&
    pathname.includes('/admin') &&
    search.includes('action=list') && 
    search.includes('entity=Recommendation');
}

export default function (tabs, contentCode, updateDraftRecommandations) {

  // The onCreated and onUpdated events lead to too many calls by default
  // Let's debounce 2secs
  const grabDraftRecommandations = _.debounce(function (tabId) {
    tabs.executeScript(tabId, {
      code: contentCode,
      runAt: 'document_end'
    }, () => {
      console.log('Finished loading drafts content script');
      const tabPort = tabs.connect(tabId);

      tabPort.onMessage.addListener(msg => {
        console.log('message from draft grabing content script', msg);

        updateDraftRecommandations(msg);
      });
    });
  }, 2 * 1000, {leading: true, trailing: false});

  tabs.onCreated.addListener(({ id, url }) => {
    if (isRecommandationBackendURL(url)) {
      grabDraftRecommandations(id);
    }
  });

  tabs.onUpdated.addListener((id, { newUrl }, { url }) => {
    if (isRecommandationBackendURL(newUrl || url)) {
      grabDraftRecommandations(id);
    }
  });
}