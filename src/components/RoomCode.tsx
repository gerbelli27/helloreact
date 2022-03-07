import copyImg from '../assets/images/copy.svg';
import ReactTooltip from 'react-tooltip';
import '../styles/room-code.css';

type RoomCodeProps = {
  code: string;
} 

export function RoomCode(props: RoomCodeProps) {
  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(props.code)
  }

  return (
    <>
    <ReactTooltip id='custom-color-no-arrow'  place="bottom" className='custom-color-no-arrow'
textColor='#fff' backgroundColor='#a48af5' effect='solid'/>
    <button data-for='custom-color-no-arrow' data-tip='Click to copy' className="room-code" onClick={copyRoomCodeToClipboard}>
      <div>
        <img src={copyImg} alt="Copy room code" />
      </div>
      <span className="span1">Room{props.code}</span>
    </button>
    </>
  )
}