import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styles from "../styles/home.module.css";
import Link from 'next/link'; // Import Link from next/link

/* FeaturedArticle component JSX */
/* FeaturedArticle component JSX */

const FeaturedArticle = ({ blogs }) => {
  if (!blogs || blogs.length === 0) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <h2 className={styles.featuredText}>
          <span className={styles.textBackground}>
            No featured articles currently, check later
          </span>
        </h2>
      </div>
    );
  }

  return (
    <Carousel showThumbs={false} showStatus={false} showIndicators={false} centerMode centerSlidePercentage={100}>
      {blogs.map((blog) => (
        <div key={blog._id} className={styles.section}>
          <h2 className={styles.featuredText}>
            <span className={styles.featuredHeader}>
              Featured Articles
            </span>
          </h2>
          <Link href={`/blogs/${blog._id}`}>
            <div className={styles.card}>
              <div className={styles.card_image}>
                <img src={blog.image} alt={blog.title} />
              </div>
              <div className={styles.card_content}>
                <h2 className={styles.featuredText}>
                  <span className={styles.textBackground}>
                    {blog.title?.substring()}
                  </span>
                </h2>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </Carousel>
  )
}

export default FeaturedArticle;

