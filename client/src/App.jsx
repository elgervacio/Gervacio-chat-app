import { useState } from 'react'
import './App.css'
import io from 'socket.io-client';
import Chat from './component/Chat';

const socket = io.connect("http://localhost:3001")

function App() {
  const [username, SetUsername] = useState("")
  const [room, SetRoom] = useState("")
  const [showCat, SetShowChat] = useState(false)

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room)
      SetShowChat(true)
    }
  }
  return (
    <div className="App">
      {!showCat ? (
        <div className='joinChatContainer'>
          <h3>Dev Room</h3>
          <input type="text"
            placeholder='username'
            onChange={(event) => {
              SetUsername(event.target.value)
            }}
          />
          <input type="text"
            placeholder='room id'
            onChange={(event) => {
              SetRoom(event.target.value)
            }}
          />
          <button onClick={joinRoom
          }>Join A Room</button>
        </div>
      )
        : (
          <Chat socket={socket}
            username={username}
            room={room} />
        )}
    </div>
  )
}

export default App
