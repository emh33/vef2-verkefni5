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

export type User = {
  id?:number,
  name?:string,
  username:string,
  password?:string,
  admin?:boolean,
  created?:string,
};

export type UserContextType = {
  loggedin:boolean;
  user: User | null;
  newUser: (user: User | null) => void;
  logoutUser: () => void;
};
