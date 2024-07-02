import { Link } from "react-router-dom"

export const Home =  () => {
    return <div>
          <Link to='/signup'>Signup</Link>
            <br />
        <Link to='/signin'>Signin</Link>
    </div>
}