import React, { useState, useEffect } from "react";
import Nav from "../components/Nav";
import { useDispatch, useSelector } from 'react-redux'
import PaiCard from "../components/PaiCard";
import axios from "axios";
import { getPosts, post, error, loading } from '../states/postSlice'


const Dashboard = () => {
  // const dispatch = useDispatch()
  // const err = useSelector(error)
  // const isLoading = useSelector(loading)
  // const  Pai = useSelector(post)
  const [Pai, setPai] = useState(null)
  const [err, setErr] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  


  const getPai = async () => {
    setIsLoading(true)

    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER_BASE_URL}/pai`
      )
      setPai(data)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      setErr(error)
    }
  }

  useEffect(() => {
    getPai()
  }, [])



  // useEffect(()=>{
  //   dispatch(getPosts(post))
    
  // }, [dispatch])

  return(
    <div className="dashboard_page flex w-screen h-screen">
    <Nav />
    <div className= " w-full p-20 space-y-10 ">
        <div className="bg-zinc-200 w-full h-20">
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-center">
              
              <tbody>
              {isLoading && !err && <p>page is loading</p> }
      { Pai && !isLoading && err && (
        <p>Oops qualcosa non è andata a buon fine...</p>
      )}
              {Pai &&
        !err &&
        Pai.payload.map((pai, _index) => {
                return <PaiCard key={_index} pai={pai} />
            }
            )}
                
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    </div>
    </div>
    </div>

  )
      
  return (
    <div classNameName="dashboard_page flex w-screen h-screen">
      <Nav />
      <div classNameName= " w-full p-20 space-y-10 ">
        <div classNameName="bg-zinc-200 w-full h-20">
        {isLoading && !err && <p>page is loading</p> }
      { Pai && !isLoading && err && (
        <p>Oops qualcosa non è andata a buon fine...</p>
      )}
            
        </div>
        <div classNameName="bg-red-200 w-full h-20">
            <h1>Hello</h1>
        </div>
        <div classNameName="bg-blue-200 w-full h-20">

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
