import AppStyles from "app/config/styles";

export const getAssetFilters = () => {
    return [
      {
        filterName: "Running",
        name: "runningCount",
        id: "R",
        color: "#32CB71",
      },
      {
        filterName: "Idling",
        name: "idleCount",
        id: "I",
        color: "#FD8181",
      },
      {
        filterName: "Asset Off",
        name: "assetOffCount",
        id: "A",
        color: "#0090D9",
      },
      {
        filterName: "Offline",
        name: "offlineCount",
        id: "O",
        color: "#FDCA4E",
      },
      {
        filterName: "Immobilized",
        name: "immobilizeCount",
        id: "IM",
        color: AppStyles.color.COLOR_MEDIUM_LIGHT_GREY,
      },
    ];
  };