import React from 'react';
import { mount, shallow,render } from 'enzyme';
import Bot from '../components/Bot/Bot';

test('renders bot', () => {
    render(<Bot />);
  });

test('bot things', () => {
    let wrapper = mount(<Bot/>);
    
})
