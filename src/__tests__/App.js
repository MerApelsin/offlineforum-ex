import React from 'react';
import { render, shallow, mount } from 'enzyme';
import App from '../components/App';

const zacimg = 'zac.png';
const esmeraldaimg = 'esmeralda.png';

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

test('can switch user',() => {
  let wrapper = mount(<App/>);
  expect(wrapper.find('div.fixed.pin-t.pin-r')).toHaveLength(1);
  expect(wrapper.find('img')).toHaveLength(1);
  expect(wrapper.state('currentPersona')).toBe('Zac');
  expect(wrapper.find('img').prop('src')).toEqual(zacimg);
  wrapper.find('select').simulate('change', {target: { value : 'Esmeralda'}});
  expect(wrapper.find('img').prop('src')).toEqual(esmeraldaimg);
});
