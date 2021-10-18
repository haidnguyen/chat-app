export interface GraphResponse<T> {
  data: T;
  errors?: Array<{ message: string }>[];
}
