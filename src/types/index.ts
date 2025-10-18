export type Image = {
  thumbnail: string;
  mobile: string;
  tablet: string;
  desktop: string;
};

export type ItemProps = {
  name: string;
  price: number;
  quantity: number;
  thumb?: string;
};

export type DessertCardProps = {
  image: Image;
  name: string;
  category: string;
  price: number;
};

export type CartProps = {
  onModalOpen: () => void;
};

export type CartItemListProps = {
  items: ItemProps[];
  isModal?: boolean;
};

export type CartItemProps = {
  item: ItemProps;
  isModal: boolean;
};

export type OrderConfirmModalProps = {
  onModalClose: () => void;
};
