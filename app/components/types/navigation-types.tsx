import { Dispatch, SetStateAction } from "react";

export type ItemData = {
  item_id: number;
  item_location: string;
  item_number: string;
  item_name: string;
  item_lot_number: string;
  item_expiration_date: string;
  item_quantity: number;
  item_weight: number;
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
  "Cycle Count": {
    dataArray: ItemData[];
    setDataArray: Dispatch<SetStateAction<ItemData[]>>;
  };
  "Correct Count": {
    dataArray: ItemData[];
    setDataArray: Dispatch<SetStateAction<ItemData[]>>;
    items: ItemData;
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
