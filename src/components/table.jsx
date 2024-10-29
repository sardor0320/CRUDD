import axios from 'axios'
import React, { useEffect, useState } from 'react'
import DeleteModal from './deleteModal';
import Edituser from './edituser';




function Table() {
  const [data, setData] = useState([]);
  const [modalVissible, setModalVissible] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [addModall, setAddModall] = useState(false);
  const [editModall, setEditModall] = useState(false);
  const [deletVissible, setDeletVissible] = useState(false);
  const [deletedData, setDeletedData] = useState('');
  const [userId, setUserId] = useState('');
  const [productId, setProductId] = useState('');
  const [productTitle, setProductTitle] = useState('');
  const [productBody, setProductBody] = useState('');
  const token = localStorage.getItem('token')
  function getData() {
    axios.get('http://64.226.108.80:8090/product/list', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        console.log(res.data.body)
        setData(res.data.body)
      })
      .catch((err) => {
        console.error('Error fetching data:', err);
      })
  }
  useEffect(() => {
    getData()
  }, [])



  const VissibleModal = () => setModalVissible(!modalVissible);
  const VissibleAddModall = () => setAddModall(!addModall);
  const VissibleEditModall = () => setEditModall(!editModall);
  const VissibleDelet = () => setDeletVissible(!deletVissible);


  const addProduct = (e) => {
    e.preventDefault();
    const newProduct = {
      id: productId,
      title: productTitle,
      body: productBody,
    };
    if (productId && productTitle && productBody) {

      setData([...data, newProduct]);
      VissibleAddModall();
      setProductId('');
      setProductTitle('');
      setProductBody('');
    } else {
      alert("Please fill out all fields");
    }
  };




  return (
    <div className="container mx-auto">
      <button className='px-5 py-3 bg-blue-500 m-5 rounded-lg' onClick={VissibleAddModall}>Add +</button>
      <div className="relative flex justify-center overflow-x-auto">
        <table className="w-[1000px] text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Id</th>
              <th scope="col" className="px-6 py-3">Title</th>
              <th scope="col" className="px-6 py-3">Body</th>
              <th scope="col" className="px-6 py-3">add Btn</th>
              <th scope="col" className="px-6 py-3">Delet btn</th>
              <th scope="col" className="px-6 py-3">INFO MADAL</th>
            </tr>
          </thead>
          <tbody>





            {/* ADD MODAL */}
            {addModall &&

              <div id="crud-modal" className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-[calc(100%-1rem)]">
                <div className="relative p-4 w-full max-w-md">
                  <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Add Product</h3>
                      <button onClick={VissibleAddModall} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 dark:hover:bg-gray-600 dark:hover:text-white">
                        <svg className="w-3 h-3" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                        <span className="sr-only">Close modal</span>
                      </button>
                    </div>
                    <form onSubmit={addProduct} className="p-4 md:p-5">
                      <div className="grid gap-4 mb-4 grid-cols-2">
                        <div className="col-span-2">
                          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Id</label>
                          <input onChange={(e) => setProductId(e.target.value)} type="text" className="bg-gray-50 border text-gray-900 text-sm rounded-lg p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                        </div>
                        <div className="col-span-2">
                          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                          <input onChange={(e) => setProductTitle(e.target.value)} type="text" className="bg-gray-50 border text-gray-900 text-sm rounded-lg p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                        </div>
                        <div className="col-span-2">
                          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Body</label>
                          <textarea onChange={(e) => setProductBody(e.target.value)} rows="4" className="block p-2.5 w-full text-sm bg-gray-50 rounded-lg border dark:bg-gray-600 dark:border-gray-500 dark:text-white" required></textarea>
                        </div>
                      </div>
                      <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700">
                        Add new product
                      </button>
                    </form>
                  </div>
                </div>
              </div>}




            {data && data.length && data.map((item) => (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 py-4">{item.id}</td>
                <td className="px-6 py-4">{item.name}</td>
                <td className="px-6 py-4">{item.description}</td>
                <td>
                  <button
                    onClick={() => (VissibleEditModall()
                      , setSelectedItem(item.id),
                      setUserId(item.userId))}
                    type="button"
                    className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                    edit
                  </button>
                </td>
                <td>
                  <button onClick={() => (VissibleDelet(), setDeletedData(item.id))} type="button" className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-10 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delet</button>
                </td>
                <td className="px-6 py-4">
                  <td>
                    <button onClick={() => {
                      setSelectedItem(item)
                      VissibleModal()
                    }} type="button" className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900">info</button>
                  </td>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


      {/* MODAL VISSIBLE */}


      {modalVissible &&

        <div id="default-modal" tabindex="-1" aria-hidden="true" className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
          <div className="relative p-4 w-full max-w-2xl max-h-full">

            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">

              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                </h3>
                <button onClick={
                  VissibleModal
                } type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>

              <div className="p-4 md:p-5 space-y-4">
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  {selectedItem.id}
                </p>
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  {selectedItem.body}
                </p>
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  {selectedItem.title}
                </p>
              </div>

              <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button data-modal-hide="default-modal" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">I accept</button>
                <button data-modal-hide="default-modal" type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Decline</button>
              </div>
            </div>
          </div>
        </div>}


      {/* EDIT MODAL */}
      {editModall && (


        <Edituser data={data} userId={userId} selectedItem={selectedItem} VissibleEditModall={VissibleEditModall} setData={setData} getData={getData} />

      )}

      {/* DELETE MODAL */}


      {deletVissible &&

        <DeleteModal getData={getData} setData={setData} deletVissible={deletVissible} deletedData={deletedData} deleteFunc={VissibleDelet} />

      }
    </div>
  )
}


export default Table