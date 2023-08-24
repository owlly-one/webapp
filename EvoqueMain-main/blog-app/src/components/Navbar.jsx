import React, { useState } from 'react';
import Link from "next/link";
import Image from "next/image";
import navStyles from "../styles/nav.module.css";
import logo from "../images/evoque_transparent.png";

const Navbar = () => {
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [openSubmenuContent, setOpenSubmenuContent] = useState(null);
  let timeoutId;

  const handleMouseEnterContent = (submenuName) => {
    timeoutId = setTimeout(() => {
      setOpenSubmenuContent(submenuName);
    }, 200);
  };

  const handleMouseLeaveContent = () => {
    clearTimeout(timeoutId);
    setOpenSubmenuContent(null);
  };

  const handleMouseEnter = (submenuName) => {
    if (hasSubmenuContent(submenuName)) {
      setOpenSubmenu(submenuName);
    }
  };

  const handleMouseLeave = () => {
    setOpenSubmenu(null);
    setOpenSubmenuContent(null);
  };

  const shouldShowSubmenuContent = (submenuName) => {
    return (
      openSubmenu === submenuName ||
      (openSubmenuContent === submenuName + 'Content' && hasSubmenuContent(submenuName))
    );
  };

  const hasSubmenuContent = (submenuName) => {
    switch (submenuName) {
      case 'physical':
        return true;
      case 'nutritional':
        return true;
      case 'mental':
        return true;
      case 'ai-workout-creator':
        return false; // No content for this submenu
      case 'about-us':
        return true;
      case 'shop':
        return false; // No content for this submenu
      default:
        return false;
    }
  };

  return (
    <nav className={navStyles.nav}>
      <div className={navStyles.logoContainer}>
        <Link href="/">
          <div>
            <Image src={logo} alt="Logo" width={120} height={40} />
          </div>
        </Link>
      </div>

      <div className={navStyles.dropdownCenter}>
        <div
          onMouseEnter={() => handleMouseEnter('physical')}
          onMouseLeave={handleMouseLeave}
          className={navStyles.dropdown}
        >
          <button className={navStyles.link}>Physical</button>
          {shouldShowSubmenuContent('physical') && (
            <div
              onMouseEnter={() => handleMouseEnterContent('physicalContent')}
              onMouseLeave={handleMouseLeaveContent}
              className={navStyles.dropdown_content}
            >
              <Link href="/exercises/physical">Exercises</Link>
              <Link href="/articles/Physical/Workouts">Workouts</Link>
              <Link href="/articles/Physical/Routines">Routines</Link>
              <Link href="/articles/Physical/Recovery">Recovery</Link>
              <Link href="/articles/Physical/Science">Science</Link>
            </div>
          )}
        </div>

        <div
          onMouseEnter={() => handleMouseEnter('nutritional')}
          onMouseLeave={handleMouseLeave}
          className={navStyles.dropdown}
        >
          <button className={navStyles.link}>Nutritional</button>
          {shouldShowSubmenuContent('nutritional') && (
            <div
              onMouseEnter={() => handleMouseEnterContent('nutritionalContent')}
              onMouseLeave={handleMouseLeaveContent}
              className={navStyles.dropdown_content}
            >
              <Link href="/metabolic-calculator">Nutrition Calculator</Link>
              <Link href="/articles/Nutritional/Recipes">Recipes</Link>
              <Link href="/articles/Nutritional/Supplements">Supplements</Link>
              <Link href="/articles/Nutritional/Meal-Plans">Meal Plans</Link>
              <Link href="/articles/Nutritional/Science">Science</Link>
            </div>
          )}
        </div>

        <div
          onMouseEnter={() => handleMouseEnter('mental')}
          onMouseLeave={handleMouseLeave}
          className={navStyles.dropdown}
        >
          <button className={navStyles.link}>Mental</button>
          {shouldShowSubmenuContent('mental') && (
            <div
              onMouseEnter={() => handleMouseEnterContent('mentalContent')}
              onMouseLeave={handleMouseLeaveContent}
              className={navStyles.dropdown_content}
            >
              <Link href="/articles/Mental/Mindset">Mindset</Link>
              <Link href="/articles/Mental/Philosophy">Philosophy</Link>
              <Link href="/articles/Mental/Motivation">Motivation</Link>
              <Link href="/exercises/mental">Mental Exercises</Link>
            </div>
          )}
        </div>

        <div
          onMouseEnter={() => handleMouseEnter('ai-workout-creator')}
          onMouseLeave={handleMouseLeave}
          className={navStyles.dropdown}
        >
          <button className={navStyles.link}>AI Workout Creator</button>
          {shouldShowSubmenuContent('ai-workout-creator') && (
            <div
              onMouseEnter={() => handleMouseEnterContent('aiWorkoutCreatorContent')}
              onMouseLeave={handleMouseLeaveContent}
              className={navStyles.dropdown_content}
            >
            </div>
          )}
        </div>

        <div
          onMouseEnter={() => handleMouseEnter('about-us')}
          onMouseLeave={handleMouseLeave}
          className={navStyles.dropdown}
        >
          <button className={navStyles.link}>About Us</button>
          {shouldShowSubmenuContent('about-us') && (
            <div
              onMouseEnter={() => handleMouseEnterContent('aboutUsContent')}
              onMouseLeave={handleMouseLeaveContent}
              className={navStyles.dropdown_content}
            >
              <Link href="/our-mission">Our Mission</Link>
              <Link href="/our-team">Our Team</Link>
              <Link href="/about-us">Our Partners</Link>
              <Link href="/about-us">Instagram</Link>
              <Link href="/about-us">TikTok</Link>
              <Link href="/about-us">YouTube</Link>
            </div>
          )}
        </div>
      </div>

      <div className={navStyles.shopButton}>
        <Link href="/shop" passHref onMouseEnter={() => handleMouseEnter('shop')}
          onMouseLeave={handleMouseLeave}
          className={navStyles.dropdown}>
          <button className={navStyles.link}>Shop</button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
