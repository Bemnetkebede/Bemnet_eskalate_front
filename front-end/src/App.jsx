
import Routing from './Pages/Router'
import {useContext , useEffect} from 'react';
import { Type } from './Utility/action.type';
import { DataContext } from './Components/DataProvider/DataProvider';
import {auth} from './Utility/firebase'


const App = () => {

  const [{ user }, dispatch] = useContext(DataContext);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log(authUser);
        dispatch({
          Type: 'SET_USER',
          user: authUser,
        });
      } else {
        dispatch({
          Type: 'SET_USER',
          user: null,
        });
      }
    });

    // Cleanup function
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <>
      <Routing/>
    </>
  )
}

export default App