export interface AssetBase {
  asset_id: string;
  input_format: string;
  data: string;
  metadata: object;
}

export interface AssetListItem extends AssetBase {}
