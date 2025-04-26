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
import { formatCurrency } from "@/lib/formtter";
import { Checkbox } from "../ui/checkbox";

export default function AddToCartButton({ item }: { item: any }) {
  const sizes=[
    {id:crypto.randomUUID(),name:"Small",price:0},
    {id:crypto.randomUUID(),name:"Medium,",price:4},
    {id:crypto.randomUUID(),name:"Large",price:6},
  ]
  const extra=[
    {id:crypto.randomUUID(),name:"tomato",price:2},
    {id:crypto.randomUUID(),name:"onion,",price:1.5},
    {id:crypto.randomUUID(),name:"cheese",price:1.5},
  ]
 
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
              <Label htmlFor="pick-size " className=" text-[22px] justify-center">Pick Your Size</Label>
              <Pick sizes={sizes} item={item}/>
            </div>
            <div className="space-y-10 text-center">
              <Label htmlFor="Extra " className="text-[22px] justify-center">Any Extra?</Label>
              <Extra extra={extra} />
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

function Pick({sizes,item}:{sizes:any,item:any}) {
  return (
    <RadioGroup defaultValue="0" className="space-y-2">

    {sizes.map((size:any)=>(
      <div key={size.id} className="flex items-center space-y-2 rounded-md border border-gray-300 p-1  ">
        <RadioGroupItem  value={size.price} id={size.id} />
        <Label htmlFor={size.i} className="px-2 uppercase font-normal text-[16px] ">{size.name} {formatCurrency(size.price + item.basePrice)}</Label>
      </div>

    ))}
    
    
    </RadioGroup>
  );
}
function Extra({extra}:{extra:any}) {
  return (
    <div className=" text-start space-y-2">
      {extra.map((item:any)=>(
        <div key={item.id} className="rounded-md border border-gray-300 p-1  ">
        <Checkbox id={item}  />
      <label
      
        htmlFor={item.id}
        className=" px-2 uppercase "
      >
        {item.name} {formatCurrency(item.price)}
      </label>
      </div>
      ))}
      
    </div>
  )
}
