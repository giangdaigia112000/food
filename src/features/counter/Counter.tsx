import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  incrementIfOdd,
  selectCount,
} from "./counterSlice";
import styles from "./Counter.module.css";


function Counter() {
  const dispatch = useAppDispatch();
  const count = useAppSelector(selectCount);
  const [incrementAmount, setIncrementAmount] = useState("2");

  const incrementValue = Number(incrementAmount) || 0;

  return (
    <div>
      <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          -
        </button>
        <span className={styles.value}>{count}</span>
        <button
          className={styles.button}
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          +
        </button>
      </div>
      <div className={styles.row}>
        <input
          className={styles.textbox}
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(e.target.value)}
        />
        <button
          className={styles.button}
          onClick={() => dispatch(incrementByAmount(incrementValue))}
        >
          Add Amount
        </button>
        <button
          className={styles.asyncButton}
          onClick={() => dispatch(incrementAsync(incrementValue))}
        >
          Add Async
        </button>
        <button
          className={styles.button}
          onClick={() => dispatch(incrementIfOdd(incrementValue))}
        >
          Add If Odd
        </button>
      </div>
      <div id="waveform"></div>
     
    </div>
  );
}

export default Counter;
// import Link from "next/link";
// import { useEffect, useRef, useState } from "react";
// import styles from "./Counter.module.scss";
// const formWaveSurferOptions = (ref) => ({
//   container: ref,
//   waveColor: "#eee",
//   progressColor: "#0178FF",
//   cursorColor: "OrangeRed",
//   barWidth: 3,
//   barRadius: 3,
//   responsive: true,
//   height: 150,
//   normalize: true,
//   partialRender: true
// });

// export default function AboutPage() {
//   const waveformRef = useRef(null);
//   const wavesurfer = useRef(null);
//   const [playing, setPlaying] = useState(false);

//   const url =
//     "https://www.mfiles.co.uk/mp3-downloads/brahms-st-anthony-chorale-theme-two-pianos.mp3";

//   useEffect(() => {
//     create();

//     return () => {
//       if (wavesurfer.current) {
//         wavesurfer.current.destroy();
//       }
//     };
//   }, []);

//   const create = async () => {
//     const WaveSurfer = (await import("wavesurfer.js")).default;

//     const options = formWaveSurferOptions(waveformRef.current);
//     wavesurfer.current = WaveSurfer.create(options);

//     wavesurfer.current.load(url);
//   };

//   const handlePlayPause = () => {
//     setPlaying(!playing);
//     wavesurfer.current.playPause();
//   };
//   return (
//     <div>
//       <Link href="/some">About us</Link>
//       <div id="waveform" ref={waveformRef} />
//       <div className="controls">
//         <div onClick={handlePlayPause}>{!playing ? "Слушать" : "Пауза"}</div>
//       </div>
//     </div>
//   );
// }