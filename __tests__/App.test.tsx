/**
 * @format
 */

import React from 'react';
import {Text} from 'react-native';
import ReactTestRenderer from 'react-test-renderer';
import App from '../App';

jest.mock('../src/native/BrightnessModule', () => ({
  getBrightness: jest.fn().mockResolvedValue(0.72),
}));

test('shows the brightness returned by the native module on launch', async () => {
  let renderer!: ReactTestRenderer.ReactTestRenderer;

  await ReactTestRenderer.act(async () => {
    renderer = ReactTestRenderer.create(<App />);
  });

  try {
    const labels = renderer.root
      .findAllByType(Text)
      .map(node => React.Children.toArray(node.props.children).join(''));
    expect(labels).toContain('72%');
  } finally {
    await ReactTestRenderer.act(() => renderer.unmount());
  }
});
