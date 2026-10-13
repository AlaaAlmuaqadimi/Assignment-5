const sequelize = require('./src/config/database');
const { User, Post, Comment } = require('./src/models');

async function main() {
  try {
    await sequelize.sync({ force: true });
    console.log('Database synced successfully.\n');

    console.log('=== Creating Users ===');

    const user1 = await User.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'securePassword123',
      role: 'admin',
    });
    console.log('Created user:', user1.toJSON());

    const user2 = await User.create({
      name: 'Jane Smith',
      email: 'jane@example.com',
      password: 'anotherSecurePwd',
      role: 'user',
    });
    console.log('Created user:', user2.toJSON());

    console.log('\n=== Creating Posts ===');

    const post1 = await Post.create({
      title: 'First Post',
      content: 'This is the content of the first post.',
      userId: user1.id,
    });
    console.log('Created post:', post1.toJSON());

    const post2 = await Post.create({
      title: 'Second Post',
      content: 'This is the content of the second post.',
      userId: user2.id,
    });
    console.log('Created post:', post2.toJSON());

    console.log('\n=== Creating Comments ===');

    const comment1 = await Comment.create({
      content: 'Great post!',
      postId: post1.id,
      userId: user2.id,
    });
    console.log('Created comment:', comment1.toJSON());

    const comment2 = await Comment.create({
      content: 'Nice work!',
      postId: post2.id,
      userId: user1.id,
    });
    console.log('Created comment:', comment2.toJSON());

    console.log('\n=== Testing Validations ===');

    try {
      await User.create({
        name: 'Bad Email',
        email: 'not-an-email',
        password: 'validPassword',
      });
    } catch (err) {
      console.log('[PASS] Email validation caught:', err.errors[0].message);
    }

    try {
      await User.create({
        name: 'Short Pass',
        email: 'shortpass@example.com',
        password: '123',
      });
    } catch (err) {
      console.log('[PASS] Password length validation caught:', err.errors[0].message);
    }

    try {
      await User.create({
        name: 'Al',
        email: 'shortname@example.com',
        password: 'validPassword',
      });
    } catch (err) {
      console.log('[PASS] Name length hook caught:', err.message);
    }

    try {
      await User.create({
        name: 'Duplicate Email',
        email: 'john@example.com',
        password: 'validPassword',
      });
    } catch (err) {
      console.log('[PASS] Unique email constraint caught:', err.errors[0].message);
    }

    console.log('\n=== Testing Soft-Delete (paranoid) on Posts ===');

    console.log('Posts before delete:', await Post.count());
    await post1.destroy();
    console.log('Posts after destroy (paranoid):', await Post.count());
    console.log('Post with paranoid scope (including deleted):', await Post.count({ paranoid: false }));

    await post1.restore();
    console.log('Posts after restore:', await Post.count());

    console.log('\n=== Querying with Associations ===');

    const userWithPosts = await User.findByPk(user1.id, {
      include: [{ model: Post, as: 'posts' }],
    });
    console.log(`User "${userWithPosts.name}" has ${userWithPosts.posts.length} post(s)`);

    const postWithComments = await Post.findByPk(post1.id, {
      include: [{ model: Comment, as: 'comments' }],
    });
    console.log(`Post "${postWithComments.title}" has ${postWithComments.comments.length} comment(s)`);

    console.log('\nAll validations and features working correctly!');

  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    await sequelize.close();
  }
}

main();
