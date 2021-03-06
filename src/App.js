import { useEffect } from 'react';
import { WidgetLoader } from 'react-cloudinary-upload-widget';
import { useDispatch, useSelector } from 'react-redux';
import { HashRouter as Router, Route, Switch, useHistory } from 'react-router-dom';
import './App.scss';
import { AppHeader } from './cmps/AppHeader';
import { BoardDetails } from './pages/BoardDetails';
import { LandingPage } from './pages/LandingPage';
import { TaskmanApp } from './pages/TaskmanApp';
import userService from './services/userService';
import { loadBoards } from './store/actions/boardActions';
import { loadUsers, login } from './store/actions/userActions';

function App() {
  const dispatch = useDispatch()
  const currBoard = useSelector(state => state.boardReducer.currBoard)
  const background = useSelector(state => state.boardReducer.background)
  const loggedinUser = userService.storage.loadUserFromStorage()
  const history = useHistory()

  useEffect(() => {
    dispatch(loadUsers())
    dispatch(loadBoards())
  }, [currBoard])

  useEffect(() => {
    if (loggedinUser && history) {
      dispatch(login(loggedinUser))
      history.push('/boards')
    }
  }, [])

  return (
    <Router>
      <div className="App container" style={!background ? currBoard ? currBoard.background.color ? { backgroundColor: currBoard.background.color } : { backgroundImage: currBoard.background.img ? `url(${currBoard.background.img})` : '' } : { backgroundColor: 'white' } : { backgroundColor: 'white' }}>
        <AppHeader />
        <WidgetLoader />
        <Switch>
          <Route component={BoardDetails} path='/board/:id?' />
          <Route component={TaskmanApp} path='/boards' />
          <Route component={LandingPage} path='/' />
        </Switch>
      </div>
    </Router>
  );
}

export default App;