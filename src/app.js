import React, { Component } from 'react'
import ReactDom from 'react-dom'
import loadable from 'react-loadable'
import { Loading } from './Loading'
// import('./async.js').then(data => {
//     console.log(data)
// })

import path from 'path'
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'

import './app.scss'
import tiny from '@mturzynska/tiny'
import { Home } from './home'
import  Topics from './topics'
import { About } from './about'



//let tiny = require('@mturzynska/tiny');


console.log('what is tiny ', tiny('what the helll'))


// const App = () => {
//     return <p>{tiny('hello from rdfdfdeact-dfdfd---mairatestvvv...')}</p>
// }

let loadableTopics = loadable({
    loader: () => import('./topics'),
    loading: ()=> <h3>Please wait....</h3>
})


class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <ul>
                        <li><Link to='/'>Home</Link></li>
                        <li><Link to='/about'>About</Link></li>
                        <li><Link to='/topics'>Topics</Link></li>
                    </ul>
                    <Route path='/' exact component={Home} />
                    <Route path='/about' component={About} />
                    <Route path='/topics' component={loadableTopics} />
                </div>
            </Router>
        )
    }
}

ReactDom.render(<App />, document.getElementById('root'))
