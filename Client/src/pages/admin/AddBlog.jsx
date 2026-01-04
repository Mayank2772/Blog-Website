import React, { useEffect, useRef, useState } from "react";
import { assets, blogCategories } from "../../assets/assets";
import Quill from "quill";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import {parse} from 'marked'
const AddBlog = () => {
  const { axios } = useAppContext();
  const [isAdding, setIsAdding] = useState(false);
  const [loading,setLoading] = useState(false)
  const editorRef = useRef(null);
  const quillRef = useRef(null);
  const [image, setImage] = useState(false);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [category, setCategory] = useState("Startup");
  const [isPublished, setIsPublished] = useState(false);
  const generateContent = async () => {
    if(!title) return toast.error('Please enter a title')
      try {
        setLoading(true)
        const {data} = await axios.post('/api/blog/generate',{prompt: title})
        if(data.success){
          quillRef.current.root.innerHTML = parse(data.content)
        }
        else{
          toast.error(data.message)
        }
      } catch (error) {
        toast.error(error.message)
      }
      finally{
        setLoading(false)
      }
  };
  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      setIsAdding(true)
      const blog = {
        title,subTitle,description:quillRef.current.root.innerHTML,
        category,isPublished
      }
      const formData = new FormData()
      formData.append('blog',JSON.stringify(blog))
      formData.append('image',image)
      const {data}=await axios.post("/api/blog/add",formData)

      if(data.success){
        toast.success(data.message)
      setImage(false);
      setTitle('');
      setSubTitle('');
      quillRef.current.root.innerHTML = ''
      setCategory('Startup')
      setIsPublished(false)
      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
    finally{
      setIsAdding(false)
    }
  };
  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, { theme: "snow" });
    }
  }, []);
  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex-1 bg-blue-50/50 text-gray-600 h-full overflow-scroll"
    >
      <div className="bg-white w-full max-w-3xl p-4 md:p-10 sm:m-10 shadow rounded-md">
        <p>Upload thumbnail</p>
        <label htmlFor="image">
          <img
            src={!image ? assets.upload_area : URL.createObjectURL(image)}
            alt=""
            className="mt-2 h-16 rounded cursor-pointer"
          />
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
        </label>
        <p className="mt-4">Blog title</p>
        <input
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          value={title}
          className="w-full mx-w-lg p-2 mt-2 border border-gray-300 outline-none rounded"
          type="text"
          placeholder="Type here"
          required
        />
        <p className="mt-4">Sub title</p>
        <input
          onChange={(e) => {
            setSubTitle(e.target.value);
          }}
          value={subTitle}
          className="w-full mx-w-lg p-2 mt-2 border border-gray-300 outline-none rounded"
          type="text"
          placeholder="Type here"
          required
        />
        <p className="mt-4">Blog description</p>
        <div className="max-w-lg h-74 pb-16 sm:pb-10 pt-2 relative">
          <div ref={editorRef}></div>
          {loading && ( <div className="absolute right-0 top-0 bottom-0 left-0 flex items-center justify-center bg-black/10 mt-2">
          <div className="w-8 h-8 rounded-full border-2 border-t-white animate-spin">
          </div>
          </div>)}
          <button disabled={loading}
            type="button"
            onClick={generateContent}
            className="
    absolute bottom-2 right-2
    flex items-center gap-1
    text-xs font-medium
    text-white
    px-4 py-1.5
    rounded-full
    bg-linear-to-r from-indigo-500 to-purple-600
    shadow-lg
    hover:scale-105 hover:shadow-xl
    transition-all duration-200
    cursor-pointer ease-in-out
  "
          >
            {loading?"Generating...":"✨ Generate with AI"}
          </button>
        </div>
        <p className="mt-4">Blog category</p>
        <select
          onChange={(e) => {
            setCategory(e.target.value);
          }}
          name="category"
          className="mt-2 px-3 py-2 border text-gray-500 border-gray-300 outline-none rounded"
        >
          <option value="">Select category</option>
          {blogCategories.map((item, index) => {
            return (
              <option key={index} value={item}>
                {item}
              </option>
            );
          })}
        </select>
        <div className="flex gap-2 mt-4">
          <p>Publish Now</p>
          <input
            type="checkbox"
            checked={isPublished}
            className="scale-125 cursor-pointer"
            onChange={(e) => {
              setIsPublished(e.target.checked);
            }}
          />
        </div>
        <button
          disabled={isAdding}
          className="mt-8 w-40 h-10 bg-primary text-white rounded cursor-pointer text-sm"
          type="submit"
        >
          {isAdding ? "Adding...." : "Add Blog  "}
        </button>
      </div>
    </form>
  );
};
export default AddBlog;
