import styled from "styled-components";
import { motion, useMotionValue, useMotionValueEvent, useTransform, useScroll, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const Wrapper = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: linear-gradient(135deg, rgb(238, 0, 153), rgb(221, 0, 238));
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 50vw;
  gap: 10px;
  div:first-child,
  div:last-child {
    grid-column: span 2;
  }
`;

const Box = styled(motion.div)`
  height: 200px;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0,0,0,0.5);
`;

const Circle = styled(motion.div)`
  background-color: rgba(255, 255, 255, 1);;
  width: 60px;
  height: 60px;
  border-radius: 50px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Switch = styled(motion.button)`
  width: 80px;
  height: 40px;
  border-radius: 5px;
  border: none;
  position: absolute;
  bottom: 100px;
  font-weight: bold;
  color: rgb(0, 123, 255);
`;

const boxVariants = {
  hover: { scale: 1.1 },
}

const switchVariants = {
  tap: {
    scale: 1.3,
    color: 'rgb(255, 128, 0)'
  }
}

// const BiggerBox = styled.div`
//   width: 600px;
//   height: 600px;
//   background-color: rgba(255,255,255,0.4);
//   border-radius: 40px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   /* overflow: hidden; */
// `;

// const Svg = styled.svg`
//   width: 300px;
//   height: 300px;
//   path {
//     stroke: white;
//     stroke-width: 2;
//   }
// `;

// const boxVariants = {
//   hover: { scale: 1.5, rotateZ: 90 },
//   click: { scale: 1, borderRadius: "100px" }
// }

// const svg = {
//   start: { pathLength: 0, fill: "rgba(255,255,255,0)" },
//   end: {
//     fill: "rgba(255,255,255,1)",
//     pathLength: 1
//   }
// }

function App() {
  const [id, setId] = useState<null | string>(null);
  const [clicked, setClicked] = useState(true);
  const onClickSwitch = () => setClicked(prev => !prev);

  // const biggerBoxRef = useRef<HTMLDivElement>(null);

  // const x = useMotionValue(0);
  // const rotateZ = useTransform(x, [-800 , 800], [-360, 360]);
  // const gradient = useTransform(
  //   x,
  //   [-800, 800], 
  //   [
  //     'linear-gradient(135deg, rgb(0, 238, 218), rgb(0, 91, 238))',
  //     'linear-gradient(135deg, rgb(0, 238, 131), rgb(238, 194, 0))',
  //   ]
  // );
  // const { scrollYProgress } = useScroll();
  // const scale = useTransform(scrollYProgress, [0, 1], [1, 5])

  // // animationStart: () => void;
  // // animationComplete: () => void;
  // // animationCancel: () => void;
  // // change: (latestValue: V) => void;
  // // renderRequest: () => void;
  // useMotionValueEvent(scrollYProgress, "change", (v) => {
  //   console.log(scrollYProgress.get())
  // })

  // const [showing, setShowing] =useState(false);
  // const toggleShowing = () => setShowing(prev => !prev);

  // const boxVariant = {
  //   initial: {
  //     opacity: 0,
  //     scale: 0
  //   },
  //   visible: {
  //     opacity: 1,
  //     scale: 1,
  //     rotateZ: 360,
  //   },
  //   leaving: {
  //     opacity: 0,
  //     scale: 0,
  //     y: 50
  //   }
  // };

  // // #8 .12, #8.13
  // const [visible, setVisible] = useState(1);
  // const [back, setBack] = useState(false);
  // const nextPlease = () => {
  //   setBack(false);
  //   setVisible(prev => prev === 10 ? 10 : prev + 1);
  // };
  // const prevPlease = () => {
  //   setBack(true);
  //   setVisible(prev => prev === 1 ? 1 : prev - 1)
  // };
  // const sliderBox = {
  //   entry: (back: boolean) => ({
  //     x: back ? -500 : 500,
  //     opacity: 0,
  //     scale: 0
  //   }),
  //   center: {
  //     x: 0,
  //     opacity: 1,
  //     scale: 1,
  //     transition: {
  //       duration: 1
  //     }
  //   },
  //   exit: (back: boolean) => ({
  //     x: !back ? -500 : 500,
  //     opacity: 0,
  //     scale: 0,
  //     transition: {
  //       duration: 1
  //     }
  //   }),
  // }

  // // #8 .14
  // const [clicked, setClicked] = useState(false);
  // const toggleClicked = () => setClicked(prev => !prev);
  return (
    <Wrapper>
      <Grid>
        {["1", "2", "3", "4"].map(n => (
          <Box variants={boxVariants} whileHover="hover" onClick={() => setId(n)} key={n} layoutId={n}>
            {!clicked && n === "3" ? <Circle layoutId="circle"/>: null }
            {clicked && n === "2" ? <Circle layoutId="circle"/>: null }
          </Box>
        ))}
      </Grid>

      <Switch variants={switchVariants} whileTap="tap" onClick={onClickSwitch}>Switch</Switch>

      <AnimatePresence>
        {
          id ? (
            <Overlay 
              onClick={() => setId(null)} 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Box layoutId={id} style={{ width: 400, height: 200 }}/>
            </Overlay> 
          ): null
        }
      </AnimatePresence>

      {/* <BiggerBox ref={biggerBoxRef}> */}
        {/* <Box 
          drag 
          dragSnapToOrigin
          dragElastic={ 0.5 }
          dragConstraints={biggerBoxRef} 
          variants={boxVariants} 
          whileHover="hover" 
          whileTap="click" /> */}
      {/* </BiggerBox> */}
      {/* <Box style={{ x, rotateZ, scale }} drag="x" dragSnapToOrigin/> */}
      {/* <Svg
        focusable="false"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
      >
        <motion.path
          variants={svg}
          initial="start"
          animate="end"
          transition={{
            default: { duration: 5 },
            fill: { duration: 2, delay: 3 }
          }}
          d="M224 373.12c-25.24-31.67-40.08-59.43-45-83.18-22.55-88 112.61-88 90.06 0-5.45 24.25-20.29 52-45 83.18zm138.15 73.23c-42.06 18.31-83.67-10.88-119.3-50.47 103.9-130.07 46.11-200-18.85-200-54.92 0-85.16 46.51-73.28 100.5 6.93 29.19 25.23 62.39 54.43 99.5-32.53 36.05-60.55 52.69-85.15 54.92-50 7.43-89.11-41.06-71.3-91.09 15.1-39.16 111.72-231.18 115.87-241.56 15.75-30.07 25.56-57.4 59.38-57.4 32.34 0 43.4 25.94 60.37 59.87 36 70.62 89.35 177.48 114.84 239.09 13.17 33.07-1.37 71.29-37.01 86.64zm47-136.12C280.27 35.93 273.13 32 224 32c-45.52 0-64.87 31.67-84.66 72.79C33.18 317.1 22.89 347.19 22 349.81-3.22 419.14 48.74 480 111.63 480c21.71 0 60.61-6.06 112.37-62.4 58.68 63.78 101.26 62.4 112.37 62.4 62.89.05 114.85-60.86 89.61-130.19.02-3.89-16.82-38.9-16.82-39.58z"
        ></motion.path>
      </Svg> */}

      {/* <button onClick={toggleShowing}>click</button>
      <AnimatePresence>
        {showing ? <Box variants={boxVariant} initial="initial" animate="visible" exit="leaving"/> : null}
      </AnimatePresence> */}

      {/* <AnimatePresence custom={back}>
        <Box custom={back} variants={sliderBox} initial="entry" animate="center" exit="exit" key={visible}>
          {visible}
        </Box>
      </AnimatePresence>
      <button onClick={prevPlease}>prev</button>
      <button onClick={nextPlease}>next</button> */}

      {/* <Box>
        { !clicked ? <Circle layoutId="circle" style={{ borderRadius: 50 }}/> : null }
      </Box>

      <Box>
      { clicked ? <Circle layoutId="circle" style={{ borderRadius: 0, scale: 2 }}/> : null }
      </Box> */}
    </Wrapper>
  );
}

export default App;