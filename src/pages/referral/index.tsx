import Router from 'next/router';
import * as React from 'react';
export interface IReferralProps {}

const startfreetrial=()=>{
  Router.push("/account/subscriptions/")
}
export default function Referral(props: IReferralProps) {
  return (
    <div >
      <div style={{ marginTop: '80px' }}></div>
      <div className="my-8" style={{ color: 'white' }}>
       
      </div>
      <div className=" -mx-4 ipad:-mx-12">
        <div className="-mx-4 ipad:-mx-8 flex flex-col-reverse laptop:flex-row laptop:mx-0">
          <div className="mx-8 laptop:w-1/2 laptop:my-auto">
            <div className="text-5xl font-bold my-8">Share your link and earn free months</div>
            <div className="text-xl my-4 text-gray-500 ">
              For every user that signs up using your link, you get a free month on your
              subscription. Start a free trial to get going with your personal referral link.
            </div>
            <button className="w-52 h-14 bg-blue-500 text-2xl font-bold my-4 " onClick={startfreetrial}>
              Start free trial
            </button>
          </div>
          <div className="h-64 laptop:w-1/2 laptop:h-182">
            <img
              className="w-full h-full object-cover"
              alt=""
              src="https://images.ctfassets.net/ojtnytzl1djm/AxPJfbmIPscrc8fobcZkB/8fcf25d6ce1ae60f898090f94322efd9/Referral_no_sub.png?w=1011&fit=fill&q=80&fm=jpg"
            />
          </div>
        </div>
        <div className="my-16 mx-4 flex flex-col gap-8 laptop:flex-row">
          <div className=" flex flex-col gap-8 ">
            <div className=" uppercase text-xl ">step 1</div>
            <div className=" text-4xl">Share your link</div>
            <div className=" text-lg text-gray-500">
              Share your referral link in video descriptions, direct messages, or anywhere you like.
            </div>
          </div>
          <div className=" flex flex-col gap-8">
            <div className=" uppercase text-xl ">step 2</div>
            <div className=" text-4xl">Creator signs up</div>
            <div className=" text-lg text-gray-500">
              Your link gives them a free trial and after a month they become a paying subscriber.
            </div>
          </div>
          <div className=" flex flex-col gap-8">
            <div className=" uppercase text-xl ">step 3</div>
            <div className=" text-4xl">Get a free month</div>
            <div className=" text-lg text-gray-500">
              Done! Get a free month on the Personal plan, or $15 off your next bill if you’re on
              the Commercial plan.
            </div>
          </div>
        </div>
        <div className="flex flex-col my-16 mx-4 relative">
          <div className="flex flex-col gap-4 py-4 laptop:absolute top-32 left-12 right-1/2 desktop:top-44">
            <div className="text-xl text-gray-500 laptop:hidden">MEET OUR STORYTELLERS</div>
            <div className="text-xl laptop:text-4xl">
              "I got asked all the time where I got my music from, so I just shared my link in video
              descriptions and captions and people started signing up. Now I'm an ambassador and
              have a steady income from Epidemic Sound."
            </div>
          </div>
          <div className="w-full">
            <img
              src="https://images.ctfassets.net/ojtnytzl1djm/611deCwj0MhVxTz9vvEqyc/f7274cc1e44de82ae4375b354f7a4ad4/4a8a5ad426beb63231ae59d7b2d1f3f1.png?w=1119&fit=fill&q=80&fm=webp"
              alt=""
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
