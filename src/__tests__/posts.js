import React from 'react';
import { mount, shallow,render } from 'enzyme';
import Posts from '../components/Posts';
import fakePosts from '../fakePosts';

const comments = [
    {
      id: '1',
      comment: 'Nice post mate',
      author: 'Esmeralda',
      date: (new Date()).toLocaleString()
    },
    {
      id: '45sfdf56',
      title: 'German chocolate factory spill makes for sweet street',
      content: 'Firefighters in the town of Werl in western Germany tackled an unusual emergency late on Monday when a tank at a local firm making liquid chocolate overflowed and poured out onto a street.\n\n"About a tonne of chocolate ran out into the yard and from there onto the street," a spokesman for the Werl fire department said in a statement.\n\nThe firefighters closed off the street and shoveled the chocolate - about 108 square feet — to one side before a specialist cleaning company cleaned the road.\n\n"Despite this heartbreaking incident, it is unlikely that a chocolate-free Christmas is imminent in Werl," the fire department said.',
      author: 'Morgana',
      date: (new Date()).toLocaleString()
    },
    {
      id: '56tytd234',
      title: 'A man who claims to be a time traveller from the year 2030 has revealed his time machine during a bizarre interview.',
      content: 'It is a solid, black cube that is alleged to hold “all of the technology” and will assist in escorting you back to your “natural year”.\n\nNoah explains that the cube will only work if you hold it next to your left wrist which, if you were a time traveller, would contain a chip device.\n\nHe claims to have been “fired” by the government and his chip was deactivated thus meaning he cannot longer “time travel”.\n\nNoah added: “This is my last attempt.\n\n“They really, really, really, don’t want me showing this to you.',
      author: 'Zac',
      date: (new Date()).toLocaleString()   
    }
  ];

beforeAll(() => {
    localStorage.setItem('posts',JSON.stringify(fakePosts.data))
})
  
  
test('renders a list with posts', () => {
    let wrapper = mount(<Posts currentPersona={'Zac'}/>);
    expect(wrapper.find('article')).toHaveLength(3);
});


test('possibility to add post', () => {
    let wrapper = mount(<Posts currentPersona={'Zac'}/>);
    //console.log(wrapper.html());
    expect(wrapper.find('input#title')).toHaveLength(1);
    expect(wrapper.find('textarea#content')).toHaveLength(1);
    const form = wrapper.find('div.flex.flex-wrap.mx-auto.pt-8').childAt(0);
    const title = {target: {name: 'title',value: 'titel'}};
    const content = {target: {name: 'content',value: 'Lite innehåll'}};
    form.simulate('change',title);
    form.simulate('change',content);
    form.simulate('submit');
    wrapper.update();
    //expect(wrapper.state('currentPage')).toBe('home')
    expect(wrapper.find('article')).toHaveLength(4);
    
  
    //expect(wrapper.find('div.flex > form.container.mx-auto.flex.flex-col.p-6')).toHaveLength(1);
})

describe('post handling', () => {
    beforeAll(() => {
        localStorage.clear();
        localStorage.setItem('posts',JSON.stringify(fakePosts.data))
    })

    test('remove a post from the list',() => {
        let wrapper = mount(<Posts currentPersona={'Zac'}/>);
        wrapper.find('Button').simulate('click');
        expect(wrapper.find('article')).toHaveLength(2);
    })
});



/*
wrapper.instance().removePost = jest.fn((postId) => {
        let posts = this.state.posts;
        let removed = posts.filter(post => post.id !== postId);
        this.setState({posts: removed})});
    
    wrapper.update();
    wrapper.setState({posts: fakePosts.data});
    wrapper.removePost('56tytd234')
*/

//comments
