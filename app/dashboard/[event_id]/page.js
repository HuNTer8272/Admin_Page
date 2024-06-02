  "use client"
  import { useParams } from 'next/navigation'
  import React, { useEffect, useRef, useState } from 'react'
  import { FaImages } from "react-icons/fa";
  import { MdModeEditOutline } from 'react-icons/md';
  import { getStorage, ref as storageRef, uploadBytes, getDownloadURL, ref } from 'firebase/storage';
  import { AlertDestructive } from '@/components/ui/ErrorAlert';
  import { storage, store } from '@/database/Firebase';
  import codeclash from "../../../image/codeclash.jpg";
  import ideathon from "../../../image/ideathon.jpg";
  import techmela from "../../../image/techmela.jpg";
  import neoncricket from "../../../image/neoncricket.jpg";
  import Image from 'next/image';
import { useRouter } from 'next/router';
  

  const CreateEvent = () => {
    const eventID = useParams()
    const cardImage = {
      codeclash: codeclash,
      ideathon: ideathon,
      techmela: techmela,
      neoncricket: neoncricket
    }

    // console.log("eventID", eventID);

    const [formData, setFormData] = useState({ title: "", description: "", committee: "" });
    const [image, setImage] = useState('');
    const [file, setFile] = useState('')
    const [url, setUrl] = useState('');
    const [imgURL, setImgUrl] = useState('')
    const fileInputRef = useRef(null);
    const [isError,setIsError] = useState(false);
    const [oldImage,setOldImage] = useState('')
    useEffect(() => {
      const fetchEventData = async () => {
        try {
          console.log("fetching data")
          console.log("eventID:", eventID.event_id);
          const cardRef = store.collection('cards');
          const doc = await cardRef.doc(eventID.event_id).get()
          if(!doc.exists){
            console.log('no document');
            return
          }
          const data = doc.data();
          console.log(data.description)
          setFormData({
            title: data.Slogan,
            description:data.description,
            committee: data.Committee,
          });
          setImage(data.Image in cardImage ? cardImage[data.Image] : data.Image);
          setUrl(data.Image in cardImage ? cardImage[data.Image] : data.Image);
          setOldImage(data.Image in cardImage ? data.Image: "")
          // Now you can use eventData as needed
        } catch (error) {
          console.error("Error fetching document:", error);
        }
    
      }
      if (eventID.event_id && eventID.event_id !== 'create-event') {
        console.log("executing")
        fetchEventData();
      }
    }, []) 
    
    const handleFormChange = (e) => {
      const { name, value } = e.target;
      console.log(name,value)
      setFormData({
        ...formData,
        [name]: value,
      });
    };

    const handleDrop = (e) => {
      e.preventDefault();
      if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]) {
        const file = e.dataTransfer.files[0];
        setFile(file)
        const imageUrl = URL.createObjectURL(file);
        setUrl(imageUrl);
        setImage(file);
      }
    };

    const handleDragOver = (e) => {
      e.preventDefault();
    };

    const handleFileInputChange = (e) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        setFile(file)
        const imageUrl = URL.createObjectURL(file);
        setUrl(imageUrl);
        setImage(file);
      }
    };

    const handleRemoveImage = () => {
      setImage('');
      setUrl('');
    };

    const handleOpenFileDialog = () => {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    };

    const handleFormSubmit = (e) =>{
      e.preventDefault();
      if(formData.title === "" || formData.description === "" || formData.committee === "" || image === ""){
        setIsError(true);
        return
      }
        // return alert("Please fill all the fields");

      try{
        if(eventID.event_id === 'create-event'){
          createEvent()
        }else{
          updateEvent();
        }
        
                      
      }catch(e){
        console.error(e.message);
      }
    }


    useEffect(() => {
      if(isError){
        setTimeout(() => {
          setIsError(false)
        }, 2000)
      }
    },[isError])

    const handleFileUpload = async(file)=>{
      const timestamp = Date.now().toString();
      const randomString = Math.random().toString(36).substring(2);
      const fileName = `products/${timestamp}_${randomString}_${file.name}`;
      const storageRef = ref(storage, fileName);
      await uploadBytes(storageRef, file);
      const imageUrl = await getDownloadURL(storageRef);

      return imageUrl
  
    }

  //   const handleFileUpload = async(file) =>{
  //     //creating unique file name  
  //     const timestamp = Date.now().toString();
  //     const randomString = Math.random().toString(36).substring(2);
  //     const fileName = `${timestamp}_${randomString}_${file.name}`;

      
  //    //uploading the file into firebase
  //    const storageRefInstance = storageRef(getStorage(),fileName);
  //    uploadBytes(storageRefInstance,file)
  //    .then(() =>{
  //        getDownloadURL(storageRefInstance)
  //        .then((downloadURL) => {
  //             setImgUrl(downloadURL)
  //        })
  //        .catch((e) =>{
  //            console.error(`An error occurred ${e.message}`);
  //        })
  //    })
  //    .catch(e => {
  //        console.error(`An error occured ${e.message}`);
  //    })

  //  }
   function getCurrentDate() {
    const d = new Date();
    return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
  }

    const createEvent = async () => {
      const ImgURL =await handleFileUpload(file);
      console.log("url:",url);
      console.log("imgURL:",imgURL);

      try{
        const cardRef = store.collection('cards');
        const data = {
          Slogan: formData.title,
          description: formData.description,
          Committee: formData.committee,
          Image: ImgURL,
          date: getCurrentDate()
        }
        await cardRef.add(data);
        setFormData({
          title: '',
          description: '',
          committee: ''
        });
        setFile('');
        setImage('');
        setUrl('');
        setImgUrl('');
        setIsError(false);
        window.location.href = '/dashboard';
      }catch(e){
        console.error(e.message);
      } 
    }

    const updateEvent = async () => {
      const ImgURL = await handleFileUpload(file);
       console.log("url:",url);
       console.log("imgURL:",imgURL);
      try{
        const cardRef = store.collection('cards').doc(eventID.event_id);
        const data = {
          Slogan: formData.title,
          description: formData.description,
          Committee: formData.committee,
          Image: oldImage === "" ? ImgURL : oldImage,

        }
        await cardRef.update(data);
        setFormData({
          title: '',
          description: '',
          committee: '',
          Image:url,
        });
        setFile('');
        setImage('');
        setUrl('');
        setImgUrl('');
        setIsError(false);
        window.location.href = '/dashboard';
         
      }catch(e){

      }

    }


    return (
      <div className='relative pb-10 bg-gray-100 dark:bg-zinc-950'>
        {/* save/image section */}
        <div className=" saveSection h-[7rem] p-5 flex justify-between">
          <input onChange={handleFormChange} value={formData.title} name="title" type="text" className='p-1  bg-transparent  border-b-[2px] dark:border-b-zinc-800 outline-none text-gray-100 dark:text-zinc-900 placeholder-gray-100 dark:placeholder-zinc-900 h-10 w-[30rem]' placeholder='Untitled Event' />
          <div className="flex space-x-5">
            <a href='/dashboard'>
              <button className='h-8 p-1 px-6 font-semibold bg-gray-100 text-[0.8rem] rounded-full shadow-lg dark:bg-zinc-800'>Cancel</button>
            </a>
            <button onClick={handleFormSubmit} className='h-8 p-1 px-6 rounded-full bg-gray-100 text-[0.8rem] font-semibold shadow-lg dark:bg-zinc-800'>Save</button>
          </div>
        </div>
        {/* image upload div */}
        <div className="dark:bg-zinc-800 bg-white shadow-lg overflow-hidden w-[50rem] h-[25rem] ml-5 -mt-5 rounded-lg">
          <div className="p-3 px-4 border-b-2 dark:border-b-zinc-600 ">
            <h1 className="">Image</h1>
          </div>
          <div className=" h-[calc(100%-3.2rem)] flex justify-center items-center">
            {image === '' ? (
              <div onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={handleOpenFileDialog}
                className="bg-teal-400 cursor-pointer flex justify-center items-center w-[90%] h-[80%] rounded-lg">
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFileInputChange}
                />

                <FaImages className='text-[3rem] text-gray-200 dark:text-zinc-800' />
              </div>
            ) : (
              <div className="relative  overflow-hidden text-slate-600 flex justify-center space-x-3 items-center w-[95%] h-[20rem] overflow-hidden rounded-md ">
                <div className="absolute w-full h-full ease-in-out duration-200 transition-all cursor-pointer text-white bg-slate-950 opacity-0 hover:opacity-[0.4] flex justify-center items-center">
                  <MdModeEditOutline
                    onClick={handleRemoveImage}
                    className="text-2xl hover:scale-[1.05] ease-in-out duration-150"
                  />
                </div>
                <Image className="object-cover w-full h-full" width={300} height={300} src={url} alt="uploadedImage" />
              </div>

            )}
          </div>
        </div>
        {/*  */}
        <div className="mt-7 bg-white shadow-lg dark:bg-zinc-800 overflow-hidden w-[50rem]  ml-5  rounded-lg">
          <div className="p-3 px-4 border-b-2 dark:border-b-zinc-600 ">
            <h1>Event Info</h1>
          </div>
          <div className=" h-[calc(100%-3.2rem)]  p-3 px-4">
            <div className="mb-5 ">
              <h1 className='ml-1 dark:font-semibold dark:text-zinc-300 '>Event Title</h1>
              <input type="text" onChange={handleFormChange} value={formData.title} name="title" className='p-2 pl-3 mt-2 w-[20rem] bg-gray-100 dark:bg-zinc-700 placeholder-gray-400 text-[0.9rem] rounded-md outline-none' placeholder='Event Title' />
            </div>
            <div className="mb-5 ">
              <h1 className='ml-1 dark:font-semibold dark:text-zinc-300 '>Event Committee</h1>
              <input type="text" onChange={handleFormChange} value={formData.committee} name="committee" className='p-2 pl-3 mt-2 bg-gray-100 dark:bg-zinc-700 w-[20rem] placeholder-gray-400 text-[0.9rem] rounded-md outline-none' placeholder='Event Committee' />
            </div>
            <div className="mb-5 ">
              <h1 className='ml-1 dark:font-semibold dark:text-zinc-300 '>Event Description</h1>
              <textarea type="text" onChange={handleFormChange} value={formData.description} name="description" className='p-2 pl-3 mt-2 bg-gray-100 dark:bg-zinc-700 w-[30rem] h-[12rem] res placeholder-gray-400 text-[0.9rem] rounded-md outline-none' placeholder='Add Event Description' />
            </div>
          </div>
        </div>
    
    <AlertDestructive className={`absolute w-[20rem] font-semibold ease-linear transition-all  right-3 top-32 ${isError?"block":"hidden"} `} >
      Please fill all the fields
    </AlertDestructive>
      </div>
    )
  }

  export default CreateEvent