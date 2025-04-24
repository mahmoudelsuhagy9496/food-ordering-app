/* eslint-disable @typescript-eslint/no-explicit-any */
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

export default function AddToCartButton({ item }: { item: any }) {
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
              <Label htmlFor="pick-size " className=" justify-center">Pick Your Size</Label>
              <RadioGroupDemo />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* */}
    </>
  );
}

function RadioGroupDemo() {
  return (
    <RadioGroup defaultValue="comfortable">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="default" id="r1" />
        <Label htmlFor="r1">Default</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="comfortable" id="r2" />
        <Label htmlFor="r2">Comfortable</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="compact" id="r3" />
        <Label htmlFor="r3">Compact</Label>
      </div>
    </RadioGroup>
  );
}
