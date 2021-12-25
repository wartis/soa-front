import './App.css';
import {Route, Routes} from "react-router-dom";
import MainPage from "./pages/MainPage";
import CreatePage from "./pages/CreatePage";
import ConstructorSidebarWrapper from "./components/Sidebar";
import {Pane} from "evergreen-ui";
import ChapterGroupPage from "./pages/ChapterGroupPage";
import {defaultMarine} from "./objects/DefaultMarine";
import EditPage from "./pages/EditPage";
import history from "./objects/History"


function App() {
  return (
    <Pane className="App" display={"flex"} height={"100vh"}>
        <ConstructorSidebarWrapper/>
        <Routes history={history}>
          <Route path='/' element={<MainPage/>} />
          <Route path='/create' element={<CreatePage isEdit={false} marineToChange={defaultMarine}/>} />
          <Route path='/edit' element={<EditPage/>} />
          <Route path='/chapters/group' element={<ChapterGroupPage/>} />
        </Routes>
    </Pane>
  );
}

export default App;
