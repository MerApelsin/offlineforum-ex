import React from 'react';
import { mount, shallow,render } from 'enzyme';
import Posts from '../components/Posts';
import fakePosts from '../fakePosts';

const comments = [
    {
      id: '1',
      comment: 'Nice post mate',
      author: 'Esmeralda',
      postId: '56tytd234',
      date: (new Date()).toLocaleString()
    },
  ];

beforeEach(() => {
    localStorage.setItem('posts',JSON.stringify(fakePosts.data))
    localStorage.setItem('comments',JSON.stringify(comments))
})

afterEach(() => {
    localStorage.clear();
})
  
test('renders a list with posts', () => {
    let wrapper = mount(<Posts currentPersona={'Zac'}/>);
    expect(wrapper.find('article')).toHaveLength(3);
});


test('possibility to add post', () => {
    let wrapper = mount(<Posts currentPersona={'Zac'}/>);
    expect(wrapper.find('input#title')).toHaveLength(1);
    expect(wrapper.find('textarea#content')).toHaveLength(1);

    const form = wrapper.find('div.flex.flex-wrap.mx-auto.pt-8').childAt(0);
    const title = {target: {name: 'title',value: 'titel'}};
    const content = {target: {name: 'content',value: 'Lite innehåll'}};
    
    form.simulate('change',title);
    form.simulate('change',content);
    form.simulate('submit');
    wrapper.update();
    expect(wrapper.find('article')).toHaveLength(4); 
})

test('remove a post from the list',() => {
        let wrapper = mount(<Posts currentPersona={'Zac'}/>);
        wrapper.find('Button').simulate('click');
        expect(wrapper.find('article')).toHaveLength(2);
    })


