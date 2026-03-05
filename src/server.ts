import app from "./app";
import { envVars } from "./config/env";

const bootStarp = () => {
  try {
    app.listen(envVars.PORT, () => {
      console.log(`Server is running on http://localhost:${envVars.PORT}`);
    })
  } catch (error) {
    console.log(error)
  }
}


bootStarp()



