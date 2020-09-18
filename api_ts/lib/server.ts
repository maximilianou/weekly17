import { App } from "./config/app";
const instance:App = new App();
const PORT = 3000;
instance.app.listen(PORT, () => {
   console.log('Express server listening on port ' + PORT);
})
