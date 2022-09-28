/* eslint-disable no-unused-vars */
import { useRef,useContext } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { useReactToPrint } from 'react-to-print'
import { useSearchParams } from 'react-router-dom'
import UserContext from '../contexts/UserContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function TicketPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const ref1 = useRef(null)
  const userInfo = useContext(UserContext)

  // const [events, setEvents] = useState(GetEvents());

  const login = searchParams.get('login')
  const count = searchParams.get('ticketsCount')
  const title = searchParams.get('title')
  const place = searchParams.get('place')
  const timestamp = searchParams.get('timestamp')

  const downloadQRCode = () => {
    const s = new XMLSerializer().serializeToString(
      document.getElementById('qr-gen')
    )
    const encodedData = window.btoa(s)
    const downloadLink = document.createElement('a')
    downloadLink.href = encodedData
    downloadLink.download = `${title}.svg`
    document.body.appendChild(downloadLink)
    downloadLink.click()
    document.body.removeChild(downloadLink)
  }

  const handlePrint = useReactToPrint({
    content: () => ref1.current,
  })

  return (
    <div>
      <Header/>
      <div ref={ref1}>
        <h2>title: {title}</h2>

        <p>place: {place}</p>
        <p>
          date:{' '}
          {new Intl.DateTimeFormat('ru-RU', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          }).format(timestamp)}
        </p>
        <p>
          time:{' '}
          {new Intl.DateTimeFormat('ru-RU', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          }).format(timestamp)}
        </p>
        <p>ticketsCount: {count}</p>
        <p>name: {login}</p>
        <QRCodeSVG
          id="qr-gen"
          value={window.location.href}
          size={120}
          level="H"
        />
      </div>
      <button type="button" onClick={downloadQRCode}>
        Download QR Code
      </button>
      <button type="button" onClick={handlePrint}>
        Print QR Code
      </button>
      <Footer/>
    </div>
  )
}
