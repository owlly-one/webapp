import CustomHead from "@/src/components/Head"
import Navbar from "@/src/components/Navbar"
import styles from "@/src/styles/blog.module.css"
import bannerStyles from "../../styles/home.module.css"
import exerciseStyles from "../../styles/exercise.module.css"

import requestConfig from "@/src/utils/config"
import axios from "axios"
import { useState } from "react"


const Physical = ({ blogs }) => {
  const [category, setCategory] = useState("")

  const customButtonStyle = {
    fontFamily: "'GT-Walsheim', sans-serif",
    textTransform: "uppercase"

  };

  return (
    <>
      <CustomHead
        title="Physical Exercises"
        description="see variety of blogs here"
        keyword="science blogs, food blogs"
      />
      <Navbar />
      {/* <Banner blogs={blogs} /> */}
      <div className={styles.filteration_bar} style={{marginTop: "80px"}}>
    <button 
        className={`${styles.button} ${category === "" ? styles.selected : ""}`}
        onClick={() => setCategory("")} 
        style={customButtonStyle} 
    > 
        All 
    </button>
    {
        exerciseCategories.map(cat => (
            <button 
                className={`${styles.button} ${category === cat ? styles.selected : ""}`}
                onClick={() => setCategory(cat)} 
                style={customButtonStyle} 
            > 
                {cat} 
            </button>
        ))
    }
</div>

      <MentalBlogsContainer blogs={blogs} category = {category} />
    </>
  )
}
const MentalBlogsContainer = ({ blogs, category }) => {
  return (
    <div className={bannerStyles.articles_cards} style={{marginTop: "100px", justifyContent: "center"}}>
      {blogs.filter(b => b.typeOfExercise?.includes(category)).map((blog, index) => (
        <MentalBlogCard key={index} blog={blog} />
      ))}
    </div>
  )
}
const MentalBlogCard = ({ blog }) => {
  return (
    <a href={"/exercises/detail/physical/" + blog?._id} className={exerciseStyles.blog_card} style={{textDecoration: "none", color: "black", cursor: "pointer"}}>
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
export default Physical

const exerciseCategories = ["Free-weight", "Machine", "Body-weight", "Cable"]
export async function getServerSideProps() {
  let url = process.env.NEXT_PUBLIC_BASE_URL + "physical"
  let res = await axios.get(url, requestConfig)
  return {
    props: res.data
  }

}
