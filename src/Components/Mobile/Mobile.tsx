import React from "react";
import styles from "./Mobile.module.scss";
import { DateInterval, DateSlider, EventSlider, MyTitle } from "../MyComponents";

export const Mobile: React.FC = () => {

  return (
    <div className={styles.mobile}>
      <div className={styles.div}>
    



        <MyTitle className={styles.textWrapper}/>

<EventSlider className={styles.group2} left={0} slidesPerView={2}/>
        <img
          className={styles.vector}
          alt="Vector"
          src="https://c.animaapp.com/72gsijt6/img/vector-164.svg"
        />

<DateInterval className={styles.element}/>
<DateSlider className={styles.group3}/>
    
      </div>
    </div>
  );
};


