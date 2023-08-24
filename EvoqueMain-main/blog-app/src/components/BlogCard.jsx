import { motion } from "framer-motion"
import Image from "next/image"
import HtmlMapper from "react-html-map"
import styles from "../styles/blog.module.css"
import YoutubeView from "react-youtube"

const Field = ({ variant, children }) => {

  let text = children[0]?.props?.children
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
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
      }>
      {
        variant === "p" ? <p>{text}</p> :
          variant === "h2" ? <h2>{text}</h2> :
            variant === "h3" ? <h3>{text}</h3> :
              variant === "h1" ? <h1>{text}</h1> :
                variant === "h4" ? <h4>{text}</h4> :
                  variant === "ul" ? <ul>{text}</ul> :
                    variant === "li" ? <li>{text}</li> :
                      variant === "ol" ? <ol>{text}</ol> :
                        text
      }
    </motion.div>
  )
}
const BlogCard = ({ blog, type }) => {
  const opts = {
    height: "200",
    width: "300",
    playerVars: {
      autoplay: 1,
    },
  };
  function getYouTubeId(url) {
    let videoId = '';
    const match = url.match(/[?&]v=([^&]+)/);
    if (match) {
      videoId = match[1];
    } else {
      const shortUrlMatch = url.match(/youtu.be\/([^?]+)/);
      if (shortUrlMatch) {
        videoId = shortUrlMatch[1];
      }
    }
    return videoId;
  }
  return (
    <motion.section className={styles.blog_card}>
      <motion.h2 className={styles.blog_card_heading}>{blog?.title}</motion.h2>
      {/* <Image src={blog?.video[0]} width={500} height={300} className={styles.blog_card_img} alt={blog?.title} /> */}
      {/* <HtmlMapper html={blog?.body}>
        {
          {
            h4: (props) => <Field variant="h4" {...props} />,
            h3: (props) => <Field variant="h3" {...props} />,
            h2: (props) => <Field variant="h2" {...props} />,
            h1: (props) => <Field variant="h1" {...props} />,
            p: (props) => <Field variant="p" {...props} />,
            ul: (props) => <Field variant="ul" {...props} />,
            ol: (props) => <Field variant="ol" {...props} />,
            b: (props) => <Field variant="b" {...props} />,
            a: (props) => <Field variant="a" {...props} />,
            li: (props) => <Field variant="li" {...props} />,
          }
        }
      </HtmlMapper> */}
      <div>
        <Image src={blog?.image} width={400} height={300} className={styles.blog_card_img} alt={blog?.title} />
        {
          type === "physical" &&
          <div className={styles.physical_exercises_bar}>
              <h4>Muscle Types</h4>
            <div className={styles.muscles_types}>
              {blog?.muscleWorked[0]?.split(",")?.map((muscle, index) => (
                <div key={index} className={styles.muscle_type}>
                  <p>{muscle}</p>
                </div>
              ))}
            </div>
            <div className={styles.exercise_type}>
              <h4>Type of exercise</h4>
              <p>{blog?.typeOfExercise}</p>
            </div>
          </div>
        }
        {blog?.youtubeUrl && <div className={styles.oval}>
          <YoutubeView videoId={getYouTubeId(blog?.youtubeUrl)} opts={opts} />
        </div>}
        <h4>Description</h4>
        <div dangerouslySetInnerHTML={{ __html: blog?.body }} >
        </div>
      </div>
      <div dangerouslySetInnerHTML={{ __html: blog?.extra }} />
    </motion.section>
  )
}

const stripHtmlTags = (htmlString) => {
  const strippedString = htmlString.replace(/<[^>]*>?/gm, '');
  return strippedString;
};

export default BlogCard