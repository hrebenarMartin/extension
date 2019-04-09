import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { About } from '.';

storiesOf('screens/About', module)
  .addDecorator(getStory => <Router>{getStory()}</Router>)
  .add('normal', () => (
    <About
      extensionVersion="1.2.3"
      close={action('close')}
      installationDate={new Date()}
    />
  ));
