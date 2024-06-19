export class Pagination<T>{
    content!:Array<T>;
    label!:String;
    pageNumber!:number;
    pageSize!:number;
    totalPages!:number;
    totalElements!:number;
    lastPage!:boolean;
}