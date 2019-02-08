import * as api from '../api';

beforeEach(() =>{
  localStorage.clear();
});

afterEach(() =>{
  localStorage.clear();
});

test('should get user from localStorage', () => {
  const persona = 'Steffe';
  api.storeCurrentPersona(persona);
  expect(api.fetchCurrentPersona()).toMatch(persona);
});

test('can set and fetch from localstorage',() => {
  let newPost = api.createPostObject('Meep','meep meep test','Zac');
  api.storePostObject(newPost);
  let post = api.fetchAllPosts();  
  expect(post).toMatchObject({title: "Meep"});
});

test('bot gives reply',() =>{
  expect(api.botReply().then(data => typeof data)).resolves.toBe("object");
  expect(api.botReply().then(data => data.message)).resolves.toBe("string");
});

test('can remove an item from localStorage', () => {
  let newPost = api.createPostObject('Meep','meep meep test','Zac');
  api.storePostObject([newPost]);
  let id = newPost.id;
  api.removePost(id); 
  let nothing = api.fetchAllPosts();
  expect(nothing).toHaveLength(0);
});

test('can add and fetch comments and then remove it', () => {
  let newPost = api.createPostObject('Meep','meep meep test','Zac');
  api.storePostObject([newPost]);
  let id = newPost.id;
  let newComment = api.createCommentObject('nice post',id,'Zac');
  api.storeCommentObject([newComment]);
  expect.assertions(2);

  expect(api.fetchAllComments()).toHaveLength(1);

  api.removeComment(newComment.id);
  expect(api.fetchAllComments()).toHaveLength(0);
});

test('fetch persona',()=>{
  let people = api.fetchPersonas();
  expect(people).toHaveLength(0);
})
