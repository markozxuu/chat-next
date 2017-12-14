import { Component } from 'react'
import Layout from '../components/Layout'
import Message from '../components/Message'

export default class extends Component {
    render() {
      return (
        <Layout>
          <Message/>
        </Layout>
      )
    } 
}