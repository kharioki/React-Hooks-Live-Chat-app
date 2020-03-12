import React from 'react';
import io from 'socket.io-client';

export const CTX  = React.createContext();

const initialState = {
    general: [
        {
            from: 'Tony',
            msg: 'Hello'
        },
        {
            from: 'Tess',
            msg: 'Wassuppp'
        },
        {
            from: 'Ken',
            msg: 'You good!!!'
        }
    ],
    topic2: [
        {
            from: 'Judy',
            msg: 'Hello'
        },
        {
            from: 'Rose',
            msg: 'Wassuppp'
        },
        {
            from: 'Kim',
            msg: 'You good!!!'
        }
    ]
}

function reducer(state, action) {
    const { from, msg, topic } = action.payload
    switch (action.type) {
        case 'RECEIVE_MESSAGE':
            return {
                ...state,
                [topic]: [
                    ...state[topic],
                    {from, msg}
                ]
            }
        default:
            return state;
    }
}

let socket;

function sendChatAction(value) {
    socket.emit('chat message', value);
}

export default function Store(props) {
    const [allChats, dispatch] = React.useReducer(reducer, initialState);

    if(!socket) {
        socket = io(':3001')
        socket.on('chat message', function(msg){
            dispatch({type: 'RECEIVE_MESSAGE', payload: msg});
        });
    }

    const user = 'kiki' + Math.random(100).toFixed(2)

  return (
      <CTX.Provider value={{allChats, sendChatAction, user}}>
          {props.children}
      </CTX.Provider>
  )
}
