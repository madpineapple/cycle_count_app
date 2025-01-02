import { Dispatch, SetStateAction } from "react";

export type ItemData = {
  Id: number;
  PartNumber: string;
  PartDescription: string;
  Location: string;
  Qty: number;
  QtyCommitted: number;
  Tracking_Lot_Number: string;
  Tracking_Expiration_Date: string;
  Tracking_Vendor_Lot: string;
};
export type BuildItemData = {
  id: number;
  Material_Number: string;
  Material_Name: string;
  Material_Lot: string;
  Total_Input_per_Batch: number;
  Qty_Issued: number;
  Qty_Wasted: number;
  Qty_Returned: number;
  Picked_By: string;
  Verified_By: string;
};
export type BuildOrderData = {
  id: number;
  Material_Number: string;
  Material_Name: string;
  Material_Lot: string;
  Total_Input_per_Batch: number;
  Qty_Issued: number;
  Qty_Wasted: number;
  Qty_Returned: number;
  Picked_By: string;
  Verified_By: string;
};

export type RootStackParamList = {
  Home: undefined;
  "Cycle Count": undefined;
  "Correct Count": {
    dataArray: ItemData[];
    setDataArray: Dispatch<SetStateAction<ItemData[]>>;
    items: ItemData;
  };
  "Confirm Count": {
    items: ItemData;
    confirmCount(value: ItemData): void;
  };
  "BA Screen": {
    buildDataArray: BuildItemData[];
    setBuildDataArray: Dispatch<SetStateAction<BuildItemData[]>>;
  };
  "BA Pick Screen": {
    order: BuildItemData;
  };
  "Test Camera Screen": undefined;

  "Individual Pick Item Screen": {
    orderItem: BuildItemData;
    //setOrderArray: Dispatch<SetStateAction<OrderData[]>>;
  };
};
