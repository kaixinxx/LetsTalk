import React, { Component } from 'react';
import Navbar from './Navbar'
import Main from './Main'
import Web3 from 'web3'
import './App.css';
import Forum from '../abis/Forum.json'


class App extends Component {
  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const networkId = await web3.eth.net.getId()
    const networkData = Forum.networks[networkId]
    if(networkData) {
      const forum = web3.eth.Contract(Forum.abi, networkData.address)
      this.setState({ forum })
      const postCount = await forum.methods.postCount().call()
      this.setState({ postCount })
      for (var i = 1; i <= postCount; i++) {
        const post = await forum.methods.posts(i).call()
        this.setState({
          posts: [...this.state.posts, post]
        })
      }
      this.setState({ loading: false})
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      postCount: 0,
      posts: [],
      loading: true
    }

    this.createPost = this.createPost.bind(this)
  }

  createPost(name) {
    this.setState({ loading: true })
    this.state.forum.methods.createPost(name).send({ from: this.state.account })
    .once('confirmation', () => {
      this.setState({ loading: false })
    })
  }

  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12">
              { this.state.loading
                ? <div id="loader" className="text-center"><p className="text-center">Loading...</p></div>
                : <Main
                  posts={this.state.posts}
                  createPost={this.createPost} />
              }
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
