import StartUpController from "./StartUpController";
import AuthController from "./AuthController";
import ShipmentController from "./ShipmentController";

//Inject Services to use by Controllers

const startUpController = new StartUpController();
const authController = new AuthController();
const shipmentController = new ShipmentController();

export { startUpController, authController, shipmentController };
