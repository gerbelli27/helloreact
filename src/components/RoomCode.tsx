import copyImg from '../assets/images/copy.svg'

import '../styles/room-code.css'

type RoomCodeProps = {
  Code: string;
}

export function RoomCode(props: RoomCodeProps) {
  function copyRoomCodeToClipboard(){
    navigator.clipboard.writeText(props.Code)
  }
  
  return(
    <button className="room-code" onClick={copyRoomCodeToClipboard}>
      <div>
        <img src={copyImg} alt="copy room code" />
      </div>
      <span>ROOM #(props.code)</span>
    </button>
  )
}