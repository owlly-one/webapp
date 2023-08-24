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

const Physical = () => {
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [muscleWorked, setMuscleWorked] = useState([])
  const [typeOfExercise, setTypeOfExercise] = useState()

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
    formData.append("muscles", muscleWorked.map((muscle) => muscle.value));
    formData.append("exercises", typeOfExercise.value);
    formData.append("youtubeUrl", youtubeUrl);
    try {
      setLoading(true)
      let { data } = await axios.post(process.env.NEXT_PUBLIC_BASE_URL + "physical/create",formData, {
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

  const handleMusleChange = async (selected) => {
    setMuscleWorked(selected);
  };

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
        <h2> Create Physical Exercise</h2>
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
          <h4>Muscle Worked</h4>
          <div className={editorStyles.input_field_wrapper}>
            <Select
              value={muscleWorked}
              options={MusclesWorked}
              isMulti
              onChange={handleMusleChange}
              placeholder="Add Muscle Worked"
            />
          </div>
          <h4>Type Of Exercise</h4>
          <div className={editorStyles.input_field_wrapper}>
            <Select
              value={typeOfExercise}
              onChange={(e) => setTypeOfExercise(e)}
              options={TypeOfExercise}
              placeholder="Add Type Of Exercise"
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

export default Physical

const MusclesWorked = [
    { value: "Upper chest", label: "Upper Chest" },
    { value: "Lower chest", label: "Lower Chest" },
    { value: "Front Delt", label: "Front Delt" },
    { value: "Mid-Chest", label: "Mid-Chest" },
    { value: "Lateral Delt", label: "Lateral Delt" },
    { value: "Rear Delt", label: "Rear Delt" },
    { value: "Long Head Bicep", label: "Long Head Bicep" },
    { value: "Short Head Bicep", label: "Short Head Bicep" },
    { value: "Long Head Tricep", label: "Long Head Tricep" },
    { value: "Medial Head Tricep", label: "Medial Head Tricep" },
    { value: "Lateral Head Tricep", label: "Lateral Head Tricep" },
    { value: "Latissimus Dorsi", label: "Latissimus Dorsi" },
    { value: "Supraspinatus", label: "Supraspinatus" },
    { value: "Infraspinatus", label: "Infraspinatus" },
    { value: "Teres Major", label: "Teres Major" },
    { value: "Teres Minor", label: "Teres Minor" },
    { value: "Traps", label: "Traps" },
    { value: "Lower Back", label: "Lower Back" },
    { value: "Quads", label: "Quads" },
    { value: "Long Head Hamstrings", label: "Long Head Hamstrings" },
    { value: "Short Head Hamstrings", label: "Short Head Hamstrings" },
    { value: "Calves", label: "Calves" }
    
]

const TypeOfExercise = [
    { value: "Free-weight", label: "Free-weight" },
    { value: "Machine", label: "Machine" },
    { value: "Body-weight", label: "Body-weight" },
    { value: "Cable", label: "Cable" },
]