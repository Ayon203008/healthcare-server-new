import app from "./app";

const bootStarp=()=>{
  try{
    app.listen(5000, () => {
      console.log(`Server is running on http://localhost:${5000}`);
    })
  }catch(error){
    console.log(error)
  }
}


bootStarp()



