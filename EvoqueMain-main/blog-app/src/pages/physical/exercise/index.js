import CustomHead from "@/src/components/Head"
import Navbar from "@/src/components/Navbar"
import styles from "@/src/styles/blog.module.css"
import bannerStyles from "@/src/styles/home.module.css"
import exerciseStyles from "@/src/styles/exercise.module.css"

import requestConfig from "@/src/utils/config"
import axios from "axios"

const Physical = ({ blogs }) => {
  return (
    <>
      <CustomHead
        title="JBLOG | food blogs"
        description="see variety of blogs here"
        keyword="science blogs, food blogs"
      />
      <Navbar />
      {/* <Banner blogs={blogs} /> */}
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
    <div className={exerciseStyles.blog_card}>
      <h3>{blog.title}</h3>
      <div className={styles.blogCardImage}>
        <img src={blog.image} alt="blog image" className={exerciseStyles.blog_card_img} />
      </div>
      <div className={styles.blogCardInfo}>
        <p>{stripHtmlTags(blog?.body)?.substring(0, 20)}</p>
      </div>
    </div>
  )
}

const stripHtmlTags = (htmlString) => {
  const strippedString = htmlString.replace(/<[^>]*>?/gm, '');
  return strippedString;
};

export default Physical

export async function getServerSideProps() {
  let url = process.env.NEXT_PUBLIC_BASE_URL + "physical"
  let res = await axios.get(url, requestConfig)
  return {
    props: res.data
  }

}
