import { Component } from 'react'
import Head from 'next/head'
import io from 'socket.io-client'

export default class extends Component {
    constructor() {
      super()

      this.state = { usuario: '' }
    }

    componentDidMount() {
        this.socket = io()
        this.socket.on('test', data => {
            this.setState({ usuario: data })
        })

    }

    render() {
        return (
           <div>
             <Head>
                <title>Nextssenger</title>
             </Head>
             <h1>{this.state.usuario}</h1>
           </div>
        )
    }
}