export type Comment = {
  rating: number;
  comment: string;
  date: string;
};

export type Review = {
  id: number;
  user: {
      id: number;
      isPro: boolean;
      name: string;
      avatarUrl: string;
  };
  rating: number;
  comment: string;
  date: string;
};

export type Reviews = Review[];
