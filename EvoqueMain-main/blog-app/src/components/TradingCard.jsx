import Image from "next/image"
import styles from "../styles/components.module.css"
import addIcon from "../images/add_icon.png"
import AdminActions from "./AdminActions"
import { motion } from "framer-motion"
import { useState } from "react"
import BlogCard from "./BlogCard"

const TradingCard = ({ blog, isAdmin, blogs, setBlogs, endpoint }) => {
  const [showBlog, setShowBlog] = useState(false)
  return (
    <motion.div
      className={styles.trading_card_container}
    >
      <div className={styles.trading_card}>
        <div className={styles.card_image_part}>
          <Image src={blog?.image} width={180} height={120} alt={blog?.title} />
        </div>
        <div className={styles.card_content_part}>
          <h4>{stripHtmlTags(blog?.title)?.substring(0, 80)}</h4>
          <p>{stripHtmlTags(blog?.body)?.substring(0, 170) + "...."}</p>
          {!isAdmin && <div className={styles.add_icon_div} onClick={() => setShowBlog(!showBlog)}>
            <div className={styles.add_icon}>
              <Image src={addIcon} width={20} height={20} alt={blog?.title} />
            </div>
          </div>}
          {isAdmin && <AdminActions blog={blog} blogs={blogs} setBlogs={setBlogs} endpoint={endpoint} />}
        </div>
      </div>
      {showBlog &&
        <div className={styles.main_blog_container}>
          <div className={styles.hide_blog_bar}>
            <button onClick={()=>setShowBlog(!showBlog)}>Close</button>
          </div>
          <BlogCard blog={blog} />
        </div>
      }
    </motion.div>
  )
}
const stripHtmlTags = (htmlString) => {
  const strippedString = htmlString.replace(/<[^>]*>?/gm, '');
  return strippedString;
};

export default TradingCard