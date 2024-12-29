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
  product_name: string;
  build_assembly_number: string;
  order_data: OrderData[];
};
export type OrderData = {
  id: number;
  material_number: string;
  material_name: string;
  material_lot: string;
  batch_weight: number;
  qty_issued: string;
  qty_wasted: string;
  qty_returned: string;
  picked_by: string;
  verified_by: string;
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
    orderArray: OrderData;
    //setOrderArray: Dispatch<SetStateAction<OrderData[]>>;
  };
};
