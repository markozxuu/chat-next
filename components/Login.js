import { Component } from 'react'
import io from 'socket.io-client'
import Router from 'next/router'

export default class extends Component {
    constructor() {
      super()
      this.handleInput = this.handleInput.bind(this)
    }

    componentDidMount() {
      this.socket = io()
    }

    handleInput = e => {
      if(e.key === 'Enter') {
        this.socket.emit('username', e.target.value)
        Router.push({ pathname: '/chat'})
      }
    }

    render() {
        return (
           <div className="login">
              <p className="greeting__message">What's your nickname</p>
              
              <input 
                className="username__input" 
                type="text" 
                maxLength="14"
                onKeyPress={this.handleInput}    
              />

            <style jsx>{`
              .login {
                text-align: center;
                margin-top: 20rem;
               }

               .username__input {
                  color: #fff;
                  background: transparent;
                  border: none;
                  border-bottom: solid 2px #fff;
                  margin-top: 5rem;
                  padding-bottom: 15px;
                  letter-spacing: 3px;
                  width: 35%;
                  text-align: center;
                  font-size: 2.3rem
                }

                .greeting__message {
                   font-size: 3rem;
                }
            `}</style>
           </div> 
        )
    }
}