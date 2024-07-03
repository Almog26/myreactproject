import { useState } from "react";

function Counter() {

    const [counter, setCounter] = useState(0);

    return <div className="flex flex-col items-center">
        <button onClick={() => { setCounter(counter + 1) }} className="bg-purple-400 p-5 rounded-md text-white text-2xl m-3">
            +
        </button>
        <p className="font-bold text-2xl">{counter}</p>
        <button onClick={() => { setCounter(counter - 1) }} className="bg-purple-400 p-5 rounded-md text-white text-2xl m-3">
            -
        </button>
    </div>
}

export default Counter;