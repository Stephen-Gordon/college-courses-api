
import { Link } from "react-router-dom";

const Home = (props) => {

  if (props.authenticated){
    return (
      <>
        <h1>Home</h1>
      </>
    );
}else {
  return (
    <>  
      <h1>Home</h1>
      <Link  to='/login'>Login</Link>
      <Link  to='/register'>Register</Link>
    </>
  );
  
}
  
}

export default Home;
