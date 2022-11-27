
import LoginForm from "../components/auth/LoginForm";
const Home = (props) => {
  return (
    <>
        
        
        <h1>Home</h1>
        <LoginForm authenticated={props.authenticated} onAuthenticated={props.onAuthenticated}/>
    
    </>
  );
}

export default Home;
