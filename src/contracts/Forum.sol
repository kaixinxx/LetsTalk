pragma solidity ^0.5.0;

contract Forum {
    string public text;
    uint public postCount = 0;
    mapping(uint => Post) public posts;

    struct Post {
        uint id;
        string text;
        address payable author;
    }

    event PostCreated(
        uint id,
        string text,
        address payable owner,
    );


    constructor() public {
        text = "LET'S TALK";
    }

    function createPost(string memory _text) public {
        // Require a valid text
        require(bytes(_text).length > 0);
        // Increment post count
        postCount ++;
        // Create the post
        posts[postCount] = Post(postCount, _text, msg.sender, false);
        // Trigger an event
        emit PostCreated(postCount, _text, msg.sender, false);
    }

}
