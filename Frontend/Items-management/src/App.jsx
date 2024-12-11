import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EditItem from './pages/EditItem'; 
import ItemList from './pages/ItemList'; 
import AddItem from './pages/AddItem'; 
import Header from './components/Header'; 
import Footer from './components/Footer'; 

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<ItemList />} /> {/* Default route to ItemList */}
                <Route path="/edit-item/:id" element={<EditItem />} />
                <Route path="/item-list" element={<ItemList />} />
                <Route path="/add-item" element={<AddItem />} /> {/* Link to add new item */}
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
