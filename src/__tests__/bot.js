import React from 'react';
import { mount, shallow,render } from 'enzyme';
import Bot from '../components/Bot/Bot';
import MessageForm from '../components/Bot/MessageForm';
import TypingIndicator from '../components/Bot/TypingIndicator';
import * as api from '../api';
import { promised } from 'q';

beforeEach(() => {
  localStorage.clear();
})
test('renders bot', () => {
    render(<Bot />);
  });

test('bot gets and returns a message',(done) => {
   
    let wrapper = mount(<Bot/>);
    const botMsg = {message: 'beep boop', bot: true};
    api.botReply = jest.fn(() => Promise.resolve(botMsg));
    let userMessage = {target: {name: 'userMessage', value: 'Hej!'}};
    const input = wrapper.find('input[type="text"]');
    const form = wrapper.find('form');
    input.simulate('change', userMessage);
    form.simulate('submit'); 
    setImmediate(() => {
      expect(wrapper.state('messages')).toHaveLength(2);
      done();
    })
})

test('User can write', () => {
  const fakeSubmit = jest.fn();
  let wrapper = mount(<MessageForm onSubmit={fakeSubmit}/>);
  const input = wrapper.find('input[type="text"]');
  let userMessage = {target: {name: 'userMessage', value: 'Hej!'}};
  input.simulate('change', userMessage);
  expect(wrapper.state('userMessage')).toEqual('Hej!');
});

test('typing indicator',() => {
  let wrapperOn = shallow(<TypingIndicator typing={true}/>)
  let wrapperOff = shallow(<TypingIndicator typing={false}/>)
  expect(wrapperOn.find('.TypingIndicator')).toHaveLength(1);
  expect(wrapperOff.type()).toEqual(null);
})
