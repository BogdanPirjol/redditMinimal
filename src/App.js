import { NavBar } from './features/NavBar/NavBar';
import { Content } from './features/Content/Content'

const App = () => {
    
    return (
        <main>
            <header>
                <NavBar/>
            </header>
            <section>
                <Content/>
            </section>
        </main>
    )
}

export default App;