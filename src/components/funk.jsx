// import React, { useCallback, useEffect, useMemo, useState } from 'react';

// function Funk() {
//   const [count, setCount] = useState(1);
//   const [data, setData] = useState([]);
//   const [url, setUrl] = useState('https://jsonplaceholder.typicode.com/todos');

//   const getData = useCallback(async () => {
//     try {
//       const response = await fetch(url);
//       const json = await response.json();
//       setData(json);
//       console.log(json);
//     } catch (error) {
//       console.error('Error:', error);
//     }
//     console.log('in render');
//   }, [url]);

//   useEffect(() => {
//     getData();
//   }, [getData]);

//   const totalNumbers = useMemo(() => {
//     console.log('Calculating total numbers...');

//     let total = 0;
//     for (let i = 0; i < 1000; i++) {
//       total += i;
//     }
//     console.log(total);

//     return total + count;
//   }, [count]);

//   return (
//     <div>
//       <p>Count: {count}</p>
//       <p>Total: {totalNumbers}</p>
//       <button
//         className='btn bg-black text-white rounded-md py-3 px-10'
//         onClick={() => setCount(prevCount => prevCount + 1)}
//       >
//         Increment
//       </button>
//       <button
//         className='btn bg-blue-500 ml-10 text-white rounded-md py-3 px-10'
//         onClick={() => setUrl('https://jsonplaceholder.typicode.com/users')}
//       >
//         Change URL
//       </button>
//     </div>
//   );
// }

// export default Funk;
