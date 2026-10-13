const { Op } = require('sequelize');
const { Comment, User, Post } = require('../models');

exports.createBulkComments = async (req, res) => {
  try {
    const { comments } = req.body;

    if (!Array.isArray(comments) || comments.length === 0) {
      return res.status(400).json({ message: 'Provide a non-empty "comments" array.' });
    }

    await Comment.bulkCreate(comments);

    return res.status(201).json({ message: 'comments created.' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, content } = req.body;

    const comment = await Comment.findByPk(id);

    if (!comment) {
      return res.status(404).json({ message: 'comment not found.' });
    }

    if (comment.userId !== userId) {
      return res.status(403).json({ message: 'you are not authorized to update this comment.' });
    }

    comment.content = content;
    await comment.save();

    return res.status(200).json({ message: 'comment updated.' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.findOrCreateComment = async (req, res) => {
  try {
    const { postId, userId, content } = req.body;

    const [comment, created] = await Comment.findOrCreate({
      where: { postId, userId, content },
      defaults: { postId, userId, content },
    });

    return res.status(200).json(comment);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.searchComments = async (req, res) => {
  try {
    const { word } = req.query;

    const { count, rows } = await Comment.findAndCountAll({
      where: {
        content: {
          [Op.like]: `%${word}%`,
        },
      },
    });

    if (count === 0) {
      return res.status(404).json({ message: 'no comments found.' });
    }

    return res.status(200).json({ count, comments: rows });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getNewestComments = async (req, res) => {
  try {
    const { postId } = req.params;

    const comments = await Comment.findAll({
      where: { postId },
      order: [['createdAt', 'DESC']],
      limit: 3,
    });

    return res.status(200).json(comments);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getCommentDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const comment = await Comment.findByPk(id, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: Post,
          as: 'post',
          attributes: ['id', 'title', 'content'],
        },
      ],
    });

    if (!comment) {
      return res.status(404).json({ message: 'no comment found' });
    }

    return res.status(200).json(comment);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
