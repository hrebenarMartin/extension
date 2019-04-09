import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { List } from '.';
import { EnhancedNotice } from '../../../../lmem/notice';

const notices: EnhancedNotice[] = [
  {
    id: 123,
    title: 'title is going to be removed',
    description: '<p>Description with a <a href="http://some.url">link</a></p>',
    contributor: { name: 'John Doe', image: 'image', organization: 'org' },
    criteria: [{ label: 'label', slug: 'slug' }],
    resource: {
      author: 'Jack Daniels',
      editor: { id: 42, label: 'LMEM', url: 'url' },
      label: 'label',
      url: 'url'
    },
    alternatives: [
      {
        label: 'some alternative',
        url_to_redirect: 'url'
      }
    ],
    dismissed: false,
    disliked: false,
    liked: false,
    dislikes: 0,
    likes: 0,
    valid: true,
    visibility: 'public'
  }
];

storiesOf('screens/Notice/List', module)
  .addDecorator(getStory => <Router>{getStory()}</Router>)
  .add('with 1 notification', () => (
    <List
      close={action('close')}
      dismiss={action('dismiss')}
      undismiss={action('undismiss')}
      notices={notices}
    />
  ))
  .add('empty list', () => (
    <List
      close={action('close')}
      dismiss={action('dismiss')}
      undismiss={action('undismiss')}
      notices={[]}
    />
  ));
