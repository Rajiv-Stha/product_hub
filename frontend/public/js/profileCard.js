let imgFile;
const fetchCountry = async () => {
  try {
    const { data, status } = await axios.get(
      "https://restcountries.com/v3.1/all"
    );
    data.forEach((country) => {
      document.querySelector(
        "#signup_select"
      ).innerHTML += ` <option value="${country.name.common}">${country.name.common}</option>`;
    });
    displayUserData()
  } catch (error) {
    console.log(error);
  }
};


const displayUserData=async()=>{
  const user = getLoginUser()
  if(!user)return;
  console.log(user.country)
  document.querySelector("#profileCardUsername").value = user.username
  document.querySelector(".profileCard_select").value = user.country
  document.querySelector(".profileCardImg").src = user.image;
}

const handleGetFileUrl=async()=>{

    if(!imgFile)return
     const reader = new FileReader();
     const [type] = imgFile?.type.split("/")
      reader.readAsDataURL(imgFile);
      reader.onloadend=async()=>{
        let url = reader.result;
        if(url){
         const {status,data} =   await axios.post("https://wrapfile.onrender.com/api/file/getFileUrl",{
          data:url,
          type
         })
         if(status===200){  
          const imgUrl = data.message;
          return imgUrl ;
         }  
        }
      }

      reader.onerror=()=>{
        console.log("some error while reading file");
      }

  
  }

  const updateUser=async(uploadPayload)=>{
    const user =  getLoginUser()
    if(!user)return;
    try {
     const {status}=  await axios.put(`http://localhost:8000/api/user/${user._id}`,{...uploadPayload});

     if(status===200){
      alert("successfull")
     }

    } catch (error) {
      console.log(error)
    }
  }

document.querySelector(".avatar_header_btns").addEventListener("click",()=>{
  document.querySelector(".imageFile").click()


});
document.querySelector(".imageFile").addEventListener("change",e=>{
  imgFile = e.target.files[0]
  document.querySelector(".profileCardImg").src= URL.createObjectURL(imgFile);
})


document.querySelector(".update_btn").addEventListener("click",async(e)=>{

  if(imgFile){
    const url =  await handleGetFileUrl()
    console.log(url)
    uploadPayload.image = url ;
  }

  let uploadPayload = {};

  uploadPayload.username =  document.querySelector("#profileCardUsername").value 
  uploadPayload.country = document.querySelector(".profileCard_select").value;

  // updateUser(uploadPayload);
  console.log(uploadPayload)

})

fetchCountry();
