import { withIronSessionSsr } from "iron-session/next";
import CustomHead from "@/src/components/Head"
import TradingCard from "@/src/components/TradingCard"
import requestConfig from "@/src/utils/config"
import axios from "axios"
import Link from "next/link"
import styles from "@/src/styles/blog.module.css"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"


const Index = ({ user }) => {
  const [blogs, setBlogs] = useState([])
  const [physicalExercises, setPhysicalExercises] = useState([])
  const [mentalExercises, setMentalExercises] = useState([])

  // useEffect(() => {
  //   if (user === null) {
  //     window.location.replace("/login")
  //   }
  //   else console.log("you are admin")
  // }, [user]);

  useEffect(() => {
    fetchBlogs()
    fetchPhysicalExercises()
    fetchMentalExercises()
  }, [])

  async function fetchBlogs() {
    let url = process.env.NEXT_PUBLIC_BASE_URL + "blogs"
    try {
      let res = await axios.get(url, requestConfig)
      setBlogs(res?.data?.blogs)
    } catch (e) {
      console.log(e)
      console.log(e?.response?.data?.message)
      setBlogs(null)
    }
  }
  async function fetchPhysicalExercises() {
    let url = process.env.NEXT_PUBLIC_BASE_URL + "physical"
    try {
      let res = await axios.get(url, requestConfig)
      setPhysicalExercises(res?.data?.blogs)
    } catch (e) {
      console.log(e?.response?.data?.message)
      setPhysicalExercises(null)
    }
  }
  async function fetchMentalExercises() {
    let url = process.env.NEXT_PUBLIC_BASE_URL + "mental"
    try {
      let res = await axios.get(url, requestConfig)
      setMentalExercises(res?.data?.blogs)
    } catch (e) {
      console.log(e?.response?.data?.message)
      setMentalExercises(null)
    }
  }
  return (
    <>
      <motion.div initial={{ opacity: 0, scale: 0 }}
        whileTap={{ scale: 0.95 }}
        whileInView={{ opacity: 1 }}
        animate={{
          opacity: 1,
          scale: 1,
          type: "keyframes",
          transition: {
            duration: 1,
            bounce: 1,
            delay: 0.1,
          },
        }
        } className={styles.admin_tabs_div}>
        <Link href="/admin/create" style={{ margin: "0px 10px" }}>Create New post</Link>
        <Link href="/admin/physical/create" style={{ margin: "0px 10px" }}>Create Physical Exercise</Link>
        <Link href="/admin/mental/create" style={{ margin: "0px 10px" }}>Create Mental Exercise</Link>
      </motion.div>
      <CustomHead
        title="JBLOG | archive blogs"
        description="see variety of blogs here"
        keyword="science blogs, food blogs"
      />
      <div className={styles.blogs_section}>
        {
          blogs?.map((blog, index) => {
            return <TradingCard blog={blog} key={index} isAdmin={true} blogs={blogs} setBlogs={setBlogs} endpoint="blog/delete" />
          })
        }
      </div>
      <div>
        <h3 style={{color: "white", marginLeft: "10px"}}>Physical Exercise</h3>
      </div>
      <div className={styles.blogs_section}>
        {
          physicalExercises?.map((blog, index) => {
            return <TradingCard blog={blog} key={index} isAdmin={true} blogs={physicalExercises} setBlogs={setPhysicalExercises} endpoint="physical/delete" />
          })
        }
      </div>
      <div>
        <h3 style={{color: "white", marginLeft: "10px"}}>Mental Exercise</h3>
      </div>
      <div className={styles.blogs_section}>
        {
          mentalExercises?.map((blog, index) => {
            return <TradingCard blog={blog} key={index} isAdmin={true} blogs={mentalExercises} setBlogs={setMentalExercises} type="mental/delete" />
          })
        }
      </div>
    </>
  )
}

export default Index

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    const user = req?.session?.user || null
    if (user === null) {
      return {
        props: {
          user: null
        }
      };
    }

    return {
      props: {
        user: req.session?.user,
      },
    };
  },
  {
    cookieName: "blog_app_session",
    password: "complex_password_at_least_32_characters_long",
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  },
);

const stripHtmlTags = (htmlString) => {
  const strippedString = htmlString.replace(/<[^>]*>?/gm, '');
  return strippedString;
};