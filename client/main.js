import AlertComponent from "./components/alert-component.js";
import BikeFormComponent from "./components/bike-form-component.js";
import BikesTableComponent from "./components/bikes-table-component.js";
import ContainerComponent from "./components/container-component.js";
import FlexContainerComponent from "./components/flex-container-component.js";
import ApiService from "./services/api-service.js";

let bikesTableComponent;
let bikeFormComponent;
let alertComponent;

let bikes;
let editedRowId = null;

const handleBikeDelete = async (id) => {
  try {
    await ApiService.deleteBike(id);
    bikes = await ApiService.getBikes();
    bikesTableComponent.renderBikes(bikes, editedRowId);
  } catch (error) {
    alertComponent.show(error.message);
  }
}

const handleBikeCreate = async (bikeProps) => {
  try {
    await ApiService.createBike(bikeProps);
    bikes = await ApiService.getBikes();
    bikesTableComponent.renderbikes(bikes, editedRowId);
  } catch (error) {
    alertComponent.show(error.message);
  }
}

const handleBikeUpdate = async (bikeProps) => {
  try {
    await ApiService.updateBike(editedRowId, bikeProps);
    bikes = await ApiService.getBikes();
    editedRowId = null;
    bikeFormComponent.disableEditing();
    bikesTableComponent.renderBikes(bikes, editedRowId);
  } catch (error) {
    alertComponent.show(error.message);
  }
}

const handleBikeEdit = (BikeProps) => {
  if (editedRowId === bikeProps.id) editedRowId = null;
  else editedRowId = bikeProps.id;

  bikesTableComponent.renderBikes(bikes, editedRowId);
  if (editedRowId === null) {
    bikeFormComponent.disableEditing();
    bikeFormComponent.onSubmit = handleBikeCreate;
  } else {
    bikeFormComponent.enableEditing(bikeProps);
    bikeFormComponent.onSubmit = handleBikeUpdate;
  }
}

(async function initialize() {
  const rootHtmlElement = document.querySelector('#root');
  const containerComponent = new ContainerComponent();
  alertComponent = new AlertComponent();
  containerComponent.addComponents(alertComponent);
  rootHtmlElement.append(containerComponent.htmlElement);
  try {
    bikes = await ApiService.getBikes();
    bikesTableComponent = new BikesTableComponent({
      bikes,
      onDelete: handleBikeDelete,
      onEdit: handleBikeEdit,
    });
    bikeFormComponent = new BikeFormComponent({
      onSubmit: handleBikeCreate,
    });
    const flexContainerComponent = new FlexContainerComponent();
    flexContainerComponent.addComponents(bikesTableComponent, bikeFormComponent);
    containerComponent.addComponents(flexContainerComponent);
  } catch (error) {
    alertComponent.show(error.message);
  }
})();
