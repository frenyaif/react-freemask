import { addDecorator, configure } from '@storybook/react';
import { withOptions } from '@storybook/addon-options';

addDecorator(
  withOptions({
    name: 'React FreeMask',
  }),
);

configure(() => require('./../stories/index.js'), module);
