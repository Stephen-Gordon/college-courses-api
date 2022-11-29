import LoginForm from "../components/auth/LoginForm";
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
      <LoginForm authenticated={props.authenticated} onAuthenticated={props.onAuthenticated}/>
    </>
  );
  
}
  
}

export default Home;
