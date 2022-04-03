export type Event = {
  props : [
    items : [
      id: number,
      name: string,
      slug:string,
      description:string,
      created?:string,
      updated?:string,
    ],
  ]
};

export type EventItem = {
  id: number,
  name: string,
  slug:string,
  description:string,
  created?:string,
  updated?:string,
};
