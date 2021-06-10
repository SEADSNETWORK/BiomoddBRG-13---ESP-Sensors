import React, {useState, useEffect} from 'react';
import { useSelector } from "react-redux";

// const Input = ({label, value, setValue})=>{
//     const theme = useSelector(state => state.data.theme);
//     const [name, setName] = useState("");
    
//     const handleSubmit = (evt) => {
//         evt.preventDefault();
//         alert(`Submitting Name ${name}`)
//     }

//     if (!theme){
//         return null;
//     } else {

//     return (
//       <form onSubmit={handleSubmit}>
//         <label>
//             <theme.Text>
//                 {label}&nbsp;&nbsp;
//           </theme.Text>
//           <input
//             type="text"
//             value={value}
//             onChange={e => setValue(e.target.value)}
//           />
//         </label>
//       </form>
//     );
//     }
// }

export function Input({label, setValue}) {
    const [name, setName] = useState("");
    
    const handleSubmit = (evt) => {
        evt.preventDefault();
        setValue(name);
    }
    return (
      <form onSubmit={handleSubmit}>
        <label>
            <code>
                {label}&nbsp;
          </code>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </label>
        &nbsp;
        <input type="submit" value="Submit" />
      </form>
    );
  }

export default Input;