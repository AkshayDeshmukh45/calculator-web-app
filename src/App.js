import React, {useState } from "react";
import "./styles.css";

export default function App() {

  
  const [result, setResult] = useState("0");
  const [prevResult] = useState([]);
  // const [resultArr,setResultArr]=useState(()=>localStorage.getItem("result"));

  //function for printing number
  const btns = [
    "CLEAR",
    "DEL",
    "%",
    "/",
    "7",
    "8",
    "9",
    "X",
    "4",
    "5",
    "6",
    "-",
    "1",
    "2",
    "3",
    "+",
    ".",
    "0",
    "="
  ];
  //set and get values in local storage
  console.log(btns);
// let prevResult= [];
  prevResult.push(result);
  localStorage.setItem("result", JSON.stringify(prevResult));
  localStorage.getItem("result", JSON.stringify(result));
  console.log(JSON.stringify(result));

//   const handle = () => {
//     localStorage.setItem('result', prevResult);
//     localStorage.setItem('result', result);
//  };
//   var storedArray = localStorage.getItem("result");
// prevResult = JSON.parse(storedArray);
  //set local storage data
  // const storeItem = () => {
  //   if (!result) {
  //   } else {
  //     localStorage.setItem([...prevResult, result]);
  //     setResult("");
  //   }
  // };
  // //ADD data to local storage
  // useEffect(() => {
  //   localStorage.setItem("lists", JSON.stringify(result));
  // }, [result]);

  //GET DATA FROM LOCAL STORAGE
  // const getData = () => {
  //   const get = localStorage.getItem(JSON.stringify("lists"));
  //   console.log(get);
  // };

  //math calcultions
  const handleKey = (keys) => {
    if (keys != "CLEAR" && keys != "DEL" && keys != "=") {
      if (keys == ".") {
        const temp = result.match(/[\d\.]+|\D+/g);
        temp == null ? (temp = ["0"]) : null;
        if (!temp[temp.length - 1].includes(".")) {
          if (
            temp[temp.length - 1] == "+" ||
            temp[temp.length - 1] == "-" ||
            temp[temp.length - 1] == "X" ||
            temp[temp.length - 1] == "/" ||
            temp[temp.length - 1] == "%"
          ) {
            setResult((prev) => prev + "0");
          } else {
            setResult((prev) => prev + keys);
          }
        }
      } else {
        const temp = result.match(/[^\d]+|\d+/g);
        temp == null ? (temp = ["0"]) : null;
        if (
          temp[temp.length - 1] == "+" ||
          temp[temp.length - 1] == "-" ||
          temp[temp.length - 1] == "X" ||
          temp[temp.length - 1] == "/" ||
          temp[temp.length - 1] == "%"
        ) {
          if (
            keys == "+" ||
            keys == "-" ||
            keys == "X" ||
            keys == "/" ||
            keys == "%"
          ) {
            setResult((prev) => prev.slice(" ", -1));
            setResult((prev) => prev + keys);
          } else {
            setResult((prev) => prev + keys);
          }
        } else {
          setResult((prev) => prev + keys);
        }
      }
    } else if (keys == "CLEAR") {
      setResult("0");
    } else if (keys == "DEL" && result != "0" && result != "") {
      setResult((prev) => prev.slice(0, -1));
    } else if (keys == "=") {
      const temp = result.match(/[\d\.]+|\D+/g);
      temp == null ? (temp = [" "]) : null;
      if (
        temp[temp.length - 1] == "+" ||
        temp[temp.length - 1] == "-" ||
        temp[temp.length - 1] == "/" ||
        temp[temp.length - 1] == "X"
      ) {
        //pop up the retyped symbols
        temp.pop();
      }

      while (temp.includes("%")) {
        const index = temp.indexOf("%");
        const num1 = parseFloat(temp[index - 1]);
        const tempResult = (num1 / 100).toFixed(2).toString();
        temp.splice(index, 1, "X");
        temp.splice(index - 1, 1, tempResult);
      }
      while (temp.includes("-")) {
        const index = temp.indexOf("-");
        const num1 = parseFloat(temp[index - 1]);
        const num2 = parseFloat(temp[index + 1]);
        const tempResult = (num1 - num2).toFixed(2).toString();
        temp.splice(index, 1);
        temp.splice(index, 1);
        temp.splice(index - 1, 1, tempResult);
      }

      while (temp.includes("/")) {
        const index = temp.indexOf("/");
        const num1 = parseFloat(temp[index - 1]);
        const num2 = parseFloat(temp[index + 1]);
        const tempResult = (num1 / num2).toFixed(2).toString();
        temp.splice(index, 1);
        temp.splice(index, 1);
        temp.splice(index - 1, 1, tempResult);
      }

      while (temp.includes("X")) {
        const index = temp.indexOf("X");
        const num1 = parseFloat(temp[index - 1]);
        const num2 = parseFloat(temp[index + 1]);
        const tempResult = (num1 * num2).toFixed(2).toString();
        temp.splice(index, 1);
        temp.splice(index, 1);
        temp.splice(index - 1, 1, tempResult);
      }

      while (temp.includes("+")) {
        const index = temp.indexOf("+");
        const num1 = parseFloat(temp[index - 1]);
        const num2 = parseFloat(temp[index + 1]);
        const tempResult = (num1 + num2).toFixed(2).toString();
        temp.splice(index, 1);
        temp.splice(index, 1);
        temp.splice(index - 1, 1, tempResult);
      }
      setResult(temp[0]);
    }
  };

  return (
    <div>

      <div className="recentData">
        <h2>History</h2>
        <h1 style={{ color: "Blue" }}>{result} </h1>
        {/* {handle} */}
   </div>
   <div>
   </div>
        {localStorage.getItem('result') && (
            <div>
              <p>{localStorage.getItem('result')}</p>
            </div>
         )}
        
      <form>
        <input
          type="text"
          result={(e) => setResult(e.target.value)}
          value={result}
          id="key"
        />
      </form>
      <div className="keyPad">
        {btns.map((keys, i) => (
          <button key={i} onClick={() => handleKey(keys)}>
            {keys}
          </button>
        ))}
      </div>
    </div>
  );
}
