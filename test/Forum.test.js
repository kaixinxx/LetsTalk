const Forum = artifacts.require('./Forum.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('Forum', ([deployer, user1, user2]) => {
  let forum

  before(async () => {
    forum = await Forum.deployed()
  })

  describe('deployment', async () => {
    it('deploys successfully', async () => {
      const address = await forum.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })

    it('has a name', async () => {
      const name = await forum.name()
      assert.equal(name, 'LET\' TALK')
    })
  })

  describe('posts', async () => {
    let result, postCount

    before(async () => {
      result = await forum.createPost('Let\'s talk!', web3.utils.toWei('1', 'Ether'), { from: user1 })
      postCount = await forum.postCount()
    })

    it('creates products', async () => {
      // SUCCESS
      assert.equal(postCount, 1)
      const event = result.logs[0].args
      assert.equal(event.id.toNumber(), postCount.toNumber(), 'id is correct')
      assert.equal(event.text, 'Let\'s talk!', 'text is correct')
      assert.equal(event.author, user1, 'author is correct')

      await await forum.createPost('', web3.utils.toWei('1', 'Ether'), { from: user1 }).should.be.rejected;
      await await forum.createPost('Let\'s talk!', 0, { from: user1 }).should.be.rejected;
    })

    it('lists posts', async () => {
      const post = await forum.posts(postCount)
      assert.equal(post.id.toNumber(), postCount.toNumber(), 'id is correct')
      assert.equal(post.text, 'Let\'s talk!', 'text is correct')
      assert.equal(post.author, user1, 'author is correct')
    })

  })
})
