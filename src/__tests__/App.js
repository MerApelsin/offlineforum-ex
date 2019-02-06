import React from 'react';
import { render, shallow, mount } from 'enzyme';
import App from '../components/App';

test('renders the app', () => {
  render(<App />);
});

test('can switch between home and bot', () => {
  let wrapper = mount(<App/>);
  const button = wrapper.find('Button');
  expect(button.text()).toEqual(expect.stringContaining('real human'));
  expect(wrapper.state('currentPage')).toBe('home')
  button.simulate('click');
  expect(wrapper.state('currentPage')).toBe('bot')
  expect(button.text()).toEqual(expect.stringContaining('forum'));
});
