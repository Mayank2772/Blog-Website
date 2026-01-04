import fs from "fs";
import imageKit from "../configs/imageKit.js";
import Blog from "../models/blog.js";
import Comment from "../models/Comment.js";
import mongoose from "mongoose";
import main from '../configs/gemini.js'
import Subscriber from "../models/Subscriber.js";
import { sendMail } from "../utils/sendEmail.js";
import notifySubscribers from "../utils/notifySubscribers.js";
export const addBlog = async (req, res) => {
  try {
    const { title, subTitle, description, category, isPublished } = JSON.parse(
      req.body.blog
    );

    const imageFile = req.file;
    if (!title || !description || !category || !imageFile) {
      return res.json({ success: false, message: "Details Missing" });
    }

    const fileBuffer = fs.readFileSync(imageFile.path);

    const response = await imageKit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/blogs",
    });

    const image = imageKit.url({
      path: response.filePath,
      transformation: [
        { quality: "auto" },
        { format: "webp" },
        { width: "1280" },
      ],
    });

    const blog = await Blog.create({
      title,
      subTitle,
      description,
      category,
      image,
      isPublished,
    });

    // SEND EMAIL IF PUBLISHED IMMEDIATELY
    if (isPublished) {
      await notifySubscribers(blog);
    }

    res.json({ success: true, message: "Blog added successfully" });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ isPublished: true });
    res.json({ success: true, blogs });
  } catch (error) {
    res.json({ sucess: false, message: error.message });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const { blogId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(blogId)) {
      return res.json({
        success: false,
        message: "Invalid blog ID",
      });
    }
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.json({ success: false, message: "Blog not found" });
    }
    res.json({ success: true, blog });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const deleteBlogById = async (req, res) => {
  try {
    const { id } = req.body;
    await Blog.findByIdAndDelete(id);

    await Comment.deleteMany({ blog: id });

    res.json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
export const togglePublish = async (req, res) => {
  try {
    const { id } = req.body;

    const blog = await Blog.findById(id);
    if (!blog) {
      return res.json({ success: false, message: "Blog not found" });
    }

    const wasPublished = blog.isPublished;

    blog.isPublished = !blog.isPublished;
    await blog.save();

    // 🔥 SEND EMAIL ONLY ON FIRST PUBLISH
    if (!wasPublished && blog.isPublished) {
      await notifySubscribers(blog);
    }

    res.json({ success: true, message: "Blog status updated" });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const addComment = async (req, res) => {
  try {
    const { blog, name, content } = req.body;
    await Comment.create({ blog, name, content });
    res.json({ success: true, message: "Comment added for review" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getBlogComments = async (req, res) => {
  try {
    const { blogId } = req.body;
    if (!mongoose.Types.ObjectId.isValid(blogId)) {
      return;
    }
    const comments = await Comment.find({
      blog: blogId,
      isApproved: true,
    }).sort({ createdAt: -1 });
    res.json({ success: true, comments });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const generateContent = async (req,res) => {
  try {
    const {prompt} = req.body
    const content = await main(prompt+'Generate a blog content for this topic in simple text format')
    res.json({success:true,content})
  } catch (error) {
    res.json({success:false,message:error.message})
  }
};
