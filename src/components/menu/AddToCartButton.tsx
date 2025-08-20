"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { formatCurrency } from "@/lib/formtter";
import { Checkbox } from "../ui/checkbox";
// import { Extra, Products, Size } from "@/generated/prisma";
import { ProductWithrelation } from "@/types/product";
import { Extra, ProductsSizes, Size } from "@/generated/prisma";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  addCartItem,
  removeCartItem,
  removeItemFromCart,
  selectCartItems,
} from "@/redux/features/cart/cartSlice";
import { getItemQuantity } from "@/lib/cart";

export default function AddToCartButton({
  item,
}: {
  item: ProductWithrelation;
}) {
  const cart = useAppSelector(selectCartItems);
  const dispatch = useAppDispatch();
  const quantity = getItemQuantity(item.id, cart);
  const defaultSize =
    cart.find((el) => el.id === item.id)?.size ||
    item.sizes.find((size) => size.name === ProductsSizes.SMALL);
  const defaultExtras = cart.find((ele) => ele.id === item.id)?.extra || [];
  const [selectedSize, setselectedSize] = useState<Size>(defaultSize!);
  const [selectedExtras, setselectedExtras] = useState<Extra[]>(defaultExtras);
  let totalPrice = item.basePrice;
  if (selectedSize) {
    totalPrice += selectedSize.price;
  }
  if (selectedExtras.length > 0) {
    for (const extra of selectedExtras) {
      totalPrice += extra.price;
    }
  }
  const handleAddToCart = () => {
    dispatch(
      addCartItem({
        basePrice: item.basePrice,
        id: item.id,
        name: item.name,
        image: item.image,
        size: selectedSize,
        extra: selectedExtras,
      })
    );
  };
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            type="button"
            size={`lg`}
            className=" text-white rounded-full !px-8 mt-4"
          >
            <span>Add to Cart</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto text-center">
          <DialogHeader>
            {" "}
            <div className=" w-48 h-48 relative mx-auto">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className=" object-cover"
              />
            </div>
            <DialogTitle className="text-center pt-4">{item.name}</DialogTitle>
            <DialogDescription className="text-center">
              {item.description}
            </DialogDescription>
          </DialogHeader>
          <div className=" space-y-10 py-10">
            <div className="space-y-10 text-center">
              <Label
                htmlFor="pick-size "
                className=" text-[22px] justify-center"
              >
                Pick Your Size
              </Label>
              <Pick
                sizes={item.sizes}
                item={item}
                selectedSize={selectedSize}
                setselectedSize={setselectedSize}
              />
            </div>
            <div className="space-y-10 text-center">
              <Label htmlFor="Extra " className="text-[22px] justify-center">
                Any Extra?
              </Label>
              <ExtraAny
                extra={item.extras}
                selectedExtras={selectedExtras}
                setselectedExtras={setselectedExtras}
              />
            </div>
          </div>
          <DialogFooter>
            {quantity > 0 ? (
              <ChooseQuantity
                quantity={quantity}
                item={item}
                selectedSize={selectedSize}
                selectedExtras={selectedExtras}
              />
            ) : (
              <Button
                type="submit"
                className=" !w-full text-center mx-auto"
                onClick={handleAddToCart}
              >
                Add to cart {formatCurrency(totalPrice)}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* */}
    </>
  );
}

function Pick({
  sizes,
  item,
  selectedSize,
  setselectedSize,
}: {
  sizes: Size[];
  item: ProductWithrelation;
  selectedSize: Size;
  setselectedSize: React.Dispatch<React.SetStateAction<Size>>;
}) {
  return (
    <RadioGroup defaultValue="SMALL" className="space-y-2">
      {sizes.map((size: Size) => (
        <div
          key={size.id}
          className="flex items-center space-y-2 rounded-md border border-gray-300 p-1  "
        >
          <RadioGroupItem
            value={selectedSize.name}
            checked={selectedSize.id === size.id}
            onClick={() => setselectedSize(size)}
            id={size.id}
          />
          <Label
            htmlFor={size.id}
            className="px-2 uppercase font-normal text-[16px] "
          >
            {size.name} {formatCurrency(size.price + item.basePrice)}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
}
function ExtraAny({
  extra,
  selectedExtras,
  setselectedExtras,
}: {
  extra: Extra[];
  selectedExtras: Extra[];
  setselectedExtras: React.Dispatch<React.SetStateAction<Extra[]>>;
}) {
  const handleExtras = (extra: Extra) => {
    if (selectedExtras.find((e) => e.id === extra.id)) {
      const filterSelectedExtras = selectedExtras.filter(
        (ele) => ele.id !== extra.id
      );
      setselectedExtras(filterSelectedExtras);
    } else {
      setselectedExtras((prv) => [...prv, extra]);
    }
  };
  return (
    <div className=" text-start space-y-2">
      {extra.map((item: Extra) => (
        <div key={item.id} className="rounded-md border border-gray-300 p-1  ">
          <Checkbox
            id={item.id}
            checked={Boolean(selectedExtras.find((ele) => ele.id === item.id))}
            onClick={() => handleExtras(item)}
          />
          <label htmlFor={item.id} className=" px-2 uppercase ">
            {item.name} {formatCurrency(item.price)}
          </label>
        </div>
      ))}
    </div>
  );
}

const ChooseQuantity = ({
  quantity,
  item,
  selectedExtras,
  selectedSize,
}: {
  quantity: number;
  selectedExtras: Extra[];
  selectedSize: Size;
  item: ProductWithrelation;
}) => {
  const dispatch = useAppDispatch();

  return (
    <div className="flex items-center flex-col gap-2 mt-4 w-full">
      <div className="flex items-center justify-center gap-2">
        <Button
          variant="outline"
          onClick={() => dispatch(removeCartItem({ id: item.id }))}
        >
          -
        </Button>
        <div>
          <span className="text-black">{quantity} in cart</span>
        </div>
        <Button
          variant="outline"
          onClick={() =>
            dispatch(
              addCartItem({
                basePrice: item.basePrice,
                id: item.id,
                image: item.image,
                name: item.name,
                extra: selectedExtras,
                size: selectedSize,
              })
            )
          }
        >
          +
        </Button>
      </div>
      <Button
        size="sm"
        onClick={() => dispatch(removeItemFromCart({ id: item.id }))}
      >
        Remove
      </Button>
    </div>
  );
};
