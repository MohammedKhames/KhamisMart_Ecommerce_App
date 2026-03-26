
import { IMetadata } from './../interfaces/IMetaData';


// generic response 
export type ResponseType<T> = {
  results: number;
  metadata: IMetadata;
  data: T[];
}