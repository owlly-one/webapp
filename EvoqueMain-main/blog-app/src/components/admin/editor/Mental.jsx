'use client';
import dynamic from "next/dynamic";
import { useState } from "react";
import editorStyles from "../../../styles/editor.module.css"
import axios from "axios";

import Select from 'react-select';
import { motion } from "framer-motion";

const TextEditor = dynamic(() => import("../../Editor"), {
  ssr: false
});

const Mental = () => {
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [image, setImage] = useState(null)
  const [youtubeUrl, setYoutubeUrl] = useState("")

  const [loading, setLoading] = useState(false)


  const onSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData();
    console.log(image)
    formData.append("image", image);
    formData.append("title", title);
    formData.append("body", body);
    formData.append("youtubeUrl", youtubeUrl);

    try {
      setLoading(true)
      await axios.post(process.env.NEXT_PUBLIC_BASE_URL + "mental/create",formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      })
      setLoading(false)
      window.location.replace("/admin")
    } catch (err) {
      setLoading(false)
      console.log(err)
    }
  }

  return (
    <motion.div initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: 1,
        scale: 1,
        type: "keyframes",
        transition: {
          duration: 1,
          bounce: 1,
          delay: 0.1,
        },
      }}
      className={editorStyles.create_post_container}>
      <div className={editorStyles.form_container}>
        <h2> Create Mental Exercise</h2>
        <form onSubmit={onSubmit} encType="multipart/form-data">
          <div className={editorStyles.input_field_wrapper}>
            <input type="text" placeholder="insert title" required onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className={editorStyles.input_field_wrapper}>
            <input
              type="file"
              required
              name="image"
              accept="image/png, image/jpg, image/gif, image/jpeg"
              //onChange={convert}
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <div className={editorStyles.re}>
            <h4>Description</h4>
          </div>
          <TextEditor setBody={setBody} />
          <div className={editorStyles.input_field_wrapper}>
            <input type="text" placeholder="insert youtube url" required onChange={(e) => setYoutubeUrl(e.target.value)} />
          </div>     
          <div className={editorStyles.button_wrapper}>
            <button className={editorStyles.submit_btn}>{loading ? "Loading" : "Submit"}</button>
          </div>
        </form>
      </div>
    </motion.div>
  )
}

export default Mental
