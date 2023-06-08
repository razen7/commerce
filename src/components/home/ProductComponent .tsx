import { useRouter } from 'next/router';
import React from 'react'

type Props = {
  item: {
    id: number;
    image: string;
    title: string;
  };
};

const ProductComponent = ({ item }: Props) => {
  const router=useRouter();
  return (
    <div className='flex-1 flex min-w-[320px] h-[200px] border-2'>
      <div className='flex-1 flex content-center items-center'>
        <img src={item.image} alt={item.title} className='max-h-full max-w-full p-2' />
      </div>
      <div className="flex-1 relative">
        <div className='capitalize line-clamp-3 p-1 mt-3'>
          {item.title}
        </div>
        <div className='mt-4 absolute top-[50%] ml-1'>
          <button className='border-2 rounded-lg p-2 bg-slate-300 hover:bg-inherit transition-all duration-500' onClick={()=>router.push('/item/'+ item.id)}>
            <div className="font-bold text-zinc-600 flex gap-2 items-center">
              View Details
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductComponent;