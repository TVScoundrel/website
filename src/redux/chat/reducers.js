import { Map } from 'immutable';
import clone from 'clone';
import actions from './actions';

const initState = new Map({
  users: null,
  chatRooms: [],
  messages: [],
  selectedChatRoom: null,
  openCompose: false,
  viewProfile: false,
  composedId: null,
  loading: true,
  error: false,
  mobileActiveList: true,
  mobileActiveProfile: false,
  restoringData: false,
  addNewUsersProp: {
    modalActive: false
  }
});
const sortTimeStamp = (optionA, optionB) =>
  optionB.lastMessageTime - optionA.lastMessageTime;
export default function reducer(state = initState, action) {
  switch (action.type) {
    case actions.CHAT_INIT_SAGA: {
      return state
        .set('userId', action.userId)
        .set('user', action.user)
        .set('users', action.users)
        .set('chatRooms', action.chatRooms)
        .set('messages', action.messages)
        .set('selectedChatRoom', action.chatRooms[0])
        .set('loading', false);
    }
    case actions.CHAT_UPDATE_CHATROOM: {
      const chatRooms = clone(state.get('chatRooms'));
      const { chatRoom, messages, selected } = action;
      const { id, lastMessage, lastMessageTime } = chatRoom;
      chatRooms.forEach((chatroom, index) => {
        if (chatroom.id === id) {
          chatRooms[index].lastMessage = lastMessage;
          chatRooms[index].lastMessageTime = lastMessageTime;
        }
      });
      state = state
        .set('chatRooms', chatRooms.sort(sortTimeStamp))
        .set('composedId', null)
        .set('openCompose', false);
      if (selected) {
        state = state
          .set('selectedChatRoom', chatRoom)
          .set('viewProfile', false);
      }
      if (messages) {
        state = state.set('messages', messages);
      }
      return state;
    }
    case actions.CHAT_TOGGLE_COMPOSE:
      return state
        .set('openCompose', !state.get('openCompose'))
        .set('viewProfile', false);
    case actions.CHAT_SET_TOGGLE_COMPOSED_ID:
      return state.set('composedId', action.id);
    case actions.CHAT_SET_TOGGLE_VIEW_PROFILE:
      return state.set('viewProfile', action.viewProfile);
    case actions.TOGGLE_MOBILE_LIST:
      return state.set('mobileActiveList', action.mobileActiveList);
    case actions.TOGGLE_MOBILE_PROFILE:
      return state.set('mobileActiveProfile', action.mobileActiveProfile);
    case actions.RESTORE_DEMO_DATA:
      return state.set('restoringData', action.true);
    case actions.RESTORE_DEMO_DATA_DONE:
      return state.set('restoringData', action.false);
    case actions.UPDATE_NEW_USER_PROPS:
      return state.set('addNewUsersProp', clone(action.addNewUsersProp));
    case actions.NEW_MESSAGE_SUCCESFULL:
      return state.set('openCompose', false).set('composedId', null);
    case actions.ADD_NEW_USER_SAGA: {
      const users = state.get('users');
      const chatRooms = [action.newChatroom, ...state.get('chatRooms')];
      users.push(action.newUser);
      return state
        .set('addNewUsersProp', { modalActive: false })
        .set('users', users)
        .set('chatRooms', chatRooms);
    }
    default:
      return state;
  }
}
