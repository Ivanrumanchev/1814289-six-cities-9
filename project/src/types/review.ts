type User = {
  id: number;
  isPro: boolean;
  name: string;
  avatarUrl: string;
};

export type ReviewDTO = {
  id: number;
  user: User;
  rating: number;
  comment: string;
  date: string;
};
