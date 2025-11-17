export type CreateEvent = {
    title : string ,
    start_datetime : string, 
    end_datetime : string, 
    location_name : string,
    official_lattitude : number,
    official_longitude: number,
    createdBy : string
}

export type Event = {
    id: number,
    title : string ,
    start_datetime : string, 
    end_datetime : string, 
    location_name : string,
    official_lattitude : number,
    official_longitude: number,
    createdBy : string
    is_presence_active : boolean

}