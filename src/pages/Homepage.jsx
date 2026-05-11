import Navbar from '../components/homepage/Navbar/Navbar'
import Hero from '../components/homepage/Hero/Hero'
import Steps from '../components/homepage/Steps/Steps'
import Background from '../components/homepage/Background/Background'
import Footer from '../components/homepage/Footer/Footer'
import './homepage.css'

function App() {
    return (
        <div className="App">
            <Background />
            <Navbar />
            <main className="main-container">
                <div id="home">
                    <Hero />
                </div>
                <div id="features">
                    <Steps />
                </div>
            </main>
            <div id="contact">
                <Footer />
            </div>
        </div>
    );
}

export default App;