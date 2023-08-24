import CustomHead from "@/src/components/Head"
import Navbar from "@/src/components/Navbar"
import styles from "@/src/styles/blog.module.css"
import bannerStyles from "../../styles/home.module.css"
import exerciseStyles from "../../styles/exercise.module.css"

import requestConfig from "@/src/utils/config"
import axios from "axios"

const Mental = ({ blogs }) => {
  return (
    <>
      <CustomHead
        title="Mental Exercises"
        description="see variety of blogs here"
        keyword="science blogs, food blogs"
      />
      <Navbar />
      <MentalBlogsContainer blogs={blogs} />
    </>
  )
}
const MentalBlogsContainer = ({ blogs }) => {
  return (
    <div className={bannerStyles.articles_cards} style={{marginTop: "100px", justifyContent: "center"}}>
      {blogs.map((blog, index) => (
        <MentalBlogCard key={index} blog={blog} />
      ))}
    </div>
  )
}
const MentalBlogCard = ({ blog }) => {
  return (
    <a href={"/exercises/detail/mental/" + blog?._id} className={exerciseStyles.blog_card} style={{textDecoration: "none", color: "black", cursor: "pointer"}}>
      <h3>{blog.title}</h3>
      <div className={styles.blogCardImage}>
        <img src={blog.image} alt="blog image" className={exerciseStyles.blog_card_img} />
      </div>
      <div className={styles.blogCardInfo}>
        <p>{stripHtmlTags(blog?.body)?.substring(0, 50)}</p>
      </div>
    </a>
  )
}
const stripHtmlTags = (htmlString) => {
  const strippedString = htmlString.replace(/<[^>]*>?/gm, '');
  return strippedString;
};
export default Mental

export async function getServerSideProps() {
  let url = process.env.NEXT_PUBLIC_BASE_URL + "mental"
  let res = await axios.get(url, requestConfig)
  return {
    props: res.data
  }

}