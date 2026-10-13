const { Post, User, Comment } = require('../models');

exports.createPost = async (req, res) => {
  try {
    const { title, content, userId } = req.body;

    const post = new Post({ title, content, userId });
    await post.save();

    return res.status(201).json({ message: 'Post created successfully.' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    const post = await Post.findByPk(id);

    if (!post) {
      return res.status(404).json({ message: 'post not found.' });
    }

    if (post.userId !== userId) {
      return res.status(403).json({ message: 'you are not authorized to delete this post.' });
    }

    await post.destroy();
    return res.status(200).json({ message: 'Post deleted.' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getAllPostDetails = async (req, res) => {
  try {
    const posts = await Post.findAll({
      attributes: ['id', 'title'],
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name'],
        },
        {
          model: Comment,
          as: 'comments',
          attributes: ['id', 'content'],
        },
      ],
    });

    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getAllPostCommentCounts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      attributes: ['id', 'title'],
      include: [
        {
          model: Comment,
          as: 'comments',
          attributes: [],
        },
      ],
    });

    const result = posts.map((post) => ({
      id: post.id,
      title: post.title,
      commentCount: post.comments ? post.comments.length : 0,
    }));

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
