import React, { Component } from 'react';

class Main extends Component {

  render() {
    return (
      <div id="content">
        <h2>Now you talk</h2>
        <form onSubmit={(event) => {
          event.preventDefault()
          const text = this.post.value
          this.props.createPost(text)
        }}>
          <div className="form-group mr-sm-2">
            <textarea
              id="post-content"
              type="text"
              ref={(input) => { this.post = input }}
              className="form-control"
              placeholder="Say something..."
              required
              />
          </div>
          <button type="submit" className="post-btn btn btn-primary">Post</button>
        </form>
        <p>&nbsp;</p>
        <h2 className='header-2'>What's happening in ECS 265 class?</h2>
        { this.props.posts.map((post) => 
              (
                <div className='post'>
                  <div className='post-header'>
                    <span className='post-number'>{`#${post.id.toString()}`}</span>
                    <span className='post-user'>{post.owner}</span>
                    said:
                  </div>
                  <p>{post.text}</p>
                </div>
              )
            )}
      </div>
    );
  }
}

export default Main;
