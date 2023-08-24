import axios from "axios";
import CustomHead from "../components/Head";
import Navbar from "../components/Navbar";
import styles from "../styles/home.module.css";
import requestConfig from "../utils/config";
import FeaturedVideo from "../components/FeaturedVideo";
import FeaturedArticle from "../components/FeaturedArticle";
import BackgroundCarousel from "../components/BackgroundCarousel"; // Import the new component

/* Home component JSX */
export default function Home({ blogs }) {
  return (
    <>
      <CustomHead
        title="Evoque Fitness"
        description="see all science blogs here"
        keyword="science blogs, food blogs"
      />
      <Navbar />
      <div className={styles.container}>
        <section className={styles.section}>
          <div className={styles.banner}>
            <BackgroundCarousel />
          </div>
        </section>
        <section className={styles.section}>
          <FeaturedArticle blogs={blogs} />
        </section>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  let url = process.env.NEXT_PUBLIC_BASE_URL + "blogs";
  let res = await axios.get(url, requestConfig); // Updated here

  return {
    props: {
      blogs: res.data.blogs, // Updated here
    },
  };
}
