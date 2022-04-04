export type Event = {
  props : {
    items : Array<EventItem>
  }
};

export interface EventItem {
  id: number,
  name: string,
  slug:string,
  description:string,
  created?:string,
  updated?:string,
}

export type PageEventProps = {
  limit: number,
  offset: number,
  items :Array<EventItem>
};
