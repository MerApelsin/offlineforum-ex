import React from 'react';
import { mount, shallow,render } from 'enzyme';
import SinglePost from '../components/SinglePost';
import Comments from '../components/Comments';
import CreateNewComment from '../components/CreateNewComment';

const comments = [
    {
      id: '1',
      comment: 'Nice post mate',
      author: 'Esmeralda',
      postId: '56tytd234',
      date: (new Date()).toLocaleString()
    },
  ];

const zacPost = [
    {
        id: '56tytd234',
        title: 'A man who claims to be a time traveller from the year 2030 has revealed his time machine during a bizarre interview.',
        content: 'It is a solid, black cube that is alleged to hold “all of the technology” and will assist in escorting you back to your “natural year”.\n\nNoah explains that the cube will only work if you hold it next to your left wrist which, if you were a time traveller, would contain a chip device.\n\nHe claims to have been “fired” by the government and his chip was deactivated thus meaning he cannot longer “time travel”.\n\nNoah added: “This is my last attempt.\n\n“They really, really, really, don’t want me showing this to you.',
        author: 'Zac',
        date: (new Date()).toLocaleString()   
  },
]

beforeEach(() => {
    localStorage.setItem('posts',JSON.stringify(zacPost))
    localStorage.setItem('comments',JSON.stringify(comments))
})
afterEach(() => {
    localStorage.clear();
})

test('Renders comment', () => {
    const fakeOnClick = jest.fn();
    const wrapper = mount(<SinglePost {...zacPost[0]} currentPersona={'Esmeralda'} onClick={fakeOnClick} postId={zacPost[0].id}/>);
    expect(wrapper.find('.w-full.shadow.p-6.m-6.border.rounded.relative')).toHaveLength(1);
    expect(wrapper.find('div.py-2.border-b.relative')).toHaveLength(1);
    expect(wrapper.find('div.py-2.border-b.relative > p.text-grey-dark.mb-4').text()).toEqual(expect.stringContaining('Esmeralda'));
    });


test('Add a comment',() => {
    const fakefunc = jest.fn();
    const wrapper = mount(<Comments postId={zacPost[0].id} currentPersona={'Esmeralda'}>
        <CreateNewComment postId={zacPost[0].id} author={zacPost[0].author} updateComments={fakefunc}/>
    </Comments>);
    const commentInput = wrapper.find('textarea#comment');
    const submit = wrapper.find('input[type="submit"]');
    const comment = {target: {name: 'comment', value: 'Nevermind it sucks.'}};
    commentInput.simulate('change', comment);
    expect(wrapper.find('textarea#comment').text()).toEqual('Nevermind it sucks.');
    expect(wrapper.find('textarea#comment')).toHaveLength(1);
    submit.simulate('submit');
    expect(wrapper.state('comments')).toHaveLength(2);

})

test('removes a comment', () =>{
    const fakefunc = jest.fn();
    const wrapper = mount(<Comments postId={zacPost[0].id} currentPersona={'Esmeralda'}>
        <CreateNewComment postId={zacPost[0].id} author={zacPost[0].author} updateComments={fakefunc}/>
    </Comments>);
    const button = wrapper.find('button.bg-red-dark');
    button.simulate('click');
    expect(wrapper.find('div.py-2.border-b.relative')).toHaveLength(0);
    expect(wrapper.state('comments')).toHaveLength(0)
})
