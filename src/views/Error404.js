import { Link} from 'react-router-dom'

export default function Error404() {

  return (
    <div className="error404">
      <h1>error404</h1>
      <Link to="/">Main Page</Link>
    </div>
  )
}